import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import {
  CategoryFilters,
  EncyclopediaSection,
  FeaturedCards,
  HeroSection,
  IslandCards,
  ProductCatalog,
} from '@/components/landing-page';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#2b4d3c]">
      <Header homeHref="/" />

      <main className="pb-16">
        <section className="mx-auto w-full max-w-[1320px] px-4 pt-8 md:px-6 lg:px-8">
          <div className="grid animate-in gap-4 fade-in duration-700 lg:grid-cols-[minmax(0,1fr)_280px]">
            <HeroSection />
            <FeaturedCards />
          </div>

          <CategoryFilters />
        </section>

        <ProductCatalog />

        <EncyclopediaSection />

        <IslandCards />
      </main>

      <Footer />
    </div>
  );
}
