import { ArticleStatus, Gender } from '@/generated/prisma/client';
import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  description: z.string().nullish(),

  province: z.string().min(1, 'Province is required'),
  island: z.string().min(1, 'Island is required'),
  region: z.string().min(1, 'Region is required'),
  ethnicGroup: z.string().nullish(),

  clothingType: z.string().min(1, 'Clothing Type is required'),
  gender: z.nativeEnum(Gender),

  wikipediaPageId: z.string().min(1, 'Wikipedia Page ID is required'),
  wikipediaUrl: z.string().url('Must be a valid URL'),
  wikimediaImageUrl: z.string().url().nullish(),
  wikimediaVideoUrl: z.string().url().nullish(),
  wikipediaLastSync: z.union([z.string().datetime(), z.date()]).nullish(),

  content: z.string().min(1, 'Content is required'),
  summary: z.string().nullish(),

  status: z.nativeEnum(ArticleStatus).optional(),
});

export const updateArticleSchema = createArticleSchema.partial();

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
