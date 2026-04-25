import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { KatalogDetailMain } from '@/components/katalog/detail/katalog-detail-main';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function KatalogDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-[#f5f3ec] text-[#2d4f3f]">
      <Header homeHref="/" />
      <KatalogDetailMain slug={slug} />
      <Footer />
    </div>
  );
}
