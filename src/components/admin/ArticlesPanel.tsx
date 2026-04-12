import { styles } from './styles';

interface Article {
  title: string;
  meta: string;
  views: string;
  time: string;
}

const ARTICLES: Article[] = [
  {
    title: 'Sejarah Batik Jawa: Warisan Dunia UNESCO',
    meta: 'Sejarah & Asal Usul · Jawa',
    views: '2,100',
    time: '8m',
  },
  {
    title: 'Tenun Ikat: Teknik Kuno dari Kepulauan Nusantara',
    meta: 'Teknik Pembuatan · Nusa Tenggara',
    views: '1,580',
    time: '6m',
  },
  {
    title: 'Ragam Wastra Nusantara: dari Sabang sampai Merauke',
    meta: 'Sejarah & Asal Usul · Kalimantan',
    views: '1,450',
    time: '10m',
  },
  {
    title: 'Songket: Kain Kebesaran Kerajaan Melayu',
    meta: 'Sejarah & Asal Usul · Sumatra',
    views: '1,240',
    time: '7m',
  },
  {
    title: 'Filosofi Motif Batik Keraton Yogyakarta',
    meta: 'Motif & Simbolisme · Jawa',
    views: '1,100',
    time: '7m',
  },
  {
    title: 'Gringsing Tenganan: Double Ikat Tersulit di Dunia',
    meta: 'Teknik Pembuatan · Bali',
    views: '980',
    time: '9m',
  },
];

export default function ArticlesPanel() {
  return (
    <div style={styles.panel}>
      <div style={styles.panelHeader}>
        <div style={styles.panelTitle}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 10l4-4 3 3 5-6"
              stroke="#4a7c5a"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          Artikel Paling Populer
        </div>
        <a href="#" style={styles.panelLink}>
          Kelola →
        </a>
      </div>
      {ARTICLES.map((art, i) => (
        <div
          key={art.title}
          style={{
            ...styles.articleRow,
            ...(i === ARTICLES.length - 1 ? { borderBottom: 'none' } : {}),
          }}
        >
          <span style={styles.artNum}>{i + 1}</span>
          <div style={styles.artInfo}>
            <div style={styles.artTitle}>{art.title}</div>
            <div style={styles.artMeta}>{art.meta}</div>
          </div>
          <div style={styles.artStats}>
            <span style={styles.artStat}>👁 {art.views}</span>
            <span style={styles.artStat}>🕐 {art.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
