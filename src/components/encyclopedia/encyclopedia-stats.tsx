import type { Stat } from '@/types/encyclopedia';

interface EncyclopediaStatsProps {
  stats: Stat[];
}

export function EncyclopediaStats({ stats }: EncyclopediaStatsProps) {
  return (
    <div className="mt-7 flex gap-3 border-y border-[#d8d0c1] py-5">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-3xl font-extrabold leading-none tracking-tight text-[#2f5b49]">
            {stat.value}
          </p>
          <p className="mt-1.5 text-sm text-[#586f62]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
