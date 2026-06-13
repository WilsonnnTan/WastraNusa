import { EncyclopediaMain } from '@/components/encyclopedia/encyclopedia-main';

type EncyclopediaPageProps = {
  searchParams: Promise<{
    island?: string;
    topic?: string;
    search?: string;
  }>;
};

export default async function EncyclopediaPage({
  searchParams,
}: EncyclopediaPageProps) {
  const { island, topic, search } = await searchParams;

  return (
    <EncyclopediaMain
      key={`${island ?? 'all'}-${topic ?? 'all'}-${search ?? ''}`}
      initialIsland={island}
      initialTopic={topic}
      initialSearch={search}
    />
  );
}
