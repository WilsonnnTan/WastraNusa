import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { EncyclopediaArticle } from '@/types/encyclopedia';
import { ArrowRight, Clock3, Eye } from 'lucide-react';

interface EncyclopediaFeaturedCardProps {
  article: EncyclopediaArticle;
  onReadMore?: (article: EncyclopediaArticle) => void;
}

export function EncyclopediaFeaturedCard({
  article,
  onReadMore,
}: EncyclopediaFeaturedCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl border border-[#d5ccbc] bg-[#faf8f2]">
      <div className="grid md:grid-cols-[320px_minmax(0,1fr)]">
        {/* Image Placeholder */}
        <div className="relative min-h-[185px] border-b border-dashed border-[#dacfbf] bg-[#ece1d0] md:min-h-[220px] md:border-b-0 md:border-r">
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-2 text-[#766a56]">
              <span className="h-5 w-5 rotate-45 border border-[#ccbda4]" />
              <span className="text-sm font-semibold">
                {article.motifLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
            <Badge className="rounded bg-[#2f5f49] px-2 py-1 text-[#edf3e8] hover:bg-[#2f5f49]/90">
              UNGGULAN
            </Badge>
            <Badge
              variant="outline"
              className="rounded border-0 bg-[#ece6d9] px-2 py-1 text-[#aea28f] hover:bg-[#ece6d9]/90"
            >
              {article.region}
            </Badge>
            <Badge
              variant="outline"
              className="rounded border-0 bg-[#efe2d8] px-2 py-1 text-[#c17f61] hover:bg-[#efe2d8]/90"
            >
              {article.topic}
            </Badge>
          </div>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#2f5b49]">
            {article.title}
          </h2>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#4f6658]">
            {article.excerpt}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#a09382]">
            {article.readMinutes && (
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-3.5 w-3.5" />
                {article.readMinutes} menit baca
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {article.views} ditonton
            </span>
            <span>{article.topic}</span>
          </div>

          <Button
            variant="outline"
            className="mt-4 inline-flex items-center gap-1 rounded-xl border-[#98ab9e] px-4 py-2 text-sm font-bold text-[#2f5f49] transition hover:bg-[#edf2ea]"
            onClick={() => onReadMore?.(article)}
          >
            Baca Selengkapnya
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
