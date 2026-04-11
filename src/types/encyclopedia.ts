/**
 * Type definitions for Encyclopedia components
 */

export interface Stat {
  value: string;
  label: string;
}

export interface RegionFilter {
  name: string;
  count: number;
  active?: boolean;
}

export interface EncyclopediaArticle {
  slug: string;
  region: string;
  topic: string;
  motifLabel: string;
  title: string;
  excerpt: string;
  likes: number;
  views: string;
  readMinutes?: number;
  featured?: boolean;
}

export interface EncyclopediaSection {
  title: string;
  content: string;
  imageLabel?: string;
  imageCaption?: string;
}

export interface EncyclopediaKeyFact {
  label: string;
  value: string;
}

export interface EncyclopediaRelatedProduct {
  name: string;
  location: string;
  price: string;
}

export interface EncyclopediaArticleDetail extends EncyclopediaArticle {
  author: string;
  publishedAt: string;
  tags: string[];
  quote: string;
  intro: string;
  sections: EncyclopediaSection[];
  keyFacts: EncyclopediaKeyFact[];
  relatedProducts: EncyclopediaRelatedProduct[];
  discussionCount: number;
  nextArticle: {
    slug: string;
    title: string;
  };
  references: string[];
}

export type ViewMode = 'grid' | 'list';
