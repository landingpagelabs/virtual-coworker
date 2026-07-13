import { NextResponse } from 'next/server';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgyjjlv';

/**
 * Server-side lead relay.
 *
 * The browser used to POST to formspree.io directly, which ad blockers and
 * privacy extensions silently block (formspree.io is on the common tracker
 * lists) — the visitor sees the booking modal, we never get the lead. Posting
 * to our own origin can't be blocked, so the browser talks to us and we hand
 * the lead to Formspree from the server.
 *
 * The JSON key order below IS the column order in Formspree.
 */
export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Record<string, string>;

    const submittedAt = new Date().toLocaleString('en-AU', {
      timeZone: 'Australia/Melbourne',
      dateStyle: 'short',
      timeStyle: 'short',
    });

    // Ordered exactly as the columns should read, left to right.
    // Names match Zoho CRM's standard Lead fields (Email, Company, First/Last
    // Name, Phone, Country) so the Formspree -> Zoho webhook maps 1:1.
    const payload = {
      'Submitted At': submittedAt,
      'First Name': data['first-name'] ?? '',
      'Last Name': data['last-name'] ?? '',
      Email: data['work-email'] ?? '',
      Phone: data['phone'] ?? '',
      Company: data['company-name'] ?? '',
      Country: data['country'] ?? '',
      Page: data['page'] ?? '',
      Form: data['form'] ?? '',
      'UTM Source': data['utm_source'] ?? '',
      'UTM Medium': data['utm_medium'] ?? '',
      'UTM Campaign': data['utm_campaign'] ?? '',
      'UTM Term': data['utm_term'] ?? '',
      'UTM Content': data['utm_content'] ?? '',
      GCLID: data['gclid'] ?? '',
    };
    // No _replyto/_subject: on JSON submissions Formspree renders them as
    // columns, and they'd be dead keys in the webhook payload going to Zoho.
    // Reply-to/subject are the CRM's job once the lead lands there.

    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('Formspree rejected the lead', res.status, body.slice(0, 300));
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Lead relay failed', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
