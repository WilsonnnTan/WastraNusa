"import {
  BookOpenText,
  Grid2X2,
  Search,
  ShoppingCart,
  UserRound,
} from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

const menuItems = [
  { label: 'Ensiklopedia', icon: BookOpenText, href: '/ensiklopedia' },
  { label: 'Katalog', icon: Grid2X2 },
  { label: 'Keranjang', icon: ShoppingCart, badge: '3' },
  { label: 'Profil', icon: UserRound },
];

type HomepageHeaderProps = {
  homeHref?: string;
};

export function HomepageHeader({ homeHref = '/' }: HomepageHeaderProps) {
  return (
    <header className=\"border-b border-[#2f5f4a] bg-[#f9f7f2]\">
      <div className=\"mx-auto w-full max-w-[1320px] px-4 md:px-6 lg:px-8\">
        <div className=\"flex h-20 items-center gap-4\">
          <Link href={homeHref} className=\"flex items-center gap-3\">
            <span className=\"grid h-11 w-11 place-items-center rounded-[10px] bg-[#2f5f49] shadow-sm shadow-[#224436]/25\">
              <span className=\"h-4 w-4 rounded-sm bg-[#f5f2eb]\" />
            </span>
            <span className=\"text-3xl font-extrabold tracking-tight text-[#2f5f49]\">
              WastraNusa
            </span>
          </Link>

          <div className=\"hidden flex-1 items-center md:flex\">
            <div className=\"ml-4 flex w-full max-w-[620px] items-center overflow-hidden rounded-xl border border-[#d8d0c1] bg-[#ece7dd]\">
              <Search className=\"ml-4 h-4 w-4 text-[#aca493]\" />
              <Input
                className=\"h-11 w-full border-0 bg-transparent px-3 text-sm text-[#435d50] placeholder:text-[#9f998b] focus-visible:ring-0 focus-visible:ring-offset-0\"
                placeholder=\"Cari produk batik, tenun, atau artikel budaya...\"
                type=\"text\"
              />
              <button
                className=\"h-11 bg-[#2f5f49] px-7 text-sm font-semibold text-[#f1f5ee] transition hover:bg-[#264d3b]\"
                type=\"button\"
              >
                Cari
              </button>
            </div>
          </div>

          <nav className=\"ml-auto hidden items-center gap-5 md:flex lg:gap-6\">
            {menuItems.map(({ label, icon: Icon, badge, href }) => {
              const content = (
                <>
                  <div className=\"relative\">
                    <Icon className=\"h-4 w-4\" />
                    {badge ? (
                      <span className=\"absolute -right-2.5 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-[#d9b57a] px-1 text-[9px] font-bold text-[#284b3b]\">
                        {badge}
                      </span>
                    ) : null}
                  </div>
                  <span className=\"text-xs font-medium\">{label}</span>
                </>
              );

              const classes =
                'group relative flex flex-col items-center gap-1 text-[#2f4f3f] transition hover:text-[#224233]';

              if (href) {
                return (
                  <Link key={label} href={href} className={classes}>
                    {content}
                  </Link>
                );
              }

              return (
                <button key={label} className={classes} type=\"button\">
                  {content}
                </button>
              );
            })}
          </nav>

          <button
            className=\"ml-auto grid h-10 w-10 place-items-center rounded-xl border border-[#d8cfbf] text-[#355846] md:hidden\"
            type=\"button\"
          >
            <Search className=\"h-4 w-4\" />
          </button>
        </div>

        <div className=\"pb-4 md:hidden\">
          <div className=\"flex items-center overflow-hidden rounded-xl border border-[#d8d0c1] bg-[#ece7dd]\">
            <Input
              className=\"h-10 w-full border-0 bg-transparent px-4 text-sm text-[#435d50] placeholder:text-[#9f998b] focus-visible:ring-0 focus-visible:ring-offset-0\"
              placeholder=\"Cari produk atau artikel...\"
              type=\"text\"
            />
            <button
              className=\"h-10 bg-[#2f5f49] px-4 text-sm font-semibold text-[#f1f5ee]\"
              type=\"button\"
            >
              Cari
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
"