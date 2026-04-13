'use client';

import { Badge } from '@/components/ui/badge';
import { ChevronRight, Hexagon } from 'lucide-react';
import Image from 'next/image';

// Tipe data disesuaikan dengan kebutuhan UI baru
type LikedArticleList = {
  id: string;
  title: string;
  topic: string;
  motifLabel: string;
  readMinutes: number;
  views: string;
  imageUrl?: string; // Optional: Jika ada gambar asli
};

// DATA DUMMY (Sesuai persis dengan teks di gambarmu)
const dummyArticles: LikedArticleList[] = [
  {
    id: '1',
    title: 'Sejarah Batik Jawa: Warisan Dunia UNESCO',
    topic: 'Sejarah & Asal Usul',
    motifLabel: 'Batik',
    readMinutes: 8,
    views: '2,100',
  },
  {
    id: '2',
    title: 'Tenun Ikat: Teknik Kuno dari Kepulauan Nusantara',
    topic: 'Teknik Pembuatan',
    motifLabel: 'Ikat',
    readMinutes: 6,
    views: '1,580',
  },
  {
    id: '3',
    title: 'Songket: Kain Kebesaran Kerajaan Melayu',
    topic: 'Sejarah & Asal Usul',
    motifLabel: 'Songket',
    readMinutes: 7,
    views: '1,240',
  },
  {
    id: '4',
    title: 'Kebaya: Identitas Perempuan Nusantara',
    topic: 'Motif & Simbolisme',
    motifLabel: 'Kebaya',
    readMinutes: 5,
    views: '870',
  },
  {
    id: '5',
    title: 'Ulos Batak: Kain Adat Penuh Makna Spiritual',
    topic: 'Upacara Adat',
    motifLabel: 'Ulos',
    readMinutes: 6,
    views: '760',
  },
];

export function LikedArticlesMain() {
  return (
    <div className="bg-white rounded-2xl border border-[#e8e2d5] shadow-sm overflow-hidden">
      {/* Header Panel */}
      <div className="px-6 py-5 border-b border-[#e8e2d5]">
        <h2 className="m-0 text-[18px] font-bold text-[#5c7365]">
          Artikel Disukai
        </h2>
      </div>

      {/* List Content */}
      <div className="p-6 flex flex-col gap-3.5">
        {dummyArticles.map((article) => (
          <div
            key={article.id}
            className="group flex items-center gap-4 rounded-xl border border-[#ece7dd] bg-white p-3.5 transition-all hover:bg-[#fcfbf9] hover:border-[#dcd5c7] cursor-pointer"
            onClick={() => console.log('Buka artikel:', article.title)}
          >
            {/* Left Thumbnail (Kotak Segi Enam atau Gambar) */}
            <div className="relative flex h-[60px] w-[60px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg bg-[#efe8db] text-[#b0a591]">
              {article.imageUrl ? (
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <>
                  <Hexagon
                    size={24}
                    strokeWidth={1.5}
                    className="text-[#c4b9a3]"
                  />
                  <span className="mt-1 text-[10px] font-semibold tracking-wide text-[#a39882]">
                    {article.motifLabel}
                  </span>
                </>
              )}
            </div>

            {/* Middle Content */}
            <div className="flex flex-1 flex-col items-start gap-1.5 overflow-hidden">
              <Badge
                variant="secondary"
                className="rounded bg-[#fdf6f2] px-2 py-0.5 text-[10px] font-medium text-[#c4826b] hover:bg-[#fdf6f2] border-none"
              >
                {article.topic}
              </Badge>

              <h3 className="w-full truncate text-[15px] font-bold text-[#4d6356] leading-none">
                {article.title}
              </h3>

              <p className="text-[12px] font-medium text-[#8f9b94]">
                {article.readMinutes} mnt - {article.views} dibaca
              </p>
            </div>

            {/* Right Chevron Icon */}
            <div className="pl-2 pr-1">
              <ChevronRight
                size={18}
                className="text-[#a3b1a8] transition-transform group-hover:translate-x-1"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
