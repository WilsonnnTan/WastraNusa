import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, LayoutGrid, ShoppingCart, User } from 'lucide-react';

export default function Header() {
  return (
    <nav className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 bg-background border-b font-sans gap-4 md:gap-0">
      <div className="flex items-center gap-2 text-brand px-2 md:px-3.5 py-2 rounded-lg font-bold text-[15px] self-start md:self-auto">
        WastraNusa
      </div>

      <div className="flex flex-1 w-full md:max-w-[480px] mx-0 md:mx-6">
        <Input
          placeholder="Cari produk batik, tenun..."
          className="rounded-l-lg rounded-r-none border-gray-300 text-[13px] bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button className="rounded-r-lg rounded-l-none bg-brand text-white hover:bg-brand-dark cursor-pointer text-[13px]">
          Cari
        </Button>
      </div>

      <div className="flex gap-4 md:gap-6 items-center w-full md:w-auto justify-between md:justify-end overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
        {[
          { icon: <BookOpen size={20} />, label: 'Ensiklopedia' },
          { icon: <LayoutGrid size={20} />, label: 'Katalog' },
          { icon: <ShoppingCart size={20} />, label: 'Keranjang' },
          { icon: <User size={20} />, label: 'Profil' },
        ].map(({ icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-0.5 cursor-pointer text-gray-700 text-[11px] hover:text-brand transition-colors whitespace-nowrap min-w-max"
          >
            {icon}
            <span>{label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}
