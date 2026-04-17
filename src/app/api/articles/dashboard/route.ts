import { withApiPublic } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { articleService } from '@/services/article.service';

export const GET = withApiPublic(async () => {
  const dashboardOverview = await articleService.getDashboardOverview();
  return jsend.success(dashboardOverview);
});
