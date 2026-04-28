import 'dotenv/config';

import { seedAddresses } from './address.seed';
import { seedArticles } from './article.seed';
import { seedCarts } from './cart.seed';
import { seedOrders } from './order.seed';
import { seedProducts } from './product.seed';
import { seedUsers } from './user.seed';

if (!process.env.DATABASE_URL) {
  console.warn('WARNING: DATABASE_URL is not set.');
  process.exit(1);
}

async function main() {
  console.log('Starting seed process...');

  await seedUsers();
  await seedArticles();
  await seedProducts();
  await seedAddresses();
  await seedCarts();
  await seedOrders();

  console.log('\nSeeding complete!');
}

main().catch((e) => {
  console.error('Seeding failed:', e);
  process.exit(1);
});
