/**
 * Data constants for Encyclopedia page
 */
import type { EncyclopediaArticle, RegionFilter, Stat } from './types';

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
