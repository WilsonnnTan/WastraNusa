export interface Product {
  material: string;
  city: string;
  name: string;
  reviews: number;
  price: string;
  oldPrice: string | null;
  stock: number;
  badge?: string;
}

export interface RegionCard {
  region: string;
  style: string;
  count: string;
  bgClass: string;
}
