import prisma from '../../src/lib/prisma';
import { SEED_ADMIN_USER } from './user.seed';

type SeedSection = {
  title: string;
  content: string;
  imageLabel?: string;
  imageCaption?: string;
};

type SeedArticle = {
  id: string;
  slug: string;
  region: string;
  topic: string;
  motifLabel: string;
  title: string;
  excerpt: string;
  description?: string;
  summary?: string;
  readMinutes?: number;
  featured?: boolean;
  province?: string;
  island?: string;
  clothingType?: string;
  gender?: 'male' | 'female';
  status: 'draft' | 'published' | 'archived';
  likes: number;
  views: string;
  sections: SeedSection[];
};

async function getUserIdByEmail(email: string): Promise<string> {
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) throw new Error(`Seed user not found: ${email}`);
  return user.id;
}

const parseViewCount = (views: string) => Number(views.replace(/,/g, ''));

const buildDefaultSections = (article: {
  motifLabel: string;
}): SeedSection[] => [
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

export const SEED_ARTICLE_1 = {
  id: 'b0000000-0000-0000-0000-000000000001',
  slug: 'sejarah-batik-jawa-warisan-dunia-unesco',
  region: 'Jawa',
  topic: 'Sejarah & Asal Usul',
  motifLabel: 'Batik',
  title: 'Sejarah Batik Jawa: Warisan Dunia UNESCO',
  excerpt:
    'Batik is a dyeing technique using wax resist. The term is also used to describe patterned textiles created with that technique. Batik is made by drawing or stamping wax on a cloth to prevent colour absorption during the ...',
  readMinutes: 8,
  featured: true,
  province: 'Jawa Tengah',
  island: 'Jawa',
  clothingType: 'Batik',
  gender: 'female' as const,
  description:
    'Batik adalah teknik seni pewarnaan kain menggunakan malam sebagai perintang warna yang menjadi warisan budaya penting di Indonesia.',
  summary:
    'Batik is a dyeing technique using wax resist. The term is also used to describe patterned textiles created with that technique.',
  likes: 24,
  views: '2,100',
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
  status: 'published' as const,
};

export const SEED_ARTICLE_2 = {
  id: 'b0000000-0000-0000-0000-000000000002',
  slug: 'tenun-ikat-teknik-kuno-dari-kepulauan-nusantara',
  region: 'Nusa Tenggara',
  topic: 'Teknik Pembuatan',
  motifLabel: 'Ikat',
  title: 'Tenun Ikat: Teknik Kuno dari Kepulauan Nusantara',
  excerpt:
    'Ikat is a dyeing technique from Southeast Asia used to pattern textiles that employs resist-dyeing on yarn before weaving.',
  province: 'Nusa Tenggara Timur',
  island: 'Nusa Tenggara',
  clothingType: 'Ikat',
  gender: 'female' as const,
  description:
    'Tenun ikat menggunakan teknik pewarnaan benang sebelum proses menenun untuk menghasilkan pola yang kaya makna.',
  summary:
    'Ikat is a dyeing technique from Southeast Asia used to pattern textiles that employs resist-dyeing on yarn before weaving.',
  likes: 6,
  views: '1,550',
  sections: buildDefaultSections({ motifLabel: 'Ikat' }),
  status: 'published' as const,
};

export const SEED_ARTICLE_3 = {
  id: 'b0000000-0000-0000-0000-000000000003',
  slug: 'songket-kain-kebesaran-kerajaan-melayu',
  region: 'Sumatra',
  topic: 'Sejarah & Asal Usul',
  motifLabel: 'Ikat',
  title: 'Songket: Kain Kebesaran Kerajaan Melayu',
  excerpt:
    'Songket or sungkit is a tenun fabric that belongs to the brocade family of Indonesian-Malay textiles.',
  description:
    'Songket merupakan kain tenun berhias benang emas atau perak yang lekat dengan tradisi kerajaan Melayu.',
  summary:
    'Songket or sungkit is a tenun fabric that belongs to the brocade family of Indonesian-Malay textiles.',
  likes: 6,
  views: '1,240',
  sections: buildDefaultSections({ motifLabel: 'Ikat' }),
  status: 'published' as const,
};

const encyclopediaArticles: SeedArticle[] = [
  SEED_ARTICLE_1,
  SEED_ARTICLE_2,
  SEED_ARTICLE_3,
  {
    id: 'b0000000-0000-0000-0000-000000000004',
    slug: 'kebaya-identitas-perempuan-nusantara',
    region: 'Jawa',
    topic: 'Motif & Simbolisme',
    motifLabel: 'Ikat',
    title: 'Kebaya: Identitas Perempuan Nusantara',
    excerpt:
      'A kebaya is an upper garment traditionally worn by women in Southeast Asia with deep cultural symbolism.',
    description:
      'Kebaya adalah busana tradisional perempuan Nusantara yang mengandung identitas sosial dan simbol budaya.',
    summary:
      'A kebaya is an upper garment traditionally worn by women in Southeast Asia with deep cultural symbolism.',
    likes: 5,
    views: '870',
    sections: buildDefaultSections({ motifLabel: 'Ikat' }),
    status: 'published' as const,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000005',
    slug: 'ulos-batak-kain-adat-penuh-makna-spiritual',
    region: 'Sumatra',
    topic: 'Upacara Adat',
    motifLabel: 'Ulos',
    title: 'Ulos Batak: Kain Adat Penuh Makna Spiritual',
    excerpt:
      'Ulos is the traditional tenun fabric of the Batak people of North Sumatra in Indonesia and carries ritual meaning.',
    description:
      'Ulos memegang peran penting dalam ritus adat Batak sebagai simbol doa, berkat, dan kedekatan keluarga.',
    summary:
      'Ulos is the traditional tenun fabric of the Batak people of North Sumatra in Indonesia and carries ritual meaning.',
    likes: 5,
    views: '870',
    sections: buildDefaultSections({ motifLabel: 'Ulos' }),
    status: 'published' as const,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000006',
    slug: 'lurik-kain-garis-penjaga-tradisi-jawa',
    region: 'Jawa',
    topic: 'Teknik Pembuatan',
    motifLabel: 'Lurik',
    title: 'Lurik: Kain Garis Penjaga Tradisi Jawa',
    excerpt:
      'Lurik cloth uses repetitive stripe patterns and has long been used for daily wear and traditional ceremonies.',
    description:
      'Lurik dikenal lewat pola garis sederhana yang menyimpan filosofi hidup masyarakat Jawa.',
    summary:
      'Lurik cloth uses repetitive stripe patterns and has long been used for daily wear and traditional ceremonies.',
    likes: 5,
    views: '870',
    sections: buildDefaultSections({ motifLabel: 'Lurik' }),
    status: 'published' as const,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000007',
    slug: 'gringsing-tenganan-double-ikat-tersulit-di-dunia',
    region: 'Bali',
    topic: 'Teknik Pembuatan',
    motifLabel: 'Gringsing',
    title: 'Gringsing Tenganan: Double Ikat Tersulit di Dunia',
    excerpt:
      'Canting is a pen-like tool used to apply liquid hot wax in the traditional native methods of textile making.',
    description:
      'Gringsing dari Tenganan dikenal sebagai kain double ikat yang rumit dan langka dalam tradisi Bali Aga.',
    summary:
      'Canting is a pen-like tool used to apply liquid hot wax in the traditional native methods of textile making.',
    likes: 5,
    views: '870',
    sections: buildDefaultSections({ motifLabel: 'Gringsing' }),
    status: 'published' as const,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000008',
    slug: 'ragam-wastra-nusantara-dari-sabang-sampai-merauke',
    region: 'Kalimantan',
    topic: 'Sejarah & Asal Usul',
    motifLabel: 'Indonesian textiles',
    title: 'Ragam Wastra Nusantara: dari Sabang sampai Merauke',
    excerpt:
      'Mengenal benang merah sejarah dan variasi wastra dari berbagai suku, wilayah, dan tradisi di Indonesia.',
    description:
      'Artikel pengantar tentang keragaman wastra Indonesia dari berbagai daerah dan tradisi lokal.',
    summary:
      'Mengenal benang merah sejarah dan variasi wastra dari berbagai suku, wilayah, dan tradisi di Indonesia.',
    likes: 5,
    views: '870',
    sections: buildDefaultSections({ motifLabel: 'Indonesian textiles' }),
    status: 'published' as const,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000009',
    slug: 'filosofi-motif-batik-keraton-yogyakarta',
    region: 'Jawa',
    topic: 'Motif & Simbolisme',
    motifLabel: 'Batik',
    title: 'Filosofi Motif Batik Keraton Yogyakarta',
    excerpt:
      'Batik is a dyeing technique using wax resist. The term is also used to describe symbolic patterned textiles.',
    description:
      'Motif batik keraton Yogyakarta menyimpan simbol kepemimpinan, harmoni, dan pandangan hidup Jawa.',
    summary:
      'Batik is a dyeing technique using wax resist. The term is also used to describe symbolic patterned textiles.',
    likes: 5,
    views: '870',
    sections: buildDefaultSections({ motifLabel: 'Batik' }),
    status: 'published' as const,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000010',
    slug: 'tenun-sumba-kosmologi-dalam-helai-kain',
    region: 'Nusa Tenggara',
    topic: 'Motif & Simbolisme',
    motifLabel: 'Ikat',
    title: 'Tenun Sumba: Kosmologi dalam Helai Kain',
    excerpt:
      'Ikat is a dyeing technique from Southeast Asia used to pattern textiles that employs resistance methods.',
    description:
      'Tenun Sumba memuat narasi kosmologi, leluhur, dan hubungan manusia dengan alam semesta.',
    summary:
      'Ikat is a dyeing technique from Southeast Asia used to pattern textiles that employs resistance methods.',
    likes: 5,
    views: '870',
    sections: buildDefaultSections({ motifLabel: 'Ikat' }),
    status: 'published' as const,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000011',
    slug: 'upacara-mangulosi-pemberian-ulos-dalam-adat-batak',
    region: 'Sumatra',
    topic: 'Upacara Adat',
    motifLabel: 'Ikat',
    title: 'Upacara Mangulosi: Pemberian Ulos dalam Adat Batak',
    excerpt:
      'Ulos is the traditional tenun fabric of the Batak people of North Sumatra and central to sacred ceremonies.',
    description:
      'Mangulosi adalah prosesi pemberian ulos sebagai tanda kasih, restu, dan ikatan sosial dalam adat Batak.',
    summary:
      'Ulos is the traditional tenun fabric of the Batak people of North Sumatra and central to sacred ceremonies.',
    likes: 5,
    views: '870',
    sections: buildDefaultSections({ motifLabel: 'Ikat' }),
    status: 'published' as const,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000012',
    slug: 'songket-minangkabau-emas-dalam-tenunan',
    region: 'Sumatra',
    topic: 'Pengrajin Lokal',
    motifLabel: 'Ikat',
    title: 'Songket Minangkabau: Emas dalam Tenunan',
    excerpt:
      'Songket or sungkit is a tenun fabric that belongs to the brocade family of Indonesian-Malay textiles.',
    description:
      'Songket Minangkabau memperlihatkan kecakapan perajin lokal dalam merangkai benang emas menjadi karya budaya.',
    summary:
      'Songket or sungkit is a tenun fabric that belongs to the brocade family of Indonesian-Malay textiles.',
    likes: 5,
    views: '870',
    sections: buildDefaultSections({ motifLabel: 'Ikat' }),
    status: 'published' as const,
  },
];

export const SEED_LIKE_1_ID = 'c0000000-0000-0000-0000-000000000001';

const articles = encyclopediaArticles.map((article) => ({
  id: article.id,
  slug: article.slug,
  region: article.region,
  topic: article.topic,
  motifLabel: article.motifLabel,
  title: article.title,
  excerpt: article.excerpt,
  description: article.description,
  summary: article.summary,
  readMinutes: article.readMinutes,
  featured: article.featured,
  province: article.province,
  island: article.island,
  clothingType: article.clothingType,
  gender: article.gender,
  status: article.status,
}));

const engagements = encyclopediaArticles.map((article) => ({
  id: `eng_${article.id}`,
  articleId: article.id,
  viewCount: parseViewCount(article.views),
  likeCount: article.likes,
}));

export const [SEED_ENGAGEMENT_1] = engagements;
const sections = encyclopediaArticles.flatMap((article) =>
  article.sections.map((section, index) => ({
    id: `${article.id}-section-${index + 1}`,
    articleId: article.id,
    title: section.title,
    content: section.content,
    imageLabel: section.imageLabel,
    imageCaption: section.imageCaption,
    order: index,
  })),
);

export async function seedArticles() {
  const adminUserId = await getUserIdByEmail(SEED_ADMIN_USER.email);
  const regularUserId = (
    await prisma.user.findFirst({
      where: { email: 'user@test.com' },
    })
  )?.id;

  if (!regularUserId) throw new Error('Regular seed user not found');

  await prisma.$transaction(async (tx) => {
    for (const article of articles) {
      await tx.article.upsert({
        where: { id: article.id },
        update: {
          ...article,
          createdBy: adminUserId,
        },
        create: {
          ...article,
          createdBy: adminUserId,
        },
      });
    }
    console.log(`Seeded ${articles.length} articles`);

    for (const engagement of engagements) {
      await tx.articleEngagement.upsert({
        where: { articleId: engagement.articleId },
        update: engagement,
        create: engagement,
      });
    }
    console.log(`Seeded ${engagements.length} article engagements`);

    for (const section of sections) {
      await tx.articleSection.upsert({
        where: { id: section.id },
        update: section,
        create: section,
      });
    }
    console.log(`Seeded ${sections.length} article sections`);

    await tx.userArticleLike.upsert({
      where: { id: SEED_LIKE_1_ID },
      update: {},
      create: {
        id: SEED_LIKE_1_ID,
        articleId: SEED_ARTICLE_1.id,
        userId: regularUserId,
      },
    });
    console.log('Seeded 1 user article like');
  });
}
