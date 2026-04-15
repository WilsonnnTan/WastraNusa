import { ArticleStatus, Gender } from '@/generated/prisma/client';
import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  description: z.string().nullish(),
  excerpt: z.string().min(1, 'Excerpt is required'),

  province: z.string().nullish(),
  island: z.string().nullish(),
  region: z.string().min(1, 'Region is required'),
  topic: z.string().min(1, 'Topic is required'),
  ethnicGroup: z.string().nullish(),

  clothingType: z.string().nullish(),
  motifLabel: z.string().min(1, 'Motif Label is required'),
  gender: z.nativeEnum(Gender).nullish(),
  readMinutes: z.number().int().min(1).optional(),
  featured: z.boolean().optional(),

  wikipediaPageId: z.string().min(1, 'Wikipedia Page ID is required').nullish(),
  wikipediaUrl: z.url('Must be a valid URL').nullish(),
  wikimediaImageUrl: z.string().url().nullish(),
  wikimediaVideoUrl: z.string().url().nullish(),
  wikipediaLastSync: z.union([z.string().datetime(), z.date()]).nullish(),

  sections: z
    .array(
      z.object({
        title: z.string().min(1, 'Title is required'),
        content: z.string().min(1, 'Content is required'),
        imageLabel: z.string().nullish(),
        imageCaption: z.string().nullish(),
        order: z.number().int().default(0),
      }),
    )
    .optional(),
  summary: z.string().nullish(),

  status: z.nativeEnum(ArticleStatus).optional(),
});

export const updateArticleSchema = createArticleSchema.partial();

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
