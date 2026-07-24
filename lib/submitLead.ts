declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// One Formspree form per region: a form carries exactly one webhook, and
// Zoho Flow needs a separate incoming webhook for each region's leads.
// APAC is matched by path prefix, same as the GTM triggers, so future
// split-test paths (/apac-b) keep routing to the right form.
const FORMSPREE_ENDPOINT_US = 'https://formspree.io/f/mlgyjjlv';
const FORMSPREE_ENDPOINT_APAC = 'https://formspree.io/f/xvzebnzw';

/**
 * Sends the consultation lead straight to Formspree from the browser — the
 * way Formspree is designed to be used. (An earlier server-side relay was
 * built on the belief that ad blockers block formspree.io POSTs; that claim
 * was checked against the actual filter lists on 2026-07-14 and is false.
 * The relay's single datacenter IP was also a spam-filter liability.)
 *
 * Payload keys are named to match Zoho CRM's standard Lead fields (First
 * Name, Email, Company, ...) so the Formspree -> Zoho webhook maps 1:1 with
 * no transformation. Every field is always sent, empty or not, so the
 * Formspree column set stays stable. Columns render in ASCII order — that's
 * a Formspree limitation, accepted in exchange for the plainest possible
 * submission.
 *
 * Fire-and-forget by design — the booking UX must never block on, or break
 * because of, lead capture. keepalive lets the request survive if the
 * visitor navigates away mid-flight.
 *
 * Returns the captured values so the booking modal can prefill Calendly with
 * them, or undefined if capture threw. Callers must treat undefined as "no
 * prefill" and still open the modal — never as an error.
 */
export function submitLead(
  form: HTMLFormElement,
  source: 'hero' | 'section',
): Record<string, string> | undefined {
  try {
    const raw = new FormData(form);
    const data: Record<string, string> = {};
    raw.forEach((value, key) => {
      // Field ids are section-prefixed (hero-work-email); strip the prefix.
      data[key.replace(/^(hero|final)-/, '')] = String(value);
    });
    data.page = window.location.pathname.replace(/^\/+|\/+$/g, '') || 'us';
    data.form = source;

    // Lead conversion signal for GTM. Pushed from here rather than caught by
    // GTM's own Form Submission trigger, which never fires on this form — it
    // preventDefaults and submits by fetch, so there is no submit for GTM to
    // observe. Nothing about this event touches Calendly, an iframe or a
    // navigation, so it cannot silently break the way a booking event can.
    //
    // Fired on the visitor's action, not on Formspree's response: the fetch
    // below is deliberately fire-and-forget, and gating the conversion on it
    // would tie ad reporting to a third party's health for no gain. `page`
    // carries the region so /us and /apac conversions can be routed to their
    // own Google Ads accounts.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      // NB: this string must match the GTM Custom Event triggers exactly —
      // the container is built on 'lpl_form_submission' (Tyce, 2026-07-15).
      event: 'lpl_form_submission',
      form_placement: source,
      page: data.page,
    });

    // No _replyto/_subject: on JSON submissions Formspree renders them as
    // columns, and they'd be dead keys in the webhook payload going to Zoho.
    const payload: Record<string, string> = {
      'First Name': data['first-name'] ?? '',
      'Last Name': data['last-name'] ?? '',
      Email: data['work-email'] ?? '',
      // Formspree's thank-you autoresponse only fires when the submission
      // carries a field literally titled `email` — lowercase, no case
      // matching (docs verified 2026-07-24; Tyce's live submit confirmed
      // `Email` alone doesn't trigger it). `Email` above stays for the 1:1
      // Zoho Lead-field mapping; this duplicate exists solely for the
      // autoresponse and costs one extra Formspree column.
      email: data['work-email'] ?? '',
      Phone: data['phone'] ?? '',
      Company: data['company-name'] ?? '',
      Country: data['country'] ?? '',
      Page: data.page,
      Form: data.form,
      'UTM Source': data['utm_source'] ?? '',
      'UTM Medium': data['utm_medium'] ?? '',
      'UTM Campaign': data['utm_campaign'] ?? '',
      'UTM Term': data['utm_term'] ?? '',
      'UTM Content': data['utm_content'] ?? '',
      GCLID: data['gclid'] ?? '',
    };

    const endpoint = data.page.startsWith('apac')
      ? FORMSPREE_ENDPOINT_APAC
      : FORMSPREE_ENDPOINT_US;

    void fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});

    return data;
  } catch {
    // Never let lead capture break the booking flow.
    return undefined;
  }
}
