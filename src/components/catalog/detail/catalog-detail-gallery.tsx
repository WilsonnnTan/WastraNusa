import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

type CatalogDetailGalleryProps = {
  category: string;
  imageURL?: string | null;
};

const THUMBNAILS = ['Batik', 'Ikat', 'Ikat', 'Ulos', 'Ulos'];

export function CatalogDetailGallery({
  category,
  imageURL,
}: CatalogDetailGalleryProps) {
  return (
    <div className="flex flex-col gap-3">
      <Card className="relative h-[430px] rounded-2xl border border-[#ddd4c5] bg-[#ebe2d4] p-0 overflow-hidden">
        <Badge className="absolute left-3 top-3 z-10 bg-[#2f5f49] text-[#edf4ec]">
          {category}
        </Badge>
        {imageURL ? (
          <Image src={imageURL} alt={category} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-2 text-[#7f715c]">
              <span className="size-4 rotate-45 border border-[#cebda2]" />
              <span className="text-sm font-medium">{category}</span>
            </div>
          </div>
        )}
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
