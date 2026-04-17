'use client';

import { AdminHeader } from '@/components/admin/admin-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useArticles, useDeleteArticle } from '@/hooks/use-article';
import { MapPin, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import AddArticleModal from './add-article-modal';

function TableRowSkeleton() {
  return (
    <tr className="border-t border-[#ece7de]">
      <td className="px-4 py-3">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-48 bg-[#eee2d0]" />
          <Skeleton className="h-4 w-32 bg-[#eee2d0]" />
        </div>
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-6 w-16 rounded-md bg-[#eee2d0]" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-24 bg-[#eee2d0]" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-20 bg-[#eee2d0]" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="ml-auto h-4 w-12 bg-[#eee2d0]" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="ml-auto h-4 w-12 bg-[#eee2d0]" />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="size-8 rounded-md bg-[#eee2d0]" />
          <Skeleton className="size-8 rounded-md bg-[#eee2d0]" />
        </div>
      </td>
    </tr>
  );
}

export function AdminArticleContent() {
  const [page] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: articlesData, isLoading } = useArticles(page, 10);
  const { mutate: deleteArticle, isPending: isDeleting } = useDeleteArticle();

  const headerData = useMemo(
    () => ({
      title: 'Manajemen Artikel',
      subtitle: 'Kelola konten edukasi wastra nusantara',
      // Necessary fields for AdminHeader type but not used in UI
      brandName: '',
      brandLabel: '',
      adminName: '',
      adminRole: '',
      lastUpdatedLabel: '',
      summary: [],
      stockAlerts: [],
      popularArticles: [],
    }),
    [],
  );

  const handleDelete = (slug: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      deleteArticle(slug);
    }
  };

  return (
    <main className="flex flex-col">
      <AdminHeader data={headerData} />

      <section className="flex-1 bg-[#f0ede5] px-5 py-5 md:px-8">
        <div className="flex flex-col gap-4 rounded-2xl bg-[#ebe6db] p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid w-full gap-2 sm:grid-cols-2 lg:max-w-[520px]">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground outline-none" />
                <Input
                  className="bg-background pl-8"
                  placeholder="Cari judul..."
                />
              </div>
              <Input className="bg-background" placeholder="Semua Wilayah" />
            </div>
            <div className="flex items-center justify-end gap-3">
              <p className="text-sm text-muted-foreground">
                {isLoading ? '...' : articlesData?.meta.totalItems} artikel
              </p>
              <Button onClick={() => setIsAddModalOpen(true)}>
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
                    <th className="px-4 py-3">Wilayah</th>
                    <th className="px-4 py-3 text-right">Ditonton</th>
                    <th className="px-4 py-3 text-right">Baca (mnt)</th>
                    <th className="px-4 py-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRowSkeleton key={i} />
                    ))
                  ) : articlesData?.items.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-10 text-center text-[#8f8377]"
                      >
                        Belum ada artikel yang tersedia.
                      </td>
                    </tr>
                  ) : (
                    articlesData?.items.map((article) => (
                      <tr
                        key={article.slug}
                        className="border-t border-[#ece7de]"
                      >
                        <td className="px-4 py-3 text-[#2b2b2b]">
                          <div className="flex flex-col gap-0.5">
                            <p className="text-base font-semibold">
                              {article.title}
                            </p>
                            <p className="text-xs text-muted-foreground/80 line-clamp-1">
                              {article.motifLabel} · {article.region}
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
                          <div className="flex items-center gap-1.5 line-clamp-1">
                            <MapPin className="size-3.5" />
                            {article.region}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-semibold text-[#3d3a34]">
                          {article.views}
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-semibold text-[#3d3a34]">
                          {article.readMinutes}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="icon-sm"
                              variant="secondary"
                              aria-label="Edit artikel"
                              disabled
                            >
                              <Pencil />
                            </Button>
                            <Button
                              size="icon-sm"
                              variant="destructive"
                              aria-label="Hapus artikel"
                              onClick={() => handleDelete(article.slug)}
                              disabled={isDeleting}
                            >
                              <Trash2 />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      <AddArticleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </main>
  );
}
