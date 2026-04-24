'use client';

import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  BookOpenText,
  CircleCheck,
  Minus,
  Plus,
  ShoppingCart,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { catalogProducts, detailArticleItems } from './data';

function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString('id-ID')}`;
}

function ProductGallery({ category }: { category: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Card className="relative h-[430px] rounded-2xl border border-[#ddd4c5] bg-[#ebe2d4] p-0">
        <Badge className="absolute left-3 top-3 bg-[#2f5f49] text-[#edf4ec]">
          {category}
        </Badge>
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-2 text-[#7f715c]">
            <span className="size-4 rotate-45 border border-[#cebda2]" />
            <span className="text-sm font-medium">{category}</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-5 gap-2">
        {['Batik', 'Ikat', 'Ikat', 'Ulos', 'Ulos'].map((item, index) => (
          <Card
            key={`${item}-${index}`}
            className="h-16 items-center justify-center gap-1 rounded-xl border border-[#ddd4c5] bg-[#efe7da] p-0"
          >
            <span className="size-3 rotate-45 border border-[#cebda2]" />
            <span className="text-xs text-[#6e6458]">{item}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function KatalogDetailMain({ slug }: { slug: string }) {
  const product = useMemo(
    () => catalogProducts.find((item) => item.slug === slug),
    [slug],
  );
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Coklat Sogan');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'deskripsi' | 'spesifikasi'>(
    'deskripsi',
  );

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-[1320px] px-4 pb-10 pt-6 md:px-6 lg:px-8">
        <p className="text-sm text-[#8b5e4a]">Produk tidak ditemukan.</p>
      </main>
    );
  }

  const safeQuantity = Math.min(Math.max(quantity, 1), product.stock);
  const encyclopediaFacts = [
    ['Ditetapkan UNESCO', '2 Oktober 2009'],
    ['Asal Tertua', 'Kerajaan Mataram, abad ke-12'],
    ['Pusat Produksi', 'Solo, Yogyakarta, Pekalongan'],
  ] as const;

  return (
    <main className="border-t border-[#ddd4c5]">
      <section className="mx-auto w-full max-w-[1320px] px-4 pb-8 pt-6 md:px-6 lg:px-8">
        <Breadcrumb>
          <BreadcrumbList className="text-[#66786d] text-sm font-medium">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="hover:text-[#2f5b49]">
                Beranda
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/katalog" className="hover:text-[#2f5b49]">
                Katalog
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#2f5b49]">
                {product.category}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-[280px] truncate text-[#2f5b49]">
                {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-4 grid gap-5 xl:grid-cols-[minmax(0,430px)_minmax(0,1fr)]">
          <ProductGallery category={product.category} />

          <div>
            <div className="flex flex-wrap gap-1.5">
              <Badge
                variant="outline"
                className="border-[#e0d8ca] bg-[#f4ecdd] text-[#baa489]"
              >
                {product.category}
              </Badge>
              <Badge
                variant="outline"
                className="border-[#e0d8ca] bg-[#f4ecdd] text-[#bc7c5f]"
              >
                {product.region}
              </Badge>
            </div>

            <h1 className="mt-2 text-5xl font-bold tracking-tight text-[#2f5b49]">
              {product.name}
            </h1>

            <p className="mt-2 text-sm text-[#5f665e]">
              Dijual oleh{' '}
              <span className="font-semibold text-[#ca724e]">
                Batik Mataram Solo
              </span>
              {' · '}Solo, Jawa Tengah
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-[#598a66]">
              <CircleCheck className="size-4" />
              Stok: {product.stock}
            </p>

            <Card className="mt-4 rounded-2xl border border-[#ddd4c5] bg-[#efe9de] px-5 py-4">
              <h2 className="text-4xl font-extrabold tracking-tight text-[#2f5f49]">
                {formatRupiah(product.price)}
              </h2>
              <p className="text-sm text-[#6d6a62]">
                Harga sudah termasuk PPN • Belum termasuk ongkos kirim
              </p>
            </Card>

            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#3e5348]">
              Batik Tulis Kawung merupakan salah satu motif batik tertua dari
              Keraton Yogyakarta dan Solo. Motif kawung terinspirasi dari buah
              aren (kolang-kaling) yang disusun geometris, melambangkan
              kesucian, kekuatan, dan harapan.
              <span className="ml-1 font-semibold text-[#ca724e]">
                Baca selengkapnya
              </span>
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-[#4d6458]">
                  Pilihan Warna:
                </span>
                {['Coklat Sogan', 'Hitam', 'Biru Indigo'].map((color) => (
                  <Button
                    key={color}
                    type="button"
                    size="sm"
                    variant="outline"
                    className={cn(
                      'rounded-full border-[#ddd3c2] bg-[#f4efe5] text-[#4f6558]',
                      selectedColor === color && 'bg-[#dfe8dd] text-[#315642]',
                    )}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[#4d6458]">
                  Ukuran
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant="outline"
                    className={cn(
                      'rounded-lg border-[#ddd4c5] bg-[#f5f0e7] text-[#496356]',
                      selectedSize === size &&
                        'border-[#2f5f49] bg-[#2f5f49] text-[#edf4ec]',
                    )}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Card className="inline-flex flex-row items-center gap-0 rounded-xl border border-[#ddd4c5] bg-[#f4efe5] p-1">
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  className="rounded-md"
                  onClick={() =>
                    setQuantity((currentQuantity) =>
                      Math.max(1, currentQuantity - 1),
                    )
                  }
                  disabled={safeQuantity <= 1}
                >
                  <Minus />
                </Button>
                <span className="min-w-8 text-center text-sm font-semibold text-[#315642]">
                  {safeQuantity}
                </span>
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  className="rounded-md"
                  onClick={() =>
                    setQuantity((currentQuantity) =>
                      Math.min(product.stock, currentQuantity + 1),
                    )
                  }
                  disabled={safeQuantity >= product.stock}
                >
                  <Plus />
                </Button>
              </Card>
              <span className="text-sm text-[#6c6962]">
                Maks. {product.stock} unit
              </span>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Button className="h-11 rounded-xl bg-[#2f5f49] text-[#edf4ec] hover:bg-[#254a39]">
                <ShoppingCart data-icon="inline-start" />
                Tambah ke Keranjang
              </Button>
              <Button className="h-11 rounded-xl bg-[#cc7543] text-white hover:bg-[#b56539]">
                Beli Langsung
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1320px] gap-4 px-4 pb-10 md:px-6 xl:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
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
                onClick={() =>
                  setActiveTab(tab.key as 'deskripsi' | 'spesifikasi')
                }
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
                Batik Tulis Kawung merupakan salah satu motif batik tertua dari
                Keraton Yogyakarta dan Solo. Motif kawung terinspirasi dari buah
                aren (kolang-kaling) yang disusun geometris, melambangkan
                kesucian, kekuatan, dan harapan agar manusia selalu ingat pada
                asal-usulnya. Dibuat secara tulis tangan menggunakan canting dan
                malam, setiap lembar membutuhkan 2-4 minggu pengerjaan oleh
                pengrajin berpengalaman di Kampung Batik Laweyan, Solo.
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
                  {[
                    'Cuci dengan tangan menggunakan sabun lerak atau sampo',
                    'Jangan diperas, cukup ditekan lembut',
                    'Jangan dijemur di bawah sinar matahari langsung',
                    'Setrika dengan suhu rendah dari bagian dalam kain',
                    'Simpan terlipat rapi, hindari paparan cahaya berlebihan',
                  ].map((item, index) => (
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

        <aside className="flex flex-col gap-3">
          <Card className="overflow-hidden rounded-2xl border border-[#ddd3c3] bg-[#f6f2e9] p-0">
            <div className="flex items-center justify-between bg-[#2f5f49] px-4 py-3 text-[#edf4ec]">
              <h3 className="inline-flex items-center gap-1.5 text-sm font-bold">
                <BookOpenText className="size-4" />
                Ensiklopedia Budaya
              </h3>
            </div>
            <div className="flex flex-col gap-3 p-3">
              <p className="text-sm text-[#9b9386]">Terkait Produk Ini</p>
              <Card className="items-center rounded-xl border border-[#ddd4c5] bg-[#ece3d5] py-5">
                <span className="size-4 rotate-45 border border-[#cebda2]" />
                <p className="text-sm font-semibold text-[#6d665c]">Batik</p>
              </Card>
              <h4 className="text-2xl font-bold leading-tight text-[#2f5b49]">
                Sejarah Batik Jawa: Warisan Dunia UNESCO
              </h4>
              <p className="text-sm leading-6 text-[#4d6056]">
                Batik adalah teknik seni pewarnaan kain menggunakan malam
                (lilin) sebagai perintang warna. Pada 2 Oktober 2009, UNESCO
                menetapkan Batik Indonesia sebagai warisa...
              </p>
              <div className="rounded-xl border border-[#ddd4c5] bg-[#f1ebdf] p-3">
                <div className="grid gap-2 text-xs text-[#455b50]">
                  {encyclopediaFacts.map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[110px_minmax(0,1fr)] gap-2"
                    >
                      <span className="text-[#6e7a70]">{label}</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="rounded-xl bg-[#cc7543] text-white hover:bg-[#b56439]">
                Baca Artikel Lengkap →
              </Button>
              <Separator className="bg-[#ddd4c5]" />
              <div className="flex flex-col gap-2">
                <h5 className="text-sm font-semibold text-[#40584c]">
                  Artikel Lainnya
                </h5>
                {detailArticleItems.map((item) => (
                  <Card
                    key={item.title}
                    className="flex-row items-center gap-2 rounded-xl border border-[#ddd4c5] bg-[#f1ebdf] px-2 py-2"
                  >
                    <div className="size-9 shrink-0 rounded-md border border-dashed border-[#d3c4ad] bg-[#e8ddcc]" />
                    <div>
                      <p className="line-clamp-2 text-xs font-medium text-[#42584d]">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#8b8479]">{item.readTime}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </aside>
      </section>
    </main>
  );
}
