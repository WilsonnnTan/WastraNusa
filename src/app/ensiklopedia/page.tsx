import { EncyclopediaMain } from '@/components/ensiklopedia/encyclopedia-main';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

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
    <div className="min-h-screen bg-[#f5f3ec] text-[#2d4f3f]">
      <Header homeHref="/" />
      <EncyclopediaMain
        key={`${island ?? 'all'}-${topic ?? 'all'}`}
        initialIsland={island}
        initialTopic={topic}
      />
      <Footer />
    </div>
  );
}
