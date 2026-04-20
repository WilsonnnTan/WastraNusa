'use client';

import { Button } from '@/components/ui/button';

import { SavedAddressList } from './saved-address-list';

export function SavedAddressMain() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e2d5] bg-[#fdfaf5] shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[#e8e2d5] px-6 py-5">
        <h2 className="m-0 text-[18px] font-bold text-[#5c7365]">
          Alamat Tersimpan (2)
        </h2>
        <Button className="rounded-full bg-[#3c5043] px-4 hover:bg-[#2d3d32]">
          + Tambah Alamat
        </Button>
      </div>

      <div className="p-6">
        <SavedAddressList />

        <Button
          variant="outline"
          className="mt-4 w-full rounded-xl border-dashed border-[#d8cfbf] bg-white py-6 text-[#5c7365] hover:bg-[#fcfbf9] hover:text-[#4d6356]"
        >
          + Tambah Alamat Baru
        </Button>
      </div>
    </div>
  );
}
