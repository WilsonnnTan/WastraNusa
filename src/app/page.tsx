import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import {
  CategoryFilters,
  EncyclopediaSection,
  FeaturedCards,
  HeroSection,
  ProductCatalog,
  RegionCards,
} from '@/components/landing-page';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export default function HomePage() {
  return (
    <div
      className={`${plusJakartaSans.className} min-h-screen bg-[#f5f1e8] text-[#2b4d3c]`}
    >
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

        <RegionCards />
      </main>

      <Footer />
    </div>
  );
}
