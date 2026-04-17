import { LikedArticlesMain } from '@/components/profile/liked-article/liked-articles-main';
import { requireUser } from '@/lib/auth/auth-page-helper';

export default async function LikedArticlesPage() {
  await requireUser();

  return <LikedArticlesMain />;
}
