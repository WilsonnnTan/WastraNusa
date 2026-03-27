import 'dotenv/config';
import { vi } from 'vitest';

vi.mock('@/logger/logger', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  logError: vi.fn(),
}));

vi.mock('@/lib/auth/auth-api-helper', () => ({
  AuthHelper: {
    requireUser: vi.fn(),
    requireAdmin: vi.fn(),
  },
}));

vi.mock('@/lib/prisma', () => ({
  default: {},
}));

vi.mock('@/repositories/article.repository', () => ({
  articleRepository: {
    findAll: vi.fn(),
    findByIdOrSlug: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    incrementViewCount: vi.fn(),
    findUserLike: vi.fn(),
    toggleLike: vi.fn(),
  },
}));

vi.mock('@/services/article.service', () => ({
  articleService: {
    getArticles: vi.fn(),
    getArticleDetail: vi.fn(),
    createArticle: vi.fn(),
    updateArticle: vi.fn(),
    deleteArticle: vi.fn(),
    toggleLike: vi.fn(),
  },
}));
