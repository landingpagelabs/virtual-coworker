import PageBuilder from '@/components/PageBuilder';
import { getPage } from '@/lib/content';

export default function HomePage() {
  const page = getPage('us')!;
  return <PageBuilder page={page} />;
}
