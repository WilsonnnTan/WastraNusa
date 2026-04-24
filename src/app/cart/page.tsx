import { CartMain } from '@/components/cart/cart-main';
import { requireUser } from '@/lib/auth/auth-page-helper';

export default async function CartPage() {
  await requireUser();
  return <CartMain />;
}
