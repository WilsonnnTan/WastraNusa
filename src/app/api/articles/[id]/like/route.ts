import { withApiAuth } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { articleService } from '@/services/article.service';

export const POST = withApiAuth<{ id: string }>(async ({ params, userId }) => {
  const result = await articleService.toggleLike(params.id, userId);
  return jsend.success(result);
});
