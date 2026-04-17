'use client';

import { AdminHeader } from '@/components/admin/admin-header';
import { AdminDashboardContent } from '@/components/admin/dashboard/admin-dashboard-content';
import {
  adminDashboardData,
  mergeArticleDashboardData,
} from '@/components/admin/dashboard/dashboard-data';
import { useArticleDashboard } from '@/hooks/use-article';
import { useMemo } from 'react';

export function DashboardView() {
  const { data: articleDashboardData, isLoading } = useArticleDashboard();

  const dashboardData = useMemo(
    () => mergeArticleDashboardData(adminDashboardData, articleDashboardData),
    [articleDashboardData],
  );

  return (
    <>
      <AdminHeader data={dashboardData} />
      <AdminDashboardContent data={dashboardData} isLoading={isLoading} />
    </>
  );
}
