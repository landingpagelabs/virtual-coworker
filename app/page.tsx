import PageBuilder from '@/components/PageBuilder';
import { pageBySlugQuery } from '@/lib/queries';
import { fetchSanity } from '@/lib/sanity';

export const revalidate = 60;

export default async function HomePage() {
  const page = await fetchSanity(pageBySlugQuery, { slug: 'us' });

  if (!page) {
    return (
      <main className="page-shell">
        <div className="container">
          <h1>Сторінка не знайдена</h1>
          <p>Перевірте налаштування CMS або створіть сторінку з slug «home».</p>
        </div>
      </main>
    );
  }

  return <PageBuilder page={page} />;
}
