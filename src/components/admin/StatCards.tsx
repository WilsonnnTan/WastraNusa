import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Package,
} from 'lucide-react';

export function StatCards() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {/* Card 1: Total Produk */}
      <Card className="border-stone-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="p-2.5 bg-[#fdfaf5] border border-stone-100 rounded-xl w-fit text-orange-600">
            <Package className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <CardAction>
            <Badge
              variant="ghost"
              className="text-emerald-600 bg-emerald-50 text-[10px] px-2 py-0.5 rounded-full flex gap-1"
            >
              <ArrowUpRight className="w-3 h-3" />
              +2 bulan ini
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-stone-800 mt-2">12</div>
          <p className="text-stone-500 font-medium text-sm mt-1">
            Total Produk
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5">
            di seluruh kategori
          </p>
        </CardContent>
      </Card>

      {/* Card 2: Total Artikel */}
      <Card className="border-stone-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="p-2.5 bg-[#fdfaf5] border border-stone-100 rounded-xl w-fit text-orange-600">
            <BookOpen className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <CardAction>
            <Badge
              variant="ghost"
              className="text-emerald-600 bg-emerald-50 text-[10px] px-2 py-0.5 rounded-full flex gap-1"
            >
              <ArrowUpRight className="w-3 h-3" />
              +1 minggu ini
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-stone-800 mt-2">12</div>
          <p className="text-stone-500 font-medium text-sm mt-1">
            Total Artikel
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5">
            ensiklopedia budaya
          </p>
        </CardContent>
      </Card>

      {/* Card 3: Stok Rendah / Habis */}
      <Card className="border-stone-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="p-2.5 bg-red-50 border border-red-100 rounded-xl w-fit text-red-500">
            <AlertCircle className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <CardAction>
            <Badge
              variant="destructive"
              className="bg-red-100 hover:bg-red-200 text-red-600 border-none text-[10px] px-2 py-0.5 rounded-full flex gap-1"
            >
              <ArrowDownRight className="w-3 h-3" />
              perlu restok
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-stone-800 mt-2">2</div>
          <p className="text-stone-500 font-medium text-sm mt-1">
            Stok Rendah / Habis
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5">
            1 habis · 1 kritis
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
