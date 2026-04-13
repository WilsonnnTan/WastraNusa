import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, ExternalLink } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#f5f2eb]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2d4a3e] text-white p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarFallback className="bg-orange-200">🧵</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold text-sm">WastraNusa</h2>
            <p className="text-xs opacity-70">Admin Panel</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold text-stone-800">
              Dashboard Overview
            </h1>
            <p className="text-sm text-stone-500">
              WastraNusa Admin - Friday, 10 April 2026
            </p>
          </div>
          <Button variant="outline" size="default">
            <ExternalLink /> Export
          </Button>
        </header>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Card 1: Total Produk */}
          <Card>
            <CardHeader>
              <div className="p-2 bg-stone-100 rounded-lg">📦</div>
              <CardAction>
                <Badge variant="ghost" className="text-emerald-600 text-[10px]">
                  +2 bulan ini
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-stone-500 text-xs">Total Produk</p>
              <p className="text-[10px] text-stone-400">di seluruh kategori</p>
            </CardContent>
          </Card>
          {/* Card 2: Total Artikel */}
          <Card>
            <CardHeader>
              <div className="p-2 bg-stone-100 rounded-lg w-fit">📖</div>
              <CardAction>
                <Badge variant="ghost" className="text-emerald-600 text-[10px]">
                  +1 minggu ini
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-stone-500 text-xs">Total Artikel</p>
              <p className="text-[10px] text-stone-400">ensiklopedia budaya</p>
            </CardContent>
          </Card>
          {/* Card 3: Stok Rendah / Habis */}
          <Card>
            <CardHeader>
              <div className="p-2 bg-stone-100 rounded-lg w-fit">⚠️</div>
              <CardAction>
                <Badge variant="destructive" className="text-[10px]">
                  perlu restok
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <p className="text-stone-500 text-xs">Stok Rendah / Habis</p>
              <p className="text-[10px] text-stone-400">1 habis · 1 kritis</p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section Row */}
        <div className="grid grid-cols-5 gap-6">
          {/* Stock Warning Table */}
          <Card className="col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center w-full">
                <CardTitle className="text-sm flex items-center gap-2">
                  ⚠️ Peringatan Stok
                </CardTitle>
                <Button variant="link" size="xs" className="text-stone-500">
                  Kelola <ChevronRight />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Kain Gringsing Tenganan</p>
                  <p className="text-xs text-stone-400">Tenun</p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-700"
                >
                  Rendah (5)
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Popular Articles List */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="text-sm">
                📊 Artikel Paling Populer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="my-2" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
