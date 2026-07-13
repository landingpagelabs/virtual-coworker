const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgyjjlv';

/**
 * POSTs the consultation form to Formspree so the lead is captured even if
 * the visitor never completes the Calendly booking. Fire-and-forget by design:
 * the booking UX must never block on, or break because of, lead capture.
 * keepalive lets the request survive if the visitor navigates away mid-flight.
 */
export function submitLead(form: HTMLFormElement, source: 'hero' | 'section') {
  try {
    const raw = new FormData(form);
    const data = new FormData();
    raw.forEach((value, key) => {
      // Field ids are section-prefixed (hero-work-email); strip the prefix so
      // the Formspree submission reads cleanly (work-email, phone, country...).
      data.append(key.replace(/^(hero|final)-/, ''), value);
    });
    const page = window.location.pathname.replace(/^\/+|\/+$/g, '') || 'us';
    const email = String(data.get('work-email') ?? '');
    if (email) data.append('_replyto', email);
    data.append('_subject', `New consultation lead (${page})`);
    data.append('form', source);
    data.append('page', page);

    void fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Never let lead capture break the booking flow.
  }
}
