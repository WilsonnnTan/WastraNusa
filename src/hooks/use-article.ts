import type { JSendResponse } from '@/lib/jsend';
import type {
  EncyclopediaArticle,
  EncyclopediaArticleDetail,
} from '@/types/encyclopedia';
import { useQuery } from '@tanstack/react-query';

const DEFAULT_ARTICLE_LIMIT = 50;

export const articleKeys = {
  all: ['articles'] as const,
  lists: () => [...articleKeys.all, 'list'] as const,
  list: (page: number, limit: number) =>
    [...articleKeys.lists(), page, limit] as const,
  details: () => [...articleKeys.all, 'detail'] as const,
  detail: (slug: string) => [...articleKeys.details(), slug] as const,
};

async function parseJSend<T>(response: Response): Promise<T> {
  const body = (await response.json()) as JSendResponse<T>;

  if (body.status === 'success') {
    return body.data as T;
  }

  if (body.status === 'fail') {
    const message =
      typeof body.data === 'object' &&
      body.data !== null &&
      'message' in body.data
        ? String(body.data.message)
        : 'Request failed';

    throw new Error(message);
  }

  throw new Error(body.message);
}

async function fetchArticleApi<T>(path: string): Promise<T> {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return parseJSend<T>(response);
}

export function fetchArticles(
  page: number = 1,
  limit: number = DEFAULT_ARTICLE_LIMIT,
) {
  return fetchArticleApi<EncyclopediaArticle[]>(
    `/api/articles?page=${page}&limit=${limit}`,
  );
}

export function fetchArticleDetail(slug: string) {
  return fetchArticleApi<EncyclopediaArticleDetail>(
    `/api/articles/${encodeURIComponent(slug)}`,
  );
}

export function useArticles(
  page: number = 1,
  limit: number = DEFAULT_ARTICLE_LIMIT,
) {
  return useQuery({
    queryKey: articleKeys.list(page, limit),
    queryFn: () => fetchArticles(page, limit),
    placeholderData: (previousData) => previousData,
  });
}

export function useArticleDetail(slug: string) {
  return useQuery({
    queryKey: articleKeys.detail(slug),
    queryFn: () => fetchArticleDetail(slug),
    enabled: Boolean(slug),
  });
}
