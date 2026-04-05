import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';

import type { ViewMode } from './types';

interface EncyclopediaViewToggleProps {
  currentView: ViewMode;
  articleCount: number;
  onViewChange?: (view: ViewMode) => void;
}

export function EncyclopediaViewToggle({
  currentView,
  articleCount,
  onViewChange,
}: EncyclopediaViewToggleProps) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm font-semibold text-[#4e6659]">
        Menampilkan {articleCount} artikel
      </p>
      <div className="flex items-center gap-1.5 rounded-md bg-[#f7f3ea] p-1">
        <Button
          variant="ghost"
          size="icon"
          className={`h-7 w-7 rounded ${
            currentView === 'grid'
              ? 'bg-[#2f5f49] text-[#f2f6ee] hover:bg-[#2f5f49]/90 hover:text-[#f2f6ee]'
              : 'text-[#63786b] hover:bg-[#ede7da]'
          }`}
          onClick={() => onViewChange?.('grid')}
        >
          <LayoutGrid className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`h-7 w-7 rounded ${
            currentView === 'list'
              ? 'bg-[#2f5f49] text-[#f2f6ee] hover:bg-[#2f5f49]/90 hover:text-[#f2f6ee]'
              : 'text-[#63786b] hover:bg-[#ede7da]'
          }`}
          onClick={() => onViewChange?.('list')}
        >
          <List className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
