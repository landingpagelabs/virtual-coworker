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
      stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      stored = {};
    }

    const url = new URLSearchParams(window.location.search);
    const next = emptyParams();
    let sawFreshValue = false;

    for (const key of PARAM_KEYS) {
      const fromUrl = url.get(key);
      if (fromUrl) {
        next[key] = fromUrl; // last-touch: a value in the current URL wins
        sawFreshValue = true;
      } else if (stored[key]) {
        next[key] = stored[key] as string;
      }
    }

    // Only rewrite storage when this visit actually carried attribution, so we
    // never clobber a previously captured campaign with empties.
    if (sawFreshValue) {
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
