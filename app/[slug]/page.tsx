import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageBuilder from '@/components/PageBuilder';
import { getPage, pageSlugs } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return pageSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  // noindex is set sitewide in the root layout — every page here is a
  // paid-traffic destination, not organic search real estate.
  return {
    alternates: { canonical: `/${params.slug}` },
  };
}

// Renders a static content page by its slug: /us, /apac, /congrats.
export default function DynamicPage({ params }: { params: { slug: string } }) {
  const page = getPage(params.slug);
  if (!page) notFound();
  return <PageBuilder page={page} />;
}
