import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

import type { RegionFilter } from './types';

interface EncyclopediaSidebarProps {
  regions: RegionFilter[];
  topics: string[];
  onRegionClick?: (region: string) => void;
  onTopicClick?: (topic: string) => void;
  onResetFilters?: () => void;
}

export function EncyclopediaSidebar({
  regions,
  topics,
  onRegionClick,
  onTopicClick,
  onResetFilters,
}: EncyclopediaSidebarProps) {
  return (
    <aside className="space-y-3">
      {/* Region Filters */}
      <article className="rounded-2xl border border-[#d4cbbc] bg-[#f7f3ea] p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#587061]">
          <Filter className="h-4 w-4" />
          Filter Wilayah
        </h2>
        <ul className="space-y-1.5">
          {regions.map((region) => (
            <li key={region.name}>
              <Button
                variant="ghost"
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition h-auto ${
                  region.active
                    ? 'bg-[#2f5f49] text-[#eef3ea] hover:bg-[#2f5f49]/90 hover:text-[#eef3ea]'
                    : 'text-[#4c6457] hover:bg-[#ece5d8]'
                }`}
                onClick={() => onRegionClick?.(region.name)}
              >
                <span>{region.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    region.active
                      ? 'bg-white/20 text-[#f4f7f1]'
                      : 'bg-[#e5decf] text-[#839386]'
                  }`}
                >
                  {region.count}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      </article>

      {/* Topics */}
      <article className="rounded-2xl border border-[#d4cbbc] bg-[#f7f3ea] p-4">
        <h2 className="mb-3 text-sm font-bold text-[#587061]">Topik</h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Button
              key={topic}
              variant="outline"
              size="sm"
              className="h-auto rounded-md border-[#d8cfbf] bg-[#efeadf] px-2.5 py-1 text-xs font-semibold text-[#5d6f62] transition hover:bg-[#e4decf]"
              onClick={() => onTopicClick?.(topic)}
            >
              {topic}
            </Button>
          ))}
        </div>
      </article>

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
