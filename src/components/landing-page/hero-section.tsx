'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function HeroSection() {
  return (
    <article className="relative min-h-[420px] overflow-hidden rounded-2xl border border-[#ddd5c6] bg-[#17130f] text-[#f7f3ea] shadow-[0_20px_44px_-30px_rgba(22,19,15,0.85)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_60%,rgba(190,140,56,0.66),rgba(31,26,20,0.05)_38%,transparent_70%),linear-gradient(132deg,#02040d_0%,#0e1019_42%,#51371d_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/25" />

      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
        <span className="mb-3 inline-flex w-fit items-center rounded-lg border border-white/25 bg-black/35 px-3 py-1 text-xs font-semibold text-[#ddd7ce] backdrop-blur">
          Kain Kebesaran Kerajaan
        </span>

        <h1 className="max-w-xl text-4xl font-bold leading-[1.15] tracking-tight text-[#f7f2e7] md:text-[46px]">
          Songket Palembang
          <br />
          Emas dalam Tenunan
        </h1>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#d5cec0]">
          Songket adalah kain mewah berbenang emas atau perak, simbol kejayaan
          kerajaan Melayu dan Minangkabau.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button
            className="rounded-xl bg-[#d7ccb7] px-5 py-2.5 text-sm font-bold text-[#2c503f] transition hover:bg-[#e4dccb]"
            type="button"
          >
            Lihat Songket
          </Button>
          <Button
            asChild
            className="rounded-xl border border-[#c7b59b] bg-white/10 px-5 py-2.5 text-sm font-semibold text-[#f8f3e9] transition hover:bg-white/15"
          >
            <a href="/ensiklopedia">Jelajahi Ensiklopedia</a>
          </Button>
        </div>
      </div>

      <span className="absolute right-4 top-4 rounded-md bg-black/40 px-2.5 py-1 text-xs font-semibold text-[#e8e2d5]">
        4 / 4
      </span>
      <Button
        className="absolute right-5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/12 text-[#efe9db] backdrop-blur transition hover:bg-white/20"
        type="button"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <div className="absolute bottom-5 right-6 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-white/55" />
        <span className="h-2 w-2 rounded-full bg-white/85" />
        <span className="h-2 w-7 rounded-full bg-white" />
      </div>
    </article>
  );
}
