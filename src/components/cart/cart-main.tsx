'use client';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import {
  useCart,
  useRemoveMultipleFromCart,
  useUpdateCartItem,
} from '@/hooks/use-cart';
import { Loader2, ShoppingCart } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { CartProduct } from './cart-list';
import { CartList } from './cart-list';
import { CartSummary } from './cart-summary';

export function CartMain() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [localQuantities, setLocalQuantities] = useState<
    Record<string, number>
  >({});
  const pendingQuantityUpdatesRef = useRef<Map<string, number>>(new Map());
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch cart data using TanStack Query
  const { data: cart, isLoading, error } = useCart();
  const { mutate: updateQuantity } = useUpdateCartItem();
  const { mutate: removeMultiple } = useRemoveMultipleFromCart();

  const flushPendingQuantityUpdates = useCallback(
    (options?: { keepalive?: boolean }) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }

      const updates = Array.from(pendingQuantityUpdatesRef.current.entries());
      if (updates.length === 0) return;

      pendingQuantityUpdatesRef.current.clear();

      setLocalQuantities((prev) => {
        const next = { ...prev };
        updates.forEach(([id]) => {
          delete next[id];
        });
        return next;
      });

      if (options?.keepalive) {
        updates.forEach(([id, quantity]) => {
          void fetch(`/api/cart/${encodeURIComponent(id)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity }),
            keepalive: true,
          });
        });
        return;
      }

      updates.forEach(([id, quantity]) => {
        updateQuantity({ id, data: { quantity } });
      });
    },
    [updateQuantity],
  );

  const scheduleDebouncedQuantityUpdate = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      flushPendingQuantityUpdates();
    }, 5000);
  }, [flushPendingQuantityUpdates]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      flushPendingQuantityUpdates({ keepalive: true });
    };

    const handlePageHide = () => {
      flushPendingQuantityUpdates({ keepalive: true });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushPendingQuantityUpdates({ keepalive: true });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      flushPendingQuantityUpdates();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [flushPendingQuantityUpdates]);

  // Transform cart items to CartProduct interface
  const items: CartProduct[] = useMemo(() => {
    if (!cart || !cart.items) return [];

    return cart.items.map((cartItem) => ({
      id: cartItem.id,
      productId: cartItem.productId,
      variantId: cartItem.variantId,
      name: cartItem.product.name,
      price: Number(cartItem.product.price),
      size: cartItem.variant?.name || 'Default',
      stock: cartItem.product.stock,
      quantity: localQuantities[cartItem.id] ?? cartItem.quantity,
      clothingType: cartItem.product.clothingType,
      province: cartItem.product.province,
    }));
  }, [cart, localQuantities]);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const baseQuantity =
      localQuantities[id] ?? cart?.items.find((i) => i.id === id)?.quantity;
    if (baseQuantity == null) return;

    const newQty = Math.max(1, baseQuantity + delta);

    setLocalQuantities((prev) => ({
      ...prev,
      [id]: newQty,
    }));
    pendingQuantityUpdatesRef.current.set(id, newQty);
    scheduleDebouncedQuantityUpdate();
  };

  const toggleAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    removeMultiple({ cartItemIds: selectedIds });
    setSelectedIds([]);
  };

  // Calculate totals based on selected items
  const { totals, selectedItemsForSummary } = useMemo(() => {
    const selectedItems = items.filter((item) => selectedIds.includes(item.id));

    const subtotal = selectedItems.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0,
    );
    const serviceFee = selectedIds.length > 0 ? 5000 : 0;

    const formattedItems = selectedItems.map((item) => ({
      cartItemId: item.id,
      productId: item.productId,
      variantId: item.variantId,
      name: item.name,
      variant: item.size,
      price: item.price,
      quantity: item.quantity,
    }));

    return {
      totals: {
        subtotal,
        serviceFee,
        total: subtotal + serviceFee,
        count: selectedIds.length,
      },
      selectedItemsForSummary: formattedItems,
    };
  }, [selectedIds, items]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f2]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-[1320px]">
        <div className="flex items-center gap-2 mb-8">
          <ShoppingCart className="text-brand" />
          <h1 className="text-2xl font-bold text-[#3d5446]">
            Keranjang Belanja{' '}
            <span className="text-[#8e8476] font-normal text-lg">
              ({items.length} produk)
            </span>
          </h1>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-brand" />
            <span className="ml-2 text-[#3d5446]">Memuat keranjang...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            <p className="font-bold">Gagal memuat keranjang</p>
            <p className="text-sm mt-1">{error.message}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#e8e2d5] p-8 text-center">
            <ShoppingCart className="w-12 h-12 mx-auto text-[#8e8476] mb-4" />
            <p className="text-lg font-semibold text-[#3d5446]">
              Keranjang Anda kosong
            </p>
            <p className="text-[#8e8476] mt-2">Tambahkan produk favorit Anda</p>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <CartList
                items={items}
                selectedIds={selectedIds}
                onToggleItem={toggleItem}
                onToggleAll={toggleAll}
                onUpdateQty={handleUpdateQuantity}
                onDeleteSelected={handleDeleteSelected}
              />
            </div>
            <div className="lg:col-span-4">
              <CartSummary
                totals={totals}
                selectedItems={selectedItemsForSummary}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
