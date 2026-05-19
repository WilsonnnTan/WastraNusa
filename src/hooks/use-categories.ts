import { useQuery } from '@tanstack/react-query';

export const categoryKeys = {
  all: ['categories'] as const,
  list: () => [...categoryKeys.all, 'list'] as const,
};

async function fetchCategories(): Promise<string[]> {
  const response = await fetch('/api/products/categories', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const body = (await response.json()) as {
    status: string;
    data: string[];
  };

  if (body.status === 'success') {
    return body.data;
  }

  throw new Error(body.status);
}

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
