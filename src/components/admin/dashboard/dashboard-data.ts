import type {
  ArticleDashboardData,
  DashboardData,
  PopularArticle,
} from '@/types/dashboard';

export const adminDashboardData = {
  title: 'Dashboard Overview',
  subtitle: 'WastraNusa Admin',
  brandName: 'WastraNusa',
  brandLabel: 'Admin Panel',
  adminName: 'Admin WastraNusa',
  adminRole: 'Super User',
  lastUpdatedLabel: 'Ringkasan data terakhir diperbarui hari ini',
  summary: [
    {
      title: 'Total Produk',
      value: 12,
      changeLabel: '+ 2 bulan ini',
      tone: 'positive',
      description: 'Total produk',
      footnote: 'di seluruh kategori',
      icon: 'package',
    },
    {
      title: 'Stok Rendah / Habis',
      value: 2,
      changeLabel: 'perlu restok',
      tone: 'warning',
      description: 'Stok rendah / habis',
      footnote: '1 habis - 1 kritis',
      icon: 'triangle-alert',
    },
  ],
  stockAlerts: [
    {
      name: 'Kain Gringsing Tenganan',
      category: 'Tenun',
      stockLabel: 'Rendah (5)',
      severity: 'low',
    },
    {
      name: 'Tenun Ikat Sumba Timur',
      category: 'Tenun',
      stockLabel: 'Habis',
      severity: 'out',
    },
  ],
  popularArticles: [] as PopularArticle[],
} satisfies DashboardData;

export function mergeArticleDashboardData(
  baseData: DashboardData,
  articleData?: ArticleDashboardData,
): DashboardData {
  if (!articleData) {
    return baseData;
  }

  // Construct live stats from API
  const liveStats: DashboardData['summary'] = [
    {
      title: 'Total Artikel',
      value: articleData.totalArticles,
      changeLabel: 'Live dari API',
      tone: 'positive',
      description: 'Total artikel',
      footnote: 'ensiklopedia budaya',
      icon: 'book-open',
    },
  ];

  return {
    ...baseData,
    summary: [...liveStats, ...baseData.summary],
    popularArticles: articleData.popularArticles,
  };
}
