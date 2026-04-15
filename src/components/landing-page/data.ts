import type { Product } from '@/types/landing-page';

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

export const sortOptions = ['Terpopuler', 'Terbaru', 'Harga Naik', 'Rating'];

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

export const popularSearchTags = [
  'Batik Kawung',
  'Tenun Flores',
  'Songket Palembang',
  'Ulos Batak',
  'Gringsing Bali',
];
