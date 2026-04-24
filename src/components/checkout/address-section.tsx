'use client';

import AddUpdateAddressModal from '@/components/profile/saved-address/add-update-address-modal';
import { Button } from '@/components/ui/button';
import { type CustomerAddress, useAddresses } from '@/hooks/use-address';
import type { CheckoutAddressSelection } from '@/types/checkout';
import { Edit2, MapPin, Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface AddressSectionProps {
  initialSelectedAddressId?: string;
  onSelectAddress?: (address: CheckoutAddressSelection | null) => void;
}

function toCheckoutAddressSelection(
  address: CustomerAddress,
): CheckoutAddressSelection {
  return {
    id: address.id,
    label: address.label,
    recipientName: address.recipientName,
    phone: address.phone,
    fullAddress: address.fullAddress,
    city: address.city,
    province: address.province,
    postalCode: address.postalCode,
  };
}

export function AddressSection({
  initialSelectedAddressId,
  onSelectAddress,
}: AddressSectionProps) {
  const { data: addresses = [], isLoading, error } = useAddresses();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<CustomerAddress | null>(
    null,
  );
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    () => initialSelectedAddressId ?? null,
  );

  const activeAddressId = useMemo(() => {
    if (selectedAddressId) return selectedAddressId;

    const defaultAddress = addresses.find((address) => address.isDefault);
    if (defaultAddress) return defaultAddress.id;

    return addresses[0]?.id ?? null;
  }, [addresses, selectedAddressId]);

  useEffect(() => {
    const activeAddress = addresses.find(
      (address) => address.id === activeAddressId,
    );
    onSelectAddress?.(
      activeAddress ? toCheckoutAddressSelection(activeAddress) : null,
    );
  }, [activeAddressId, addresses, onSelectAddress]);

  const errorMessage =
    error instanceof Error ? error.message : 'Gagal memuat alamat';

  const shouldShowAddAddressWarning =
    !isLoading &&
    (addresses.length === 0 ||
      (error instanceof Error &&
        /address|alamat|not found|belum/i.test(error.message)));

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (address: CustomerAddress) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    const selectedAddress = addresses.find((addr) => addr.id === addressId);
    onSelectAddress?.(
      selectedAddress ? toCheckoutAddressSelection(selectedAddress) : null,
    );
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#e8e2d5] p-6 shadow-sm mb-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-[#3d5446] flex items-center gap-2">
            <MapPin size={18} className="text-brand" /> Alamat Pengiriman
          </h3>
          <div className="flex items-center gap-2">
            <Link href="/profile/saved-address">
              <Button
                variant="outline"
                className="text-[10px] h-8 border-[#d8cfbf] rounded-lg gap-1 hover:bg-[#fbf8f2]"
              >
                Kelola Alamat
              </Button>
            </Link>
            <Button
              onClick={handleAddNew}
              variant="outline"
              className="text-[10px] h-8 border-[#d8cfbf] rounded-lg gap-1 hover:bg-[#fbf8f2]"
            >
              <Plus size={12} /> Tambah Alamat Baru
            </Button>
          </div>
        </div>

        {shouldShowAddAddressWarning && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
            <p className="text-xs font-semibold text-red-600">
              Belum ada alamat tersimpan. Silakan tambah alamat baru untuk
              melanjutkan checkout.
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-24 rounded-xl border border-[#e8e2d5] bg-[#f8f5ef] animate-pulse" />
            <div className="h-24 rounded-xl border border-[#e8e2d5] bg-[#f8f5ef] animate-pulse" />
          </div>
        ) : error && addresses.length === 0 ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
            <p className="text-xs text-red-600">{errorMessage}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => handleSelectAddress(addr.id)}
                className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  activeAddressId === addr.id
                    ? 'border-brand bg-brand/5'
                    : 'border-[#e8e2d5] bg-white'
                }`}
              >
                <div className="flex gap-3">
                  <input
                    type="radio"
                    checked={activeAddressId === addr.id}
                    onChange={() => handleSelectAddress(addr.id)}
                    className="mt-1 accent-brand h-4 w-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-[#3d5446]">
                        {addr.recipientName}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#f0ede6] text-[#726759]">
                        {addr.label}
                      </span>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 bg-brand text-[10px] font-bold text-white rounded">
                          Utama
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#7a887f]">{addr.phone}</p>
                    <p className="text-[11px] text-[#7a887f] leading-relaxed mt-1">
                      {addr.fullAddress}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-xs text-brand font-bold flex items-center gap-1 self-start"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleEdit(addr);
                    }}
                  >
                    <Edit2 size={12} /> Ubah
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddUpdateAddressModal
        key={editingAddress?.id ?? 'new'}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={editingAddress}
      />
    </>
  );
}
