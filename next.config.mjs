const nextConfig = {
  reactStrictMode: true,
  // No root page by design: the only public URLs are /us, /apac, /congrats
  // (per Tyce, 2026-07-13 — root serves nothing, no redirect).
};

export default nextConfig;
