import type { Article, Product, RegionCard } from '@/types/landing-page';

export const categories = [
  'Batik',
  'Tenun Ikat',
  'Songket',
  'Kebaya',
  'Ulos',
  'Lurik',
  'Endek',
  'Gringsing',
];

export const sortOptions = ['Terpopuler', 'Terbaru', 'Harga ↑', 'Rating'];

export const products: Product[] = [
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

export const latestArticles: Article[] = [
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

export const regionCards: RegionCard[] = [
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

export const popularSearchTags = [
  'Batik Kawung',
  'Tenun Flores',
  'Songket Palembang',
  'Ulos Batak',
  'Gringsing Bali',
];
