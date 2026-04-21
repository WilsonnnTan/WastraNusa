import { EncyclopediaMain } from '@/components/ensiklopedia/encyclopedia-main';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

type EncyclopediaPageProps = {
  searchParams: Promise<{
    region?: string;
  }>;
};

export default async function EncyclopediaPage({
  searchParams,
}: EncyclopediaPageProps) {
  const { region } = await searchParams;

  return (
    <div className="min-h-screen bg-[#f5f3ec] text-[#2d4f3f]">
      <Header homeHref="/" />
      <EncyclopediaMain key={region ?? 'all'} initialRegion={region} />
      <Footer />
    </div>
  );
}
