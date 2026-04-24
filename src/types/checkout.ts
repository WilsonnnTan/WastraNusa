export const CHECKOUT_SESSION_KEY = 'checkout_session_v1';

export interface CheckoutSelectedItem {
  cartItemId: string;
  productId: string;
  variantId?: string | null;
  name: string;
  variant: string;
  price: number;
  quantity: number;
}

export interface CheckoutShippingSelection {
  id: string;
  courier: string;
  service: string;
  price: number;
  description: string;
}

export interface CheckoutSessionData {
  items: CheckoutSelectedItem[];
  shipping?: CheckoutShippingSelection;
  createdAt: string;
}
