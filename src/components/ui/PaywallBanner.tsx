import React, { useState } from 'react';
import { Sparkle, StickerBadge, CurvedArrow } from '@/components/common/Doodles';
import { Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { CheckoutModal } from '@/features/commerce/CheckoutModal';

export const PaywallBanner: React.FC<{
  lessonTitle?: string;
  moduleCode?: string;
}> = ({ lessonTitle, moduleCode }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      <div className="brutalist-card p-6 sm:p-8 bg-paper border-brand-orange border-3 shadow-[6px_6px_0px_#171717] space-y-6 text-center max-w-2xl mx-auto my-8">
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            <StickerBadge variant="orange">MATERI PREMIUM TERKUNCI</StickerBadge>
            {moduleCode && <span className="text-xs font-extrabold bg-surface border border-ink px-2 py-0.5 rounded">{moduleCode}</span>}
          </div>

          <div className="w-14 h-14 bg-surface border-2 border-ink rounded-full flex items-center justify-center mx-auto shadow-[3px_3px_0px_#171717]">
            <Lock className="w-7 h-7 text-brand-orange" />
          </div>

          <h3 className="text-2xl font-extrabold text-ink tracking-tight">
            {lessonTitle ? `Buka Materi: ${lessonTitle}` : 'Akses Penuh Kurikulum Shopee Affiliate V2'}
          </h3>

          <p className="text-sm text-warm-gray font-medium max-w-md mx-auto leading-relaxed">
            Pelajaran ini adalah bagian dari kurikulum lanjutan. Dapatkan akses jangka panjang ke seluruh 24 modul, 8 proyek praktik, dan 6 workspace digital.
          </p>
        </div>

        <div className="bg-surface border-2 border-ink rounded-lg p-5 text-left space-y-3 shadow-[2px_2px_0px_#171717]">
          <span className="text-xs font-bold uppercase tracking-wider text-ink block">
            Yang Akan Anda Dapatkan di Paket Premium:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-ink">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
              <span>24 Modul Lengkap (Level 1–5)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
              <span>8 Proyek Praktik Tervalidasi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
              <span>Akses Penuh 6 Workspace</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
              <span>Hook Bank 30+ Formula</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-xs font-bold text-warm-gray line-through">Rp149.000</span>
            <span className="text-3xl font-extrabold text-brand-orange">Rp99.000</span>
            <span className="text-xs font-bold text-warm-gray uppercase">/ Sekali Bayar</span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="brutalist-btn bg-brand-orange text-white w-full sm:w-auto px-8 py-3.5 text-sm font-extrabold gap-2 mx-auto inline-flex items-center justify-center cursor-pointer"
          >
            <Sparkle className="w-4 h-4 text-white" />
            <span>Buka Akses Premium Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-warm-gray font-medium pt-1">
            <CurvedArrow className="w-6 h-3 text-brand-orange hidden sm:inline-block" />
            <span>Sekali bayar tanpa tagihan bulanan berulang</span>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={() => window.location.reload()}
      />
    </>
  );
};
