'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Gender, ProductStatus, VariantType } from '@/generated/prisma/enums';
import {
  useArticleOptions,
  useCreateProductInventory,
  useUpdateProductInventory,
} from '@/hooks/use-product-inventory';
import {
  type CreateProductInput,
  type UpdateProductInput,
  createProductSchema,
  updateProductSchema,
} from '@/schemas/product.schema';
import { type ProductInventoryItem } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, X } from 'lucide-react';
import { type UIEvent, useEffect, useState } from 'react';
import {
  Controller,
  type Resolver,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';

interface AddUpdateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ProductInventoryItem | null;
}

const PRODUCT_STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: ProductStatus.active, label: 'Aktif' },
  { value: ProductStatus.inactive, label: 'Nonaktif' },
  { value: ProductStatus.out_of_stock, label: 'Habis' },
];

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: Gender.male, label: 'Laki-laki' },
  { value: Gender.female, label: 'Perempuan' },
];

const VARIANT_TYPE_OPTIONS: { value: VariantType; label: string }[] = [
  { value: VariantType.size, label: 'Ukuran' },
  { value: VariantType.color, label: 'Warna' },
];

function buildProductFormValues(
  initialData?: ProductInventoryItem | null,
): CreateProductInput {
  return {
    articleId: initialData?.articleId ?? '',
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    description: initialData?.description ?? '',
    price: initialData?.price ?? 0,
    sku: initialData?.sku ?? '',
    weight: initialData?.weight ?? 1,
    clothingType: initialData?.clothingType ?? '',
    gender: initialData?.gender ?? Gender.female,
    status: initialData?.status ?? ProductStatus.active,
    imageURL: initialData?.imageURL ?? '',
    variants: initialData?.variants.map((variant) => ({
      id: variant.id,
      name: variant.name,
      type: variant.type,
      price: variant.price ?? Number.NaN,
      stock: variant.stock,
      sku: variant.sku,
      imageURL: variant.imageURL ?? '',
    })) ?? [
      {
        name: '',
        type: VariantType.size,
        price: 0,
        stock: 0,
        sku: '',
        imageURL: '',
      },
    ],
  };
}

export default function AddUpdateProductModal({
  isOpen,
  onClose,
  initialData,
}: AddUpdateProductModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  const { mutate: createProduct, isPending: isCreating } =
    useCreateProductInventory();
  const { mutate: updateProduct, isPending: isUpdating } =
    useUpdateProductInventory();
  const {
    data: articleOptionPages,
    isLoading: isLoadingArticles,
    hasNextPage: hasNextArticlePage,
    isFetchingNextPage: isFetchingNextArticlePage,
    fetchNextPage: fetchNextArticlePage,
  } = useArticleOptions();

  const isEdit = Boolean(initialData);
  const isPending = isCreating || isUpdating;
  const fetchedArticleOptions =
    articleOptionPages?.pages.flatMap((page) => page.items) ?? [];
  const articleOptions =
    initialData &&
    !fetchedArticleOptions.some(
      (article) => article.id === initialData.articleId,
    )
      ? [
          {
            id: initialData.articleId,
            title: initialData.articleTitle,
            island: initialData.island,
            province: initialData.province,
          },
          ...fetchedArticleOptions,
        ]
      : fetchedArticleOptions;

  const handleArticleSelectScroll = (event: UIEvent<HTMLDivElement>) => {
    if (!hasNextArticlePage || isFetchingNextArticlePage) return;

    const container = event.currentTarget;
    const remainingScroll =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    if (remainingScroll < 60) {
      fetchNextArticlePage();
    }
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(
      isEdit ? updateProductSchema : createProductSchema,
    ) as Resolver<CreateProductInput>,
    defaultValues: buildProductFormValues(initialData),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  });

  const onSubmit = (data: CreateProductInput) => {
    if (isEdit && initialData) {
      const updateData: UpdateProductInput = { ...data };

      if (updateData.articleId === initialData.articleId) {
        delete updateData.articleId;
      }

      updateProduct(
        { idOrSlug: initialData.id, data: updateData },
        {
          onSuccess: () => {
            toast.success('Produk berhasil diperbarui');
            onClose();
          },
          onError: (error) => {
            toast.error(
              error instanceof Error
                ? error.message
                : 'Gagal memperbarui produk',
            );
          },
        },
      );
      return;
    }

    createProduct(data, {
      onSuccess: () => {
        toast.success('Produk berhasil ditambahkan');
        reset();
        onClose();
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : 'Gagal menambahkan produk',
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
      reset(buildProductFormValues(initialData));
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [initialData, isOpen, reset]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!isOpen && !showModal) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-[#fefdfb] shadow-2xl transition-all duration-300 ${
          isOpen ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#ebd8c2] px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEdit ? 'Edit Produk & Inventori' : 'Tambah Produk Baru'}
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="rounded-full bg-[#f3ede8] text-gray-500 hover:bg-[#e6dcd5]"
          >
            <X className="size-4" />
          </Button>
        </div>

        <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto px-6 py-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Artikel Terkait *
              </label>
              <Controller
                control={control}
                name="articleId"
                render={({ field }) => (
                  <Select
                    value={field.value || undefined}
                    onValueChange={field.onChange}
                    disabled={isLoadingArticles}
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl border-[#e5ded5] bg-[#fdfaf7] text-gray-700">
                      <SelectValue
                        placeholder="Pilih artikel"
                        className="block w-full truncate"
                      />
                    </SelectTrigger>
                    <SelectContent
                      className="max-h-72 overflow-y-auto"
                      onScroll={handleArticleSelectScroll}
                    >
                      {articleOptions.map((article) => (
                        <SelectItem
                          key={article.id}
                          value={article.id}
                          className="h-9 overflow-hidden whitespace-nowrap text-ellipsis"
                        >
                          {article.title}
                        </SelectItem>
                      ))}
                      {isFetchingNextArticlePage ? (
                        <p className="px-2 py-2 text-xs text-gray-500">
                          Memuat artikel berikutnya...
                        </p>
                      ) : null}
                      {!hasNextArticlePage && articleOptions.length > 0 ? (
                        <p className="px-2 py-2 text-xs text-gray-500">
                          Semua artikel telah dimuat
                        </p>
                      ) : null}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.articleId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.articleId.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Nama Produk *
              </label>
              <Input
                {...register('name')}
                placeholder="Contoh: Batik Parang Premium"
                className="h-11 rounded-xl border-[#e5ded5] bg-[#fdfaf7]"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Slug Produk *
              </label>
              <Input
                {...register('slug')}
                placeholder="batik-parang-premium"
                className="h-11 rounded-xl border-[#e5ded5] bg-[#fdfaf7]"
              />
              {errors.slug && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.slug.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                SKU Produk *
              </label>
              <Input
                {...register('sku')}
                placeholder="BTK-PRG-001"
                className="h-11 rounded-xl border-[#e5ded5] bg-[#fdfaf7]"
              />
              {errors.sku && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.sku.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Harga *
              </label>
              <Input
                {...register('price', { valueAsNumber: true })}
                type="number"
                min={0}
                placeholder="150000"
                className="h-11 rounded-xl border-[#e5ded5] bg-[#fdfaf7]"
              />
              {errors.price && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Berat (gram) *
              </label>
              <Input
                {...register('weight', { valueAsNumber: true })}
                type="number"
                min={1}
                placeholder="500"
                className="h-11 rounded-xl border-[#e5ded5] bg-[#fdfaf7]"
              />
              {errors.weight && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.weight.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Jenis Pakaian *
              </label>
              <Input
                {...register('clothingType')}
                placeholder="Batik"
                className="h-11 rounded-xl border-[#e5ded5] bg-[#fdfaf7]"
              />
              {errors.clothingType && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.clothingType.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Gender *
              </label>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-11 rounded-xl border-[#e5ded5] bg-[#fdfaf7] text-gray-700">
                      <SelectValue placeholder="Pilih gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {GENDER_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Status Produk *
              </label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-11 rounded-xl border-[#e5ded5] bg-[#fdfaf7] text-gray-700">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">
              URL Gambar Produk (Opsional)
            </label>
            <Input
              {...register('imageURL')}
              placeholder="https://example.com/image.jpg"
              className="h-11 rounded-xl border-[#e5ded5] bg-[#fdfaf7]"
            />
            {errors.imageURL && (
              <p className="mt-1 text-xs text-red-500">
                {errors.imageURL.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">
              Deskripsi (Opsional)
            </label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Deskripsi singkat produk..."
              className="w-full rounded-xl border border-[#e5ded5] bg-[#fdfaf7] px-4 py-3 text-gray-700 placeholder:text-gray-400 focus-visible:border-[#c26a3d] focus-visible:ring-2 focus-visible:ring-[#c26a3d]/30 focus-visible:outline-none"
            />
          </div>

          <hr className="border-[#ebd8c2]" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-800">
                Varian Produk
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    name: '',
                    type: VariantType.size,
                    price: 0,
                    stock: 0,
                    sku: '',
                    imageURL: '',
                  })
                }
                className="flex items-center gap-2 border-[#c26a3d] text-[#c26a3d] hover:bg-[#c26a3d]/10"
              >
                <Plus className="size-4" />
                Tambah Varian
              </Button>
            </div>

            <p className="text-sm text-[#8f8377]">
              Produk wajib memiliki minimal 1 varian.
            </p>
            {errors.variants?.message ? (
              <p className="text-sm text-red-500">{errors.variants.message}</p>
            ) : null}

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="relative space-y-4 rounded-2xl border border-[#e5ded5] bg-[#fdfaf7] p-4"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-red-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="size-4" />
                </Button>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      Nama Varian *
                    </label>
                    <Input
                      {...register(`variants.${index}.name` as const)}
                      placeholder="Ukuran M / Warna Merah"
                    />
                    {errors.variants?.[index]?.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.variants[index]?.name?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      Tipe Varian *
                    </label>
                    <Controller
                      control={control}
                      name={`variants.${index}.type` as const}
                      render={({ field: variantField }) => (
                        <Select
                          value={variantField.value}
                          onValueChange={variantField.onChange}
                        >
                          <SelectTrigger className="h-10 bg-white text-gray-700">
                            <SelectValue placeholder="Pilih tipe varian" />
                          </SelectTrigger>
                          <SelectContent>
                            {VARIANT_TYPE_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.variants?.[index]?.type && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.variants[index]?.type?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      SKU Varian *
                    </label>
                    <Input
                      {...register(`variants.${index}.sku` as const)}
                      placeholder="BTK-PRG-M"
                    />
                    {errors.variants?.[index]?.sku && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.variants[index]?.sku?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      Stok Varian *
                    </label>
                    <Input
                      {...register(`variants.${index}.stock` as const, {
                        valueAsNumber: true,
                      })}
                      type="number"
                      min={0}
                      placeholder="10"
                    />
                    {errors.variants?.[index]?.stock && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.variants[index]?.stock?.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      URL Gambar Varian (Opsional)
                    </label>
                    <Input
                      {...register(`variants.${index}.imageURL` as const)}
                      placeholder="https://example.com/variant-image.jpg"
                    />
                    {errors.variants?.[index]?.imageURL && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.variants[index]?.imageURL?.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      Harga Varian *
                    </label>
                    <Controller
                      control={control}
                      name={`variants.${index}.price` as const}
                      render={({ field: variantPriceField }) => (
                        <Input
                          type="number"
                          min={0}
                          value={
                            typeof variantPriceField.value === 'number' &&
                            Number.isNaN(variantPriceField.value)
                              ? ''
                              : (variantPriceField.value ?? '')
                          }
                          onChange={(event) => {
                            const value = event.target.value;
                            variantPriceField.onChange(
                              value === '' ? Number.NaN : Number(value),
                            );
                          }}
                          placeholder="150000"
                        />
                      )}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Harga ini adalah harga jual langsung untuk varian, bukan
                      tambahan dari harga produk utama.
                    </p>
                    {errors.variants?.[index]?.price && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.variants[index]?.price?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-b-2xl border-t border-[#ebd8c2] bg-[#fefdfb] px-6 py-4">
          <Button
            type="submit"
            disabled={isPending}
            className="h-11 flex-1 rounded-xl bg-[#c26a3d] text-base text-white hover:bg-[#a85b34]"
          >
            {isPending
              ? 'Menyimpan...'
              : isEdit
                ? 'Simpan Perubahan'
                : 'Tambah Produk'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-11 rounded-xl border-[#e5ded5] bg-white px-6 text-base text-gray-600 hover:bg-gray-50"
          >
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
}
