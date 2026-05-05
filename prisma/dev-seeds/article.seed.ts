import prisma from '../../src/lib/prisma';
import { SEED_ADMIN_USER } from './user.seed';

type SeedSection = {
  title: string;
  content: string;
  imageLabel?: string;
  imageCaption?: string;
  imageURL?: string;
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
  imageURL?: string;
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

const commonsFile = (fileName: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName).replace(/%20/g, '_')}`;

const BATIK_IMAGE = commonsFile('Batik Jawa Hokokai Pekalongan Tulis.jpg');
const IKAT_IMAGE = commonsFile(
  'Indonesian funeral shroud or hanging, (porilonjong), Central Sulawesi (Celebes), Rongkong, Toraja, cotton with ikat paterns.jpg',
);
const SONGKET_IMAGE = commonsFile('Bamboofabric.png');
const KEBAYA_IMAGE = commonsFile('GKR Hayu 2.jpg');
const ULOS_IMAGE = commonsFile('Weaving ulos cloth.jpg');
const GERINGSING_IMAGE = commonsFile('Geringsingi texttile in use.jpg');
const TAPIS_IMAGE = commonsFile('Kain tapis.JPG');
const TENUN_IMAGE = commonsFile('Loom for weaving.jpg');
const SUMBA_IMAGE = commonsFile("Indonesian woman's ceremonial skirt.jpg");
const PALEPAI_IMAGE = commonsFile('Palepai.jpg');

export const SEED_ARTICLE_1 = {
  id: 'b0000000-0000-0000-0000-000000000001',
  slug: 'batik-warisan-kain-rintang-lilin-nusantara',
  region: 'Jawa',
  topic: 'Sejarah & Asal Usul',
  motifLabel: 'Batik',
  title: 'Batik: Warisan Kain Rintang Lilin Nusantara',
  excerpt:
    'Batik adalah teknik pewarnaan kain dengan perintang lilin. Istilah ini juga dipakai untuk kain berpola yang dihasilkan lewat proses tersebut.',
  description:
    'Artikel ini dirangkum dari laman Wikipedia tentang batik dan menyoroti teknik wax-resist, makna motif, serta pengakuan internasionalnya.',
  imageURL: BATIK_IMAGE,
  summary:
    'Wikipedia menjelaskan batik sebagai teknik pewarnaan resist dengan lilin yang menghasilkan motif pada kain dan memiliki keragaman simbolik di Indonesia.',
  readMinutes: 8,
  featured: true,
  province: 'Jawa Tengah',
  island: 'Jawa',
  clothingType: 'Batik',
  gender: 'female',
  likes: 24,
  views: '2,100',
  sections: [
    {
      title: 'Teknik Resist Dengan Lilin',
      content:
        'Wikipedia menjelaskan bahwa batik dibuat dengan menggambar atau mencap lilin pada kain agar bagian tertentu menahan warna saat proses pencelupan. Setelah lilin dilepas, pola negatif yang khas akan muncul pada permukaan kain.',
      imageLabel: 'Batik',
      imageCaption: 'Foto batik dari Wikimedia Commons.',
      imageURL: BATIK_IMAGE,
    },
    {
      title: 'Motif Tidak Sekadar Hiasan',
      content:
        'Corak batik sangat beragam bahkan dalam satu wilayah. Sebagian motif memiliki makna simbolik dan dipakai pada kesempatan tertentu, sementara motif lain berkembang karena kebutuhan pasar, mode, dan perjumpaan budaya pesisir maupun keraton.',
    },
    {
      title: 'Pengakuan dan Nilai Budaya',
      content:
        'Batik Indonesia tercatat dalam Daftar Representatif Warisan Budaya Takbenda UNESCO pada 2009. Pengakuan ini menegaskan batik bukan hanya produk tekstil, tetapi praktik budaya yang menghubungkan keterampilan, identitas, dan pengetahuan antargenerasi.',
    },
  ],
  status: 'published',
} satisfies SeedArticle;

export const SEED_ARTICLE_2 = {
  id: 'b0000000-0000-0000-0000-000000000002',
  slug: 'ulos-kain-adat-batak-dan-tradisi-mangulosi',
  region: 'Danau Toba',
  topic: 'Upacara Adat',
  motifLabel: 'Ulos',
  title: 'Ulos: Kain Adat Batak dan Tradisi Mangulosi',
  excerpt:
    'Ulos adalah kain tenun tradisional masyarakat Batak di Sumatera Utara yang dipakai pada upacara, perkawinan, dan pemberian restu.',
  description:
    'Artikel ini merangkum data Wikipedia tentang ulos sebagai kain Batak yang lekat dengan simbol kehangatan, kasih sayang, dan relasi sosial.',
  imageURL: ULOS_IMAGE,
  summary:
    'Menurut Wikipedia, ulos merupakan kain tenun tradisional Batak yang dipakai disampirkan di bahu dan memiliki peran penting dalam ritus adat.',
  readMinutes: 6,
  province: 'Sumatera Utara',
  island: 'Sumatera',
  clothingType: 'Ulos',
  gender: 'female',
  likes: 11,
  views: '1,550',
  sections: [
    {
      title: 'Makna Kehangatan Dalam Ulos',
      content:
        'Wikipedia mencatat bahwa menurut orang Batak ada tiga sumber kehangatan bagi manusia: matahari, api, dan ulos. Dari sana ulos berkembang dari kain sehari-hari menjadi simbol kasih sayang, keberanian, dan kekuatan dalam kehidupan sosial.',
      imageLabel: 'Ulos',
      imageCaption: 'Foto ulos dari Wikimedia Commons.',
      imageURL: ULOS_IMAGE,
    },
    {
      title: 'Dipakai dan Disampirkan Secara Seremonial',
      content:
        'Ulos lazim dikenakan dengan cara diselempangkan di bahu, dipakai pada pernikahan, atau digunakan untuk mengikat pengantin. Wikipedia juga mencatat sejumlah jenis pemakaian berbeda untuk laki-laki dan perempuan dalam konteks adat Batak.',
    },
    {
      title: 'Mangulosi Sebagai Tanda Kasih',
      content:
        'Dalam budaya Batak, mangulosi berarti pemberian ulos sebagai tanda kasih kepada penerima. Praktik ini diatur oleh hubungan kekerabatan dan umumnya dilakukan dari pihak yang secara adat berada pada posisi memberi berkat kepada pihak lain.',
    },
  ],
  status: 'published',
} satisfies SeedArticle;

export const SEED_ARTICLE_3 = {
  id: 'b0000000-0000-0000-0000-000000000003',
  slug: 'ikat-teknik-celup-benang-sebelum-menenun',
  region: 'Kepulauan Nusantara',
  topic: 'Teknik Pembuatan',
  motifLabel: 'Ikat',
  title: 'Ikat: Teknik Celup Benang Sebelum Menenun',
  excerpt:
    'Ikat adalah teknik memberi pola pada tekstil dengan mewarnai benang yang sudah diikat sebelum proses penenunan dimulai.',
  description:
    'Rangkuman berbasis Wikipedia tentang ikat, teknik resist pada benang yang banyak berkembang di dunia Austronesia termasuk Indonesia.',
  imageURL: IKAT_IMAGE,
  summary:
    'Wikipedia mendeskripsikan ikat sebagai teknik resist-dyeing pada benang yang menghasilkan tepi motif agak kabur dan bernilai tinggi bila pengerjaannya presisi.',
  readMinutes: 7,
  province: 'Nusa Tenggara Timur',
  island: 'Nusa Tenggara',
  clothingType: 'Ikat',
  gender: 'female',
  likes: 9,
  views: '1,420',
  sections: [
    {
      title: 'Pola Dibentuk Sebelum Benang Ditenun',
      content:
        'Pada ikat, perintang warna dibentuk dengan mengikat benang atau kelompok benang sebelum pencelupan. Setelah pewarnaan selesai, ikatan dilepas dan benang ditenun sehingga kedua sisi kain sama-sama memuat pola.',
      imageLabel: 'Ikat',
      imageCaption: 'Contoh kain ikat dari Wikimedia Commons.',
      imageURL: IKAT_IMAGE,
    },
    {
      title: 'Ciri Tepi Motif Yang Sedikit Kabur',
      content:
        'Wikipedia menekankan bahwa sedikit efek kabur pada motif adalah ciri khas ikat. Efek ini muncul karena menyelaraskan benang yang telah diwarnai membutuhkan ketelitian tinggi, dan justru sering dihargai oleh kolektor tekstil.',
    },
    {
      title: 'Sebaran Luas di Asia Tenggara',
      content:
        'Tradisi ikat berkembang luas di Asia Tenggara, terutama di kalangan masyarakat Austronesia dan Daik. Indonesia menjadi salah satu pusat penting tradisi ini, dengan variasi besar pada teknik, warna, dan simbol yang dipakai di tiap daerah.',
    },
  ],
  status: 'published',
} satisfies SeedArticle;

const encyclopediaArticles: SeedArticle[] = [
  SEED_ARTICLE_1,
  SEED_ARTICLE_2,
  SEED_ARTICLE_3,
  {
    id: 'b0000000-0000-0000-0000-000000000004',
    slug: 'songket-tenun-brokad-berbenang-emas',
    region: 'Palembang',
    topic: 'Sejarah & Asal Usul',
    motifLabel: 'Songket',
    title: 'Songket: Tenun Brokad Berbenang Emas',
    excerpt:
      'Songket adalah kain tenun keluarga brokad yang dihias benang emas atau perak dengan teknik supplementary weft.',
    description:
      'Artikel ini memakai data Wikipedia tentang songket sebagai kain mewah yang berhubungan erat dengan Palembang, Sumatra, dan tradisi Melayu maritim.',
    imageURL: SONGKET_IMAGE,
    summary:
      'Wikipedia menggambarkan songket sebagai kain tenun sutra atau katun dengan benang logam yang menghasilkan efek berkilau dan status seremonial yang kuat.',
    readMinutes: 6,
    province: 'Sumatera Selatan',
    island: 'Sumatera',
    clothingType: 'Songket',
    gender: 'female',
    likes: 8,
    views: '1,240',
    sections: [
      {
        title: 'Kain Mewah Dengan Benang Logam',
        content:
          'Songket dibuat dengan menyisipkan benang emas atau perak di antara benang pakan. Wikipedia menyebut efek kilau inilah yang menjadikan songket berbeda dari tenun biasa dan lekat dengan kesan mewah.',
        imageLabel: 'Songket',
        imageCaption: 'Contoh songket dari Wikimedia Commons.',
        imageURL: SONGKET_IMAGE,
      },
      {
        title: 'Palembang dan Jejak Sriwijaya',
        content:
          'Wikipedia mengaitkan tradisi songket dengan wilayah yang dahulu berada dalam pengaruh Sriwijaya, terutama Palembang. Karena itu songket sering dibahas bersamaan dengan sejarah perdagangan, kerajaan, dan budaya Melayu di Sumatra.',
      },
      {
        title: 'Busana Upacara dan Penanda Status',
        content:
          'Songket lazim dikenakan pada pesta, upacara adat, dan pernikahan. Dalam banyak tradisi Melayu, kain ini berfungsi sebagai penanda status sosial, kehormatan keluarga, dan kekayaan visual dari busana seremonial.',
      },
    ],
    status: 'published',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000005',
    slug: 'kebaya-busana-perempuan-maritim-asia-tenggara',
    region: 'Jawa',
    topic: 'Busana Tradisional',
    motifLabel: 'Kebaya',
    title: 'Kebaya: Busana Perempuan Maritim Asia Tenggara',
    excerpt:
      'Kebaya adalah pakaian bagian atas yang terbuka di depan dan secara tradisional dikenakan perempuan di Asia Tenggara, termasuk Indonesia.',
    description:
      'Artikel ini disusun dari ringkasan Wikipedia tentang kebaya, sejarah istilahnya, bahan penyusunnya, dan peran kebaya sebagai identitas budaya.',
    imageURL: KEBAYA_IMAGE,
    summary:
      'Wikipedia menerangkan kebaya sebagai busana perempuan berbahan ringan seperti brokat, katun, kasa, atau renda yang kuat dalam sejarah budaya Indonesia.',
    readMinutes: 6,
    province: 'DI Yogyakarta',
    island: 'Jawa',
    clothingType: 'Kebaya',
    gender: 'female',
    likes: 10,
    views: '1,380',
    sections: [
      {
        title: 'Bentuk dan Bahan Kebaya',
        content:
          'Kebaya adalah atasan yang terbuka di bagian depan dan biasanya dibuat dari kain ringan seperti brokat, katun, voile, kasa, atau renda. Dalam praktiknya, kebaya dikenakan bersama kain bawahan seperti batik atau sarung.',
        imageLabel: 'Kebaya',
        imageCaption: 'Contoh kebaya dari Wikimedia Commons.',
        imageURL: KEBAYA_IMAGE,
      },
      {
        title: 'Jejak Istilah dan Persebaran',
        content:
          'Wikipedia mencatat bahwa asal kata kebaya berkaitan dengan istilah qaba dan menyebar melalui jaringan budaya Persia, Arab, Portugis, dan dunia Melayu. Dalam sejarah Jawa, kebaya kemudian menjadi bentuk busana yang sangat berpengaruh.',
      },
      {
        title: 'Warisan Budaya Yang Terus Hidup',
        content:
          'Kebaya tetap hadir dalam acara keluarga, kenegaraan, pertunjukan seni, dan kehidupan sehari-hari. Pada laman Wikipedia, kebaya juga tercatat dalam daftar warisan budaya takbenda UNESCO tahun 2024 melalui nominasi multinasional.',
      },
    ],
    status: 'published',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000006',
    slug: 'geringsing-double-ikat-sakral-dari-tenganan',
    region: 'Tenganan Pegringsingan',
    topic: 'Teknik Pembuatan',
    motifLabel: 'Geringsing',
    title: 'Geringsing: Double Ikat Sakral dari Tenganan',
    excerpt:
      'Geringsing adalah kain double ikat Bali yang ditenun di Tenganan dan terkenal karena prosesnya yang rumit serta fungsi ritualnya.',
    description:
      'Rangkuman ini didasarkan pada artikel Wikipedia tentang geringsing sebagai tekstil Bali Aga dengan teknik double ikat yang langka.',
    imageURL: GERINGSING_IMAGE,
    summary:
      'Wikipedia menyebut geringsing sebagai tekstil double ikat dari Tenganan, Bali, dengan palet merah, hitam, dan warna netral serta reputasi magis.',
    readMinutes: 7,
    province: 'Bali',
    island: 'Bali',
    clothingType: 'Geringsing',
    gender: 'female',
    likes: 7,
    views: '1,010',
    sections: [
      {
        title: 'Double Ikat Yang Sangat Langka',
        content:
          'Geringsing dibuat dengan mewarnai benang lungsi dan pakan sebelum keduanya ditenun, sehingga masuk kategori double ikat. Wikipedia menekankan bahwa teknik sekompleks ini hanya dipraktikkan di sangat sedikit tempat di dunia.',
        imageLabel: 'Geringsing',
        imageCaption: 'Geringsing dari Wikimedia Commons.',
        imageURL: GERINGSING_IMAGE,
      },
      {
        title: 'Terkait Dengan Tradisi Bali Aga',
        content:
          'Kain ini berasal dari desa Tenganan Pegringsingan, komunitas Bali Aga yang sering dipandang sebagai pewaris tradisi Bali pra-Majapahit. Karena konteks itu, geringssing dibaca bukan hanya sebagai kain, tetapi bagian dari identitas desa.',
      },
      {
        title: 'Dipandang Memiliki Daya Pelindung',
        content:
          'Wikipedia mencatat bahwa geringsing dipercaya memiliki sifat pelindung dan kerap dipakai dalam ritual penyembuhan, eksorsisme, serta ritus peralihan hidup. Makna sakral ini menjadi bagian penting dari nilainya hingga kini.',
      },
    ],
    status: 'published',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000007',
    slug: 'tapis-lampung-dengan-sulam-benang-emas',
    region: 'Lampung',
    topic: 'Teknik Pembuatan',
    motifLabel: 'Tapis',
    title: 'Tapis Lampung dengan Sulam Benang Emas',
    excerpt:
      'Tapis adalah gaya tenun tradisional Lampung berupa kain bergaris berwarna alami yang dihias sulaman benang emas.',
    description:
      'Artikel ini merangkum Wikipedia tentang tapis sebagai simbol budaya Lampung dengan teknik couching dan penggunaan seremonial.',
    imageURL: TAPIS_IMAGE,
    summary:
      'Wikipedia menggambarkan tapis sebagai kain Lampung berdekorasi benang emas, motif floral maupun non-floral, dan sering dipakai pada acara penting.',
    readMinutes: 6,
    province: 'Lampung',
    island: 'Sumatera',
    clothingType: 'Tapis',
    gender: 'female',
    likes: 7,
    views: '980',
    sections: [
      {
        title: 'Kain Dasar Bergaris Dengan Benang Emas',
        content:
          'Wikipedia menjelaskan tapis sebagai kain tenun dasar yang kemudian dihias dengan benang emas atau perak. Kontras antara warna dasar dan sulaman logam menjadi salah satu ciri visual terpentingnya.',
        imageLabel: 'Tapis',
        imageCaption: 'Tapis Lampung dari Wikimedia Commons.',
        imageURL: TAPIS_IMAGE,
      },
      {
        title: 'Teknik Couching Yang Hemat Bahan',
        content:
          'Benang logam pada tapis biasanya ditempel dengan teknik couching, yaitu benang hias diletakkan di permukaan lalu diikat dengan benang lain. Cara ini membantu menonjolkan dekorasi tanpa membuang banyak bahan mahal.',
      },
      {
        title: 'Simbol Identitas Lampung',
        content:
          'Secara tradisional tapis dipakai untuk pernikahan, Lebaran, dan upacara penyambutan. Wikipedia juga mencatat bahwa tapis dianggap sebagai salah satu simbol penting masyarakat Lampung dan banyak dikoleksi karena usianya.',
      },
    ],
    status: 'published',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000008',
    slug: 'tekstil-sumba-sebagai-bahasa-simbol-dan-pertukaran',
    region: 'Sumba Timur',
    topic: 'Motif & Simbolisme',
    motifLabel: 'Tekstil Sumba',
    title: 'Tekstil Sumba sebagai Bahasa Simbol dan Pertukaran',
    excerpt:
      'Tekstil Sumba dipandang sebagai media yang meneruskan pesan budaya antargenerasi dan berperan penting dalam pertukaran adat.',
    description:
      'Artikel ini merangkum Wikipedia tentang textiles of Sumba, terutama fungsi simbolik kain, teknik ikat, dan hubungan kain dengan ritus sosial.',
    imageURL: SUMBA_IMAGE,
    summary:
      'Wikipedia menekankan bahwa tekstil Sumba adalah karya personal, simbolis, dan berkaitan erat dengan pernikahan, kematian, serta struktur nilai lokal.',
    readMinutes: 7,
    province: 'Nusa Tenggara Timur',
    island: 'Sumba',
    clothingType: 'Tenun',
    gender: 'female',
    likes: 6,
    views: '930',
    sections: [
      {
        title: 'Kain Sebagai Media Pesan Budaya',
        content:
          'Wikipedia menyebut tekstil Sumba sebagai sarana bagi satu generasi untuk menyampaikan pesan kepada generasi berikutnya. Karena itu kain tidak hanya dipandang sebagai benda pakai, tetapi sebagai penyimpan pengetahuan dan relasi sosial.',
        imageLabel: 'Sumba',
        imageCaption: 'Rok seremonial Sumba dari Wikimedia Commons.',
        imageURL: SUMBA_IMAGE,
      },
      {
        title: 'Bagian Dari Mahar dan Duka',
        content:
          'Dalam masyarakat Sumba, kain hadir pada pertukaran adat. Tekstil digunakan sebagai bagian dari balasan bridewealth pada perkawinan dan juga sebagai tanda duka serta timbal balik pada upacara kematian.',
      },
      {
        title: 'Motif Hewan dan Daya Simbolik',
        content:
          'Wikipedia mencatat hadirnya figur hewan seperti ayam, rusa, udang, dan lobster dalam tekstil Sumba. Masing-masing bisa membawa makna kekuasaan, kelahiran kembali, atau kualitas tertentu yang ingin dihadirkan pada pemakainya.',
      },
    ],
    status: 'published',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000009',
    slug: 'palepai-kain-kapal-upacara-lampung',
    region: 'Lampung Pesisir',
    topic: 'Upacara Adat',
    motifLabel: 'Palepai',
    title: 'Palepai: Kain Kapal untuk Upacara Lampung',
    excerpt:
      'Palepai adalah kain upacara Lampung yang dikenal sebagai ship cloth karena dominasi motif kapal pada bidang kainnya.',
    description:
      'Artikel ini bersandar pada halaman Wikipedia tentang palepai, kain langka dari Sumatra yang dipakai sebagai latar upacara dan penanda status sosial.',
    imageURL: PALEPAI_IMAGE,
    summary:
      'Wikipedia menggambarkan palepai sebagai kain upacara Lampung dengan motif kapal besar, figur manusia bergaya stilisasi, serta sejarah produksi yang kini langka.',
    readMinutes: 6,
    province: 'Lampung',
    island: 'Sumatera',
    clothingType: 'Tenun',
    gender: 'female',
    likes: 5,
    views: '870',
    sections: [
      {
        title: 'Dikenal Sebagai Ship Cloth',
        content:
          'Palepai sering disebut ship cloth oleh peneliti karena motif kapalnya mendominasi bidang kain. Wikipedia juga menyebut kain ini kerap dihubungkan dengan gagasan perjalanan arwah, walau banyak makna rinci desainnya belum sepenuhnya dipahami.',
        imageLabel: 'Palepai',
        imageCaption: 'Contoh palepai koleksi museum.',
        imageURL: PALEPAI_IMAGE,
      },
      {
        title: 'Latar Upacara Golongan Penyimbang',
        content:
          'Penggunaan palepai terkait dengan kelompok penyimbang dalam struktur sosial Lampung Paminggir. Kain ini digantung pada dinding bagian dalam rumah saat perkawinan, khitanan, penamaan anak, dan upacara kematian.',
      },
      {
        title: 'Kini Menjadi Kain Yang Sangat Langka',
        content:
          'Wikipedia mencatat bahwa palepai tidak lagi ditenun secara reguler selama lebih dari satu abad. Karena jumlahnya terbatas, banyak contoh palepai yang kini lebih mudah ditemui di koleksi museum daripada dalam praktik sehari-hari.',
      },
    ],
    status: 'published',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000010',
    slug: 'tenun-austronesia-dan-ragam-kain-indonesia',
    region: 'Kepulauan Indonesia',
    topic: 'Sejarah & Asal Usul',
    motifLabel: 'Tenun',
    title: 'Tenun Austronesia dan Ragam Kain Indonesia',
    excerpt:
      'Tenun adalah teknik menganyam benang yang berakar dalam tradisi Austronesia dan berkembang luas di berbagai pulau Indonesia.',
    description:
      'Artikel ini merujuk pada Wikipedia tentang tenun untuk menjelaskan akar istilah, sejarah panjang, dan keragaman jenis tenun di Indonesia.',
    imageURL: TENUN_IMAGE,
    summary:
      'Wikipedia menyebut tenun sebagai teknik tradisional Austronesia dengan sejarah sangat panjang dan banyak bentuk lokal seperti ikat, songket, geringsing, hingga lurik.',
    readMinutes: 8,
    province: 'Nusa Tenggara Timur',
    island: 'Nusantara',
    clothingType: 'Tenun',
    gender: 'female',
    likes: 6,
    views: '960',
    sections: [
      {
        title: 'Akar Kata Proto-Austronesia',
        content:
          'Pada Wikipedia, kata tenun dihubungkan dengan bentuk Proto-Austronesia *tenun yang berarti menenun kain. Ini menunjukkan bahwa menenun bukan sekadar teknik lokal, tetapi bagian dari warisan budaya maritim Austronesia yang luas.',
        imageLabel: 'Tenun',
        imageCaption: 'Penenun tradisional dari Wikimedia Commons.',
        imageURL: TENUN_IMAGE,
      },
      {
        title: 'Jejak Panjang Sejak Masa Prasejarah',
        content:
          'Laman Wikipedia menyebut bukti tekstil dan alat pemintal dari masa Neolitik di beberapa lokasi Indonesia, termasuk Sumba Timur dan wilayah Jawa. Temuan ini dipakai untuk menunjukkan tua dan luasnya tradisi menenun di kepulauan Indonesia.',
      },
      {
        title: 'Payung Besar Banyak Tradisi Daerah',
        content:
          'Dalam daftar jenisnya, Wikipedia memasukkan aneka bentuk tenun seperti cepuk, endek, geringsing, songket, lurik, tapis, ulos, dan hinggi. Artinya, tenun bekerja sebagai payung besar bagi banyak identitas daerah yang berbeda.',
      },
    ],
    status: 'published',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000011',
    slug: 'batik-betawi-warna-cerah-dan-motif-kota-pesisir',
    region: 'Jakarta',
    topic: 'Motif & Simbolisme',
    motifLabel: 'Batik Betawi',
    title: 'Batik Betawi: Warna Cerah dan Motif Kota Pesisir',
    excerpt:
      'Batik Betawi berkembang di kawasan Sunda Kalapa modern dan dikenal lewat warna kontras serta motif khas budaya Betawi.',
    description:
      'Artikel ini dibuat dari data Wikipedia tentang Betawi batik, terutama ciri motif lokal seperti ondel-ondel dan kembang kelapa.',
    imageURL: BATIK_IMAGE,
    summary:
      'Wikipedia menggambarkan batik Betawi sebagai batik asal kawasan Jakarta dengan warna terang, kontras, dan ikon visual yang merujuk langsung pada budaya Betawi.',
    readMinutes: 5,
    province: 'DKI Jakarta',
    island: 'Jawa',
    clothingType: 'Batik',
    gender: 'female',
    likes: 5,
    views: '840',
    sections: [
      {
        title: 'Batik Dari Kawasan Sunda Kalapa',
        content:
          'Wikipedia menempatkan batik Betawi sebagai tradisi batik yang tumbuh di wilayah Sunda Kalapa, kini Jakarta Raya. Batik ini berkembang dari lingkungan budaya pesisir yang akrab dengan percampuran komunitas dan simbol kota.',
        imageLabel: 'Batik Betawi',
        imageCaption: 'Ilustrasi batik dari Wikimedia Commons.',
        imageURL: BATIK_IMAGE,
      },
      {
        title: 'Ondel-Ondel Hingga Kembang Kelapa',
        content:
          'Motif batik Betawi banyak mengambil ikon budaya setempat, seperti ondel-ondel, kembang kelapa, nusa kelapa, dan unsur pencak silat Betawi. Kehadiran ikon tersebut membuat batik ini terasa sangat terikat pada identitas Jakarta lama.',
      },
      {
        title: 'Palet Cerah Yang Kontras',
        content:
          'Wikipedia mencatat bahwa batik Betawi identik dengan warna-warna terang dan kontras, berbeda dari sejumlah batik pedalaman yang cenderung lebih bersahaja. Pilihan warna itu memperkuat karakter pesisir yang terbuka dan ekspresif.',
      },
    ],
    status: 'published',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000012',
    slug: 'batik-madura-warna-tegas-dan-warisan-pesisir-timur',
    region: 'Madura',
    topic: 'Pengrajin Lokal',
    motifLabel: 'Batik Madura',
    title: 'Batik Madura: Warna Tegas dan Warisan Pesisir Timur',
    excerpt:
      'Batik Madura dikenal lewat warna-warna kuat, motif dinamis, dan keterkaitannya dengan kawasan pesisir timur Jawa dan Pulau Madura.',
    description:
      'Artikel ini disusun dari Wikipedia tentang Madurese batik yang menyoroti karakter warna, motif, dan sentra produksinya.',
    imageURL: BATIK_IMAGE,
    summary:
      'Wikipedia menjelaskan batik Madura sebagai salah satu tradisi batik Jawa Timur yang menonjol lewat warna jenuh, motif kaya, dan basis produksi di Bangkalan, Pamekasan, dan Sumenep.',
    readMinutes: 5,
    province: 'Jawa Timur',
    island: 'Madura',
    clothingType: 'Batik',
    gender: 'female',
    likes: 5,
    views: '860',
    sections: [
      {
        title: 'Tradisi Batik Dari Timur Jawa',
        content:
          'Menurut Wikipedia, batik Madura berasal dari kawasan paling timur tradisi batik Jawa, yakni Madura dan pesisir timur Jawa. Tradisi ini menjadi bagian penting dari warisan budaya masyarakat Madura dan komunitas Pendalungan.',
        imageLabel: 'Batik Madura',
        imageCaption: 'Ilustrasi batik dari Wikimedia Commons.',
        imageURL: BATIK_IMAGE,
      },
      {
        title: 'Warna Cerah dan Berani',
        content:
          'Ciri paling menonjol dari batik Madura adalah warna yang terang, jenuh, dan berani seperti merah, kuning, hijau, biru, serta hitam. Wikipedia membedakan palet ini dari banyak batik pedalaman yang lebih dekat dengan warna bumi.',
      },
      {
        title: 'Sentra Produksi Yang Masih Hidup',
        content:
          'Wikipedia menyebut Bangkalan, Pamekasan, dan Sumenep sebagai wilayah produksi utama batik Madura. Selain di Pulau Madura, tradisi ini juga hidup di beberapa daerah pesisir timur Jawa karena pergerakan pengrajin dan jaringan dagang.',
      },
    ],
    status: 'published',
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
  imageURL: article.imageURL,
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
    imageURL: section.imageURL,
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

  await prisma.$transaction(
    async (tx) => {
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
    },
    {
      maxWait: 30000,
      timeout: 30000,
    },
  );
}
