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
