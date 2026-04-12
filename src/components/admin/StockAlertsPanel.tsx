import { styles } from './styles';

interface StockItem {
  name: string;
  cat: string;
  status: 'low' | 'empty';
  label: string;
}

const STOCK_ALERTS: StockItem[] = [
  {
    name: 'Kain Gringsing Tenganan',
    cat: 'Tenun',
    status: 'low',
    label: 'Rendah (5)',
  },
  {
    name: 'Tenun Ikat Sumba Timur',
    cat: 'Tenun',
    status: 'empty',
    label: 'Habis',
  },
];

export default function StockAlertsPanel() {
  return (
    <div style={styles.panel}>
      <div style={styles.panelHeader}>
        <div style={styles.panelTitle}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="#c0392b">
            <path d="M8 1L1 14h14L8 1z" />
          </svg>
          Peringatan Stok
        </div>
        <a href="#" style={styles.panelLink}>
          Kelola →
        </a>
      </div>
      {STOCK_ALERTS.map((item, i) => (
        <div
          key={item.name}
          style={{
            ...styles.stockRow,
            ...(i === STOCK_ALERTS.length - 1 ? { borderBottom: 'none' } : {}),
          }}
        >
          <div>
            <div style={styles.stockName}>{item.name}</div>
            <div style={styles.stockCat}>{item.cat}</div>
          </div>
          <span
            style={item.status === 'low' ? styles.badgeLow : styles.badgeEmpty}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
