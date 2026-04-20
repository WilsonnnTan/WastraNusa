import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Check, Home, Pencil, Trash2 } from 'lucide-react';

const addresses = [
  {
    id: '1',
    title: 'Rumah',
    isPrimary: true,
    recipient: 'Siti Rahayu',
    phone: '+62 812 3456 7890',
    fullAddress:
      'Jl. Cendana No. 12, RT 03/RW 05, Umbulharjo, Yogyakarta, DI Yogyakarta 55281',
    icon: Home,
  },
  {
    id: '2',
    title: 'Kantor',
    isPrimary: false,
    recipient: 'Siti Rahayu',
    phone: '+62 812 3456 7890',
    fullAddress:
      'Jl. Sudirman Blok A No. 5, Lantai 3, Setiabudi, Jakarta Selatan, DKI Jakarta 12190',
    icon: Building2,
  },
];

export function SavedAddressList() {
  return (
    <div className="flex flex-col gap-4">
      {addresses.map((address) => {
        const Icon = address.icon;

        return (
          <div
            key={address.id}
            className="overflow-hidden rounded-xl border border-[#ece7dd] bg-white transition-all hover:border-[#dcd5c7]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#ece7dd] bg-[#fcfbf9] px-5 py-3">
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-[#8f9b94]" />
                <span className="font-semibold text-[#4d6356]">
                  {address.title}
                </span>
                {address.isPrimary && (
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
                {!address.isPrimary && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded border-[#d8cfbf] bg-transparent px-3 text-xs text-[#5c7365] hover:bg-[#fcfbf9]"
                  >
                    Jadikan Utama
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 rounded border-[#d8cfbf] bg-transparent px-3 text-xs text-[#5c7365] hover:bg-[#fcfbf9]"
                >
                  <Pencil className="mr-1 h-3 w-3" /> Edit
                </Button>
                {!address.isPrimary && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded border-[#f5d9d9] bg-[#fdfaf5] px-3 text-xs text-[#c46b6b] hover:bg-[#fdf4f4] hover:text-[#a04e4e]"
                  >
                    <Trash2 className="mr-1 h-3 w-3" /> Hapus
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
                    {address.recipient}
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
                <div className="mb-1 text-xs text-[#8f9b94]">
                  Alamat Lengkap
                </div>
                <div className="text-sm text-[#5c7365]">
                  {address.fullAddress}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
