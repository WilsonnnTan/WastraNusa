'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  type CustomerAddress,
  useDeleteAddress,
  useSetDefaultAddress,
} from '@/hooks/use-address';
import { Check, Home, Pencil, Trash2 } from 'lucide-react';

interface SavedAddressCardProps {
  address: CustomerAddress;
  onEdit: (address: CustomerAddress) => void;
}

function SavedAddressCard({ address, onEdit }: SavedAddressCardProps) {
  const { mutate: deleteAddress, isPending: isDeleting } = useDeleteAddress();
  const { mutate: setDefault, isPending: isSettingDefault } =
    useSetDefaultAddress();

  return (
    <div className="overflow-hidden rounded-xl border border-[#ece7dd] bg-white transition-all hover:border-[#dcd5c7]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#ece7dd] bg-[#fcfbf9] px-5 py-3">
        <div className="flex items-center gap-3">
          <Home className="h-5 w-5 text-[#8f9b94]" />
          <span className="font-semibold text-[#4d6356]">{address.label}</span>
          {address.isDefault && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 rounded border-none bg-[#fdf6e8] px-2 py-0.5 text-[10px] font-medium text-[#c4826b] hover:bg-[#fdf6e8]"
            >
              <Check className="h-3 w-3" />
              Utama
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!address.isDefault && (
            <Button
              variant="outline"
              size="sm"
              disabled={isSettingDefault}
              className="h-7 rounded border-[#d8cfbf] bg-transparent px-3 text-xs text-[#5c7365] hover:bg-[#fcfbf9]"
              onClick={() => setDefault(address.id)}
            >
              {isSettingDefault ? 'Menyimpan...' : 'Jadikan Utama'}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-7 rounded border-[#d8cfbf] bg-transparent px-3 text-xs text-[#5c7365] hover:bg-[#fcfbf9]"
            onClick={() => onEdit(address)}
          >
            <Pencil className="mr-1 h-3 w-3" /> Edit
          </Button>
          {!address.isDefault && (
            <Button
              variant="outline"
              size="sm"
              disabled={isDeleting}
              className="h-7 rounded border-[#f5d9d9] bg-[#fdfaf5] px-3 text-xs text-[#c46b6b] hover:bg-[#fdf4f4] hover:text-[#a04e4e]"
              onClick={() => deleteAddress(address.id)}
            >
              <Trash2 className="mr-1 h-3 w-3" />
              {isDeleting ? 'Menghapus...' : 'Hapus'}
            </Button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-1 text-xs text-[#8f9b94]">Penerima</div>
            <div className="text-sm font-medium text-[#4d6356]">
              {address.recipientName}
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs text-[#8f9b94]">No. Telepon</div>
            <div className="text-sm font-medium text-[#4d6356]">
              {address.phone}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-1 text-xs text-[#8f9b94]">Alamat Lengkap</div>
          <div className="text-sm text-[#5c7365]">{address.fullAddress}</div>
        </div>

        {address.notes && (
          <div>
            <div className="mb-1 text-xs text-[#8f9b94]">Catatan</div>
            <div className="text-sm text-[#5c7365]">{address.notes}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function SavedAddressCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#ece7dd] bg-white">
      <div className="flex items-center justify-between border-b border-[#ece7dd] bg-[#fcfbf9] px-5 py-3">
        <Skeleton className="h-5 w-32 bg-[#e8e2d5]" />
        <Skeleton className="h-7 w-20 bg-[#e8e2d5]" />
      </div>
      <div className="flex flex-col gap-4 p-5">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10 bg-[#e8e2d5]" />
          <Skeleton className="h-10 bg-[#e8e2d5]" />
        </div>
        <Skeleton className="h-12 bg-[#e8e2d5]" />
      </div>
    </div>
  );
}

interface SavedAddressListProps {
  addresses: CustomerAddress[];
  isLoading: boolean;
  onEdit: (address: CustomerAddress) => void;
}

export function SavedAddressList({
  addresses,
  isLoading,
  onEdit,
}: SavedAddressListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <SavedAddressCardSkeleton />
        <SavedAddressCardSkeleton />
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#d8cfbf] p-8 text-center text-sm text-[#8f9b94]">
        Belum ada alamat tersimpan.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {addresses.map((address) => (
        <SavedAddressCard key={address.id} address={address} onEdit={onEdit} />
      ))}
    </div>
  );
}
