import prisma from '../../src/lib/prisma';
import { SEED_ARTICLE_1, SEED_ARTICLE_2 } from './article.seed';

export const SEED_PRODUCT_1 = {
  id: 'p0000000-0000-0000-0000-000000000001',
  articleId: SEED_ARTICLE_1.id,
  name: 'Premium Batik Pekalongan Shirt',
  slug: 'premium-batik-pekalongan-shirt',
  description: 'Handcrafted premium batik shirt from Pekalongan.',
  price: 250000,
  compareAtPrice: 300000,
  stock: 50,
  sku: 'BPK-PREM-001',
  weight: 300,
  province: SEED_ARTICLE_1.province,
  clothingType: SEED_ARTICLE_1.clothingType,
  gender: SEED_ARTICLE_1.gender,
  status: 'active' as const,
};

export const SEED_PRODUCT_2 = {
  id: 'p0000000-0000-0000-0000-000000000002',
  articleId: SEED_ARTICLE_2.id,
  name: 'Traditional Ulos Batak Scarf',
  slug: 'traditional-ulos-batak-scarf',
  description: 'Authentic hand-woven Ulos scarf.',
  price: 150000,
  compareAtPrice: 200000,
  stock: 30,
  sku: 'UBS-TRAD-001',
  weight: 200,
  province: SEED_ARTICLE_2.province,
  clothingType: SEED_ARTICLE_2.clothingType,
  gender: SEED_ARTICLE_2.gender,
  status: 'active' as const,
};

export const SEED_VARIANT_1_1 = {
  id: 'v0000000-0000-0000-0000-000000000011',
  productId: SEED_PRODUCT_1.id,
  name: 'Size L',
  type: 'size' as const,
  price: 250000,
  stock: 20,
  sku: 'BPK-PREM-L',
};

export const SEED_VARIANT_1_2 = {
  id: 'v0000000-0000-0000-0000-000000000012',
  productId: SEED_PRODUCT_1.id,
  name: 'Size XL',
  type: 'size' as const,
  price: 275000,
  stock: 15,
  sku: 'BPK-PREM-XL',
};

export async function seedProducts() {
  const products = [SEED_PRODUCT_1, SEED_PRODUCT_2];
  const variants = [SEED_VARIANT_1_1, SEED_VARIANT_1_2];

  await prisma.$transaction(async (tx) => {
    for (const prod of products) {
      await tx.product.upsert({
        where: { id: prod.id },
        update: {},
        create: prod,
      });
    }
    console.log(`Seeded ${products.length} products`);

    for (const variant of variants) {
      await tx.productVariant.upsert({
        where: { id: variant.id },
        update: {},
        create: variant,
      });
    }
    console.log(`Seeded ${variants.length} product variants`);
  });
}
