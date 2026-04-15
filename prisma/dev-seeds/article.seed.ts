import prisma from '../../src/lib/prisma';
import { SEED_ADMIN_USER } from './user.seed';

async function getUserIdByEmail(email: string): Promise<string> {
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) throw new Error(`Seed user not found: ${email}`);
  return user.id;
}

export const SEED_ARTICLE_1 = {
  id: 'b0000000-0000-0000-0000-000000000001',
  title: 'Batik Pekalongan',
  slug: 'batik-pekalongan',
  description: 'Traditional batik from Pekalongan, Central Java.',
  province: 'Jawa Tengah',
  island: 'Jawa',
  region: 'Pekalongan',
  ethnicGroup: 'Javanese',
  clothingType: 'batik',
  gender: 'male' as const,
  wikipediaPageId: 'wp-batik-pekalongan',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Batik_Pekalongan',
  summary: 'Overview of Batik Pekalongan.',
  status: 'published' as const,
};

export const SEED_ARTICLE_2 = {
  id: 'b0000000-0000-0000-0000-000000000002',
  title: 'Ulos Batak',
  slug: 'ulos-batak',
  description: 'Traditional woven cloth of the Batak people.',
  province: 'Sumatera Utara',
  island: 'Sumatera',
  region: 'Tapanuli',
  ethnicGroup: 'Batak',
  clothingType: 'tenun',
  gender: 'female' as const,
  wikipediaPageId: 'wp-ulos-batak',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Ulos',
  summary: 'Overview of Ulos Batak.',
  status: 'published' as const,
};

export const SEED_ARTICLE_3 = {
  id: 'b0000000-0000-0000-0000-000000000003',
  title: 'Songket Palembang',
  slug: 'songket-palembang',
  description: 'Luxurious hand-woven fabric from Palembang.',
  province: 'Sumatera Selatan',
  island: 'Sumatera',
  region: 'Palembang',
  ethnicGroup: 'Malay',
  clothingType: 'songket',
  gender: 'female' as const,
  wikipediaPageId: 'wp-songket-palembang',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Songket',
  summary: 'Overview of Songket Palembang.',
  status: 'draft' as const,
};

export const SEED_ENGAGEMENT_1 = {
  id: 'eng_b0000000-0000-0000-0000-000000000001',
  articleId: SEED_ARTICLE_1.id,
  viewCount: 10,
  likeCount: 1,
};

export const SEED_ENGAGEMENT_2 = {
  id: 'eng_b0000000-0000-0000-0000-000000000002',
  articleId: SEED_ARTICLE_2.id,
  viewCount: 5,
  likeCount: 0,
};

export const SEED_ENGAGEMENT_3 = {
  id: 'eng_b0000000-0000-0000-0000-000000000003',
  articleId: SEED_ARTICLE_3.id,
  viewCount: 0,
  likeCount: 0,
};

export const SEED_LIKE_1_ID = 'c0000000-0000-0000-0000-000000000001';

const articles = [SEED_ARTICLE_1, SEED_ARTICLE_2, SEED_ARTICLE_3];
const engagements = [SEED_ENGAGEMENT_1, SEED_ENGAGEMENT_2, SEED_ENGAGEMENT_3];

export async function seedArticles() {
  const adminUserId = await getUserIdByEmail(SEED_ADMIN_USER.email);
  const regularUserId = (
    await prisma.user.findFirst({
      where: { email: 'user@test.com' },
    })
  )?.id;

  if (!regularUserId) throw new Error('Regular seed user not found');

  await prisma.$transaction(async (tx) => {
    for (const article of articles) {
      await tx.article.upsert({
        where: { id: article.id },
        update: {},
        create: { ...article, createdBy: adminUserId },
      });
    }
    console.log(`Seeded ${articles.length} articles`);

    for (const eng of engagements) {
      await tx.articleEngagement.upsert({
        where: { id: eng.id },
        update: {},
        create: eng,
      });
    }
    console.log(`Seeded ${engagements.length} article engagements`);

    await tx.userArticleLike.upsert({
      where: { id: SEED_LIKE_1_ID },
      update: {},
      create: {
        id: SEED_LIKE_1_ID,
        articleId: SEED_ARTICLE_1.id,
        userId: regularUserId,
      },
    });
    console.log(`Seeded 1 user article like`);
  });
}
