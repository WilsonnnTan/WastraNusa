import prisma from '@/lib/prisma';
import { articleRepository } from '@/repositories/article.repository';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import {
  SEED_ARTICLE_1,
  SEED_ARTICLE_2,
  SEED_ARTICLE_3,
  SEED_ENGAGEMENT_1,
} from '../../prisma/dev-seeds/article.seed';
import {
  SEED_ADMIN_USER,
  SEED_REGULAR_USER,
} from '../../prisma/dev-seeds/user.seed';

vi.unmock('@/lib/prisma');
vi.unmock('@/repositories/article.repository');

const createdArticleIds: string[] = [];

let adminUserId: string;
let regularUserId: string;

beforeAll(async () => {
  const admin = await prisma.user.findFirst({
    where: { email: SEED_ADMIN_USER.email },
  });
  const regular = await prisma.user.findFirst({
    where: { email: SEED_REGULAR_USER.email },
  });

  if (!admin || !regular) {
    throw new Error('Seed users not found. Run `pnpm prisma db seed` first.');
  }

  adminUserId = admin.id;
  regularUserId = regular.id;
});

afterAll(async () => {
  for (const id of createdArticleIds) {
    await prisma.articleEngagement
      .deleteMany({ where: { articleId: id } })
      .catch(() => {});
    await prisma.userArticleLike
      .deleteMany({ where: { articleId: id } })
      .catch(() => {});
    await prisma.article.delete({ where: { id } }).catch(() => {});
  }
});

describe('articleRepository', { tags: ['db'] }, () => {
  describe('findAll', () => {
    it('should return articles with creator and engagement', async () => {
      const articles = await articleRepository.findAll({
        offset: 0,
        limit: 50,
      });

      expect(articles.length).toBeGreaterThanOrEqual(1);

      const article = articles.find((a) => a.id === SEED_ARTICLE_1.id);
      expect(article).toBeDefined();
      expect(article?.creator).toBeDefined();
      expect(article?.creator.id).toBe(adminUserId);
      expect(article?.engagement).toBeDefined();
    });

    it('should respect pagination', async () => {
      const page1 = await articleRepository.findAll({ offset: 0, limit: 1 });
      const page2 = await articleRepository.findAll({ offset: 1, limit: 1 });

      expect(page1).toHaveLength(1);
      expect(page2).toHaveLength(1);
      expect(page1[0].id).not.toBe(page2[0].id);
    });

    it('should filter by region', async () => {
      const articles = await articleRepository.findAll({
        offset: 0,
        limit: 50,
        region: 'Jawa',
      });

      expect(articles.length).toBeGreaterThan(0);
      expect(articles.every((article) => article.region === 'Jawa')).toBe(true);
    });
  });

  describe('count queries', () => {
    it('should count all articles for a region filter', async () => {
      const count = await articleRepository.countAll({ region: 'Jawa' });

      expect(count).toBeGreaterThan(0);
    });

    it('should return grouped region counts', async () => {
      const regionCounts = await articleRepository.countByRegion();

      expect(regionCounts.length).toBeGreaterThan(0);
      expect(
        regionCounts.some(
          (regionCount) =>
            regionCount.region === 'Jawa' && regionCount._count.region > 0,
        ),
      ).toBe(true);
    });
  });

  describe('findByIdOrSlug', () => {
    it('should find by UUID', async () => {
      const article = await articleRepository.findByIdOrSlug(SEED_ARTICLE_1.id);

      expect(article).toBeDefined();
      expect(article?.id).toBe(SEED_ARTICLE_1.id);
      expect(article?.title).toBe(SEED_ARTICLE_1.title);
    });

    it('should find by slug', async () => {
      const article = await articleRepository.findByIdOrSlug(
        SEED_ARTICLE_2.slug,
      );

      expect(article).toBeDefined();
      expect(article?.slug).toBe(SEED_ARTICLE_2.slug);
    });

    it('should return null for non-existent', async () => {
      const article = await articleRepository.findByIdOrSlug(
        '00000000-0000-0000-0000-000000000000',
      );
      expect(article).toBeNull();
    });
  });

  describe('findLikedByUser', () => {
    it('should return liked articles ordered by newest like first', async () => {
      const likedArticles = await articleRepository.findLikedByUser({
        userId: regularUserId,
        offset: 0,
        limit: 10,
      });

      expect(likedArticles.length).toBeGreaterThan(0);
      expect(
        likedArticles.some(
          (likedArticle) => likedArticle.articleId === SEED_ARTICLE_1.id,
        ),
      ).toBe(true);
      expect(likedArticles[0].article).toBeDefined();
      expect(likedArticles[0].article.engagement).toBeDefined();
    });

    it('should count liked articles for a user', async () => {
      const count = await articleRepository.countLikedByUser(regularUserId);

      expect(count).toBeGreaterThan(0);
    });
  });

  describe('create', () => {
    it('should create article with engagement', async () => {
      const id = crypto.randomUUID();
      createdArticleIds.push(id);

      const article = await articleRepository.create({
        id,
        title: 'Test Article',
        slug: `test-article-${id.slice(0, 8)}`,
        excerpt: 'Test excerpt',
        province: 'Bali',
        island: 'Bali',
        region: 'Denpasar',
        topic: 'Teknik Pembuatan',
        clothingType: 'endek',
        motifLabel: 'Endek',
        gender: 'female',
        wikipediaPageId: `wp-test-${id.slice(0, 8)}`,
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Test',
        summary: 'Test content for article creation.',
        createdBy: adminUserId,
      });

      expect(article.id).toBe(id);
      expect(article.title).toBe('Test Article');

      const engagement = await prisma.articleEngagement.findUnique({
        where: { articleId: id },
      });
      expect(engagement).toBeDefined();
      expect(engagement?.viewCount).toBe(0);
      expect(engagement?.likeCount).toBe(0);
    });
  });

  describe('update', () => {
    it('should update article by ID', async () => {
      const updated = await articleRepository.update(SEED_ARTICLE_3.id, {
        title: 'Updated Songket',
      });

      expect(updated.title).toBe('Updated Songket');

      await articleRepository.update(SEED_ARTICLE_3.id, {
        title: SEED_ARTICLE_3.title,
      });
    });
  });

  describe('delete', () => {
    it('should delete article by ID', async () => {
      const id = crypto.randomUUID();

      await articleRepository.create({
        id,
        title: 'To Delete',
        slug: `to-delete-${id.slice(0, 8)}`,
        excerpt: 'Temp excerpt',
        province: 'Papua',
        island: 'Papua',
        region: 'Jayapura',
        topic: 'Sejarah & Asal Usul',
        clothingType: 'koteka',
        motifLabel: 'Koteka',
        gender: 'male',
        wikipediaPageId: `wp-delete-${id.slice(0, 8)}`,
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Delete',
        summary: 'Temp article.',
        createdBy: adminUserId,
      });

      const deleted = await articleRepository.delete(id);
      expect(deleted.id).toBe(id);

      const found = await articleRepository.findByIdOrSlug(id);
      expect(found).toBeNull();
    });
  });

  describe('incrementViewCount', () => {
    it('should increment view count', async () => {
      const before = await prisma.articleEngagement.findUnique({
        where: { articleId: SEED_ARTICLE_2.id },
      });

      await articleRepository.incrementViewCount(SEED_ARTICLE_2.id);

      const after = await prisma.articleEngagement.findUnique({
        where: { articleId: SEED_ARTICLE_2.id },
      });

      expect(after!.viewCount).toBe(before!.viewCount + 1);
    });
  });

  describe('toggleLike', () => {
    it('should unlike when already liked', async () => {
      const result = await articleRepository.toggleLike(
        SEED_ARTICLE_1.id,
        regularUserId,
      );

      expect(result.isLiked).toBe(false);
      expect(result.engagement.likeCount).toBe(SEED_ENGAGEMENT_1.likeCount - 1);

      await articleRepository.toggleLike(SEED_ARTICLE_1.id, regularUserId);
    });

    it('should like when not liked', async () => {
      const result = await articleRepository.toggleLike(
        SEED_ARTICLE_2.id,
        adminUserId,
      );

      expect(result.isLiked).toBe(true);

      await articleRepository.toggleLike(SEED_ARTICLE_2.id, adminUserId);
    });
  });
});
