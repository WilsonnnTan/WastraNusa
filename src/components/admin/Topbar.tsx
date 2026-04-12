import { styles } from './styles';

export default function Topbar() {
  return (
    <div style={styles.topbar}>
      <div>
        <div style={styles.pageTitle}>Dashboard Overview</div>
        <div style={styles.pageSub}>
          WastraNusa Admin · Jumat, 10 April 2026
        </div>
      </div>
      <div style={styles.topbarRight}>
        <button style={styles.exportBtn}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M8 1v9M4 7l4 4 4-4M2 12v2h12v-2"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          Export
        </button>
        <div style={styles.adminAvatar}>AD</div>
      </div>
    </div>
  );
}
