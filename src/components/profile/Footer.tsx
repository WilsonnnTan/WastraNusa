function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col gap-2.5 min-w-[120px]">
      <h4 className="m-0 text-[14px] font-bold text-white">{title}</h4>
      {links.map((link) => (
        <a
          key={link}
          href="#"
          className="text-[13px] text-[#a8b5a0] no-underline cursor-pointer hover:text-white transition-colors"
        >
          {link}
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-dark px-4 md:px-8 pt-10 md:pt-12 pb-6 font-sans mt-auto">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 mb-10 md:mb-12">
        <div className="lg:min-w-[240px] lg:max-w-[300px] flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center text-lg">
              🧵
            </div>
            <span className="font-bold text-base text-white">WastraNusa</span>
          </div>

          <p className="m-0 text-[12px] text-[#a8b5a0] leading-relaxed">
            Platform terpercaya untuk began wastra tradisional Indonesia —
            menghubungkan pengrajin lokal dengan pecinta budaya Nusantara.
          </p>

          <div className="flex gap-2 mt-1">
            {['IG', 'FB', 'TW', 'YT'].map((s) => (
              <button
                key={s}
                className="w-8 h-8 rounded-full bg-brand border-none text-white text-[10px] font-bold cursor-pointer transition-colors hover:bg-brand-light flex items-center justify-center"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-wrap sm:flex-nowrap justify-between gap-8">
          <FooterColumn
            title="WastraNusa"
            links={['Tentang Kami', 'Misi & Visi', 'Tim Kami', 'Karir', 'Blog']}
          />
          <FooterColumn
            title="Belanja"
            links={[
              'Semua Produk',
              'Batik',
              'Tenun & Songket',
              'Kebaya & Ulos',
              'Promo',
            ]}
          />
          <FooterColumn
            title="Ensiklopedia"
            links={[
              'Jelajahi Artikel',
              'Per Wilayah',
              'Per Topik',
              'Kontribusi',
              'Pengrajin',
            ]}
          />
          <FooterColumn
            title="Bantuan"
            links={[
              'Pusat Bantuan',
              'Cara Pemesanan',
              'Kebijakan Return',
              'Hubungi Kami',
              'FAQ',
            ]}
          />
        </div>
      </div>

      <div className="border-t border-brand pt-5 flex flex-col sm:flex-row justify-between items-center sm:items-start flex-wrap gap-4 text-center sm:text-left">
        <span className="text-[12px] text-[#a8b5a0]">
          © 2025 WastraNusa. Hak cipta dilindungi undang-undang.
        </span>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {['Syarat & Ketentuan', 'Kebijakan Privasi', 'Peta Situs'].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="text-[12px] text-[#a8b5a0] no-underline hover:text-white transition-colors"
              >
                {item}
              </a>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}
