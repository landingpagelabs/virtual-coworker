declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Sends the consultation lead to our own /api/lead route, which relays it to
 * Formspree server-side.
 *
 * It deliberately does NOT call formspree.io from the browser: ad blockers and
 * privacy extensions block that domain, and the lead vanishes while the visitor
 * still sees the booking modal. A request to our own origin always gets through.
 *
 * Fire-and-forget by design — the booking UX must never block on, or break
 * because of, lead capture. keepalive lets the request survive if the visitor
 * navigates away mid-flight.
 */
export function submitLead(form: HTMLFormElement, source: 'hero' | 'section') {
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
    // Fired on the visitor's action, not on the relay's response: the fetch
    // below is deliberately fire-and-forget, and gating the conversion on it
    // would tie ad reporting to backend health for no gain. `page` carries the
    // region so /us and /apac conversions can be routed to their own Google Ads
    // accounts.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'lpl_form_submitted',
      form_placement: source,
      page: data.page,
    });

    void fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Never let lead capture break the booking flow.
  }
}
