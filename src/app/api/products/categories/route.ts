import { withApiPublic } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { articleRepository } from '@/repositories/article.repository';

export const GET = withApiPublic(async () => {
  const topics = await articleRepository.getDistinctTopics();
  return jsend.success(topics);
});
