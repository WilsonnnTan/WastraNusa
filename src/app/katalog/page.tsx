import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { KatalogMain } from '@/components/katalog/katalog-main';

export default function KatalogPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ec] text-[#2d4f3f]">
      <Header homeHref="/" />
      <KatalogMain />
      <Footer />
    </div>
  );
}
