export type DashboardStatTone = 'positive' | 'warning';
export type StockAlertSeverity = 'low' | 'out';
export type DashboardStatIcon = 'package' | 'book-open' | 'triangle-alert';

export type DashboardNavItem = {
  title: string;
  href?: string;
  badge?: string;
  active?: boolean;
  disabled?: boolean;
};

export type DashboardStat = {
  title: string;
  value: number;
  changeLabel: string;
  tone: DashboardStatTone;
  description: string;
  footnote: string;
  icon: DashboardStatIcon;
};

export type StockAlertItem = {
  name: string;
  category: string;
  stockLabel: string;
  severity: StockAlertSeverity;
};

export type PopularArticle = {
  rank: number;
  slug: string;
  title: string;
  category: string;
  region: string;
  views: number;
  readTimeMinutes: number;
};

export type DashboardData = {
  title: string;
  subtitle: string;
  brandName: string;
  brandLabel: string;
  adminName: string;
  adminRole: string;
  lastUpdatedLabel: string;
  navigation: DashboardNavItem[];
  summary: DashboardStat[];
  stockAlerts: StockAlertItem[];
  popularArticles: PopularArticle[];
};

export type ArticleDashboardData = {
  totalArticles: number;
  popularArticles: PopularArticle[];
};
