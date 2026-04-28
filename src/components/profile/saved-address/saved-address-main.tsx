'use client';

import { Button } from '@/components/ui/button';
import { type CustomerAddress, useAddresses } from '@/hooks/use-address';
import { useState } from 'react';

import AddUpdateAddressModal from './add-update-address-modal';
import { SavedAddressList } from './saved-address-list';

export function SavedAddressMain() {
  const { data: addresses = [], isLoading } = useAddresses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<CustomerAddress | null>(
    null,
  );

  const handleEdit = (address: CustomerAddress) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-[#e8e2d5] bg-[#fdfaf5] shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-[#e8e2d5] px-6 py-5">
          <h2 className="m-0 text-[18px] font-bold text-[#5c7365]">
            Alamat Tersimpan{' '}
            {!isLoading && addresses.length > 0 && `(${addresses.length})`}
          </h2>
          <Button
            className="rounded-full bg-[#3c5043] px-4 hover:bg-[#2d3d32]"
            onClick={handleAddNew}
          >
            + Tambah Alamat
          </Button>
        </div>

        <div className="p-6">
          <SavedAddressList
            addresses={addresses}
            isLoading={isLoading}
            onEdit={handleEdit}
          />
        </div>
      </div>

      <AddUpdateAddressModal
        key={editingAddress?.id ?? 'new'}
        isOpen={isModalOpen}
        onClose={handleClose}
        initialData={editingAddress}
      />
    </>
  );
}
