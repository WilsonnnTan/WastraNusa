import { ReactNode } from 'react';

import { styles } from './styles';

interface Stat {
  num: string;
  label: string;
  sub: string;
  trend: string;
  trendType: 'up' | 'warn';
  icon: ReactNode;
}

const STATS: Stat[] = [
  {
    num: '12',
    label: 'Total Produk',
    sub: 'di seluruh kategori',
    trend: '↗ +2 bulan ini',
    trendType: 'up',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="8" width="3" height="6" fill="#4a7c5a" />
        <rect x="6.5" y="5" width="3" height="9" fill="#4a7c5a" />
        <rect x="11" y="2" width="3" height="12" fill="#4a7c5a" />
      </svg>
    ),
  },
  {
    num: '12',
    label: 'Total Artikel',
    sub: 'ensiklopedia budaya',
    trend: '↗ +1 minggu ini',
    trendType: 'up',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect
          x="2"
          y="2"
          width="12"
          height="12"
          rx="1"
          stroke="#4a7c5a"
          strokeWidth="1.5"
          fill="none"
        />
        <line x1="5" y1="6" x2="11" y2="6" stroke="#4a7c5a" strokeWidth="1.2" />
        <line x1="5" y1="9" x2="9" y2="9" stroke="#4a7c5a" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    num: '2',
    label: 'Stok Rendah / Habis',
    sub: '1 habis · 1 kritis',
    trend: '↘ perlu restok',
    trendType: 'warn',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1L1 14h14L8 1z"
          stroke="#c0392b"
          strokeWidth="1.2"
          fill="none"
        />
        <line x1="8" y1="6" x2="8" y2="9" stroke="#c0392b" strokeWidth="1.2" />
        <circle cx="8" cy="11" r="0.8" fill="#c0392b" />
      </svg>
    ),
  },
];

export default function StatsRow() {
  return (
    <div style={styles.statsRow}>
      {STATS.map((stat) => (
        <div key={stat.label} style={styles.statCard}>
          <div style={styles.statCardTop}>
            <div style={styles.statIcon}>{stat.icon}</div>
            <span
              style={
                stat.trendType === 'up' ? styles.trendUp : styles.trendWarn
              }
            >
              {stat.trend}
            </span>
          </div>
          <div style={styles.statNum}>{stat.num}</div>
          <div style={styles.statLabel}>{stat.label}</div>
          <div style={styles.statSub}>{stat.sub}</div>
        </div>
      ))}
    </div>
  );
}
