import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ArrowRight, BarChart3, Clock, Eye } from 'lucide-react';

export function BottomSection() {
  const popularArticles = [
    {
      title: 'Sejarah Batik Jawa: Warisan Dunia UNESCO',
      category: 'Sejarah & Asal Usul · Jawa',
      views: '2,100',
      time: '8m',
    },
    {
      title: 'Tenun Ikat: Teknik Kuno dari Kepulauan Nusantara',
      category: 'Teknik Pembuatan · Nusa Tenggara',
      views: '1,580',
      time: '6m',
    },
    {
      title: 'Ragam Wastra Nusantara: dari Sabang sampai Merauke',
      category: 'Sejarah & Asal Usul · Kalimantan',
      views: '1,450',
      time: '10m',
    },
    {
      title: 'Songket: Kain Kebesaran Kerajaan Melayu',
      category: 'Sejarah & Asal Usul · Sumatra',
      views: '1,240',
      time: '7m',
    },
    {
      title: 'Filosofi Motif Batik Keraton Yogyakarta',
      category: 'Motif & Simbolisme · Jawa',
      views: '1,100',
      time: '7m',
    },
    {
      title: 'Gringsing Tenganan: Double Ikat Tersulit di Dunia',
      category: 'Teknik Pembuatan · Bali',
      views: '980',
      time: '9m',
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-6">
      {/* Stock Warning Table */}
      <Card className="col-span-2 border-stone-100 shadow-sm flex flex-col h-[400px]">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-stone-800">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Peringatan Stok
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-stone-500 text-xs hover:text-stone-800 flex items-center gap-1 h-8"
            >
              Kelola <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
          <div className="flex justify-between items-center pb-3 border-b border-stone-100 last:border-0 hover:bg-stone-50/50 p-2 rounded-lg transition-colors">
            <div>
              <p className="font-semibold text-stone-800 text-sm">
                Kain Gringsing Tenganan
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">Tenun</p>
            </div>
            <Badge
              variant="secondary"
              className="bg-orange-50 text-orange-700 border border-orange-100 hover:bg-orange-100 text-xs px-2.5 py-0.5"
            >
              Rendah (5)
            </Badge>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-stone-100 last:border-0 hover:bg-stone-50/50 p-2 rounded-lg transition-colors">
            <div>
              <p className="font-semibold text-stone-800 text-sm">
                Tenun Ikat Sumba Timur
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">Tenun</p>
            </div>
            <Badge
              variant="secondary"
              className="bg-red-50 text-red-700 border border-red-100 hover:bg-red-100 text-xs px-2.5 py-0.5"
            >
              Habis
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Popular Articles List */}
      <Card className="col-span-3 border-stone-100 shadow-sm flex flex-col h-[400px]">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-stone-800">
              <BarChart3 className="w-4 h-4 text-stone-400" />
              Artikel Paling Populer
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-stone-500 text-xs hover:text-stone-800 flex items-center gap-1 h-8"
            >
              Kelola <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
          <div className="flex flex-col gap-1">
            {popularArticles.map((article, index) => (
              <div
                key={index}
                className="group flex items-center gap-4 py-3 border-b border-stone-100 last:border-0 hover:bg-stone-50 px-2 rounded-lg transition-colors cursor-default"
              >
                <span className="text-stone-300 font-bold text-lg w-4 text-center group-hover:text-orange-500 transition-colors">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-stone-800 line-clamp-1 group-hover:text-orange-900 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {article.category}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-stone-400">
                  <div className="flex items-center gap-1.5 w-16">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center gap-1.5 w-10">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
