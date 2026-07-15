'use client';

import { useEffect, useState } from 'react';

/**
 * Renders the visitor's current month name, resolved on the client so it can
 * never go stale from a build-time bake (site may not redeploy every month).
 * Falls back to "This Month" during SSR/pre-hydration.
 */
export function DynamicMonth() {
  const [month, setMonth] = useState('');
  useEffect(() => {
    setMonth(new Date().toLocaleString('en-US', { month: 'long' }));
  }, []);
  return <>{month || 'This Month'}</>;
}

/**
 * Copyright year, client-resolved for the same reason: on this SSG site a
 * server-side new Date() bakes the BUILD year into the HTML, which goes
 * stale every January the site doesn't happen to redeploy. Falls back to the
 * build year pre-hydration (right almost always, and never blank).
 */
export function DynamicYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}
