import { AuthHelper } from '@/lib/auth/auth-api-helper';
import { articleService } from '@/services/article.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GET } from '../../../src/app/api/articles/liked/route';

const mockService = vi.mocked(articleService);
const mockAuth = vi.mocked(AuthHelper);

function createRequest(url: string, options: RequestInit = {}): Request {
  return new Request(url, options);
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/articles/liked', { tags: ['backend'] }, () => {
  it('should return liked articles for the authenticated user', async () => {
    mockAuth.requireUser.mockResolvedValue({ id: 'user-1' } as never);
    mockService.getLikedArticles.mockResolvedValue({
      items: [
        {
          id: 'article-1',
          slug: 'sejarah-batik',
          region: 'Jawa',
          topic: 'Sejarah',
          motifLabel: 'Batik',
          title: 'Sejarah Batik',
          excerpt: 'Artikel tentang batik',
          likes: 12,
          views: '100',
          readMinutes: 6,
        },
      ],
      meta: {
        page: 2,
        limit: 5,
        totalItems: 7,
        totalPages: 2,
        hasNextPage: false,
      },
    } as never);

    const req = createRequest(
      'http://localhost/api/articles/liked?page=2&limit=5',
    );
    const res = await GET(req, { params: Promise.resolve({}) });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.status).toBe('success');
    expect(body.data.items).toHaveLength(1);
    expect(mockAuth.requireUser).toHaveBeenCalled();
    expect(mockService.getLikedArticles).toHaveBeenCalledWith('user-1', 2, 5);
  });
});
