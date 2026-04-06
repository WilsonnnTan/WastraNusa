import { EncyclopediaMain } from '@/components/ensiklopedia/encyclopedia-main';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export default function EncyclopediaPage() {
  return (
    <div
      className={`${plusJakartaSans.className} min-h-screen bg-[#f5f3ec] text-[#2d4f3f]`}
    >
      <Header homeHref="/" />
      <EncyclopediaMain />
      <Footer />
    </div>
  );
}
