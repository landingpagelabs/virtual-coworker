import us from '@/content/us.json';
import apac from '@/content/apac.json';
import congrats from '@/content/congrats.json';

// Static page content, snapshotted from the retired Sanity CMS on 2026-07-13.
// To edit copy: edit the JSON in content/ and redeploy.
const pages: Record<string, unknown> = { us, apac, congrats };

export interface PageContent {
  title?: string;
  sections?: ({ _type: string; _key: string } & Record<string, unknown>)[];
}

export function getPage(slug: string): PageContent | null {
  return (pages[slug] as PageContent | undefined) ?? null;
}

export const pageSlugs = Object.keys(pages);

// Former Sanity image assets, downloaded into public/. Keyed by the asset
// _ref still present in the content JSON.
const localImages: Record<string, string> = {
  'image-889d1114ce1d75129461ca7455ad5dc9abac34d4-777x928-png':
    '/images/sections/about/about-main-us.avif',
  'image-e72878271081235a4be05eb3d16554f5c32384fc-777x928-png':
    '/images/sections/about/about-main-apac.avif',
  'image-b9de5f252e4353630d70dde4c4859572faf5e0f0-583x868-png':
    '/images/sections/about/about-gallery-1.avif',
  'image-dbf49e4d226cb066abff85a5e6b785498fbfc988-583x868-png':
    '/images/sections/about/about-gallery-2.avif',
  'image-63fdfec90ba0780a4f2604c5deb1e38f566a5f56-583x868-png':
    '/images/sections/about/about-gallery-3.avif',
};

export function imageUrl(image: { asset?: { _ref?: string } } | undefined): string | null {
  const ref = image?.asset?._ref;
  return ref ? localImages[ref] ?? null : null;
}
