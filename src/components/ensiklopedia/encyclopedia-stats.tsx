import type { Stat } from './types';

interface EncyclopediaStatsProps {
  stats: Stat[];
}

export function EncyclopediaStats({ stats }: EncyclopediaStatsProps) {
  return (
    <div className="mt-7 grid grid-cols-2 gap-4 border-y border-[#d8d0c1] py-5 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="text-4xl font-extrabold leading-none tracking-tight text-[#2f5b49]">
            {stat.value}
          </p>
          <p className="mt-1 text-sm text-[#586f62]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
