import { EncyclopediaMain } from '@/components/ensiklopedia/encyclopedia-main';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function EncyclopediaPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ec] text-[#2d4f3f]">
      <Header homeHref="/" />
      <EncyclopediaMain />
      <Footer />
    </div>
  );
}
