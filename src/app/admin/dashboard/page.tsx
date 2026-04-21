import { AdminDashboardContent } from '@/components/admin/dashboard/admin-dashboard-content';
import { requireAdmin } from '@/lib/auth/auth-page-helper';

export default async function DashboardPage() {
  await requireAdmin();
  return <AdminDashboardContent />;
}
