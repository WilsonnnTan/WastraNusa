import { styles } from './styles';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" width={15} height={15}>
        <rect x="1" y="1" width="6" height="6" rx="1" />
        <rect x="9" y="1" width="6" height="6" rx="1" />
        <rect x="1" y="9" width="6" height="6" rx="1" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Artikel',
    badge: 12,
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" width={15} height={15}>
        <path d="M2 2h12a1 1 0 011 1v10a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1zm1 3v6h10V5H3z" />
      </svg>
    ),
  },
  {
    label: 'Produk & Inventori',
    badge: 12,
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" width={15} height={15}>
        <path d="M8 1a4 4 0 100 8A4 4 0 008 1zm0 9c-3.3 0-6 1.5-6 3v1h12v-1c0-1.5-2.7-3-6-3z" />
      </svg>
    ),
  },
  {
    label: 'Pesanan',
    badge: 12,
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" width={15} height={15}>
        <path d="M2 2h12v10H2zm1 1v2h10V3H3zm0 3v4h10V6H3z" />
      </svg>
    ),
  },
];

interface SidebarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export default function Sidebar({ activeNav, setActiveNav }: SidebarProps) {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.brand}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={styles.brandIcon}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1" fill="white" />
              <rect x="9" y="2" width="5" height="5" rx="1" fill="white" />
              <rect x="2" y="9" width="5" height="5" rx="1" fill="white" />
              <rect x="9" y="9" width="5" height="5" rx="1" fill="white" />
            </svg>
          </div>
          <div>
            <div style={styles.brandName}>WastraNusa</div>
            <div style={styles.brandSub}>Admin Panel</div>
          </div>
        </div>
      </div>

      <nav style={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            style={{
              ...styles.navItem,
              ...(activeNav === item.label ? styles.navItemActive : {}),
            }}
            onClick={() => setActiveNav(item.label)}
          >
            <span
              style={{
                opacity: activeNav === item.label ? 1 : 0.7,
                display: 'flex',
              }}
            >
              {item.icon}
            </span>
            {item.label}
            {item.badge && <span style={styles.badge}>{item.badge}</span>}
          </div>
        ))}

        <div style={styles.alertItem}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 4,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="#f5a09a">
              <path d="M8 1L1 14h14L8 1zm0 3l5 8H3l5-8zm-1 3v2h2V7H7zm0 3v1.5h2V10H7z" />
            </svg>
            <span style={styles.alertItemTitle}>Peringatan Stok</span>
          </div>
          <div style={styles.alertItemSub}>1 produk habis</div>
          <div style={styles.alertItemSub}>1 produk stok rendah</div>
        </div>
      </nav>

      <div style={styles.sidebarBottom}>
        <div style={styles.avatar}>AD</div>
        <div>
          <div style={styles.sidebarUserName}>Admin WastraNus</div>
          <div style={styles.sidebarUserRole}>Super User</div>
        </div>
      </div>
    </aside>
  );
}
