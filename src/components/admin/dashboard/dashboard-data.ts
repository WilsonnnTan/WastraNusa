import type {
  ArticleDashboardData,
  DashboardData,
  ProductDashboardData,
} from '@/types/dashboard';

export function mergeArticleDashboardData(
  articleData?: ArticleDashboardData,
  productData?: ProductDashboardData,
): Partial<DashboardData> {
  const summary: DashboardData['summary'] = [];

  if (productData) {
    const outCount = productData.lowStockItems.filter(
      (item) => item.severity === 'out',
    ).length;
    const lowCount = productData.lowStockItems.filter(
      (item) => item.severity === 'low',
    ).length;

    summary.push(
      {
        title: 'Total Produk',
        value: productData.totalProducts,
        changeLabel: 'Live dari API',
        tone: 'positive',
        description: 'Total produk',
        footnote: 'Di Seluruh Kategori',
        icon: 'package',
      },
      {
        title: 'Stok Rendah / Habis',
        value: productData.lowStockItems.length,
        changeLabel: 'Perlu Restock',
        tone: 'warning',
        description: 'Stok Rendah / Habis',
        footnote: `${outCount} Habis - ${lowCount} Rendah`,
        icon: 'triangle-alert',
      },
    );
  }

  if (articleData) {
    summary.unshift({
      title: 'Total Artikel',
      value: articleData.totalArticles,
      changeLabel: 'Live dari API',
      tone: 'positive',
      description: 'Total artikel',
      footnote: 'Ensiklopedia Budaya',
      icon: 'book-open',
    });
  }

  return {
    summary,
    stockAlerts:
      productData?.lowStockItems.map((item) => ({
        name: item.name,
        category: item.category,
        stockLabel:
          item.severity === 'out' ? 'Habis' : `Rendah (${item.stock})`,
        severity: item.severity,
      })) ?? [],
    popularArticles: articleData?.popularArticles ?? [],
  };
}
