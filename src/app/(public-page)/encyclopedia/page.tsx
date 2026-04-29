import { EncyclopediaMain } from '@/components/encyclopedia/encyclopedia-main';

type EncyclopediaPageProps = {
  searchParams: Promise<{
    island?: string;
    topic?: string;
  }>;
};

export default async function EncyclopediaPage({
  searchParams,
}: EncyclopediaPageProps) {
  const { island, topic } = await searchParams;

  return (
    <EncyclopediaMain
      key={`${island ?? 'all'}-${topic ?? 'all'}`}
      initialIsland={island}
      initialTopic={topic}
    />
  );
}
