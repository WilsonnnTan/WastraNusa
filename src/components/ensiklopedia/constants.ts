/**
 * Data constants for Encyclopedia page
 */
import type {
  EncyclopediaArticle,
  EncyclopediaArticleDetail,
  EncyclopediaKeyFact,
  EncyclopediaSection,
  RegionFilter,
  Stat,
} from '@/types/encyclopedia';

export const ENCYCLOPEDIA_STATS: Stat[] = [
  { value: '380+', label: 'Total Artikel' },
  { value: '34', label: 'Provinsi Tercakup' },
  { value: '120+', label: 'Jenis Wastra' },
  { value: '80+', label: 'Pengrajin Terdokumentasi' },
];

export const REGION_FILTERS: RegionFilter[] = [
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

export const ENCYCLOPEDIA_TOPICS: string[] = [
  'Teknik Pembuatan',
  'Sejarah & Asal Usul',
  'Motif & Simbolisme',
  'Upacara Adat',
  'Pengrajin Lokal',
];

export const ENCYCLOPEDIA_ARTICLES: EncyclopediaArticle[] = [
  {
    slug: 'sejarah-batik-jawa-warisan-dunia-unesco',
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
    slug: 'tenun-ikat-teknik-kuno-dari-kepulauan-nusantara',
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
    slug: 'songket-kain-kebesaran-kerajaan-melayu',
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
    slug: 'kebaya-identitas-perempuan-nusantara',
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
    slug: 'ulos-batak-kain-adat-penuh-makna-spiritual',
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
    slug: 'lurik-kain-garis-penjaga-tradisi-jawa',
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
    slug: 'gringsing-tenganan-double-ikat-tersulit-di-dunia',
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
    slug: 'ragam-wastra-nusantara-dari-sabang-sampai-merauke',
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
    slug: 'filosofi-motif-batik-keraton-yogyakarta',
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
    slug: 'tenun-sumba-kosmologi-dalam-helai-kain',
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
    slug: 'upacara-mangulosi-pemberian-ulos-dalam-adat-batak',
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
    slug: 'songket-minangkabau-emas-dalam-tenunan',
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

const DEFAULT_REFERENCES = [
  '[1] Wikipedia - Batik',
  '[2] Direktorat Warisan dan Diplomasi Budaya, Kemendikbud RI',
  '[3] Dekranasda Provinsi Jawa Tengah',
];

const buildDefaultSections = (
  article: EncyclopediaArticle,
): EncyclopediaSection[] => [
  {
    title: `Asal Usul ${article.motifLabel}`,
    content:
      `${article.motifLabel} memiliki jejak sejarah panjang dalam tradisi wastra Indonesia. ` +
      `Di banyak wilayah, kain ini berkembang dari fungsi ritual menjadi identitas budaya ` +
      `yang diwariskan lintas generasi melalui praktik menenun, membatik, atau menyungkit.`,
  },
  {
    title: `Makna dan Nilai Budaya ${article.motifLabel}`,
    content:
      `Setiap pola, warna, dan teknik pada ${article.motifLabel} memuat nilai sosial serta filosofi ` +
      `lokal. Dalam konteks adat, kain tidak sekadar benda pakai, tetapi juga simbol status, ` +
      `doa, dan penghormatan pada leluhur.`,
  },
  {
    title: `Tantangan Pelestarian ${article.motifLabel}`,
    content:
      `Perubahan pasar dan regenerasi pengrajin menjadi tantangan utama. Upaya dokumentasi, ` +
      `kolaborasi desain, dan edukasi publik menjadi strategi penting agar wastra tetap relevan ` +
      `tanpa kehilangan nilai tradisinya.`,
  },
];

const buildDefaultKeyFacts = (
  article: EncyclopediaArticle,
): EncyclopediaKeyFact[] => [
  { label: 'Wilayah Utama', value: article.region },
  { label: 'Kategori', value: article.topic },
  { label: 'Jenis Wastra', value: article.motifLabel },
  { label: 'Durasi Baca', value: `${article.readMinutes ?? 6} menit` },
  { label: 'Dilihat', value: `${article.views} kali` },
  { label: 'Disukai', value: `${article.likes} pengguna` },
];

const DETAIL_OVERRIDES: Partial<
  Record<string, Partial<EncyclopediaArticleDetail>>
> = {
  'sejarah-batik-jawa-warisan-dunia-unesco': {
    author: 'Admin',
    publishedAt: '10 Mar 2025',
    tags: ['Batik', 'UNESCO', 'Jawa', 'Sejarah', 'Keraton'],
    quote:
      'Batik adalah teknik seni pewarnaan kain menggunakan malam sebagai perintang warna. Pada 2 Oktober 2009, UNESCO menetapkan Batik Indonesia sebagai Warisan Budaya Takbenda Kemanusiaan.',
    intro:
      'Batik is a dyeing technique using wax resist. The term is also used to describe patterned textiles created with that technique. Batik is made by drawing or stamping wax on a cloth to prevent colour absorption during the dyeing process.',
    sections: [
      {
        title: 'Asal Usul Batik di Nusantara',
        content:
          'Sejarah batik di Indonesia dapat ditelusuri hingga abad ke-12 pada masa Kerajaan Mataram Hindu. Batik yang kita kenal sekarang berkembang pesat pada era Kesultanan Mataram Islam abad ke-17 di lingkungan keraton Surakarta dan Yogyakarta.',
        imageLabel: 'Batik',
        imageCaption: 'Gambar: Batik - sumber Wikipedia / Wikimedia Commons',
      },
      {
        title: 'Filosofi Motif dan Makna Simbolis',
        content:
          'Setiap motif batik keraton menyimpan makna filosofis yang dalam. Motif Kawung melambangkan kemurnian dan harapan. Motif Parang Rusak melambangkan kekuatan ksatria. Filosofi Jawa yang kaya tercuang dalam setiap garis dan titik kain batik.',
      },
      {
        title: 'Perbedaan Batik Tulis, Cap, dan Printing',
        content:
          'Batik tulis adalah yang paling tinggi nilainya karena dibuat manual menggunakan canting. Batik cap menggunakan cap tembaga sehingga produksi lebih cepat namun tetap autentik. Batik printing menggunakan teknik cetak industri untuk produksi massal.',
      },
      {
        title: 'Batik di Era Modern dan Diplomasi Budaya',
        content:
          'Pada era modern, batik digunakan sebagai busana formal nasional hingga koleksi mode kontemporer. Tren ini diperkuat diplomasi budaya Indonesia di forum internasional dan ajang fashion global.',
        imageLabel: 'Batik',
        imageCaption: 'Gambar: Batik - sumber Wikipedia / Wikimedia Commons',
      },
      {
        title: 'Tantangan Pelestarian dan Peluang Masa Depan',
        content:
          'Regenerasi pengrajin, kenaikan bahan baku, dan kompetisi produk murah menjadi tantangan utama. Namun teknologi digital membuka peluang baru: platform marketplace, workshop daring, serta dokumentasi karya berbasis arsip terbuka.',
      },
    ],
    keyFacts: [
      { label: 'Ditetapkan UNESCO', value: '2 Oktober 2009' },
      { label: 'Asal Tertua', value: 'Kerajaan Mataram, abad ke-12' },
      { label: 'Pusat Produksi', value: 'Solo, Yogyakarta, Pekalongan' },
      { label: 'Jumlah Pengrajin', value: '± 50.000 pengrajin aktif' },
      { label: 'Nilai Ekspor', value: 'Rp 1,2 triliun/tahun' },
      { label: 'Teknik Utama', value: 'Tulis, Cap, Printing' },
    ],
    relatedProducts: [
      {
        name: 'Batik Tulis Kawung',
        location: 'Solo, Jawa Tengah',
        price: 'Rp 350.000',
      },
      {
        name: 'Batik Cap Mega Mendung',
        location: 'Cirebon, Jawa Barat',
        price: 'Rp 250.000',
      },
    ],
    discussionCount: 8,
    references: [
      '[1] Wikipedia - Batik (en.wikipedia.org)',
      '[2] Direktorat Warisan dan Diplomasi Budaya, Kemendikbud RI',
      '[3] Dekranasda Provinsi Jawa Tengah',
      '[4] Jurnal Wastra Nusantara, Vol. 12, 2024',
      '[5] Dr. Nadia Kusumawardhani - Laporan Penelitian Lapangan 2023',
    ],
  },
};

export const getEncyclopediaArticleBySlug = (slug: string) =>
  ENCYCLOPEDIA_ARTICLES.find((article) => article.slug === slug) ?? null;

export const getEncyclopediaArticleDetail = (
  slug: string,
): EncyclopediaArticleDetail | null => {
  const articleIndex = ENCYCLOPEDIA_ARTICLES.findIndex(
    (article) => article.slug === slug,
  );

  if (articleIndex === -1) {
    return null;
  }

  const article = ENCYCLOPEDIA_ARTICLES[articleIndex];
  const nextArticle =
    ENCYCLOPEDIA_ARTICLES[(articleIndex + 1) % ENCYCLOPEDIA_ARTICLES.length];
  const override = DETAIL_OVERRIDES[slug] ?? {};

  return {
    ...article,
    author: override.author ?? 'Admin',
    publishedAt: override.publishedAt ?? '10 Mar 2025',
    tags: override.tags ?? [article.motifLabel, article.region, article.topic],
    quote:
      override.quote ??
      `${article.motifLabel} merepresentasikan warisan budaya yang hidup melalui teknik, simbol, dan praktik sosial masyarakat Indonesia.`,
    intro: override.intro ?? article.excerpt,
    sections: override.sections ?? buildDefaultSections(article),
    keyFacts: override.keyFacts ?? buildDefaultKeyFacts(article),
    relatedProducts: override.relatedProducts ?? [
      {
        name: 'Batik Tulis Kawung',
        location: 'Solo, Jawa Tengah',
        price: 'Rp 350.000',
      },
      {
        name: 'Tenun Ikat Flores',
        location: 'Flores, NTT',
        price: 'Rp 580.000',
      },
    ],
    discussionCount: override.discussionCount ?? 8,
    nextArticle: override.nextArticle ?? {
      slug: nextArticle.slug,
      title: nextArticle.title,
    },
    references: override.references ?? DEFAULT_REFERENCES,
  };
};
