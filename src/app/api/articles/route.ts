import { withApiAdmin, withApiPublic } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { createArticleSchema } from '@/schemas/article.schema';
import { articleService } from '@/services/article.service';

export const GET = withApiPublic(async ({ req }) => {
  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
  const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
  const region = url.searchParams.get('region') || undefined;
  const topic = url.searchParams.get('topic') || undefined;

  const articles = await articleService.getArticles(page, limit, {
    region,
    topic,
  });
  return jsend.success(articles);
});

export const POST = withApiAdmin(async ({ req, userId }) => {
  const body = await req.json();
  const data = createArticleSchema.parse(body);
  const article = await articleService.createArticle(data, userId);
  return jsend.success(article, 201);
});
