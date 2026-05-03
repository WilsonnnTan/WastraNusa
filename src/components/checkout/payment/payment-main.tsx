'use client';

import { Button } from '@/components/ui/button';
import { useCheckout } from '@/hooks/use-checkout';
import {
  getCheckoutSession,
  subscribeToCheckoutSession,
} from '@/lib/checkout-session';
import type {
  CheckoutSessionData,
  CheckoutShippingSelection,
} from '@/types/checkout';
import { ChevronLeft, CreditCard, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState, useSyncExternalStore } from 'react';

import { CheckoutSummary } from '../checkout-summary';
import { ReviewItems } from './review-items';

const defaultShipping: CheckoutShippingSelection = {
  id: 'sic',
  courier: 'SiCepat',
  service: 'Reguler',
  price: 16000,
  description: '2-4 hari kerja',
};

export function PaymentMain() {
  const sessionData = useSyncExternalStore(
    subscribeToCheckoutSession,
    getCheckoutSession,
    () => null,
  ) as CheckoutSessionData | null;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { mutateAsync: checkout, isPending: isSubmitting } = useCheckout();
  const isProcessing = isSubmitting || isRedirecting;

  const items = useMemo(() => sessionData?.items ?? [], [sessionData]);
  const shipping = useMemo(
    () => sessionData?.shipping ?? defaultShipping,
    [sessionData],
  );
  const address = useMemo(() => sessionData?.address, [sessionData]);

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const serviceFee = items.length > 0 ? 5000 : 0;
    const shippingFee = shipping.price;

    return {
      subtotal,
      shippingFee,
      serviceFee,
      total: subtotal + shippingFee + serviceFee,
      shippingName: `${shipping.courier} (${shipping.service})`,
    };
  }, [items, shipping]);

  const handleConfirmAndPay = async () => {
    if (items.length === 0 || isProcessing) return;

    setErrorMessage(null);
    setIsRedirecting(true);

    try {
      const result = await checkout({
        items: items.map((item) => ({
          cartItemId: item.cartItemId,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          frontendPrice: item.price,
        })),
        shippingAddressId: address?.id,
        shippingCost: shipping.price,
        courier: shipping.courier,
        courierService: shipping.service,
        estimatedDelivery: shipping.description,
      });

      window.location.href = result.redirect_url;
    } catch (error) {
      setIsRedirecting(false);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat checkout',
      );
    }
  };

  return (
    <>
      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e8e2d5] p-8 text-center">
          <p className="text-lg font-bold text-[#3d5446]">
            Belum ada data checkout
          </p>
          <p className="text-[#8e8476] mt-2">
            Kembali ke keranjang dan pilih produk terlebih dahulu.
          </p>
          <Link href="/cart" className="inline-block mt-6">
            <Button className="bg-[#2f5f49] hover:bg-[#244a39] text-white">
              Kembali ke Keranjang
            </Button>
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <ReviewItems items={items} shipping={shipping} address={address} />

            {errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link href="/cart/checkout">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-[#3d5446] border-[#d8cfbf] font-bold gap-2 hover:bg-[#f4efe6] px-6 py-6 rounded-xl"
                >
                  <ChevronLeft size={18} /> Kembali
                </Button>
              </Link>

              <Button
                onClick={handleConfirmAndPay}
                disabled={isProcessing}
                className="w-full sm:w-auto bg-[#cc6644] hover:bg-[#b3593b] text-white px-8 py-6 rounded-xl font-bold shadow-lg shadow-[#cc6644]/20 transition-all active:scale-95 gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Memproses...
                  </>
                ) : (
                  <>
                    <CreditCard size={18} /> Konfirmasi & Bayar Sekarang
                  </>
                )}
              </Button>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <CheckoutSummary totals={totals} items={items} />
          </aside>
        </div>
      )}
    </>
  );
}
