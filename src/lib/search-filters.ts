import type { EncyclopediaArticle } from '@/types/encyclopedia';
import type { ProductInventoryItem } from '@/types/product';

export const PRODUCT_SEARCH_LIMIT = 100;
export const ARTICLE_SEARCH_LIMIT = 500;

export function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

function productHaystack(product: ProductInventoryItem): string {
  return [
    product.name,
    product.articleTitle,
    product.clothingType,
    product.island,
    product.province,
    product.description ?? '',
  ]
    .join(' ')
    .toLowerCase();
}

function articleHaystack(article: EncyclopediaArticle): string {
  return [
    article.title,
    article.motifLabel,
    article.topic,
    article.region,
    article.island ?? '',
    article.province ?? '',
  ]
    .join(' ')
    .toLowerCase();
}

/**
 * Rank a candidate against the query so results sort "by letters":
 * a name that starts with the query ranks first, then an earlier match
 * position, then alphabetically. Returns null when there is no match.
 */
function rank(name: string, haystack: string, query: string): number | null {
  const lowerName = name.toLowerCase();

  if (lowerName.startsWith(query)) return 0;
  if (lowerName.includes(query)) return 1;

  const haystackIndex = haystack.indexOf(query);
  if (haystackIndex >= 0) return 2;

  return null;
}

export function searchProducts(
  products: ProductInventoryItem[],
  rawQuery: string,
): ProductInventoryItem[] {
  const query = normalizeQuery(rawQuery);
  if (!query) return [];

  return products
    .map((product) => ({
      product,
      score: rank(product.name, productHaystack(product), query),
    }))
    .filter((entry) => entry.score !== null)
    .sort(
      (a, b) =>
        (a.score as number) - (b.score as number) ||
        a.product.name.localeCompare(b.product.name),
    )
    .map((entry) => entry.product);
}

export function searchArticles(
  articles: EncyclopediaArticle[],
  rawQuery: string,
): EncyclopediaArticle[] {
  const query = normalizeQuery(rawQuery);
  if (!query) return [];

  return articles
    .map((article) => ({
      article,
      score: rank(article.title, articleHaystack(article), query),
    }))
    .filter((entry) => entry.score !== null)
    .sort(
      (a, b) =>
        (a.score as number) - (b.score as number) ||
        a.article.title.localeCompare(b.article.title),
    )
    .map((entry) => entry.article);
}
