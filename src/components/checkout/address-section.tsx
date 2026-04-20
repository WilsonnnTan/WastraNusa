'use client';

import { Button } from '@/components/ui/button';
import { Edit2, MapPin, Plus, X } from 'lucide-react';
import { useState } from 'react';

export function AddressSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('1');

  // Cache Alamat (Akan hilang saat refresh)
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: 'Siti Rahayu',
      type: 'Rumah',
      isMain: true,
      phone: '+62 812 xxxx xxxx',
      detail: 'Jl. Cendana No. 12, RT 03/RW 05, Yogyakarta, 55281',
    },
  ]);

  const [newAddr, setNewAddr] = useState({
    name: '',
    type: 'Rumah',
    detail: '',
    phone: '',
  });

  const addAddress = () => {
    if (!newAddr.name || !newAddr.detail) return;
    const id = (addresses.length + 1).toString();
    setAddresses([...addresses, { ...newAddr, id, isMain: false }]);
    setIsModalOpen(false);
    setNewAddr({ name: '', type: 'Rumah', detail: '', phone: '' });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e8e2d5] p-6 shadow-sm mb-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-[#3d5446] flex items-center gap-2">
          <MapPin size={18} className="text-brand" /> Alamat Pengiriman
        </h3>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="outline"
          className="text-[10px] h-8 border-[#d8cfbf] rounded-lg gap-1 hover:bg-[#fbf8f2]"
        >
          <Plus size={12} /> Tambah Alamat Baru
        </Button>
      </div>

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            onClick={() => setSelectedAddress(addr.id)}
            className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
              selectedAddress === addr.id
                ? 'border-brand bg-brand/5'
                : 'border-[#e8e2d5] bg-white'
            }`}
          >
            <div className="flex gap-3">
              <input
                type="radio"
                checked={selectedAddress === addr.id}
                onChange={() => setSelectedAddress(addr.id)}
                className="mt-1 accent-brand h-4 w-4"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-[#3d5446]">
                    {addr.name}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      addr.type === 'Kantor'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-[#f0ede6] text-[#726759]'
                    }`}
                  >
                    {addr.type}
                  </span>
                  {addr.isMain && (
                    <span className="px-2 py-0.5 bg-brand text-[10px] font-bold text-white rounded">
                      Utama
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#7a887f]">{addr.phone}</p>
                <p className="text-[11px] text-[#7a887f] leading-relaxed mt-1">
                  {addr.detail}
                </p>
              </div>
              <button className="text-xs text-brand font-bold flex items-center gap-1 self-start">
                <Edit2 size={12} /> Ubah
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up Modal Tambah Alamat */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-[#3d5446]">Tambah Alamat Baru</h4>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                placeholder="Nama Penerima"
                className="w-full p-3 border rounded-xl text-sm"
                onChange={(e) =>
                  setNewAddr({ ...newAddr, name: e.target.value })
                }
              />
              <input
                placeholder="Nomor Telepon"
                className="w-full p-3 border rounded-xl text-sm"
                onChange={(e) =>
                  setNewAddr({ ...newAddr, phone: e.target.value })
                }
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setNewAddr({ ...newAddr, type: 'Rumah' })}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold border ${newAddr.type === 'Rumah' ? 'bg-brand text-white' : ''}`}
                >
                  Rumah
                </button>
                <button
                  onClick={() => setNewAddr({ ...newAddr, type: 'Kantor' })}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold border ${newAddr.type === 'Kantor' ? 'bg-brand text-white' : ''}`}
                >
                  Kantor
                </button>
              </div>
              <textarea
                placeholder="Alamat Lengkap"
                className="w-full p-3 border rounded-xl text-sm h-24"
                onChange={(e) =>
                  setNewAddr({ ...newAddr, detail: e.target.value })
                }
              />
              <Button
                onClick={addAddress}
                className="w-full bg-brand py-6 rounded-xl font-bold"
              >
                Simpan Alamat
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
