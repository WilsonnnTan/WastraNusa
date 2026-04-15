/**
 * Presentation constants for Encyclopedia page
 */
import type { RegionFilter, Stat } from '@/types/encyclopedia';

export const ENCYCLOPEDIA_STATS: Stat[] = [
  { value: '380+', label: 'Total Artikel' },
  { value: '34', label: 'Provinsi Tercakup' },
  { value: '120+', label: 'Jenis Wastra' },
  { value: '80+', label: 'Pengrajin Terdokumentasi' },
];

export const REGION_FILTERS: RegionFilter[] = [
  { name: 'Semua Wilayah', count: 12, active: true },
  { name: 'Jawa', count: 4 },
  { name: 'Bali', count: 1 },
  { name: 'Sumatra', count: 4 },
  { name: 'Kalimantan', count: 1 },
  { name: 'Sulawesi', count: 0 },
  { name: 'Nusa Tenggara', count: 2 },
  { name: 'Maluku', count: 0 },
  { name: 'Papua', count: 0 },
];

export const ENCYCLOPEDIA_TOPICS: string[] = [
  'Teknik Pembuatan',
  'Sejarah & Asal Usul',
  'Motif & Simbolisme',
  'Upacara Adat',
  'Pengrajin Lokal',
];
