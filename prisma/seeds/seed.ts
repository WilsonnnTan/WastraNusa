import 'dotenv/config';

import { seedArticles } from './article.seed';
import { seedUsers } from './user.seed';

const NODE_ENV = process.env.NODE_ENV || 'production';

if (NODE_ENV === 'production') {
  console.error('CRITICAL: Seeding is NOT allowed in production environment.');
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.warn('WARNING: DATABASE_URL is not set.');
  process.exit(1);
}

async function main() {
  console.log('Starting seed process...');
  console.log(`Environment: ${NODE_ENV}`);

  await seedUsers();
  await seedArticles();

  console.log('\nSeeding complete!');
}

main().catch((e) => {
  console.error('Seeding failed:', e);
  process.exit(1);
});
