import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  BookOpen,
  Boxes,
  Cog,
  Download,
  Eye,
  LayoutDashboard,
  MapPin,
  PackageX,
  Pencil,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
} from 'lucide-react';

type SidebarMenu = {
  label: string;
  icon: React.ReactNode;
  badge?: number;
  active?: boolean;
};

type EncyclopediaArticle = {
  title: string;
  subtitle: string;
  topic: string;
  island: string;
  author: string;
  viewed: string;
  readTime: number;
};

const sidebarMenus: SidebarMenu[] = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard />,
  },
  {
    label: 'Artikel',
    icon: <BookOpen />,
    badge: 12,
    active: true,
  },
  {
    label: 'Produk & Inventori',
    icon: <Boxes />,
    badge: 12,
  },
  {
    label: 'Pesanan',
    icon: <ShoppingCart />,
    badge: 12,
  },
];

const encyclopediaArticles: EncyclopediaArticle[] = [
  {
    title: 'Sejarah Batik Jawa: Warisan',
    subtitle: 'Wiki: Batik · 10 Mar 2025',
    topic: 'Sejarah',
    island: 'Jawa',
    author: 'Dr. Nadia',
    viewed: '2,100',
    readTime: 8,
  },
  {
    title: 'Tenun Ikat: Teknik Kuno',
    subtitle: 'Wiki: Ikat · 7 Mar 2025',
    topic: 'Teknik',
    island: 'Nusa Tenggara',
    author: 'Prof. Yustinus',
    viewed: '1,580',
    readTime: 6,
  },
  {
    title: 'Songket: Kain Kebesaran',
    subtitle: 'Wiki: Songket · 5 Mar 2025',
    topic: 'Sejarah',
    island: 'Sumatra',
    author: 'Dra. Fatimah',
    viewed: '1,240',
    readTime: 7,
  },
  {
    title: 'Kebaya: Identitas',
    subtitle: 'Wiki: Kebaya · 8 Mar 2025',
    topic: 'Motif',
    island: 'Jawa',
    author: 'Ir. Sekar',
    viewed: '870',
    readTime: 5,
  },
  {
    title: 'Ulos Batak: Kain Adat',
    subtitle: 'Wiki: Ulos · 3 Mar 2025',
    topic: 'Upacara',
    island: 'Sumatra',
    author: 'Dr.',
    viewed: '760',
    readTime: 6,
  },
  {
    title: 'Lurik: Kain Garis Penjaga',
    subtitle: 'Wiki: Lurik · 1 Mar 2025',
    topic: 'Teknik',
    island: 'Jawa',
    author: 'Bambang',
    viewed: '430',
    readTime: 4,
  },
  {
    title: 'Gringsing Tenangan: Double',
    subtitle: 'Wiki: Gringsing · 11 Mar 2025',
    topic: 'Teknik',
    island: 'Bali',
    author: 'Dr. I Made Bandem',
    viewed: '980',
    readTime: 9,
  },
  {
    title: 'Ragam Wastra Nusantara:',
    subtitle: 'Wiki: Indonesian textiles · 12 Mar 2025',
    topic: 'Sejarah',
    island: 'Kalimantan',
    author: 'Tim',
    viewed: '1,450',
    readTime: 10,
  },
  {
    title: 'Filosofi Motif Batik',
    subtitle: 'Wiki: Batik · 9 Mar 2025',
    topic: 'Motif',
    island: 'Jawa',
    author: 'KRT.',
    viewed: '1,100',
    readTime: 7,
  },
  {
    title: 'Tenun Sumba: Kosmologi',
    subtitle: 'Wiki: Ikat · 6 Mar 2025',
    topic: 'Motif',
    island: 'Nusa Tenggara',
    author: 'Dr. Umbu',
    viewed: '670',
    readTime: 8,
  },
  {
    title: 'Upacara Mangulosi:',
    subtitle: 'Wiki: Ulos · 4 Mar 2025',
    topic: 'Upacara',
    island: 'Sumatra',
    author: 'Pdt. Dr.',
    viewed: '540',
    readTime: 5,
  },
  {
    title: 'Songket Minangkabau:',
    subtitle: 'Wiki: Songket · 2 Mar 2025',
    topic: 'Pengrajin',
    island: 'Sumatra',
    author: 'Dt. Rajo',
    viewed: '390',
    readTime: 6,
  },
];

export function AdminEnsiklopediaPage() {
  return (
    <div className="min-h-screen bg-[#f3efe6] text-foreground">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="flex flex-col bg-[#2f5b49] px-4 py-6 text-[#d9e7df]">
          <div className="flex items-center gap-3 rounded-xl bg-[#3a6a57] p-3">
            <div className="size-7 rounded-md bg-[#d9b979]" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">
                WastraNusa
              </span>
              <span className="text-xs text-[#9eb8ab]">Admin Panel</span>
            </div>
          </div>

          <nav className="mt-8 flex flex-1 flex-col gap-2">
            {sidebarMenus.map((menu) => (
              <div
                key={menu.label}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-[#d9e7df]/90"
              >
                <div className="flex items-center gap-2.5">
                  {menu.icon}
                  <span
                    className={
                      menu.active ? 'font-semibold text-[#f39c4d]' : undefined
                    }
                  >
                    {menu.label}
                  </span>
                </div>
                {menu.badge ? (
                  <Badge
                    variant="secondary"
                    className="h-5 bg-[#3a6a57] px-1.5 text-[10px] text-[#d9e7df]"
                  >
                    {menu.badge}
                  </Badge>
                ) : null}
              </div>
            ))}

            <Card className="mt-3 gap-2 rounded-2xl border-[#ba6754] bg-[#7f443b] p-4 text-[#f6d9cd] ring-0">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <PackageX />
                Peringatan Stok
              </div>
              <div className="flex flex-col gap-1 text-xs text-[#f4c8ba]">
                <p>1 produk habis</p>
                <p>1 produk stok rendah</p>
              </div>
            </Card>
          </nav>

          <div className="flex flex-col gap-3 border-t border-[#3a6a57] pt-5">
            <div className="flex items-center gap-2.5 px-3 py-2 text-sm">
              <Cog />
              <span>Pengaturan</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-[#3a6a57] px-3 py-2">
              <div className="size-7 rounded-full bg-[#9f7f48] text-center text-xs leading-7 font-semibold text-white">
                AD
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-white">Admin WastraNus</span>
                <span className="text-xs text-[#9eb8ab]">Super User</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex flex-col">
          <header className="border-b bg-background px-5 py-5 md:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-semibold text-[#1f352a]">
                  Manajemen Artikel Ensiklopedia
                </h1>
                <p className="text-sm text-muted-foreground">
                  WastraNusa Admin · Senin, 30 Maret 2026
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline">
                  <Download data-icon="inline-start" />
                  Export
                </Button>
                <div className="size-8 rounded-full bg-[#f0e7d7] text-center text-xs leading-8 font-semibold text-[#b48953]">
                  AD
                </div>
              </div>
            </div>
          </header>

          <section className="flex-1 bg-[#f0ede5] px-5 py-5 md:px-8">
            <div className="flex flex-col gap-4 rounded-2xl bg-[#ebe6db] p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="grid w-full gap-2 sm:grid-cols-2 lg:max-w-[520px]">
                  <div className="relative">
                    <Search className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      className="bg-background pl-8"
                      placeholder="Cari judul atau artikel wiki..."
                    />
                  </div>
                  <Input className="bg-background" />
                </div>
                <div className="flex items-center justify-end gap-3">
                  <p className="text-sm text-muted-foreground">12 artikel</p>
                  <Button>
                    <Plus data-icon="inline-start" />
                    Tambah Artikel
                  </Button>
                </div>
              </div>

              <Card className="overflow-hidden rounded-2xl border border-[#ddd6c9] bg-background py-0 ring-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] text-left">
                    <thead className="bg-[#ede8df] text-xs font-semibold tracking-wide text-[#6a645a] uppercase">
                      <tr>
                        <th className="px-4 py-3">Judul Artikel</th>
                        <th className="px-4 py-3">Topik</th>
                        <th className="px-4 py-3">Pulau</th>
                        <th className="px-4 py-3">Penulis</th>
                        <th className="px-4 py-3 text-right">Ditonton</th>
                        <th className="px-4 py-3 text-right">Baca (mnt)</th>
                        <th className="px-4 py-3 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {encyclopediaArticles.map((article) => (
                        <tr
                          key={article.title}
                          className="border-t border-[#ece7de]"
                        >
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-0.5">
                              <p className="text-base font-semibold text-[#2b2b2b]">
                                {article.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {article.subtitle}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="secondary"
                              className="bg-[#edf0f5] text-[#5e6f92]"
                            >
                              {article.topic}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-[#6d6a64]">
                            <div className="flex items-center gap-1.5">
                              <MapPin />
                              {article.island}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-[#6d6a64]">
                            {article.author}
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-semibold text-[#3d3a34]">
                            {article.viewed}
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-semibold text-[#3d3a34]">
                            {article.readTime}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                size="icon-sm"
                                variant="secondary"
                                aria-label="Edit artikel"
                              >
                                <Pencil />
                              </Button>
                              <Button
                                size="icon-sm"
                                variant="secondary"
                                aria-label="Lihat artikel"
                              >
                                <Eye />
                              </Button>
                              <Button
                                size="icon-sm"
                                variant="destructive"
                                aria-label="Hapus artikel"
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
