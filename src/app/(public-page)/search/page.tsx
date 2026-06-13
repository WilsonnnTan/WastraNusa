import { SearchMain } from '@/components/search/search-main';

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  return <SearchMain key={q ?? ''} query={q ?? ''} />;
}
