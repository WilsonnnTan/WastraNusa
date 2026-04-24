import { Gender, ProductStatus, VariantType } from '@/generated/prisma/enums';

export interface ProductVariantItem {
  id: string;
  name: string;
  type: VariantType;
  price: number | null;
  stock: number;
  sku: string;
}

export interface ProductInventoryItem {
  id: string;
  articleId: string;
  articleTitle: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  stock: number;
  sku: string;
  weight: number;
  island: string;
  province: string;
  clothingType: string;
  gender: Gender;
  status: ProductStatus;
  sold: number;
  variants: ProductVariantItem[];
  variantCount: number;
  updatedAt: string;
}

export interface ProductInventoryListResponse {
  items: ProductInventoryItem[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

export interface ArticleOptionItem {
  id: string;
  title: string;
  island: string;
  province: string;
}
