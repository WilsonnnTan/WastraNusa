import { withApiAuth } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { articleService } from '@/services/article.service';

export const GET = withApiAuth(async ({ req, userId }) => {
  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
  const limit = Math.max(1, Number(url.searchParams.get('limit')) || 5);
  const articles = await articleService.getLikedArticles(userId, page, limit);
  return jsend.success(articles);
});
