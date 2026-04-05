import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  Filter,
  Heart,
  LayoutGrid,
  List,
  Search,
} from 'lucide-react';
import { Plus_Jakarta_Sans } from 'next/font/google';

import { HomepageFooter } from '../../components/navbar/footer';
import { HomepageHeader } from '../../components/navbar/header';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const stats = [
  { value: '380+', label: 'Total Artikel' },
  { value: '34', label: 'Provinsi Tercakup' },
  { value: '120+', label: 'Jenis Wastra' },
  { value: '80+', label: 'Pengrajin Terdokumentasi' },
];

const regionFilters = [
  { name: 'Semua Wilayah', count: 12, active: true },
  { name: 'Jawa', count: 4 },
  { name: 'Bali', count: 1 },
  { name: 'Sumatra', count: 4 },
  { name: 'Kalimantan', count: 1 },
  { name: 'Sulawesi', count: 0 },
  { name: 'Nusa Tenggara', count: 2 },
  { name: 'Maluku', count: 0 },
  { name: 'Papua', count: 0 },
];

const topics = [
  'Teknik Pembuatan',
  'Sejarah & Asal Usul',
  'Motif & Simbolisme',
  'Upacara Adat',
  'Pengrajin Lokal',
];

type EncyclopediaArticle = {
  region: string;
  topic: string;
  motifLabel: string;
  title: string;
  excerpt: string;
  likes: number;
  views: string;
  readMinutes?: number;
  featured?: boolean;
};

const articles: EncyclopediaArticle[] = [
  {
    region: 'Jawa',
    topic: 'Sejarah & Asal Usul',
    motifLabel: 'Batik',
    title: 'Sejarah Batik Jawa: Warisan Dunia UNESCO',
    excerpt:
      'Batik is a dyeing technique using wax resist. The term is also used to describe patterned textiles created with that technique. Batik is made by drawing or stamping wax on a cloth to prevent colour absorption during the ...',
    likes: 24,
    views: '2,100',
    readMinutes: 8,
    featured: true,
  },
  {
    region: 'Nusa Tenggara',
    topic: 'Teknik Pembuatan',
    motifLabel: 'Ikat',
    title: 'Tenun Ikat: Teknik Kuno dari Kepulauan Nusantara',
    excerpt:
      'Ikat is a dyeing technique from Southeast Asia used to pattern textiles that employs resist-dyeing on yarn before weaving.',
    likes: 6,
    views: '1,550',
  },
  {
    region: 'Sumatra',
    topic: 'Sejarah & Asal Usul',
    motifLabel: 'Ikat',
    title: 'Songket: Kain Kebesaran Kerajaan Melayu',
    excerpt:
      'Songket or sungkit is a tenun fabric that belongs to the brocade family of Indonesian-Malay textiles.',
    likes: 6,
    views: '1,240',
  },
  {
    region: 'Jawa',
    topic: 'Motif & Simbolisme',
    motifLabel: 'Ikat',
    title: 'Kebaya: Identitas Perempuan Nusantara',
    excerpt:
      'A kebaya is an upper garment traditionally worn by women in Southeast Asia with deep cultural symbolism.',
    likes: 5,
    views: '870',
  },
  {
    region: 'Sumatra',
    topic: 'Upacara Adat',
    motifLabel: 'Ulos',
    title: 'Ulos Batak: Kain Adat Penuh Makna Spiritual',
    excerpt:
      'Ulos is the traditional tenun fabric of the Batak people of North Sumatra in Indonesia and carries ritual meaning.',
    likes: 5,
    views: '870',
  },
  {
    region: 'Jawa',
    topic: 'Teknik Pembuatan',
    motifLabel: 'Lurik',
    title: 'Lurik: Kain Garis Penjaga Tradisi Jawa',
    excerpt:
      'Lurik cloth uses repetitive stripe patterns and has long been used for daily wear and traditional ceremonies.',
    likes: 5,
    views: '870',
  },
  {
    region: 'Bali',
    topic: 'Teknik Pembuatan',
    motifLabel: 'Gringsing',
    title: 'Gringsing Tenganan: Double Ikat Tersulit di Dunia',
    excerpt:
      'Canting is a pen-like tool used to apply liquid hot wax in the traditional native methods of textile making.',
    likes: 5,
    views: '870',
  },
  {
    region: 'Kalimantan',
    topic: 'Sejarah & Asal Usul',
    motifLabel: 'Indonesian textiles',
    title: 'Ragam Wastra Nusantara: dari Sabang sampai Merauke',
    excerpt:
      'Mengenal benang merah sejarah dan variasi wastra dari berbagai suku, wilayah, dan tradisi di Indonesia.',
    likes: 5,
    views: '870',
  },
  {
    region: 'Jawa',
    topic: 'Motif & Simbolisme',
    motifLabel: 'Batik',
    title: 'Filosofi Motif Batik Keraton Yogyakarta',
    excerpt:
      'Batik is a dyeing technique using wax resist. The term is also used to describe symbolic patterned textiles.',
    likes: 5,
    views: '870',
  },
  {
    region: 'Nusa Tenggara',
    topic: 'Motif & Simbolisme',
    motifLabel: 'Ikat',
    title: 'Tenun Sumba: Kosmologi dalam Helai Kain',
    excerpt:
      'Ikat is a dyeing technique from Southeast Asia used to pattern textiles that employs resistance methods.',
    likes: 5,
    views: '870',
  },
  {
    region: 'Sumatra',
    topic: 'Upacara Adat',
    motifLabel: 'Ikat',
    title: 'Upacara Mangulosi: Pemberian Ulos dalam Adat Batak',
    excerpt:
      'Ulos is the traditional tenun fabric of the Batak people of North Sumatra and central to sacred ceremonies.',
    likes: 5,
    views: '870',
  },
  {
    region: 'Sumatra',
    topic: 'Pengrajin Lokal',
    motifLabel: 'Ikat',
    title: 'Songket Minangkabau: Emas dalam Tenunan',
    excerpt:
      'Songket or sungkit is a tenun fabric that belongs to the brocade family of Indonesian-Malay textiles.',
    likes: 5,
    views: '870',
  },
];

const featuredArticle =
  articles.find((article) => article.featured) ?? articles[0];
const standardArticles = articles.filter((article) => !article.featured);

export default function HomepageUiPage() {
  return (
    <div
      className={`${plusJakartaSans.className} min-h-screen bg-[#f5f3ec] text-[#2d4f3f]`}
    >
      <HomepageHeader homeHref="/" />

      <main>
        <section className="mx-auto w-full max-w-[1320px] px-4 pb-4 pt-7 md:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <p className="text-sm font-medium text-[#6e8276]">
                Beranda › Ensiklopedia Budaya
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#2f5b49]">
                Ensiklopedia Budaya Wastra
              </h1>

              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#4d6759]">
                Jelajahi kekayaan pengetahuan wastra tradisional Indonesia dari
                teknik tenun hingga makna filosofi setiap motif kain.
              </p>
            </div>

            <div className="w-full self-start lg:justify-self-end">
              <div className="flex items-center overflow-hidden rounded-xl border border-[#ddd3c2] bg-[#f3ede2]">
                <Search className="ml-4 h-4 w-4 text-[#9f9a8d]" />
                <input
                  className="h-12 w-full bg-transparent px-3 text-sm text-[#445f50] placeholder:text-[#b2ad9f] focus:outline-none"
                  placeholder="Cari artikel ensiklopedia..."
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4 border-y border-[#d8d0c1] py-5 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl leading-none font-extrabold tracking-tight text-[#2f5b49]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-[#586f62]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[#d3cbbd] bg-[#e9e4d9] py-6">
          <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6 lg:px-8">
            <div className="grid gap-5 xl:grid-cols-[250px_minmax(0,1fr)]">
              <aside className="space-y-3">
                <article className="rounded-2xl border border-[#d4cbbc] bg-[#f7f3ea] p-4">
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#587061]">
                    <Filter className="h-4 w-4" />
                    Filter Wilayah
                  </h2>

                  <ul className="space-y-1.5">
                    {regionFilters.map((region) => (
                      <li key={region.name}>
                        <button
                          className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition ${
                            region.active
                              ? 'bg-[#2f5f49] text-[#eef3ea]'
                              : 'text-[#4c6457] hover:bg-[#ece5d8]'
                          }`}
                          type="button"
                        >
                          <span>{region.name}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs ${
                              region.active
                                ? 'bg-white/20 text-[#f4f7f1]'
                                : 'bg-[#e5decf] text-[#839386]'
                            }`}
                          >
                            {region.count}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-2xl border border-[#d4cbbc] bg-[#f7f3ea] p-4">
                  <h2 className="mb-3 text-sm font-bold text-[#587061]">
                    Topik
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        className="rounded-md border border-[#d8cfbf] bg-[#efeadf] px-2.5 py-1 text-xs font-semibold text-[#5d6f62] transition hover:bg-[#e4decf]"
                        type="button"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </article>

                <button
                  className="w-full rounded-xl border border-[#d4cbbc] bg-[#f7f3ea] px-4 py-2 text-sm font-bold text-[#5d6f62] transition hover:bg-[#eee8db]"
                  type="button"
                >
                  Reset Semua Filter
                </button>
              </aside>

              <div>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[#4e6659]">
                    Menampilkan 12 artikel
                  </p>

                  <div className="flex items-center gap-1.5 rounded-md bg-[#f7f3ea] p-1">
                    <button
                      className="grid h-7 w-7 place-items-center rounded bg-[#2f5f49] text-[#f2f6ee]"
                      type="button"
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                    </button>
                    <button
                      className="grid h-7 w-7 place-items-center rounded text-[#63786b] transition hover:bg-[#ede7da]"
                      type="button"
                    >
                      <List className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <article className="overflow-hidden rounded-2xl border border-[#d5ccbc] bg-[#faf8f2]">
                  <div className="grid md:grid-cols-[320px_minmax(0,1fr)]">
                    <div className="relative min-h-[185px] border-b border-dashed border-[#dacfbf] bg-[#ece1d0] md:min-h-[220px] md:border-b-0 md:border-r">
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="flex flex-col items-center gap-2 text-[#766a56]">
                          <span className="h-5 w-5 rotate-45 border border-[#ccbda4]" />
                          <span className="text-sm font-semibold">
                            {featuredArticle.motifLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
                        <span className="rounded bg-[#2f5f49] px-2 py-1 text-[#edf3e8]">
                          UNGGULAN
                        </span>
                        <span className="rounded bg-[#ece6d9] px-2 py-1 text-[#aea28f]">
                          {featuredArticle.region}
                        </span>
                        <span className="rounded bg-[#efe2d8] px-2 py-1 text-[#c17f61]">
                          {featuredArticle.topic}
                        </span>
                      </div>

                      <h2 className="mt-3 text-3xl leading-tight font-bold text-[#2f5b49]">
                        {featuredArticle.title}
                      </h2>

                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#4f6658]">
                        {featuredArticle.excerpt}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#a09382]">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" />
                          {featuredArticle.readMinutes} menit baca
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          {featuredArticle.views} ditonton
                        </span>
                        <span>{featuredArticle.topic}</span>
                      </div>

                      <button
                        className="mt-4 inline-flex items-center gap-1 rounded-xl border border-[#98ab9e] px-4 py-2 text-sm font-bold text-[#2f5f49] transition hover:bg-[#edf2ea]"
                        type="button"
                      >
                        Baca Selengkapnya
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {standardArticles.map((article) => (
                    <article
                      key={article.title}
                      className="overflow-hidden rounded-2xl border border-[#d8cfbf] bg-[#fbf8f2] shadow-sm"
                    >
                      <div className="relative h-44 border-b border-dashed border-[#ded3c1] bg-[#ece1d0]">
                        <div className="absolute inset-0 grid place-items-center">
                          <div className="flex flex-col items-center gap-2 text-[#726759]">
                            <span className="h-4 w-4 rotate-45 border border-[#ccbda4]" />
                            <span className="text-sm font-medium">
                              {article.motifLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex flex-wrap gap-1 text-[11px] font-semibold">
                          <span className="rounded bg-[#ece6d9] px-2 py-0.5 text-[#b5a996]">
                            {article.region}
                          </span>
                          <span className="rounded bg-[#efe2d8] px-2 py-0.5 text-[#c17f61]">
                            {article.topic}
                          </span>
                        </div>

                        <h3 className="mt-2 line-clamp-2 text-2xl leading-tight font-bold text-[#315746]">
                          {article.title}
                        </h3>

                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#566d60]">
                          {article.excerpt}
                        </p>

                        <div className="mt-4 flex items-center justify-between text-xs text-[#a29582]">
                          <span className="inline-flex items-center gap-1">
                            <Heart className="h-3.5 w-3.5" />
                            {article.likes}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            {article.views}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    className="grid h-8 w-8 place-items-center rounded border border-[#d6cdbc] bg-[#f7f3ea] text-[#6f7f73]"
                    type="button"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={`grid h-8 w-8 place-items-center rounded border text-sm font-semibold ${
                        page === 1
                          ? 'border-[#2f5f49] bg-[#2f5f49] text-[#eef3ea]'
                          : 'border-[#d6cdbc] bg-[#f7f3ea] text-[#53675a]'
                      }`}
                      type="button"
                    >
                      {page}
                    </button>
                  ))}

                  <span className="text-sm text-[#8f918a]">...</span>

                  <button
                    className="grid h-8 w-8 place-items-center rounded border border-[#d6cdbc] bg-[#f7f3ea] text-sm font-semibold text-[#53675a]"
                    type="button"
                  >
                    12
                  </button>

                  <button
                    className="grid h-8 w-8 place-items-center rounded border border-[#d6cdbc] bg-[#f7f3ea] text-[#6f7f73]"
                    type="button"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <HomepageFooter />
    </div>
  );
}
