export type CatalogProduct = {
  slug: string;
  name: string;
  category: string;
  region: string;
  city: string;
  price: number;
  oldPrice?: number;
  stock: number;
  rating: number;
  reviews: number;
  sizes: string[];
  badge?: 'BARU' | 'HABIS';
  soldOut?: boolean;
};

export const catalogProducts: CatalogProduct[] = [
  {
    slug: 'batik-tulis-kawung',
    name: 'Batik Tulis Kawung',
    category: 'Batik',
    region: 'Jawa Tengah',
    city: 'Solo',
    price: 350000,
    oldPrice: 420000,
    stock: 48,
    rating: 4.8,
    reviews: 128,
    sizes: ['S', 'M', 'L', 'XL', 'Custom'],
  },
  {
    slug: 'tenun-ikat-flores',
    name: 'Tenun Ikat Flores',
    category: 'Tenun',
    region: 'NTT',
    city: 'Flores',
    price: 580000,
    stock: 24,
    rating: 4.7,
    reviews: 64,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'BARU',
  },
  {
    slug: 'songket-palembang-tradisional',
    name: 'Songket Palembang Tradisional',
    category: 'Songket',
    region: 'Sumatera Selatan',
    city: 'Palembang',
    price: 1200000,
    stock: 15,
    rating: 4.9,
    reviews: 45,
    sizes: ['S', 'M', 'L', 'XL', 'Custom'],
  },
  {
    slug: 'kebaya-kutubaru-klasik',
    name: 'Kebaya Kutubaru Klasik',
    category: 'Kebaya',
    region: 'DI Yogyakarta',
    city: 'Yogyakarta',
    price: 280000,
    stock: 32,
    rating: 4.6,
    reviews: 87,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'BARU',
  },
  {
    slug: 'ulos-batak-ragi-hotang',
    name: 'Ulos Batak Ragi Hotang',
    category: 'Ulos',
    region: 'Sumatera Utara',
    city: 'Samosir',
    price: 420000,
    oldPrice: 480000,
    stock: 20,
    rating: 4.5,
    reviews: 33,
    sizes: ['M', 'L', 'XL', 'Custom'],
  },
  {
    slug: 'kain-lurik-jogja-klasik',
    name: 'Kain Lurik Jogja Klasik',
    category: 'Lurik',
    region: 'DI Yogyakarta',
    city: 'Yogyakarta',
    price: 180000,
    stock: 60,
    rating: 4.6,
    reviews: 112,
    sizes: ['S', 'M', 'L', 'XL', 'Custom'],
  },
  {
    slug: 'kain-gringsing-tenganan',
    name: 'Kain Gringsing Tenganan',
    category: 'Tenun',
    region: 'Bali',
    city: 'Tenganan',
    price: 2500000,
    stock: 5,
    rating: 4.9,
    reviews: 18,
    sizes: ['M', 'L', 'Custom'],
  },
  {
    slug: 'batik-cap-mega-mendung-cirebon',
    name: 'Batik Cap Mega Mendung Cirebon',
    category: 'Batik',
    region: 'Jawa Barat',
    city: 'Cirebon',
    price: 250000,
    oldPrice: 320000,
    stock: 38,
    rating: 4.7,
    reviews: 96,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    slug: 'songket-minangkabau-silungkang',
    name: 'Songket Minangkabau Silungkang',
    category: 'Songket',
    region: 'Sumatera Barat',
    city: 'Silungkang',
    price: 850000,
    stock: 12,
    rating: 4.8,
    reviews: 28,
    sizes: ['S', 'M', 'L', 'XL', 'Custom'],
  },
  {
    slug: 'tenun-ikat-sumba-timur',
    name: 'Tenun Ikat Sumba Timur',
    category: 'Tenun',
    region: 'NTT',
    city: 'Sumba Timur',
    price: 750000,
    stock: 0,
    rating: 4.5,
    reviews: 41,
    sizes: ['M', 'L', 'XL', 'Custom'],
    badge: 'HABIS',
    soldOut: true,
  },
  {
    slug: 'kebaya-encim-peranakan-lasem',
    name: 'Kebaya Encim Peranakan Lasem',
    category: 'Kebaya',
    region: 'Jawa Tengah',
    city: 'Lasem',
    price: 450000,
    stock: 22,
    rating: 4.6,
    reviews: 55,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'BARU',
  },
  {
    slug: 'ulos-simalungun-tenun-tangan',
    name: 'Ulos Simalungun Tenun Tangan',
    category: 'Ulos',
    region: 'Sumatera Utara',
    city: 'Simalungun',
    price: 380000,
    stock: 18,
    rating: 4.4,
    reviews: 24,
    sizes: ['M', 'L', 'XL', 'Custom'],
  },
];

export const catalogSidebarCategories = [
  { name: 'Semua Produk', count: 240 },
  { name: 'Batik', count: 85 },
  { name: 'Tenun', count: 62 },
  { name: 'Songket', count: 38 },
  { name: 'Kebaya', count: 28 },
  { name: 'Ulos', count: 16 },
  { name: 'Lurik', count: 12 },
  { name: 'Gringsing', count: 5 },
];

export const catalogRegions = [
  'Semua',
  'Jawa',
  'Bali',
  'Sumatra',
  'Kalimantan',
  'Sulawesi',
  'NTT/NTB',
];

export const catalogSortOptions = [
  'Terpopuler',
  'Terbaru',
  'Harga ↑',
  'Harga ↓',
  'Rating',
];

export const detailArticleItems = [
  {
    title: 'Filosofi Motif Batik Keraton Yogyakarta',
    readTime: '7 mnt',
  },
  {
    title: 'Tenun Ikat: Teknik Kuno dari Kepulauan Nusantara',
    readTime: '6 mnt',
  },
  {
    title: 'Songket: Kain Kebesaran Kerajaan Melayu',
    readTime: '7 mnt',
  },
];
