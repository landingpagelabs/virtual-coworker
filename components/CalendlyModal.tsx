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

interface CalendlyModalProps {
  open: boolean;
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
export function CalendlyModal({ open }: CalendlyModalProps) {
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
    const url = CALENDLY_URL_BY_SLUG[slug] || DEFAULT_CALENDLY_URL;

    let cancelled = false;
    const tryInit = () => {
      if (cancelled) return;
      const Calendly = (window as any).Calendly;
      if (Calendly && widgetRef.current) {
        widgetRef.current.innerHTML = '';
        Calendly.initInlineWidget({ url, parentElement: widgetRef.current });
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
  }, [open]);

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
