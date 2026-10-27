import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import {
  createNewOrder,
  confirmPaymentAndGrantEntitlement,
  CATALOG_PRODUCTS,
} from '@/features/commerce/orderStorage';
import { ProductSku } from '@/types/database';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import {
  QrCode,
  CreditCard,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
} from 'lucide-react';

export const CheckoutModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialSku?: ProductSku;
}> = ({ isOpen, onClose, onSuccess, initialSku = 'affiliate_academy_pro' }) => {
  const { user, setTier, setIsPremium } = useAuth();
  const [selectedSku, setSelectedSku] = useState<ProductSku>(initialSku);
  const [step, setStep] = useState<'checkout' | 'payment' | 'success'>('checkout');
  const [email, setEmail] = useState(user?.email || 'siswa@gmail.com');
  const [paymentMethod, setPaymentMethod] = useState<'dana_qris' | 'lynk' | 'manual'>('dana_qris');
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Sync initialSku when changed
  React.useEffect(() => {
    if (initialSku) {
      setSelectedSku(initialSku);
    }
  }, [initialSku]);

  const activeProduct = CATALOG_PRODUCTS[selectedSku] || CATALOG_PRODUCTS.affiliate_academy_pro;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Email wajib diisi untuk penerimaan akses.');
      return;
    }
    const order = createNewOrder(user?.id || 'default', email, paymentMethod, selectedSku);
    setCreatedOrder(order);
    setStep('payment');
  };

  const handleSimulatePaymentSuccess = () => {
    if (!createdOrder) return;
    setLoading(true);

    setTimeout(() => {
      // Confirm payment & grant entitlement idempoten
      const res = confirmPaymentAndGrantEntitlement(
        createdOrder.id,
        'admin-system',
        'Pembayaran berhasil diverifikasi secara otomatis (Instant Gateway).'
      );

      // Update AuthContext state immediately
      const targetTier = res.entitlement?.access_level === 'pro_plus' ? 'pro_plus' : 'pro';
      if (setTier) {
        setTier(targetTier);
      } else if (setIsPremium) {
        setIsPremium(true);
      }

      setLoading(false);
      setStep('success');
      if (onSuccess) onSuccess();
    }, 1200);
  };

  const handleCloseAll = () => {
    setStep('checkout');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseAll}
      title={
        step === 'success'
          ? '🎉 Pembayaran Berhasil!'
          : step === 'payment'
          ? 'Instruksi Pembayaran Akses'
          : 'Pilih & Beli Paket Akses Akademi'
      }
    >
      {/* STEP 1: ORDER REVIEW & PAYMENT METHOD SELECTION */}
      {step === 'checkout' && (
        <form onSubmit={handleProceedToPayment} className="space-y-5">
          {/* Tier Selector Tabs */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-ink uppercase">
              Pilih Paket Akses:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedSku('affiliate_academy_pro')}
                className={`p-3 border-2 text-left rounded-md transition-all ${
                  selectedSku === 'affiliate_academy_pro'
                    ? 'border-brand-orange bg-brand-orange/10 shadow-[2px_2px_0px_#FF7A24]'
                    : 'border-ink bg-surface hover:bg-paper'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-xs text-ink">Paket Pro</span>
                  <span className="text-[10px] font-bold bg-brand-orange text-white px-1.5 py-0.5 rounded">
                    UTAMA
                  </span>
                </div>
                <div className="text-base font-black text-brand-orange">Rp99.000</div>
                <div className="text-[10px] text-warm-gray line-through">Rp149.000</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSku('affiliate_academy_pro_plus')}
                className={`p-3 border-2 text-left rounded-md transition-all ${
                  selectedSku === 'affiliate_academy_pro_plus'
                    ? 'border-brand-orange bg-brand-orange/10 shadow-[2px_2px_0px_#FF7A24]'
                    : 'border-ink bg-surface hover:bg-paper'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-xs text-ink flex items-center gap-1">
                    Pro Plus <Sparkles className="w-3 h-3 text-brand-orange" />
                  </span>
                  <span className="text-[10px] font-bold bg-soft-coral text-ink px-1.5 py-0.5 rounded border border-ink">
                    +3 BONUS
                  </span>
                </div>
                <div className="text-base font-black text-ink">Rp199.000</div>
                <div className="text-[10px] text-warm-gray line-through">Rp249.000</div>
              </button>
            </div>
          </div>

          {/* Product Summary Box */}
          <div className="bg-paper p-4 border-2 border-ink space-y-3 rounded-md">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-ink">
                {activeProduct.name}
              </span>
              <StickerBadge variant="orange">
                {selectedSku === 'affiliate_academy_pro_plus' ? '-20% PROMO' : '-33% PROMO'}
              </StickerBadge>
            </div>
            <ul className="text-xs text-ink/80 space-y-1.5 list-disc list-inside">
              {activeProduct.features.map((feat, idx) => (
                <li key={idx} className={idx >= 1 && selectedSku === 'affiliate_academy_pro_plus' && idx <= 3 ? 'font-bold text-ink' : ''}>
                  {feat}
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-ink/20 flex items-baseline justify-between">
              <span className="text-xs font-bold text-warm-gray uppercase">Investasi Sekali Bayar:</span>
              <div className="text-right">
                <span className="text-xs text-warm-gray line-through mr-2">
                  Rp{activeProduct.regularPrice.toLocaleString('id-ID')}
                </span>
                <span className="text-2xl font-black text-brand-orange font-mono">
                  Rp{activeProduct.promoPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* User Email */}
          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Email Akun Siswa <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
            />
            <span className="text-[11px] text-warm-gray mt-1 block">
              Hak akses {selectedSku === 'affiliate_academy_pro_plus' ? 'Pro Plus' : 'Pro'} akan dikaitkan langsung ke akun email ini.
            </span>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-ink uppercase">
              Pilih Kanal Pembayaran:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label
                className={`p-3 border-2 cursor-pointer flex flex-col justify-between transition-all rounded ${
                  paymentMethod === 'dana_qris'
                    ? 'border-brand-orange bg-brand-orange/10 shadow-[2px_2px_0px_#FF7A24]'
                    : 'border-ink bg-surface hover:bg-paper'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="method"
                    value="dana_qris"
                    checked={paymentMethod === 'dana_qris'}
                    onChange={() => setPaymentMethod('dana_qris')}
                    className="accent-brand-orange"
                  />
                  <QrCode className="w-4 h-4 text-brand-orange" />
                  <span className="font-bold text-xs">QRIS / DANA</span>
                </div>
                <span className="text-[10px] text-warm-gray">BCA, ShopeePay, GoPay, Mandiri</span>
              </label>

              <label
                className={`p-3 border-2 cursor-pointer flex flex-col justify-between transition-all rounded ${
                  paymentMethod === 'lynk'
                    ? 'border-brand-orange bg-brand-orange/10 shadow-[2px_2px_0px_#FF7A24]'
                    : 'border-ink bg-surface hover:bg-paper'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="method"
                    value="lynk"
                    checked={paymentMethod === 'lynk'}
                    onChange={() => setPaymentMethod('lynk')}
                    className="accent-brand-orange"
                  />
                  <CreditCard className="w-4 h-4 text-brand-orange" />
                  <span className="font-bold text-xs">Lynk.id</span>
                </div>
                <span className="text-[10px] text-warm-gray">Virtual Account & Kartu</span>
              </label>

              <label
                className={`p-3 border-2 cursor-pointer flex flex-col justify-between transition-all rounded ${
                  paymentMethod === 'manual'
                    ? 'border-brand-orange bg-brand-orange/10 shadow-[2px_2px_0px_#FF7A24]'
                    : 'border-ink bg-surface hover:bg-paper'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="method"
                    value="manual"
                    checked={paymentMethod === 'manual'}
                    onChange={() => setPaymentMethod('manual')}
                    className="accent-brand-orange"
                  />
                  <Building className="w-4 h-4 text-brand-orange" />
                  <span className="font-bold text-xs">Bank BCA</span>
                </div>
                <span className="text-[10px] text-warm-gray">Transfer manual admin</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t-2 border-ink">
            <span className="text-[11px] text-warm-gray flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-green-600" /> Transaksi Aman & Terenkripsi
            </span>
            <div className="flex gap-2">
              <Button variant="outline" type="button" onClick={onClose}>
                Batal
              </Button>
              <Button variant="primary" type="submit" className="flex items-center gap-1.5">
                <span>Lanjut Pembayaran</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* STEP 2: PAYMENT INSTRUCTION VIEW */}
      {step === 'payment' && createdOrder && (
        <div className="space-y-5 text-center">
          <div className="p-3 bg-paper border-2 border-ink text-left text-xs space-y-1 rounded">
            <div className="flex justify-between">
              <span className="text-warm-gray font-bold">Produk / Paket:</span>
              <span className="font-bold text-ink">
                {CATALOG_PRODUCTS[createdOrder.sku as ProductSku]?.name || 'Shopee Affiliate Academy'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-warm-gray font-bold">Nomor Pesanan:</span>
              <span className="font-mono font-bold text-ink">{createdOrder.order_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warm-gray font-bold">Total Tagihan:</span>
              <span className="font-mono font-extrabold text-brand-orange text-sm">
                Rp{createdOrder.amount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* QRIS Display */}
          {paymentMethod === 'dana_qris' && (
            <div className="bg-surface p-5 border-2 border-ink shadow-[4px_4px_0px_#171717] inline-block mx-auto space-y-3 rounded">
              <div className="text-xs font-bold uppercase tracking-wider text-ink border-b pb-1">
                QRIS NASIONAL (DANA BISNIS TERVERIFIKASI)
              </div>
              <div className="w-48 h-48 bg-white border-2 border-ink mx-auto p-2 flex flex-col items-center justify-center relative">
                {/* Visual Representation of QR */}
                <div className="grid grid-cols-6 gap-1 w-full h-full p-1 opacity-80">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        (i % 2 === 0 && i % 3 === 0) || i === 0 || i === 5 || i === 30
                          ? 'bg-ink'
                          : (i * 7) % 5 === 0
                          ? 'bg-ink'
                          : 'bg-transparent'
                      } rounded-none`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="px-2 py-0.5 bg-brand-orange text-white text-[10px] font-bold border border-ink">
                    QRIS SHOPEE ACADEMY
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-warm-gray max-w-xs">
                Buka aplikasi m-Banking (BCA, Mandiri, BRI) atau e-Wallet (DANA, GoPay, ShopeePay), scan kode QR di atas untuk membayar <strong>Rp{createdOrder.amount.toLocaleString('id-ID')}</strong>.
              </p>
            </div>
          )}

          {/* Manual BCA Display */}
          {paymentMethod === 'manual' && (
            <div className="bg-surface p-5 border-2 border-ink text-left space-y-3 rounded">
              <h4 className="font-bold text-xs uppercase text-ink">Instruksi Transfer Rekening Resmi:</h4>
              <div className="p-3 bg-paper border border-ink space-y-1 font-mono text-xs rounded">
                <div>Bank: <strong>BCA (Bank Central Asia)</strong></div>
                <div>No Rekening: <strong className="text-brand-orange text-sm">8271-9284-91</strong></div>
                <div>Atas Nama: <strong>PT SHOPEE ACADEMY INDONESIA</strong></div>
                <div>Jumlah Transfer: <strong>Rp{createdOrder.amount.toLocaleString('id-ID')}</strong></div>
              </div>
              <p className="text-[11px] text-warm-gray">
                Sertakan nomor pesanan <strong>{createdOrder.order_number}</strong> pada berita transfer.
              </p>
            </div>
          )}

          {/* Lynk Display */}
          {paymentMethod === 'lynk' && (
            <div className="bg-surface p-5 border-2 border-ink space-y-3 rounded">
              <h4 className="font-bold text-xs uppercase text-ink">Pembayaran Instan via Lynk.id:</h4>
              <p className="text-xs text-warm-gray">
                Klik tombol di bawah untuk menyelesaikan pembayaran instan melalui portal terverifikasi Lynk.id.
              </p>
              <a
                href={`https://lynk.id/shopee-affiliate-academy?ref=${createdOrder.order_number}&sku=${createdOrder.sku}`}
                target="_blank"
                rel="noreferrer"
                className="brutalist-btn bg-brand-orange text-white text-xs px-6 py-2.5 inline-flex items-center gap-2"
              >
                <span>Buka Portal Pembayaran Lynk.id</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}

          <div className="pt-2 border-t border-ink/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button variant="outline" type="button" onClick={() => setStep('checkout')}>
              Ubah Kanal / Paket
            </Button>
            <Button
              variant="primary"
              onClick={handleSimulatePaymentSuccess}
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-white" />
              <span>{loading ? 'Memverifikasi...' : 'Saya Sudah Bayar (Aktivasi Instan)'}</span>
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: CONGRATULATIONS & ACCESS GRANTED */}
      {step === 'success' && (
        <div className="text-center py-6 space-y-5">
          <div className="w-16 h-16 bg-acid-lime border-2 border-ink rounded-full flex items-center justify-center mx-auto shadow-[3px_3px_0px_#171717]">
            <CheckCircle2 className="w-10 h-10 text-ink" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-ink">
              Selamat, Akses {createdOrder?.tier === 'pro_plus' ? 'Pro Plus' : 'Pro'} Aktif!
            </h3>
            <p className="text-xs text-warm-gray max-w-md mx-auto">
              {createdOrder?.tier === 'pro_plus'
                ? 'Seluruh 24 modul materi kurikulum, 6 workspace praktis, serta 3 Bonus Eksklusif Pro Plus (Campaign-in-a-Box, Case Study Lab, Objection Playbook) siap kamu gunakan.'
                : 'Seluruh 24 modul materi kurikulum, 8 lembar proyek praktik, dan 6 workspace terpadu kini dapat Anda gunakan tanpa batasan seumur hidup.'}
            </p>
          </div>

          <div className="p-4 bg-paper border-2 border-ink text-xs space-y-2 max-w-sm mx-auto text-left rounded">
            <div className="flex items-center gap-2 text-ink font-bold">
              <Sparkle className="w-4 h-4 text-brand-orange" />
              <span>
                Status Entitlement: AKTIF ({createdOrder?.tier === 'pro_plus' ? 'PRO PLUS' : 'PRO'})
              </span>
            </div>
            <div className="text-[11px] text-warm-gray">
              Transaksi tercatat di sistem: <strong className="font-mono text-ink">{createdOrder?.order_number}</strong>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            {createdOrder?.tier === 'pro_plus' && (
              <Button
                variant="outline"
                onClick={() => {
                  handleCloseAll();
                  window.location.href = '/pro-plus-bonus';
                }}
                className="px-6 py-3 text-sm font-extrabold border-2 border-ink bg-soft-coral/30"
              >
                Buka Bonus Pro Plus ⚡
              </Button>
            )}
            <Button
              variant="primary"
              onClick={() => {
                handleCloseAll();
                window.location.href = '/learn';
              }}
              className="px-8 py-3 text-sm font-extrabold"
            >
              Buka Semua Modul Pembelajaran
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
