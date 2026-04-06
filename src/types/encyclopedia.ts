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

export type ViewMode = 'grid' | 'list';
