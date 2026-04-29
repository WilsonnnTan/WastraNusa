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

  function formatDelta(weekly?: number, monthly?: number) {
    if (typeof weekly === 'number' && !Number.isNaN(weekly) && weekly !== 0) {
      const sign = weekly > 0 ? '+' : '';
      return `${sign}${Math.abs(weekly)} minggu ini`;
    }
    if (
      typeof monthly === 'number' &&
      !Number.isNaN(monthly) &&
      monthly !== 0
    ) {
      const sign = monthly > 0 ? '+' : '';
      return `${sign}${Math.abs(monthly)} bulan ini`;
    }
    return 'Live dari API';
  }

  if (productData) {
    const outCount =
      productData.outOfStockCount ??
      productData.lowStockItems.filter((item) => item.severity === 'out')
        .length;
    const lowCombined =
      productData.lowStockCount ?? productData.lowStockItems.length;
    const lowCount = Math.max(
      0,
      lowCombined - (productData.outOfStockCount ?? 0),
    );

    summary.push(
      {
        title: 'Total Produk',
        value: productData.totalProducts,
        changeLabel: formatDelta(
          productData.weeklyDelta,
          productData.monthlyDelta,
        ),
        tone: 'positive',
        description: 'Total Produk',
        footnote: 'Di Seluruh Kategori',
        icon: 'package',
      },
      {
        title: 'Stok Rendah / Habis',
        value: lowCombined,
        changeLabel: 'Perlu Restock',
        tone: 'warning',
        description: 'Stok Rendah / Habis',
        footnote: `${outCount} Kritis - ${lowCount} Habis`,
        icon: 'triangle-alert',
      },
    );
  }

  if (articleData) {
    const articleSummaryItem: DashboardData['summary'][number] = {
      title: 'Total Artikel',
      value: articleData.totalArticles,
      changeLabel: formatDelta(
        articleData.weeklyDelta,
        articleData.monthlyDelta,
      ),
      tone: 'positive',
      description: 'Total Artikel',
      footnote: 'Ensiklopedia Budaya',
      icon: 'book-open',
    };

    if (summary.length > 0) {
      summary.splice(1, 0, articleSummaryItem);
    } else {
      summary.push(articleSummaryItem);
    }
  }

  return {
    summary,
    stockAlerts:
      productData?.lowStockItems.map((item) => ({
        name: item.name,
        category: item.category,
        stockLabel:
          item.stock === 0
            ? 'Kritis'
            : item.stock < 5
              ? 'Habis'
              : `Rendah (${item.stock})`,
        severity: item.severity,
      })) ?? [],
    popularArticles: articleData?.popularArticles ?? [],
  };
}
