import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookOpenText } from 'lucide-react';

import { detailArticleItems } from '../data';

type KatalogDetailEncyclopediaProps = {
  encyclopediaFacts: readonly [string, string][];
};

export function KatalogDetailEncyclopedia({
  encyclopediaFacts,
}: KatalogDetailEncyclopediaProps) {
  return (
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
            Batik adalah teknik seni pewarnaan kain menggunakan malam (lilin)
            sebagai perintang warna. Pada 2 Oktober 2009, UNESCO menetapkan
            Batik Indonesia sebagai warisa...
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
            Baca Artikel Lengkap ?
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
  );
}
