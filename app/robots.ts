import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://try.virtualcoworker.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/us', '/apac'],
      // Post-booking page — no reason for it to be indexed.
      disallow: ['/congrats'],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
