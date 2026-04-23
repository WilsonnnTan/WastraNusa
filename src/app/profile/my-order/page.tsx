import { MyOrderMain } from '@/components/profile/my-order/my-order-main';
import { requireUser } from '@/lib/auth/auth-page-helper';

export default async function MyOrderPage() {
  await requireUser();

  return <MyOrderMain />;
}
