import { LikedArticlesMain } from '@/components/profile/artikel-disukai/liked-articles-main';
import { requireUser } from '@/lib/auth/auth-page-helper';

export default async function LikedArticlesPage() {
  await requireUser();

  return <LikedArticlesMain />;
}
