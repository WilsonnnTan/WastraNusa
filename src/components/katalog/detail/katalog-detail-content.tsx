import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import type { CatalogProduct } from '../data';
import { formatRupiah } from '../utils';

export type DetailTab = 'deskripsi' | 'spesifikasi';

type KatalogDetailContentProps = {
  activeTab: DetailTab;
  product: CatalogProduct;
  onTabChange: (tab: DetailTab) => void;
};

const PRODUCT_DESCRIPTION =
  'Batik Tulis Kawung merupakan salah satu motif batik tertua dari Keraton Yogyakarta dan Solo. Motif kawung terinspirasi dari buah aren (kolang-kaling) yang disusun geometris, melambangkan kesucian, kekuatan, dan harapan agar manusia selalu ingat pada asal-usulnya. Dibuat secara tulis tangan menggunakan canting dan malam, setiap lembar membutuhkan 2-4 minggu pengerjaan oleh pengrajin berpengalaman di Kampung Batik Laweyan, Solo.';

const CARE_GUIDES = [
  'Cuci dengan tangan menggunakan sabun lerak atau sampo',
  'Jangan diperas, cukup ditekan lembut',
  'Jangan dijemur di bawah sinar matahari langsung',
  'Setrika dengan suhu rendah dari bagian dalam kain',
  'Simpan terlipat rapi, hindari paparan cahaya berlebihan',
];

export function KatalogDetailContent({
  activeTab,
  product,
  onTabChange,
}: KatalogDetailContentProps) {
  return (
    <Card className="rounded-2xl border border-[#d9d0c2] bg-[#f7f3ea] p-0">
      <div className="inline-flex items-center gap-2 border-b border-[#ddd4c5] p-3">
        {[
          { key: 'deskripsi', label: 'Deskripsi' },
          { key: 'spesifikasi', label: 'Spesifikasi' },
        ].map((tab) => (
          <Button
            key={tab.key}
            type="button"
            variant="ghost"
            className={cn(
              'rounded-none border-b-2 border-transparent px-2 pb-2 text-sm text-[#54685c]',
              activeTab === tab.key && 'border-[#2f5f49] text-[#2f5f49]',
            )}
            onClick={() => onTabChange(tab.key as DetailTab)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === 'deskripsi' ? (
        <div className="flex flex-col gap-4 p-5">
          <h3 className="text-3xl font-bold text-[#2f5b49]">
            Tentang Batik Tulis Kawung
          </h3>
          <p className="text-[15px] leading-7 text-[#445c50]">
            {PRODUCT_DESCRIPTION}
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            <Card className="rounded-xl border border-[#ddd4c5] bg-[#efe8dc] px-4 py-3">
              <p className="text-xs text-[#9f9687]">Bahan</p>
              <p className="font-semibold text-[#355847]">
                Kain Mori Primissima 100% Katun
              </p>
            </Card>
            <Card className="rounded-xl border border-[#ddd4c5] bg-[#efe8dc] px-4 py-3">
              <p className="text-xs text-[#9f9687]">Teknik</p>
              <p className="font-semibold text-[#355847]">
                Batik Tulis Canting
              </p>
            </Card>
          </div>

          <div>
            <h4 className="text-xl font-bold text-[#315745]">
              Panduan Perawatan
            </h4>
            <div className="mt-2 flex flex-col gap-1.5 text-[15px] text-[#495f54]">
              {CARE_GUIDES.map((item, index) => (
                <p key={item} className="inline-flex items-start gap-2">
                  <span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#dfd6c8] text-xs">
                    {index + 1}
                  </span>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-0 p-5 text-sm text-[#41594d]">
          {[
            ['Nama Produk', product.name],
            ['Kategori', product.category],
            ['Asal', `${product.city}, ${product.region}`],
            ['Harga', formatRupiah(product.price)],
            ['Stok', `${product.stock} unit`],
            ['Ukuran Tersedia', product.sizes.join(', ')],
          ].map(([label, value], index) => (
            <div key={label}>
              <div className="grid grid-cols-[160px_minmax(0,1fr)] gap-3 py-2">
                <p className="text-[#6e7a70]">{label}</p>
                <p className="font-semibold text-[#2f5a48]">{value}</p>
              </div>
              {index < 5 ? <Separator className="bg-[#ddd4c5]" /> : null}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
