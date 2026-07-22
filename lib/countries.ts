// Countries offered in the consultation forms — hard-gated to the two markets
// Virtual Coworker serves (Tyce, 2026-07-22). The Country <select> is required
// and there is deliberately NO "Other": a visitor outside these two cannot
// submit. This is an intentional hard gate to US + AU, not an oversight — do
// not re-add the wider list. Values match the labels (full names) to line up
// with autocomplete="country-name".
export const COUNTRIES = [
  'United States',
  'Australia',
];
