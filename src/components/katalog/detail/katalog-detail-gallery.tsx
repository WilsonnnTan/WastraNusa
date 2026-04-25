import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

type KatalogDetailGalleryProps = {
  category: string;
};

const THUMBNAILS = ['Batik', 'Ikat', 'Ikat', 'Ulos', 'Ulos'];

export function KatalogDetailGallery({ category }: KatalogDetailGalleryProps) {
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
        {THUMBNAILS.map((item, index) => (
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
