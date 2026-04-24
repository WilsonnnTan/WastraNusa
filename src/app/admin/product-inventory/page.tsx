import { AdminProductInventoryContent } from '@/components/admin/product-inventory/admin-product-inventory-content';
import { requireAdmin } from '@/lib/auth/auth-page-helper';

export default async function AdminProductInventoryPage() {
  await requireAdmin();
  return <AdminProductInventoryContent />;
}
