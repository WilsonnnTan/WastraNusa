import type { EncyclopediaArticle } from '@/types/encyclopedia';

export interface LikedArticle extends EncyclopediaArticle {
  id: string;
  imageUrl?: string | null;
}

export interface LikedArticlesMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface LikedArticlesResponse {
  items: LikedArticle[];
  meta: LikedArticlesMeta;
}
