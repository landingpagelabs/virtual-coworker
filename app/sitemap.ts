import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://try.virtualcoworker.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Only the two ad-destination pages; /congrats is post-booking.
  return ['us', 'apac'].map((slug) => ({
    url: `${SITE}/${slug}`,
    changeFrequency: 'monthly',
    priority: 1,
  }));
}
