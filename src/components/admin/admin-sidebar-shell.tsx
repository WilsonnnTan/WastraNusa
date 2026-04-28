'use client';

import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { mergeArticleDashboardData } from '@/components/admin/dashboard/dashboard-data';
import { useArticleDashboard } from '@/hooks/use-article';
import { useProductDashboard } from '@/hooks/use-product-inventory';
import { useMemo } from 'react';

export function AdminSidebarShell() {
  const { data: articleDashboardData } = useArticleDashboard();
  const { data: productDashboardData } = useProductDashboard();

  const sidebarData = useMemo(
    () => mergeArticleDashboardData(articleDashboardData, productDashboardData),
    [articleDashboardData, productDashboardData],
  );

  return <AdminSidebar data={sidebarData} />;
}
