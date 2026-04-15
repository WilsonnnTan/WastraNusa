import { AuthHelper } from '@/lib/auth/auth-api-helper';
import { articleService } from '@/services/article.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GET, POST } from '../../../src/app/api/articles/route';

const mockService = vi.mocked(articleService);
const mockAuth = vi.mocked(AuthHelper);

const MOCK_ARTICLES = {
  items: [
    { id: '1', title: 'Article 1', slug: 'article-1' },
    { id: '2', title: 'Article 2', slug: 'article-2' },
  ],
  meta: {
    page: 1,
    limit: 10,
    totalItems: 2,
    totalPages: 1,
    hasNextPage: false,
    regions: [{ name: 'Semua Wilayah', count: 2, active: true }],
  },
};

function createRequest(url: string, options: RequestInit = {}): Request {
  return new Request(url, options);
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/articles', { tags: ['backend'] }, () => {
  it('should return articles list', async () => {
    mockService.getArticles.mockResolvedValue(MOCK_ARTICLES as never);

    const req = createRequest('http://localhost/api/articles');
    const res = await GET(req, { params: Promise.resolve({}) });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.status).toBe('success');
    expect(body.data).toEqual(MOCK_ARTICLES);
    expect(mockService.getArticles).toHaveBeenCalledWith(1, 10, {
      region: undefined,
    });
  });

  it('should parse page, limit, and region from query params', async () => {
    mockService.getArticles.mockResolvedValue({
      items: [],
      meta: {
        page: 3,
        limit: 20,
        totalItems: 0,
        totalPages: 1,
        hasNextPage: false,
        regions: [{ name: 'Semua Wilayah', count: 0, active: false }],
      },
    } as never);

    const req = createRequest(
      'http://localhost/api/articles?page=3&limit=20&region=Jawa',
    );
    await GET(req, { params: Promise.resolve({}) });

    expect(mockService.getArticles).toHaveBeenCalledWith(3, 20, {
      region: 'Jawa',
    });
  });
});

describe('POST /api/articles', { tags: ['backend'] }, () => {
  const validArticle = {
    title: 'New Article',
    excerpt: 'New article excerpt',
    province: 'Bali',
    island: 'Bali',
    region: 'Denpasar',
    topic: 'Teknik Pembuatan',
    clothingType: 'endek',
    motifLabel: 'Endek',
    gender: 'female',
    wikipediaPageId: 'wp-new',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/New',
    sections: [
      {
        title: 'Pembuka',
        content: 'New content',
        order: 0,
      },
    ],
  };

  it('should create article as admin and return 201', async () => {
    mockAuth.requireAdmin.mockResolvedValue({
      id: 'admin-1',
      role: 'admin',
    } as never);
    mockService.createArticle.mockResolvedValue({
      id: 'new-id',
      ...validArticle,
    } as never);

    const req = createRequest('http://localhost/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validArticle),
    });
    const res = await POST(req, { params: Promise.resolve({}) });
    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.status).toBe('success');
    expect(mockAuth.requireAdmin).toHaveBeenCalled();
    expect(mockService.createArticle).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'New Article' }),
      'admin-1',
    );
  });

  it('should return 400 on invalid body (Zod validation)', async () => {
    mockAuth.requireAdmin.mockResolvedValue({
      id: 'admin-1',
      role: 'admin',
    } as never);

    const req = createRequest('http://localhost/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '' }), // missing current required fields
    });
    const res = await POST(req, { params: Promise.resolve({}) });
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.status).toBe('fail');
  });
});
