import { CatalogMain } from '@/components/catalog/main/catalog-main';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ec] text-[#2d4f3f]">
      <Header homeHref="/" />
      <CatalogMain />
      <Footer />
    </div>
  );
}
