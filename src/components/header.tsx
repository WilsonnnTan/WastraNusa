import {
  BookOpenText,
  Grid2X2,
  Search,
  ShoppingCart,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const menuItems = [
  { label: 'Ensiklopedia', icon: BookOpenText, href: '/encyclopedia' },
  { label: 'Katalog', icon: Grid2X2, href: '/katalog' },
  { label: 'Keranjang', icon: ShoppingCart, href: '/cart' },
  { label: 'Profil', icon: UserRound, href: '/profile' },
];

type HeaderProps = {
  homeHref?: string;
};

export function Header({ homeHref = '/' }: HeaderProps) {
  return (
    <header className="border-b-4 border-[#2F4F3F] bg-[#f9f7f2]">
      <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6 lg:px-8">
        <div className="flex h-20 items-center gap-4">
          <Link href={homeHref} className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="WastraNusa"
              width={60}
              height={70}
              priority
              className="object-contain"
            />
            <span className="text-2xl font-extrabold tracking-tight text-[#2f5f49]">
              WastraNusa
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-5 md:flex lg:gap-6">
            {menuItems.map(({ label, icon: Icon, href }) => {
              const content = (
                <>
                  <div className="relative">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium">{label}</span>
                </>
              );

              const classes =
                'group relative flex flex-col items-center gap-1 text-[#2f4f3f] transition hover:text-[#224233]';

              // Logika ini akan otomatis menangani navigasi ke /cart
              if (href) {
                return (
                  <Link key={label} href={href} className={classes}>
                    {content}
                  </Link>
                );
              }

              return (
                <button key={label} className={classes} type="button">
                  {content}
                </button>
              );
            })}
          </nav>

          <button
            className="ml-auto grid h-10 w-10 place-items-center rounded-xl border border-[#d8cfbf] text-[#355846] md:hidden"
            type="button"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
