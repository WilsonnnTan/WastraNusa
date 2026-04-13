// src/components/admin/artikel/AddArticleModal.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';

interface AddArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddArticleModal({
  isOpen,
  onClose,
}: AddArticleModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  if (isOpen && !showModal) {
    setShowModal(true);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!isOpen && !showModal) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-3xl bg-[#fefdfb] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] transition-all duration-300 transform ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ebdxc2]">
          <div className="flex items-center gap-3 text-gray-800">
            <svg
              className="w-5 h-5 text-[#8c6b5d]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h2 className="text-lg font-semibold">Tambah Artikel Baru</h2>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="bg-[#f3ede8] hover:bg-[#e6dcd5] rounded-full text-gray-500 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>

        {/* Body / Form */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 custom-scrollbar">
          {/* Judul Artikel */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Judul Artikel *
            </label>
            <Input
              type="text"
              placeholder="Contoh: Sejarah Batik Jawa: Warisan Dunia UNESCO"
              className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 placeholder:text-gray-400 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Artikel Wikipedia */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Artikel Wikipedia *
              </label>
              <Input
                type="text"
                placeholder="Batik / Songket / Ikat"
                className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 placeholder:text-gray-400 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
              />
            </div>
            {/* Topik */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Topik *
              </label>
              <Input
                type="text"
                className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
              />
            </div>

            {/* Pulau / Wilayah */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Pulau / Wilayah *
              </label>
              <Input
                type="text"
                className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
              />
            </div>
            {/* Provinsi */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Provinsi
              </label>
              <Input
                type="text"
                placeholder="DI Yogyakarta"
                className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 placeholder:text-gray-400 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
              />
            </div>

            {/* Region / Daerah */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Region / Daerah
              </label>
              <Input
                type="text"
                placeholder="Yogyakarta"
                className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 placeholder:text-gray-400 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
              />
            </div>
            {/* Penulis */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Penulis *
              </label>
              <Input
                type="text"
                placeholder="Dr. Nama Penulis"
                className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 placeholder:text-gray-400 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
              />
            </div>

            {/* Estimasi Waktu Baca */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Estimasi Waktu Baca (menit)
              </label>
              <Input
                type="number"
                placeholder="5"
                className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 placeholder:text-gray-400 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
              />
            </div>
          </div>

          {/* Ringkasan / Summary (Karena UI Input tidak support multiline, tetap pakai textarea dengan styling serupa) */}
          <div className="pb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Ringkasan / Summary *
            </label>
            <textarea
              rows={4}
              placeholder="Deskripsi singkat artikel yang muncul di halaman daftar ensiklopedia..."
              className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e5ded5] rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d] transition-all resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#ebdxc2] flex items-center gap-3 bg-[#fefdfb] rounded-b-2xl">
          <Button
            onClick={() => {
              /* Handle Submit */
            }}
            className="flex-1 h-11 bg-[#c26a3d] hover:bg-[#a85b34] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-base"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            Tambah Artikel
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 h-11 bg-white border-[#e5ded5] text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors text-base"
          >
            Batal
          </Button>
        </div>
      </div>
    </div>
  );
}
