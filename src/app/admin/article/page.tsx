import { AdminArticleContent } from '@/components/admin/article/admin-article-content';
import { requireAdmin } from '@/lib/auth/auth-page-helper';

export default async function AdminArticlePage() {
  await requireAdmin();
  return <AdminArticleContent />;
}
