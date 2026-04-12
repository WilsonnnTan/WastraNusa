'use client';

import ArticlesPanel from '@/components/admin/ArticlesPanel';
import Sidebar from '@/components/admin/Sidebar';
import StatsRow from '@/components/admin/StatsRow';
import StockAlertsPanel from '@/components/admin/StockAlertsPanel';
import Topbar from '@/components/admin/Topbar';
import { styles } from '@/components/admin/styles';
import { useState } from 'react';

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState<string>('Dashboard');

  return (
    <div style={styles.layout}>
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div style={styles.main}>
        <Topbar />
        <div style={styles.content}>
          <StatsRow />
          <div style={styles.bottomRow}>
            <StockAlertsPanel />
            <ArticlesPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
