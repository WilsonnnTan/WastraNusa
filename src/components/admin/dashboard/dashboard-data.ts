import type {
  ArticleDashboardData,
  DashboardData,
  PopularArticle,
} from '@/types/dashboard';

export const adminDashboardData = {
  title: 'Dashboard Overview',
  subtitle: 'WastraNusa Admin - Jumat, 10 April 2026',
  brandName: 'WastraNusa',
  brandLabel: 'Admin Panel',
  adminName: 'Admin WastraNusa',
  adminRole: 'Super User',
  lastUpdatedLabel: 'Ringkasan data terakhir diperbarui hari ini',
  navigation: [
    { title: 'Dashboard', href: '/admin/dashboard', active: true },
    { title: 'Artikel', badge: '0', disabled: true },
    { title: 'Produk & Inventori', badge: '12', disabled: true },
    { title: 'Pesanan', badge: '12', disabled: true },
  ],
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
      title: 'Total Artikel',
      value: 0,
      changeLabel: 'dari article API',
      tone: 'positive',
      description: 'Total artikel',
      footnote: 'ensiklopedia budaya',
      icon: 'book-open',
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

  return {
    ...baseData,
    navigation: baseData.navigation.map((item) =>
      item.title === 'Artikel'
        ? { ...item, badge: String(articleData.totalArticles) }
        : item,
    ),
    summary: baseData.summary.map((item) =>
      item.title === 'Total Artikel'
        ? {
            ...item,
            value: articleData.totalArticles,
          }
        : item,
    ),
    popularArticles: articleData.popularArticles,
  };
}
