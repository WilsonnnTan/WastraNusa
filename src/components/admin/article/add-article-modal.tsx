'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateArticle } from '@/hooks/use-article';
import {
  type CreateArticleInput,
  createArticleSchema,
} from '@/schemas/article.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface AddArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddArticleModal({
  isOpen,
  onClose,
}: AddArticleModalProps) {
  const [showModal, setShowModal] = useState(isOpen);
  const { mutate: createArticle, isPending } = useCreateArticle();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateArticleInput>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      topic: '',
      region: '',
      motifLabel: '',
      readMinutes: 5,
      sections: [{ title: '', content: '', order: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sections',
  });

  const onSubmit = (data: CreateArticleInput) => {
    createArticle(data, {
      onSuccess: () => {
        toast.success('Artikel berhasil ditambahkan');
        reset();
        onClose();
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : 'Gagal menambahkan artikel',
        );
      },
    });
  };

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
      <form
        onSubmit={handleSubmit(onSubmit)}
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
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="bg-[#f3ede8] hover:bg-[#e6dcd5] rounded-full text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Body / Form */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 custom-scrollbar">
          {/* Judul Artikel */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Judul Artikel *
            </label>
            <Input
              {...register('title')}
              type="text"
              placeholder="Contoh: Sejarah Batik Jawa: Warisan Dunia UNESCO"
              className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 placeholder:text-gray-400 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Artikel Wikipedia */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Artikel Wikipedia *
              </label>
              <Input
                {...register('wikipediaPageId')}
                type="text"
                placeholder="Batik / Songket / Ikat"
                className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 placeholder:text-gray-400 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
              />
              {errors.wikipediaPageId && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.wikipediaPageId.message}
                </p>
              )}
            </div>

            {/* Motif Label */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Label Motif *
              </label>
              <Input
                {...register('motifLabel')}
                type="text"
                placeholder="Batik Parang / Songket Palembang"
                className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
              />
              {errors.motifLabel && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.motifLabel.message}
                </p>
              )}
            </div>

            {/* Topik */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Topik *
              </label>
              <Input
                {...register('topic')}
                type="text"
                placeholder="Pakaian Adat / Tekstil"
                className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
              />
              {errors.topic && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.topic.message}
                </p>
              )}
            </div>

            {/* Pulau / Wilayah */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Pulau / Wilayah
              </label>
              <Input
                {...register('island')}
                type="text"
                placeholder="Jawa / Sumatera"
                className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
              />
            </div>

            {/* Provinsi */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Provinsi
              </label>
              <Input
                {...register('province')}
                type="text"
                placeholder="DI Yogyakarta"
                className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 placeholder:text-gray-400 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
              />
            </div>

            {/* Region / Daerah */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Region / Daerah *
              </label>
              <Input
                {...register('region')}
                type="text"
                placeholder="Yogyakarta"
                className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 placeholder:text-gray-400 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
              />
              {errors.region && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.region.message}
                </p>
              )}
            </div>

            {/* Estimasi Waktu Baca */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Estimasi Waktu Baca (menit)
              </label>
              <Input
                {...register('readMinutes', { valueAsNumber: true })}
                type="number"
                placeholder="5"
                className="h-11 px-4 bg-[#fdfaf7] border-[#e5ded5] rounded-xl text-gray-700 placeholder:text-gray-400 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d]"
              />
            </div>
          </div>

          {/* Ringkasan / Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Ringkasan / Summary *
            </label>
            <textarea
              {...register('excerpt')}
              rows={3}
              placeholder="Deskripsi singkat artikel yang muncul di halaman daftar artikel..."
              className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e5ded5] rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d] transition-all resize-none"
            />
            {errors.excerpt && (
              <p className="text-xs text-red-500 mt-1">
                {errors.excerpt.message}
              </p>
            )}
          </div>

          <hr className="border-[#ebdxc2]" />

          {/* Sections Management */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-800">
                Konten Section
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({ title: '', content: '', order: fields.length })
                }
                className="flex items-center gap-2 border-[#c26a3d] text-[#c26a3d] hover:bg-[#c26a3d]/10"
              >
                <Plus className="w-4 h-4" />
                Tambah Section
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 bg-[#fdfaf7] border border-[#e5ded5] rounded-2xl space-y-4 relative"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Judul Section {index + 1} *
                  </label>
                  <Input
                    {...register(`sections.${index}.title` as const)}
                    placeholder="Contoh: Sejarah Singkat"
                    className="h-10 bg-white"
                  />
                  {errors.sections?.[index]?.title && (
                    <p className="text-xs text-red-500 mt-1 italic">
                      {errors.sections[index]?.title?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Isi Konten *
                  </label>
                  <textarea
                    {...register(`sections.${index}.content` as const)}
                    rows={4}
                    placeholder="Tuliskan isi detail section di sini..."
                    className="w-full px-4 py-3 bg-white border border-[#e5ded5] rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c26a3d]/30 focus-visible:border-[#c26a3d] transition-all resize-none"
                  />
                  {errors.sections?.[index]?.content && (
                    <p className="text-xs text-red-500 mt-1 italic">
                      {errors.sections[index]?.content?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#ebdxc2] flex items-center gap-3 bg-[#fefdfb] rounded-b-2xl">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1 h-11 bg-[#c26a3d] hover:bg-[#a85b34] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-base"
          >
            {isPending ? (
              <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
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
            )}
            {isPending ? 'Menyimpan...' : 'Tambah Artikel'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-6 h-11 bg-white border-[#e5ded5] text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors text-base"
          >
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
}
