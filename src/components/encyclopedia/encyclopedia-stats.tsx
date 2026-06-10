import type { Stat } from '@/types/encyclopedia';
import { BookOpen, Layers, type LucideIcon, Map, MapPin } from 'lucide-react';

interface EncyclopediaStatsProps {
  stats: Stat[];
}

const STAT_ICONS: Record<string, LucideIcon> = {
  'Total Artikel': BookOpen,
  'Pulau Tercakup': Map,
  'Provinsi Tercakup': MapPin,
  'Jenis Wastra': Layers,
};

export function EncyclopediaStats({ stats }: EncyclopediaStatsProps) {
  return (
    <div className="mt-7 grid grid-cols-2 gap-3 border-t border-[#d8d0c1] pt-5 sm:grid-cols-4">
      {stats.map((stat) => {
        const Icon = STAT_ICONS[stat.label] ?? BookOpen;

        return (
          <div
            key={stat.label}
            className="group flex items-center gap-3 rounded-xl border border-[#ddd3c2] bg-[#f7f3ea]/70 px-4 py-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#c7b59b] hover:bg-[#f7f3ea] hover:shadow-[0_14px_28px_-20px_rgba(47,91,73,0.6)]"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#2f5b49]/10 text-[#2f5b49] transition-colors duration-300 group-hover:bg-[#2f5b49] group-hover:text-[#f3ede2]">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-2xl font-extrabold leading-none tracking-tight text-[#2f5b49]">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs font-medium text-[#586f62]">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
