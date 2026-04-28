import { z } from 'zod';

const checkoutItemSchema = z.object({
  cartItemId: z.string().min(1).optional(),
  productId: z.string().min(1, 'Product ID is required'),
  variantId: z.string().nullish(),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  frontendPrice: z.number().min(0).optional(),
});

export const checkoutSchema = z.object({
  items: z.array(checkoutItemSchema).min(1, 'At least one item is required'),
  shippingAddressId: z
    .string()
    .min(1, 'Shipping address is required')
    .nullish(),
  courier: z.string().min(1, 'Courier is required'),
  courierService: z.string().min(1, 'Courier service is required'),
  estimatedDelivery: z.string().nullish(),
  shippingCost: z.number().min(0, 'Shipping cost cannot be negative'),
  customerNotes: z.string().nullish(),
});

/**
 * Schema for POST /api/webhooks/midtrans - Midtrans notification payload.
 * @see https://docs.midtrans.com/docs/https-notification-webhooks
 */
export const midtransNotificationSchema = z.object({
  transaction_id: z.string(),
  order_id: z.string(),
  gross_amount: z.string(),
  status_code: z.string(),
  transaction_status: z.string(),
  signature_key: z.string(),
  payment_type: z.string(),
  fraud_status: z.string().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type MidtransNotificationInput = z.infer<
  typeof midtransNotificationSchema
>;
