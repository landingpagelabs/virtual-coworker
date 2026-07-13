const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // No root page by design: the only public URLs are /us, /apac, /congrats
  // (per Tyce, 2026-07-13 — root serves nothing, no redirect).
  async headers() {
    const security = [
      // Block MIME-type sniffing.
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      // Don't let the site be framed (clickjacking).
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      // Send the origin (not the full path) to third parties.
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      // Force HTTPS for a year, including subdomains.
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
      // Deny APIs the site never uses.
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
    ];
    return [
      { source: '/:path*', headers: security },
      // Fingerprinted/static assets are immutable — cache them hard.
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/vendor/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
