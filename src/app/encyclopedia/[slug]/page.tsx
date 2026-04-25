import { EncyclopediaDetailMain } from '@/components/encyclopedia/encyclopedia-detail-main';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EncyclopediaDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-[#f5f3ec] text-[#2d4f3f]">
      <Header homeHref="/" />
      <EncyclopediaDetailMain slug={slug} />
      <Footer />
    </div>
  );
}
