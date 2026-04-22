import { ArticleStatus, Gender } from '@/generated/prisma/enums';
import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(1, 'Judul artikel wajib diisi'),
  slug: z.string().optional(),
  description: z.string().nullish(),
  excerpt: z.string().min(1, 'Ringkasan pendek (excerpt) wajib diisi'),

  province: z.string().min(1, 'Provinsi wajib diisi'),
  island: z.string().min(1, 'Pulau wajib diisi'),
  region: z.string().min(1, 'Region atau daerah wajib diisi'),
  topic: z.string().min(1, 'Topik artikel wajib diisi'),
  ethnicGroup: z.string().nullish(),

  clothingType: z.string().nullish(),
  motifLabel: z.string().min(1, 'Label motif wajib diisi'),
  gender: z.nativeEnum(Gender).nullish(),
  readMinutes: z.number().int().min(1).optional(),
  featured: z.boolean().optional(),

  wikipediaPageId: z.string().min(1, 'Wikipedia Page ID wajib diisi').nullish(),
  wikipediaUrl: z.url('Format URL tidak valid').nullish(),
  wikimediaImageUrl: z.string().url().nullish(),
  wikimediaVideoUrl: z.string().url().nullish(),
  wikipediaLastSync: z.union([z.string().datetime(), z.date()]).nullish(),

  sections: z
    .array(
      z.object({
        title: z.string().min(1, 'Judul section wajib diisi'),
        content: z.string().min(1, 'Konten section wajib diisi'),
        imageLabel: z.string().nullish(),
        imageCaption: z.string().nullish(),
        order: z.number().int(),
      }),
    )
    .optional(),
  summary: z.string().nullish(),

  status: z.nativeEnum(ArticleStatus).optional(),
});

export const updateArticleSchema = createArticleSchema.partial();

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
