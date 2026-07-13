const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The US page is the default market page; canonical ad URLs are
      // /us and /apac (per Tyce, 2026-07-13).
      { source: '/', destination: '/us', permanent: false },
    ];
  },
};

export default nextConfig;
