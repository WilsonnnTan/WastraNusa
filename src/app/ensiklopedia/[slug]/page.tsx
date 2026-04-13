import { getEncyclopediaArticleDetail } from '@/components/ensiklopedia/constants';
import { EncyclopediaDetailMain } from '@/components/ensiklopedia/encyclopedia-detail-main';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EncyclopediaDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getEncyclopediaArticleDetail(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f5f3ec] text-[#2d4f3f]">
      <Header homeHref="/" />
      <EncyclopediaDetailMain article={article} />
      <Footer />
    </div>
  );
}
