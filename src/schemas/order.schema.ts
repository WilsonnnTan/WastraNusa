import { OrderStatus } from '@/generated/prisma/enums';
import { z } from 'zod';

export const adminOrderUpdateSchema = z
  .object({
    orderStatus: z.nativeEnum(OrderStatus).optional(),
    trackingNumber: z.string().nullish(),
    customerNotes: z.string().nullish(),
  })
  .strict()
  .refine(
    (value) =>
      value.orderStatus !== undefined ||
      value.trackingNumber !== undefined ||
      value.customerNotes !== undefined,
    {
      message: 'Setidaknya satu field harus diubah',
      path: ['orderStatus'],
    },
  );

export type AdminOrderUpdateInput = z.infer<typeof adminOrderUpdateSchema>;
