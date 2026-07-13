import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageBuilder from '@/components/PageBuilder';
import { getPage, pageSlugs } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return pageSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return {
    alternates: { canonical: `/${params.slug}` },
    // The post-booking page shouldn't be indexed or shown in ads.
    robots: params.slug === 'congrats' ? { index: false, follow: false } : undefined,
  };
}

// Renders a static content page by its slug: /us, /apac, /congrats.
export default function DynamicPage({ params }: { params: { slug: string } }) {
  const page = getPage(params.slug);
  if (!page) notFound();
  return <PageBuilder page={page} />;
}
