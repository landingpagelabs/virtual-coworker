import type { MetadataRoute } from 'next';

// Paid-traffic landing pages — keep the whole site out of the index
// (Tyce, 2026-07-13). No sitemap: publishing one would invite crawling.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  };
}
