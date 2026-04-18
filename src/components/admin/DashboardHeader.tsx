import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="flex justify-between items-end mb-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-800 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          WastraNusa Admin - Jumat, 10 April 2026
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-4 text-stone-600 border-stone-200"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Export
        </Button>
        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-medium text-xs">
          AD
        </div>
      </div>
    </header>
  );
}
