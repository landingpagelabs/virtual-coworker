import { notFound } from 'next/navigation';
import PageBuilder from '@/components/PageBuilder';
import { getPage, pageSlugs } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  // 'us' is served by the root route.
  return pageSlugs.filter((slug) => slug !== 'us').map((slug) => ({ slug }));
}

// Renders a static content page by its slug, e.g. /apac, /congrats.
export default function DynamicPage({ params }: { params: { slug: string } }) {
  const page = getPage(params.slug);
  if (!page) notFound();
  return <PageBuilder page={page} />;
}
