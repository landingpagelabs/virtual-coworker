import PageBuilder from '@/components/PageBuilder';
import { pageBySlugQuery } from '@/lib/queries';
import { fetchSanity } from '@/lib/sanity';

export const revalidate = 60;

// Renders any Sanity `page` document by its slug, e.g. /apac, /congrats.
export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await fetchSanity(pageBySlugQuery, { slug: params.slug });

  if (!page) {
    return (
      <main className="page-shell">
        <div className="container">
          <h1>Сторінка не знайдена</h1>
          <p>Немає сторінки Sanity зі slug «{params.slug}».</p>
        </div>
      </main>
    );
  }

  return <PageBuilder page={page} />;
}
