import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { IslandFilter } from '@/types/encyclopedia';
import { Filter } from 'lucide-react';

interface EncyclopediaSidebarProps {
  islands: IslandFilter[];
  topics: string[];
  selectedTopic?: string;
  onIslandClick?: (island: string) => void;
  onTopicClick?: (topic: string) => void;
  onResetFilters?: () => void;
}

export function EncyclopediaSidebar({
  islands,
  topics,
  selectedTopic,
  onIslandClick,
  onTopicClick,
  onResetFilters,
}: EncyclopediaSidebarProps) {
  return (
    <aside className="space-y-3">
      {/* Region Filters */}
      <Card className="rounded-2xl border border-[#d4cbbc] bg-[#f7f3ea] p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#587061]">
          <Filter className="h-4 w-4" />
          Filter Pulau
        </h2>
        <ul className="space-y-1.5">
          {islands.map((island) => (
            <li key={island.name}>
              <Button
                variant="ghost"
                className={`flex h-auto w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition ${
                  island.active
                    ? 'bg-[#2f5f49] text-[#eef3ea] hover:bg-[#2f5f49]/90 hover:text-[#eef3ea]'
                    : 'text-[#4c6457] hover:bg-[#ece5d8]'
                }`}
                onClick={() => onIslandClick?.(island.name)}
              >
                <span>{island.name}</span>
                <Badge
                  variant="secondary"
                  className={`rounded-full px-2 py-0.5 text-xs font-normal ${
                    island.active
                      ? 'bg-white/20 text-[#f4f7f1]'
                      : 'bg-[#e5decf] text-[#839386]'
                  }`}
                >
                  {island.count}
                </Badge>
              </Button>
            </li>
          ))}
        </ul>
      </Card>

      {/* Topics */}
      <Card className="rounded-2xl border border-[#d4cbbc] bg-[#f7f3ea] p-4">
        <h2 className="mb-3 text-sm font-bold text-[#587061]">Topik</h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Button
              key={topic}
              variant="outline"
              size="sm"
              className={`h-auto rounded-md border-[#d8cfbf] px-2.5 py-1 text-xs font-semibold transition ${
                selectedTopic === topic
                  ? 'bg-[#2f5f49] text-[#eef3ea] hover:bg-[#2f5f49]/90 hover:text-[#eef3ea]'
                  : 'bg-[#efeadf] text-[#5d6f62] hover:bg-[#e4decf]'
              }`}
              onClick={() => onTopicClick?.(topic)}
            >
              {topic}
            </Button>
          ))}
        </div>
      </Card>

      {/* Reset Button */}
      <Button
        variant="outline"
        className="w-full rounded-xl border-[#d4cbbc] bg-[#f7f3ea] px-4 py-2 text-sm font-bold text-[#5d6f62] transition hover:bg-[#eee8db]"
        onClick={onResetFilters}
      >
        Reset Semua Filter
      </Button>
    </aside>
  );
}
