import Link from 'next/link';

const footerColumns = [
  {
    title: 'WastraNusa',
    links: ['Tentang Kami', 'Misi & Visi', 'Tim Kami', 'Karir', 'Blog'],
  },
  {
    title: 'Belanja',
    links: [
      'Semua Produk',
      'Batik',
      'Tenun & Songket',
      'Kebaya & Ulos',
      'Promo',
    ],
  },
  {
    title: 'Ensiklopedia',
    links: [
      'Jelajahi Artikel',
      'Per Wilayah',
      'Per Topik',
      'Kontribusi',
      'Pengrajin',
    ],
  },
  {
    title: 'Bantuan',
    links: [
      'Pusat Bantuan',
      'Cara Pemesanan',
      'Kebijakan Retur',
      'Hubungi Kami',
      'FAQ',
    ],
  },
];

type HomepageFooterProps = {
  year?: number;
};

export function HomepageFooter({ year = 2025 }: HomepageFooterProps) {
  return (
    <footer className="mt-4 bg-[#2d5b48] text-[#d4dfd1]">
      <div className="mx-auto w-full max-w-[1320px] px-4 pb-8 pt-14 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.35fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#3a6c58] shadow-sm shadow-black/15">
                <span className="h-3 w-3 rounded-full bg-[#f0d696]" />
              </span>
              <span className="text-3xl font-extrabold text-[#edf4e8]">
                WastraNusa
              </span>
            </div>

            <p className="mt-5 max-w-sm leading-relaxed text-[#adc2b3]">
              Platform terpercaya untuk wastra tradisional Indonesia
              menghubungkan pengrajin lokal dengan pecinta budaya Nusantara.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {['IG', 'FB', 'TW', 'YT'].map((social) => (
                <button
                  key={social}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/6 text-xs font-semibold text-[#d5e0d3] transition hover:bg-white/14"
                  type="button"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-lg font-bold text-[#edf4e8]">
                {column.title === 'Ensiklopedia' ? (
                  <Link
                    href="/ensiklopedia"
                    className="transition hover:text-white"
                  >
                    {column.title}
                  </Link>
                ) : (
                  column.title
                )}
              </h4>
              <ul className="mt-4 space-y-2.5 text-[#c3d2c6]">
                {column.links.map((link) => (
                  <li key={link}>
                    {column.title === 'Ensiklopedia' ? (
                      <Link
                        href="/ensiklopedia"
                        className="text-left text-sm transition hover:text-white"
                      >
                        {link}
                      </Link>
                    ) : (
                      <button
                        className="text-left text-sm transition hover:text-white"
                        type="button"
                      >
                        {link}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-[#bfd0c1]">
          <p>© {year} WastraNusa. Hak cipta dilindungi undang-undang.</p>

          <div className="flex items-center gap-5">
            {['Syarat & Ketentuan', 'Kebijakan Privasi', 'Peta Situs'].map(
              (item) => (
                <button
                  key={item}
                  className="transition hover:text-white"
                  type="button"
                >
                  {item}
                </button>
              ),
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className="h-4 w-6 rounded-sm bg-[#3f6f5a] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
