import { ChevronRight, Heart, Search, Star } from 'lucide-react';
import { Plus_Jakarta_Sans } from 'next/font/google';

import { HomepageFooter } from '../components/navbar/footer';
import { HomepageHeader } from '../components/navbar/header';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const categories = [
  'Batik',
  'Tenun Ikat',
  'Songket',
  'Kebaya',
  'Ulos',
  'Lurik',
  'Endek',
  'Gringsing',
];

const sortOptions = ['Terpopuler', 'Terbaru', 'Harga ↑', 'Rating'];

const products = [
  {
    material: 'Batik',
    city: 'Solo, Jawa Tengah',
    name: 'Batik Tulis Kawung',
    reviews: 128,
    price: 'Rp 350.000',
    oldPrice: 'Rp 420.000',
    stock: 48,
  },
  {
    material: 'Tenun',
    city: 'Flores, NTT',
    name: 'Tenun Ikat Flores',
    reviews: 64,
    price: 'Rp 580.000',
    oldPrice: null,
    stock: 24,
    badge: 'BARU',
  },
  {
    material: 'Tenun',
    city: 'Palembang, Sumatera Selatan',
    name: 'Songket Palembang Tradisional',
    reviews: 64,
    price: 'Rp 1.200.000',
    oldPrice: null,
    stock: 24,
  },
  {
    material: 'Kebaya',
    city: 'Yogyakarta',
    name: 'Kebaya Kutubaru Klasik',
    reviews: 64,
    price: 'Rp 280.000',
    oldPrice: null,
    stock: 24,
  },
  {
    material: 'Ulos',
    city: 'Samosir, Sumatera Utara',
    name: 'Ulos Batak Ragi Hotang',
    reviews: 33,
    price: 'Rp 420.000',
    oldPrice: 'Rp 480.000',
    stock: 20,
  },
  {
    material: 'Lurik',
    city: 'Yogyakarta',
    name: 'Kain Lurik Jogja Klasik',
    reviews: 112,
    price: 'Rp 180.000',
    oldPrice: null,
    stock: 60,
  },
  {
    material: 'Tenun',
    city: 'Tenganan, Bali',
    name: 'Kain Gringsing Tenganan',
    reviews: 18,
    price: 'Rp 2.500.000',
    oldPrice: null,
    stock: 5,
  },
  {
    material: 'Batik',
    city: 'Cirebon, Jawa Barat',
    name: 'Batik Cap Mega Mendung Cirebon',
    reviews: 96,
    price: 'Rp 250.000',
    oldPrice: 'Rp 320.000',
    stock: 38,
  },
];

const latestArticles = [
  {
    category: 'Ikat',
    title: 'Tenun Ikat: Teknik Kuno dari Kepulauan Nusantara',
    meta: 'NTT • 6 mnt',
    thumbClass:
      'bg-[radial-gradient(circle_at_35%_35%,#f8ead2_0%,#d6b791_60%,#8a6e4d_100%)]',
  },
  {
    category: 'Songket',
    title: 'Songket: Kain Kebesaran Kerajaan Melayu',
    meta: 'Sumatra • 7 mnt',
    thumbClass:
      'bg-[radial-gradient(circle_at_35%_30%,#dfc0a4_0%,#9e7559_42%,#5a3a2f_100%)]',
  },
  {
    category: 'Kebaya',
    title: 'Kebaya: Identitas Perempuan Nusantara',
    meta: 'Jawa • 5 mnt',
    thumbClass:
      'bg-[radial-gradient(circle_at_35%_30%,#e4c7af_0%,#ad8264_50%,#5f4739_100%)]',
  },
];

const regionCards = [
  {
    region: 'Jawa & Bali',
    style: 'Batik',
    count: '82 artikel',
    bgClass:
      'bg-[radial-gradient(circle_at_80%_15%,rgba(243,222,170,.45)_0%,rgba(0,0,0,0)_40%),linear-gradient(165deg,#d4bb8f_0%,#8f7a5d_52%,#4a433f_100%)]',
  },
  {
    region: 'Sumatra',
    style: 'Ulos',
    count: '54 artikel',
    bgClass:
      'bg-[radial-gradient(circle_at_80%_15%,rgba(255,230,194,.4)_0%,rgba(0,0,0,0)_42%),linear-gradient(165deg,#cfb79a_0%,#8b7966_52%,#4c473f_100%)]',
  },
  {
    region: 'Kalimantan',
    style: 'Indonesian textiles',
    count: '31 artikel',
    bgClass:
      'bg-[radial-gradient(circle_at_80%_15%,rgba(255,233,194,.35)_0%,rgba(0,0,0,0)_43%),linear-gradient(165deg,#cfbc9f_0%,#857865_52%,#48443f_100%)]',
  },
  {
    region: 'Sulawesi',
    style: 'Ikat',
    count: '27 artikel',
    bgClass:
      'bg-[radial-gradient(circle_at_80%_15%,rgba(245,225,188,.4)_0%,rgba(0,0,0,0)_43%),linear-gradient(165deg,#cdb89d_0%,#827561_52%,#47413c_100%)]',
  },
  {
    region: 'Papua & NTT',
    style: 'Gringsing',
    count: '19 artikel',
    bgClass:
      'bg-[radial-gradient(circle_at_80%_15%,rgba(242,220,180,.4)_0%,rgba(0,0,0,0)_43%),linear-gradient(165deg,#cab598_0%,#7f705e_52%,#443f3b_100%)]',
  },
];

export default function HomePage() {
  return (
    <div
      className={`${plusJakartaSans.className} min-h-screen bg-[#f5f1e8] text-[#2b4d3c]`}
    >
      <HomepageHeader homeHref="/" />

      <main className="pb-16">
        <section className="mx-auto w-full max-w-[1320px] px-4 pt-8 md:px-6 lg:px-8">
          <div className="grid animate-in gap-4 fade-in duration-700 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article className="relative min-h-[420px] overflow-hidden rounded-2xl border border-[#ddd5c6] bg-[#17130f] text-[#f7f3ea] shadow-[0_20px_44px_-30px_rgba(22,19,15,0.85)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_60%,rgba(190,140,56,0.66),rgba(31,26,20,0.05)_38%,transparent_70%),linear-gradient(132deg,#02040d_0%,#0e1019_42%,#51371d_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/25" />

              <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                <span className="mb-3 inline-flex w-fit items-center rounded-lg border border-white/25 bg-black/35 px-3 py-1 text-xs font-semibold text-[#ddd7ce] backdrop-blur">
                  Kain Kebesaran Kerajaan
                </span>

                <h1 className="max-w-xl text-4xl font-bold leading-[1.15] tracking-tight text-[#f7f2e7] md:text-[46px]">
                  Songket Palembang
                  <br />
                  Emas dalam Tenunan
                </h1>

                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#d5cec0]">
                  Songket adalah kain mewah berbenang emas atau perak, simbol
                  kejayaan kerajaan Melayu dan Minangkabau.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    className="rounded-xl bg-[#d7ccb7] px-5 py-2.5 text-sm font-bold text-[#2c503f] transition hover:bg-[#e4dccb]"
                    type="button"
                  >
                    Lihat Songket
                  </button>
                  <a
                    className="rounded-xl border border-[#c7b59b] bg-white/10 px-5 py-2.5 text-sm font-semibold text-[#f8f3e9] transition hover:bg-white/15"
                    href="/ensiklopedia"
                  >
                    Jelajahi Ensiklopedia
                  </a>
                </div>
              </div>

              <span className="absolute right-4 top-4 rounded-md bg-black/40 px-2.5 py-1 text-xs font-semibold text-[#e8e2d5]">
                4 / 4
              </span>
              <button
                className="absolute right-5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/12 text-[#efe9db] backdrop-blur transition hover:bg-white/20"
                type="button"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute bottom-5 right-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white/55" />
                <span className="h-2 w-2 rounded-full bg-white/85" />
                <span className="h-2 w-7 rounded-full bg-white" />
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <article className="group relative overflow-hidden rounded-2xl border border-[#ddd5c6] bg-[#5a453a] shadow-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_24%,rgba(255,227,204,.35)_0%,rgba(0,0,0,0)_40%),linear-gradient(135deg,#896457_0%,#5a4137_58%,#3b2d27_100%)] transition duration-500 group-hover:scale-105" />
                <div className="relative flex min-h-[200px] items-end p-4">
                  <div>
                    <p className="text-lg font-semibold leading-tight text-[#f6eee1]">
                      Koleksi Songket
                    </p>
                    <p className="text-sm text-[#d5cab9]">
                      Kain Kebesaran Nusantara
                    </p>
                  </div>
                </div>
              </article>

              <article className="group relative overflow-hidden rounded-2xl border border-[#ddd5c6] bg-[#575150] shadow-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_28%,rgba(233,235,236,.4)_0%,rgba(0,0,0,0)_36%),linear-gradient(135deg,#7e6f67_0%,#5b514d_58%,#393230_100%)] transition duration-500 group-hover:scale-105" />
                <div className="relative flex min-h-[200px] items-end p-4">
                  <div>
                    <p className="text-lg font-semibold leading-tight text-[#f6eee1]">
                      Kebaya Modern
                    </p>
                    <p className="text-sm text-[#d5cab9]">Anggun & Elegan</p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2.5 text-sm">
            <span className="mr-1 text-[#617567]">Kategori:</span>
            {categories.map((category) => (
              <button
                key={category}
                className="rounded-full border border-[#d7d1c3] bg-[#f3efe6] px-3.5 py-1.5 text-xs font-semibold text-[#627668] transition hover:border-[#95aa9a] hover:text-[#2d5f48]"
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10 border-y border-[#dfd8ca] bg-[#f6f3eb] py-10">
          <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6 lg:px-8">
            <span className="inline-flex rounded-lg border border-[#e1d8c8] bg-[#f3ecdd] px-3 py-1 text-xs font-semibold text-[#9f8d72]">
              Produk Terbaru
            </span>

            <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-[#2b4d3c] sm:text-4xl">
                  Produk Pilihan Pengrajin Nusantara
                </h2>
                <p className="mt-2 text-base text-[#5f7366]">
                  Koleksi wastra autentik dari pengrajin terbaik Indonesia
                </p>
              </div>

              <button
                className="inline-flex items-center gap-1 rounded-xl border border-[#89a38f] px-4 py-2 text-sm font-semibold text-[#2f5f48] transition hover:bg-[#edf3eb]"
                type="button"
              >
                Lihat Semua
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2.5 text-sm">
              <span className="text-[#5f7366]">Urutkan:</span>
              {sortOptions.map((option, index) => (
                <button
                  key={option}
                  className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
                    index === 0
                      ? 'border-[#2d5f48] bg-[#2d5f48] text-[#ecf1e8]'
                      : 'border-[#dad2c4] bg-[#f8f4ec] text-[#4f6658] hover:border-[#a9baa8]'
                  }`}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((product, index) => (
                <article
                  key={product.name}
                  className="group overflow-hidden rounded-2xl border border-[#e5ddcf] bg-[#fbf8f2] shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_14px_28px_-20px_rgba(35,56,44,0.7)] active:translate-y-0 active:shadow-sm"
                  style={{ animationDelay: `${index * 55}ms` }}
                >
                  <div className="relative h-56 border-b border-dashed border-[#dfd5c2] bg-[radial-gradient(circle_at_50%_24%,rgba(253,247,236,0.9)_0%,rgba(233,224,209,0.75)_58%,rgba(225,214,196,0.9)_100%)]">
                    <span className="absolute left-3 top-3 rounded-md border border-[#e4dbc8] bg-[#f8f2e6] px-2 py-0.5 text-[11px] font-semibold text-[#b7a381]">
                      {product.material}
                    </span>

                    {product.badge ? (
                      <span className="absolute left-3 top-10 rounded-md bg-[#2d5f48] px-2 py-1 text-[11px] font-bold text-[#e9f1e7]">
                        {product.badge}
                      </span>
                    ) : null}

                    <button
                      className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-[#e0d5bf] bg-white/85 text-[#8c8477] transition hover:text-[#2d5f48]"
                      type="button"
                    >
                      <Heart className="h-3.5 w-3.5" />
                    </button>

                    <div className="absolute inset-0 grid place-items-center">
                      <div className="flex flex-col items-center gap-3 text-[#9b8d74]">
                        <span className="h-4 w-4 rotate-45 border border-[#d4c6ab]" />
                        <span className="text-sm font-medium text-[#6f6658]">
                          {product.material}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 p-4">
                    <p className="text-xs text-[#b3aa98]">{product.city}</p>
                    <h3 className="line-clamp-2 text-lg font-bold leading-tight text-[#335545]">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={`${product.name}-${starIndex}`}
                          className={`h-3.5 w-3.5 ${
                            starIndex < 4
                              ? 'fill-[#d9b868] text-[#d9b868]'
                              : 'fill-[#e6dcc7] text-[#e6dcc7]'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs font-medium text-[#6f756a]">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="mt-2 flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-extrabold tracking-tight text-[#2d5f48]">
                          {product.price}
                        </p>
                        {product.oldPrice ? (
                          <p className="text-sm font-semibold text-[#8c887e] line-through">
                            {product.oldPrice}
                          </p>
                        ) : null}
                      </div>
                      <span className="text-sm font-semibold text-[#536d5f]">
                        Stok: {product.stock}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 w-full max-w-[1320px] px-4 md:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-[#2f5e48] text-[#edf3e8] shadow-[0_30px_50px_-35px_rgba(15,41,28,0.85)]">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="p-6 md:p-10">
                <span className="inline-flex rounded-lg border border-white/20 bg-white/7 px-3 py-1 text-xs font-semibold text-[#d8e2d4]">
                  Ensiklopedia Budaya
                </span>

                <h3 className="mt-4 text-4xl font-bold tracking-tight text-[#f2f8ee]">
                  Jelajahi Kekayaan Wastra Nusantara
                </h3>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#bed0c4]">
                  Batik is a dyeing technique using wax resist. The term is also
                  used to describe patterned textiles created with that
                  technique. Batik is made by drawing or stamping wax on a cloth
                  ...
                </p>

                <div className="mt-7 flex max-w-xl items-center overflow-hidden rounded-xl border border-white/15 bg-[#254d3a]">
                  <Search className="ml-4 h-4 w-4 text-[#b7cdbf]" />
                  <input
                    className="h-12 w-full bg-transparent px-3 text-sm text-[#ebf3e7] placeholder:text-[#95b19f] focus:outline-none"
                    placeholder="Cari artikel budaya, motif, atau provinsi..."
                    type="text"
                  />
                  <a
                    className="inline-flex h-12 items-center bg-[#d5c8b3] px-6 text-sm font-bold text-[#2d5f48] transition hover:bg-[#e6dccc]"
                    href="/ensiklopedia"
                  >
                    Cari
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[#b1c4b5]">Populer:</span>
                  {[
                    'Batik Kawung',
                    'Tenun Flores',
                    'Songket Palembang',
                    'Ulos Batak',
                    'Gringsing Bali',
                  ].map((tag) => (
                    <button
                      key={tag}
                      className="rounded-full border border-white/18 bg-white/8 px-3 py-1.5 font-semibold text-[#d2dfd2] transition hover:bg-white/14"
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <aside className="border-t border-white/12 bg-[#2a5541] p-6 md:p-8 lg:border-l lg:border-t-0">
                <h4 className="text-2xl font-bold tracking-tight text-[#f0f7eb]">
                  Artikel Terkini
                </h4>

                <div className="mt-6 space-y-3">
                  {latestArticles.map((article) => (
                    <article
                      key={article.title}
                      className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/7 p-3.5 transition hover:bg-white/11"
                    >
                      <div
                        className={`${article.thumbClass} grid h-14 w-14 shrink-0 place-items-center rounded-lg border border-white/10`}
                      >
                        <span className="h-4 w-4 rotate-45 border border-white/55" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold leading-snug text-[#e9f2e5]">
                          {article.title}
                        </p>
                        <p className="mt-1 text-xs text-[#adc0b3]">
                          {article.meta}
                        </p>
                        <span className="mt-2 inline-flex rounded-md bg-white/12 px-2 py-0.5 text-[11px] font-semibold text-[#dbe5d8]">
                          {article.category}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>

                <a
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#d4e1d2] transition hover:text-white"
                  href="/ensiklopedia"
                >
                  Lihat semua artikel
                  <ChevronRight className="h-4 w-4" />
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-[1320px] px-4 md:px-6 lg:px-8">
          <span className="inline-flex rounded-lg border border-[#e4dac8] bg-[#f3ecdd] px-3 py-1 text-xs font-semibold text-[#b09c80]">
            Jelajahi Wilayah
          </span>

          <h3 className="mt-3 text-4xl font-bold tracking-tight text-[#2d5f48]">
            Wastra dari Seluruh Nusantara
          </h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {regionCards.map((card) => (
              <article
                key={card.region}
                className="group relative overflow-hidden rounded-2xl border border-[#ddd4c6]"
              >
                <div
                  className={`${card.bgClass} absolute inset-0 transition duration-500 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                <div className="relative flex min-h-[188px] flex-col justify-end p-4 text-[#f6f2e8]">
                  <span className="mb-2 inline-flex h-4 w-4 rotate-45 border border-[#e9dec8]" />
                  <p className="text-sm text-[#e5dcca]">{card.style}</p>
                  <p className="mt-2 text-2xl font-bold leading-tight">
                    {card.region}
                  </p>
                  <p className="text-sm text-[#d3ccb8]">{card.count}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <HomepageFooter />
    </div>
  );
}
