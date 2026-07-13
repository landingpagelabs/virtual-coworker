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
 */
export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Record<string, string>;

    const submittedAt = new Date().toLocaleString('en-AU', {
      timeZone: 'Australia/Melbourne',
      dateStyle: 'short',
      timeStyle: 'short',
    });

    // Ordered exactly as the columns should read, left to right. Every field is
    // always sent, empty or not, so the column set stays stable.
    // Names match Zoho CRM's standard Lead fields (Email, Company, First/Last
    // Name, Phone, Country) so the Formspree -> Zoho webhook maps 1:1.
    const fields: [string, string][] = [
      ['Submitted At', submittedAt],
      ['First Name', data['first-name'] ?? ''],
      ['Last Name', data['last-name'] ?? ''],
      ['Email', data['work-email'] ?? ''],
      ['Phone', data['phone'] ?? ''],
      ['Company', data['company-name'] ?? ''],
      ['Country', data['country'] ?? ''],
      ['Page', data['page'] ?? ''],
      ['Form', data['form'] ?? ''],
      ['UTM Source', data['utm_source'] ?? ''],
      ['UTM Medium', data['utm_medium'] ?? ''],
      ['UTM Campaign', data['utm_campaign'] ?? ''],
      ['UTM Term', data['utm_term'] ?? ''],
      ['UTM Content', data['utm_content'] ?? ''],
      ['GCLID', data['gclid'] ?? ''],
    ];

    // Formspree DISCARDS the order we post in: it renders `_date` followed by the
    // ASCII-sorted union of every key it has ever seen on this form. The only way
    // to control the column order is to make the keys sort into it, so each key
    // carries a run of leading spaces — ' ' (0x20) sorts below every letter, so
    // more spaces = further left. HTML collapses them, so the header still reads
    // "First Name", and trimming a key gives the Zoho field name back verbatim.
    // NB the columns only settle once the submissions holding the OLD, unprefixed
    // keys are deleted: the field list is a union over live submissions, not a
    // stored schema.
    const payload = Object.fromEntries(
      fields.map(([name, value], i) => [' '.repeat(fields.length - i) + name, value]),
    );
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
