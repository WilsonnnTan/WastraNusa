import { AuthHelper } from '@/lib/auth/auth-api-helper';
import { articleService } from '@/services/article.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { POST } from '../../../src/app/api/articles/[id]/like/route';

const mockService = vi.mocked(articleService);
const mockAuth = vi.mocked(AuthHelper);

function createRequest(url: string, options: RequestInit = {}): Request {
  return new Request(url, options);
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/articles/[id]/like', { tags: ['backend'] }, () => {
  it('should toggle like for authenticated user', async () => {
    mockAuth.requireUser.mockResolvedValue({ id: 'user-1' } as never);
    mockService.toggleLike.mockResolvedValue({
      isLiked: true,
      engagement: { likeCount: 1, viewCount: 5 },
    } as never);

    const req = createRequest('http://localhost/api/articles/article-1/like', {
      method: 'POST',
    });
    const res = await POST(req, {
      params: Promise.resolve({ id: 'article-1' }),
    });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.status).toBe('success');
    expect(body.data.isLiked).toBe(true);
    expect(mockAuth.requireUser).toHaveBeenCalled();
    expect(mockService.toggleLike).toHaveBeenCalledWith('article-1', 'user-1');
  });
});
