'use client';

import { useEffect, useState } from 'react';

/**
 * Renders hidden form inputs that capture marketing attribution from the
 * landing URL — the standard UTM set plus Google's gclid.
 *
 * Values are read from the URL query string on mount and persisted to
 * localStorage, so they survive internal navigation and are still present if
 * the visitor lands on a UTM-tagged URL but submits the form later. A fresh
 * value in the URL always wins (last-touch), otherwise the stored value is used.
 *
 * Drop <TrackingFields /> inside any <form> and the values ride along with the
 * submission (FormData / query string / whatever reads the form).
 */
const PARAM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
] as const;

type ParamKey = (typeof PARAM_KEYS)[number];
type Params = Record<ParamKey, string>;

const STORAGE_KEY = 'vc_tracking_params';

const emptyParams = (): Params =>
  PARAM_KEYS.reduce((acc, key) => ({ ...acc, [key]: '' }), {} as Params);

export function TrackingFields() {
  const [params, setParams] = useState<Params>(emptyParams);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Anything captured on a previous page view / visit.
    let stored: Partial<Params> = {};
    try {
      // `|| {}` also covers a literal "null" in storage — JSON.parse returns
      // null without throwing, and stored[key] on null would crash the effect.
      stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}') || {};
    } catch {
      stored = {};
    }

    const url = new URLSearchParams(window.location.search);
    const utmKeys = PARAM_KEYS.filter((k) => k !== 'gclid');
    const freshUtm = utmKeys.some((k) => url.get(k));
    const freshGclid = !!url.get('gclid');

    // The UTM set is one atomic bundle describing ONE touch — never merge keys
    // across visits, or a facebook utm_source ends up stored next to last
    // month's google utm_campaign (and a stale gclid), and the CRM row blames
    // the wrong channel. Rules:
    //   fresh utm_* in the URL  -> the whole utm bundle comes from the URL,
    //                              missing keys stay empty, and a stored gclid
    //                              from an older touch is dropped with it
    //   bare gclid only         -> a Google click: gclid updates, the stored
    //                              utm bundle is untouched (a bare gclid is
    //                              not a UTM touch)
    //   nothing fresh           -> the stored bundle rides along unchanged
    const next = emptyParams();
    for (const key of utmKeys) {
      next[key] = freshUtm ? url.get(key) ?? '' : (stored[key] as string) ?? '';
    }
    next.gclid = freshGclid
      ? (url.get('gclid') as string)
      : freshUtm
        ? ''
        : ((stored.gclid as string) ?? '');

    // Only rewrite storage when this visit actually carried attribution, so we
    // never clobber a previously captured campaign with empties.
    if (freshUtm || freshGclid) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable (private mode / quota) — fields still populate */
      }
    }

    setParams(next);
  }, []);

  return (
    <>
      {PARAM_KEYS.map((key) => (
        <input key={key} type="hidden" name={key} value={params[key]} readOnly />
      ))}
    </>
  );
}
