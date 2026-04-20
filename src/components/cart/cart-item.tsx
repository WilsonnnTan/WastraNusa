'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Heart, Hexagon, Minus, Plus, Trash2 } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CartItem({ item, isSelected, onToggle, onUpdateQty }: any) {
  return (
    <div
      className={`p-5 flex gap-5 transition-colors ${isSelected ? 'bg-brand/5' : 'bg-white'}`}
    >
      {/* Checkbox Produk */}
      <div className="flex items-start pt-2">
        <Checkbox checked={isSelected} onChange={onToggle} />
      </div>

      {/* Gambar */}
      <div className="w-20 h-20 shrink-0 bg-[#f4efe6] border border-[#e8e2d5] rounded-xl flex flex-col items-center justify-center text-[#8e8476]">
        <Hexagon className="w-7 h-7 stroke-[1.5]" />
        <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">
          {item.category}
        </span>
      </div>

      {/* Info Detail */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-bold text-[#3d5446] text-sm leading-tight hover:text-brand cursor-pointer">
              {item.title}
            </h3>
            <p className="text-[11px] text-[#8e8476] mt-1 italic">
              {item.origin}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className="px-2 py-0.5 bg-[#f0ede6] rounded text-[10px] font-bold text-[#726759]">
                Size {item.size}
              </span>
              <span className="text-[10px] text-[#aca493]">
                Stok: {item.stock}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <p className="font-bold text-brand text-[15px]">
              Rp {item.price.toLocaleString('id-ID')}
            </p>
            {item.originalPrice && (
              <p className="text-[11px] text-[#aca493] line-through">
                Rp {item.originalPrice.toLocaleString('id-ID')}
              </p>
            )}
          </div>
        </div>

        {/* Footer Item: Simpan/Hapus & Stepper */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[#7a887f]">
            <button className="flex items-center gap-1.5 text-[11px] font-bold hover:text-brand transition-colors">
              <Heart size={14} />{' '}
              <span className="hidden sm:inline">Simpan</span>
            </button>
            <button className="flex items-center gap-1.5 text-[11px] font-bold hover:text-red-500 transition-colors">
              <Trash2 size={14} />{' '}
              <span className="hidden sm:inline">Hapus</span>
            </button>
          </div>

          <div className="flex items-center border border-[#d8cfbf] rounded-lg overflow-hidden h-8 bg-white shadow-sm">
            <button
              onClick={() => onUpdateQty(-1)}
              className="px-2.5 bg-[#fbf8f2] hover:bg-[#f0ede6] text-[#455c4d] border-r border-[#d8cfbf] transition-colors"
            >
              <Minus size={12} strokeWidth={3} />
            </button>
            <input
              type="text"
              value={item.quantity}
              className="w-9 text-center text-xs font-extrabold text-[#3d5446] bg-transparent outline-none"
              readOnly
            />
            <button
              onClick={() => onUpdateQty(1)}
              className="px-2.5 bg-[#fbf8f2] hover:bg-[#f0ede6] text-[#455c4d] border-l border-[#d8cfbf] transition-colors"
            >
              <Plus size={12} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
