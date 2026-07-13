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
