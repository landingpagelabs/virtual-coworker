'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Calendly links per Tyce's Figma embed-code annotations (2026-07-13).
const DEFAULT_CALENDLY_URL = 'https://calendly.com/cheyenne-virtualcoworker/new-meeting';
// Per-page Calendly links, keyed by the URL slug.
const CALENDLY_URL_BY_SLUG: Record<string, string> = {
  apac: 'https://calendly.com/apac-virtualcoworker/free-30-minute-online-video-consultation-au',
};
const CALENDLY_SRC = 'https://assets.calendly.com/assets/external/widget.js';

/**
 * Slugs whose Calendly event type splits the invitee name into First/Last.
 * The US event uses ONE combined "Name" box; the APAC event uses two. Sending
 * the wrong shape prefills nothing and raises no error, so this has to be kept
 * in step with the calendars. The two calendars are separate Calendly accounts
 * and can drift independently — re-check with:
 *   curl 'https://calendly.com/api/booking/event_types/lookup?event_type_slug=<slug>&profile_slug=<profile>'
 * and read `invitee_name_format` ("combined" vs "first_and_last").
 */
const SPLIT_NAME_SLUGS = new Set(['apac']);

/**
 * Form field -> Calendly UTM key. Calendly accepts these five and nothing else,
 * so gclid has no home here; it still reaches the CRM via /api/lead.
 */
const UTM_FIELDS: Record<string, string> = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_term: 'utmTerm',
  utm_content: 'utmContent',
};

interface CalendlyModalProps {
  open: boolean;
  /** Values the visitor just submitted, from submitLead(). Used to prefill. */
  lead?: Record<string, string> | null;
}

/**
 * Full-screen booking overlay shown after a successful consultation-form submit.
 * Renders through a portal so the fixed overlay isn't trapped by any ancestor's
 * backdrop-filter/transform.
 *
 * Deliberately NOT dismissable (no close button, overlay clicks and Escape do
 * nothing) — the visitor has just asked for a consultation and this is the
 * booking step. Spec: Figma annotation on node 5252:18609.
 */
export function CalendlyModal({ open, lead }: CalendlyModalProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // Make sure Calendly's widget script is on the page.
    if (!document.querySelector(`script[src="${CALENDLY_SRC}"]`)) {
      const script = document.createElement('script');
      script.src = CALENDLY_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    // Initialise the inline widget once Calendly is ready (the async script may
    // still be loading), retrying until it is.
    // Pick the Calendly link for the current page (e.g. /apac uses its own).
    const slug = window.location.pathname.replace(/^\/|\/$/g, '');
    const baseUrl = CALENDLY_URL_BY_SLUG[slug] || DEFAULT_CALENDLY_URL;

    // Carry what the visitor just typed into the booking form, so they don't
    // retype it. Only name and email: neither event type asks for phone,
    // company or country, so those have nowhere to land (they still reach the
    // CRM via /api/lead). No customAnswers either — a1 on the US event is the
    // "anything that will help prepare" box, and we have nothing for it.
    const first = lead?.['first-name']?.trim() || '';
    const last = lead?.['last-name']?.trim() || '';
    const email = lead?.['work-email']?.trim() || '';

    const prefill: Record<string, string> = {};
    if (SPLIT_NAME_SLUGS.has(slug)) {
      if (first) prefill.firstName = first;
      if (last) prefill.lastName = last;
    } else {
      const name = `${first} ${last}`.trim();
      if (name) prefill.name = name;
    }
    if (email) prefill.email = email;

    // Attribution rides into the booking itself, so a booked meeting shows its
    // ad source in Calendly — not just in the Formspree row.
    const utm: Record<string, string> = {};
    for (const [field, calendlyKey] of Object.entries(UTM_FIELDS)) {
      const value = lead?.[field]?.trim();
      if (value) utm[calendlyKey] = value;
    }

    // Belt and braces: also put the values on the iframe's own query string.
    // The widget script delivers the prefill object by postMessage AFTER the
    // iframe loads (retrying at 0ms and 250ms); when it loses that race the
    // fields come up empty. Query params are part of the src before the iframe
    // ever loads, so they can't lose it.
    const url = new URL(baseUrl);
    if (SPLIT_NAME_SLUGS.has(slug)) {
      if (prefill.firstName) url.searchParams.set('first_name', prefill.firstName);
      if (prefill.lastName) url.searchParams.set('last_name', prefill.lastName);
    } else if (prefill.name) {
      url.searchParams.set('name', prefill.name);
    }
    if (email) url.searchParams.set('email', email);
    for (const field of Object.keys(UTM_FIELDS)) {
      const value = lead?.[field]?.trim();
      if (value) url.searchParams.set(field, value);
    }

    let cancelled = false;
    const tryInit = () => {
      if (cancelled) return;
      const Calendly = (window as any).Calendly;
      if (Calendly && widgetRef.current) {
        widgetRef.current.innerHTML = '';
        Calendly.initInlineWidget({
          url: url.toString(),
          parentElement: widgetRef.current,
          prefill,
          utm,
        });
        return;
      }
      window.setTimeout(tryInit, 100);
    };
    tryInit();

    // Lock page scroll while the modal is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      cancelled = true;
      document.body.style.overflow = prevOverflow;
    };
  }, [open, lead]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="calendly-overlay" role="dialog" aria-modal="true">
      <div className="calendly-modal">
        <h3 className="title-h3 white calendly-modal-title">
          <u>Last step:</u> select a time for your free consultation
        </h3>
        <div ref={widgetRef} className="calendly-embed" style={{ minWidth: 320, height: 700 }} />
      </div>
    </div>,
    document.body,
  );
}
