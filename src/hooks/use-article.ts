import type { JSendResponse } from '@/lib/jsend';
import type {
  EncyclopediaArticleDetail,
  EncyclopediaArticleFilters,
  EncyclopediaArticleListResponse,
  ToggleArticleLikeResponse,
} from '@/types/encyclopedia';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const DEFAULT_ARTICLE_LIMIT = 50;

export const articleKeys = {
  all: ['articles'] as const,
  lists: () => [...articleKeys.all, 'list'] as const,
  list: (page: number, limit: number, region?: string) =>
    [...articleKeys.lists(), page, limit, region ?? 'all'] as const,
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

async function mutateArticleApi<T>(path: string, method: 'POST'): Promise<T> {
  const response = await fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return parseJSend<T>(response);
}

export function fetchArticles(
  page: number = 1,
  limit: number = DEFAULT_ARTICLE_LIMIT,
  filters: EncyclopediaArticleFilters = {},
) {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (filters.region) {
    searchParams.set('region', filters.region);
  }

  return fetchArticleApi<EncyclopediaArticleListResponse>(
    `/api/articles?${searchParams.toString()}`,
  );
}

export function fetchArticleDetail(slug: string) {
  return fetchArticleApi<EncyclopediaArticleDetail>(
    `/api/articles/${encodeURIComponent(slug)}`,
  );
}

export function toggleArticleLike(slug: string) {
  return mutateArticleApi<ToggleArticleLikeResponse>(
    `/api/articles/${encodeURIComponent(slug)}/like`,
    'POST',
  );
}

export function useArticles(
  page: number = 1,
  limit: number = DEFAULT_ARTICLE_LIMIT,
  filters: EncyclopediaArticleFilters = {},
) {
  return useQuery({
    queryKey: articleKeys.list(page, limit, filters.region),
    queryFn: () => fetchArticles(page, limit, filters),
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

export function useToggleArticleLike(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleArticleLike(slug),
    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: articleKeys.detail(slug) }),
        queryClient.cancelQueries({ queryKey: articleKeys.lists() }),
      ]);

      const previousDetail =
        queryClient.getQueryData<EncyclopediaArticleDetail>(
          articleKeys.detail(slug),
        );
      const previousLists =
        queryClient.getQueriesData<EncyclopediaArticleListResponse>({
          queryKey: articleKeys.lists(),
        });
      const nextIsLiked = !(previousDetail?.isLiked ?? false);
      const nextLikes = Math.max(
        0,
        (previousDetail?.likes ?? 0) + (nextIsLiked ? 1 : -1),
      );

      queryClient.setQueryData<EncyclopediaArticleDetail>(
        articleKeys.detail(slug),
        (currentArticle) =>
          currentArticle
            ? {
                ...currentArticle,
                isLiked: nextIsLiked,
                likes: nextLikes,
              }
            : currentArticle,
      );

      queryClient.setQueriesData<EncyclopediaArticleListResponse>(
        { queryKey: articleKeys.lists() },
        (currentResponse) =>
          currentResponse
            ? {
                ...currentResponse,
                items: currentResponse.items.map((article) =>
                  article.slug === slug
                    ? {
                        ...article,
                        isLiked: nextIsLiked,
                        likes: nextLikes,
                      }
                    : article,
                ),
              }
            : currentResponse,
      );

      return { previousDetail, previousLists };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(
          articleKeys.detail(slug),
          context.previousDetail,
        );
      }

      for (const [queryKey, data] of context?.previousLists ?? []) {
        queryClient.setQueryData(queryKey, data);
      }
    },
    onSuccess: (result) => {
      queryClient.setQueryData<EncyclopediaArticleDetail>(
        articleKeys.detail(slug),
        (currentArticle) =>
          currentArticle
            ? {
                ...currentArticle,
                isLiked: result.isLiked,
                likes: result.engagement.likeCount,
              }
            : currentArticle,
      );

      queryClient.setQueriesData<EncyclopediaArticleListResponse>(
        { queryKey: articleKeys.lists() },
        (currentResponse) =>
          currentResponse
            ? {
                ...currentResponse,
                items: currentResponse.items.map((article) =>
                  article.slug === slug
                    ? {
                        ...article,
                        isLiked: result.isLiked,
                        likes: result.engagement.likeCount,
                      }
                    : article,
                ),
              }
            : currentResponse,
      );
    },
  });
}
