import 'dotenv/config';

import { seedArticles } from './article.seed';
import { seedUsers } from './user.seed';

async function main() {
  await seedUsers();
  await seedArticles();

  console.log('\nSeeding complete!');
}

main().catch((e) => {
  console.error('Seeding failed:', e);
  process.exit(1);
});
