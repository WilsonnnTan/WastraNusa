import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { IslandFilter } from '@/types/encyclopedia';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { useMemo, useState } from 'react';

const MAX_VISIBLE_ISLANDS = 9;

interface EncyclopediaSidebarProps {
  islands: IslandFilter[];
  topics: string[];
  selectedIsland?: string;
  selectedTopic?: string;
  onIslandClick?: (island: string) => void;
  onTopicClick?: (topic: string) => void;
  onResetFilters?: () => void;
}

export function EncyclopediaSidebar({
  islands,
  topics,
  selectedIsland,
  selectedTopic,
  onIslandClick,
  onTopicClick,
  onResetFilters,
}: EncyclopediaSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMoreIslands = islands.length > MAX_VISIBLE_ISLANDS;
  const activeIslandIsHidden = useMemo(() => {
    if (!selectedIsland) {
      return false;
    }

    return islands
      .slice(MAX_VISIBLE_ISLANDS)
      .some((island) => island.name === selectedIsland);
  }, [islands, selectedIsland]);

  const shouldShowAllIslands = isExpanded || activeIslandIsHidden;
  const visibleIslands = shouldShowAllIslands
    ? islands
    : islands.slice(0, MAX_VISIBLE_ISLANDS);

  return (
    <aside className="space-y-3">
      {/* Region Filters */}
      <Card className="rounded-2xl border border-[#d4cbbc] bg-[#f7f3ea] p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#587061]">
          <Filter className="h-4 w-4" />
          Filter Pulau
        </h2>
        <ul className="space-y-1.5">
          {visibleIslands.map((island) => (
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

        {hasMoreIslands ? (
          <Button
            variant="ghost"
            className="mt-2 h-auto w-full justify-between rounded-md px-3 py-2 text-sm font-semibold text-[#5d6f62] transition hover:bg-[#ece5d8] hover:text-[#5d6f62] aria-expanded:bg-transparent aria-expanded:text-[#5d6f62] aria-expanded:hover:bg-[#ece5d8] aria-expanded:hover:text-[#5d6f62]"
            onClick={() => setIsExpanded((value) => !value)}
            aria-expanded={shouldShowAllIslands}
          >
            <span>
              {shouldShowAllIslands
                ? 'Sembunyikan lainnya'
                : 'Tampilkan lainnya'}
            </span>
            {shouldShowAllIslands ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        ) : null}
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
