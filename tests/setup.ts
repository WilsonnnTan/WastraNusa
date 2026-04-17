import 'dotenv/config';
import { vi } from 'vitest';

vi.mock('@/logger/logger', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  logError: vi.fn(),
}));

vi.mock('@/lib/auth/auth-api-helper', () => ({
  AuthHelper: {
    getUser: vi.fn(),
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
    countAll: vi.fn(),
    countByRegion: vi.fn(),
    findMostPopular: vi.fn(),
    findByIdOrSlug: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    incrementViewCount: vi.fn(),
    findUserLike: vi.fn(),
    countLikedByUser: vi.fn(),
    findLikedByUser: vi.fn(),
    toggleLike: vi.fn(),
  },
}));

vi.mock('@/services/article.service', () => ({
  articleService: {
    getArticles: vi.fn(),
    getDashboardOverview: vi.fn(),
    getArticleDetail: vi.fn(),
    getLikedArticles: vi.fn(),
    createArticle: vi.fn(),
    updateArticle: vi.fn(),
    deleteArticle: vi.fn(),
    toggleLike: vi.fn(),
  },
}));

vi.mock('@/repositories/order.repository', () => ({
  orderRepository: {
    createOrder: vi.fn(),
    findOrderById: vi.fn(),
    updateOrderPaymentStatus: vi.fn(),
  },
}));

vi.mock('@/repositories/paymentTransaction.repository', () => ({
  paymentTransactionRepository: {
    createPaymentTransaction: vi.fn(),
    updatePaymentStatus: vi.fn(),
  },
}));

vi.mock('@/repositories/product.repository', () => ({
  productRepository: {
    findProductById: vi.fn(),
    decrementProductStock: vi.fn(),
  },
}));

vi.mock('@/repositories/productVariant.repository', () => ({
  productVariantRepository: {
    findVariantById: vi.fn(),
    decrementVariantStock: vi.fn(),
  },
}));

vi.mock('@/services/payment.service', () => ({
  paymentService: {
    checkout: vi.fn(),
    handleNotification: vi.fn(),
  },
}));

vi.mock('@/lib/midtrans', () => ({
  createMidtransTransaction: vi.fn(),
  verifySignatureKey: vi.fn(),
}));
