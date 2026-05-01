import { AdminOrderContent } from '@/components/admin/pesanan/admin-order-content';
import { requireAdmin } from '@/lib/auth/auth-page-helper';

export default async function AdminOrderPage() {
  await requireAdmin();
  return (
    <div className="w-full" style={{ zoom: 0.9 }}>
      <AdminOrderContent />
    </div>
  );
}
