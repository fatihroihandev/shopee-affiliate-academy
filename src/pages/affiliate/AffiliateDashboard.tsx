import React, { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import {
  AffiliateProfile,
  ReferralConversion,
  AffiliatePayout,
  MarketingMaterial,
} from '@/types/database';
import {
  getOrCreateAffiliateProfile,
  getStoredReferralClicks,
  getStoredReferralConversions,
  getStoredAffiliatePayouts,
  INITIAL_MARKETING_MATERIALS,
  requestAffiliatePayout,
  saveStoredAffiliateProfile,
} from '@/features/affiliate/affiliateStorage';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import {
  Share2,
  TrendingUp,
  DollarSign,
  Copy,
  Check,
  MousePointerClick,
  Users,
  Wallet,
  ArrowUpRight,
  ShieldAlert,
  FileText,
  AlertCircle,
  Building,
} from 'lucide-react';

export const AffiliateDashboard: React.FC = () => {
  const { user, profile: authProfile } = useAuth();
  const [profile, setProfile] = useState<AffiliateProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'links' | 'sales' | 'materials' | 'payouts' | 'terms'>('overview');

  // Stats
  const [clicksCount, setClicksCount] = useState(0);
  const [conversions, setConversions] = useState<ReferralConversion[]>([]);
  const [payouts, setPayouts] = useState<AffiliatePayout[]>([]);
  const [marketingMaterials] = useState<MarketingMaterial[]>(INITIAL_MARKETING_MATERIALS);

  // Link Generator State
  const [customSource, setCustomSource] = useState('tiktok');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMaterialId, setCopiedMaterialId] = useState<string | null>(null);

  // Payout Form Modal
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState<number>(50000);
  const [bankName, setBankName] = useState('BCA (Bank Central Asia)');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [payoutError, setPayoutError] = useState<string | null>(null);
  const [payoutSuccess, setPayoutSuccess] = useState<string | null>(null);

  // Bank Edit Modal
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const p = getOrCreateAffiliateProfile(user.id, authProfile?.display_name || 'SISWA');
      setProfile(p);
      setBankName(p.bank_name || 'BCA (Bank Central Asia)');
      setAccountNumber(p.bank_account_number || '');
      setAccountHolder(p.bank_account_holder || authProfile?.display_name || '');

      const allClicks = getStoredReferralClicks().filter((c) => c.affiliate_id === p.id);
      setClicksCount(allClicks.length);

      const allConvs = getStoredReferralConversions().filter((c) => c.affiliate_id === p.id);
      setConversions(allConvs);

      const allPayouts = getStoredAffiliatePayouts().filter((py) => py.affiliate_id === p.id);
      setPayouts(allPayouts);
    }
  }, [user, authProfile]);

  if (!profile) {
    return <div className="p-8 text-center text-warm-gray">Memuat dasbor kemitraan...</div>;
  }

  // Financial Calculations
  const totalApprovedCommission = conversions
    .filter((c) => c.status === 'approved' || c.status === 'paid')
    .reduce((sum, c) => sum + c.commission_amount, 0);

  const totalPaidCommission = payouts
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayoutAmount = payouts
    .filter((p) => p.status === 'requested' || p.status === 'processing')
    .reduce((sum, p) => sum + p.amount, 0);

  const availableBalance = Math.max(0, totalApprovedCommission - totalPaidCommission - pendingPayoutAmount);

  const conversionRate = clicksCount > 0 ? ((conversions.length / clicksCount) * 100).toFixed(1) : '0';

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://shopee-affiliate-academy.id';
  const baseReferralUrl = `${originUrl}/?ref=${profile.referral_code}`;
  const taggedReferralUrl = customSource ? `${baseReferralUrl}&src=${encodeURIComponent(customSource)}` : baseReferralUrl;

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMaterial = (text: string, id: string) => {
    const personalized = text.replace(/\{\{AFFILIATE_LINK\}\}/g, baseReferralUrl);
    navigator.clipboard.writeText(personalized);
    setCopiedMaterialId(id);
    setTimeout(() => setCopiedMaterialId(null), 2000);
  };

  const handleSaveBankInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    const updated: AffiliateProfile = {
      ...profile,
      bank_name: bankName,
      bank_account_number: accountNumber,
      bank_account_holder: accountHolder,
    };
    saveStoredAffiliateProfile(updated);
    setProfile(updated);
    setIsBankModalOpen(false);
  };

  const handleSubmitPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutError(null);
    setPayoutSuccess(null);

    if (payoutAmount < 50000) {
      setPayoutError('Minimal penarikan dana adalah Rp50.000.');
      return;
    }
    if (payoutAmount > availableBalance) {
      setPayoutError('Saldo yang tersedia tidak mencukupi untuk jumlah penarikan ini.');
      return;
    }
    if (!accountNumber || !accountHolder) {
      setPayoutError('Nomor dan nama pemilik rekening bank wajib diisi.');
      return;
    }

    const res = requestAffiliatePayout(profile.id, payoutAmount, {
      bank_name: bankName,
      bank_account_number: accountNumber,
      bank_account_holder: accountHolder,
    });

    if (res.success && res.payout) {
      setPayoutSuccess(res.message);
      const allPayouts = getStoredAffiliatePayouts().filter((py) => py.affiliate_id === profile.id);
      setPayouts(allPayouts);
      setTimeout(() => {
        setIsPayoutModalOpen(false);
        setPayoutSuccess(null);
      }, 1500);
    } else {
      setPayoutError(res.message);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-ink pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-brand-orange text-white border-2 border-ink shadow-[2px_2px_0px_#171717]">
              <Share2 className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-warm-gray">
              Program Kemitraan Siswa (Member-Get-Member)
            </span>
            <StickerBadge rotate="-rotate-2" className="hidden sm:inline-block">
              KOMISI 10%
            </StickerBadge>
          </div>
          <h1 className="text-3xl font-extrabold text-ink font-serif">
            Dashboard Affiliate Siswa
          </h1>
          <p className="text-sm text-warm-gray mt-1">
            Dapatkan komisi berulang 10% (Rp9.900 per siswa) dengan merekomendasikan Shopee Affiliate Academy kepada rekan kreator lainnya.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            onClick={() => setIsPayoutModalOpen(true)}
            disabled={availableBalance < 50000}
            className="flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" /> Tarik Komisi
          </Button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-ink pb-3">
        {[
          { key: 'overview', label: 'Ringkasan & Metrik', icon: TrendingUp },
          { key: 'links', label: 'Link & Tagging Generator', icon: Share2 },
          { key: 'sales', label: `Konversi Penjualan (${conversions.length})`, icon: DollarSign },
          { key: 'materials', label: 'Swipe Copy & Materi Promosi', icon: FileText },
          { key: 'payouts', label: 'Pencairan Komisi', icon: Wallet },
          { key: 'terms', label: 'Aturan & Etika Promosi', icon: ShieldAlert },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-2 border-ink transition-all ${
                activeTab === tab.key
                  ? 'bg-ink text-white shadow-[2px_2px_0px_#FF7A24]'
                  : 'bg-surface hover:bg-paper text-ink'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & STATS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Referral Banner */}
          <Card className="p-6 bg-paper border-2 border-ink space-y-4 shadow-[4px_4px_0px_#171717]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-warm-gray block">
                  Kode Referral Resmi Anda:
                </span>
                <span className="font-mono text-2xl font-black text-brand-orange bg-surface px-3 py-1 border-2 border-ink inline-block">
                  {profile.referral_code}
                </span>
              </div>
              <div className="flex-1 max-w-xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-warm-gray block mb-1">
                  Tautan Referral Utama:
                </span>
                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    value={baseReferralUrl}
                    className="font-mono text-xs bg-surface"
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleCopyLink(baseReferralUrl)}
                    className="flex-shrink-0 flex items-center gap-1.5 text-xs py-2"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    {copiedLink ? 'Tersalin' : 'Salin'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 border-2 border-ink bg-surface shadow-[3px_3px_0px_#171717]">
              <div className="flex items-center justify-between text-warm-gray mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Klik</span>
                <MousePointerClick className="w-4 h-4 text-brand-orange" />
              </div>
              <div className="text-3xl font-extrabold text-ink font-mono">{clicksCount}</div>
              <p className="text-[11px] text-warm-gray mt-1">Cookie aktif selama 30 hari</p>
            </Card>

            <Card className="p-5 border-2 border-ink bg-surface shadow-[3px_3px_0px_#171717]">
              <div className="flex items-center justify-between text-warm-gray mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Konversi</span>
                <Users className="w-4 h-4 text-brand-orange" />
              </div>
              <div className="text-3xl font-extrabold text-ink font-mono">{conversions.length}</div>
              <p className="text-[11px] text-warm-gray mt-1">
                Tingkat Konversi: <strong className="text-ink">{conversionRate}%</strong>
              </p>
            </Card>

            <Card className="p-5 border-2 border-ink bg-surface shadow-[3px_3px_0px_#171717]">
              <div className="flex items-center justify-between text-warm-gray mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Komisi</span>
                <DollarSign className="w-4 h-4 text-brand-orange" />
              </div>
              <div className="text-2xl font-extrabold text-ink font-mono">
                Rp{totalApprovedCommission.toLocaleString('id-ID')}
              </div>
              <p className="text-[11px] text-warm-gray mt-1">10% per pendaftaran berhasil</p>
            </Card>

            <Card className="p-5 border-2 border-ink bg-acid-lime/20 shadow-[3px_3px_0px_#171717]">
              <div className="flex items-center justify-between text-ink mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Saldo Tersedia</span>
                <Wallet className="w-4 h-4 text-ink" />
              </div>
              <div className="text-2xl font-black text-ink font-mono">
                Rp{availableBalance.toLocaleString('id-ID')}
              </div>
              <p className="text-[11px] text-ink/80 mt-1">
                {availableBalance >= 50000 ? 'Siap ditarik ke rekening' : 'Min. penarikan Rp50.000'}
              </p>
            </Card>
          </div>

          {/* Quick Action Split: Bank Account + Recent Conversions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bank Info Card */}
            <Card className="p-5 border-2 border-ink bg-surface space-y-4">
              <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                <h3 className="font-bold text-sm text-ink flex items-center gap-2">
                  <Building className="w-4 h-4 text-brand-orange" /> Rekening Pencairan
                </h3>
                <button
                  onClick={() => setIsBankModalOpen(true)}
                  className="text-xs font-bold text-brand-orange hover:underline"
                >
                  Ubah
                </button>
              </div>
              {profile.bank_account_number ? (
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-warm-gray block text-[10px] uppercase font-bold">Bank / E-Wallet</span>
                    <strong className="text-ink text-sm">{profile.bank_name}</strong>
                  </div>
                  <div>
                    <span className="text-warm-gray block text-[10px] uppercase font-bold">Nomor Rekening</span>
                    <strong className="text-ink font-mono text-sm">{profile.bank_account_number}</strong>
                  </div>
                  <div>
                    <span className="text-warm-gray block text-[10px] uppercase font-bold">Atas Nama</span>
                    <strong className="text-ink text-sm">{profile.bank_account_holder}</strong>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <AlertCircle className="w-8 h-8 text-warm-gray mx-auto opacity-50" />
                  <p className="text-xs text-warm-gray">
                    Belum ada data rekening terdaftar. Lengkapi untuk kemudahan transfer komisi.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setIsBankModalOpen(true)}>
                    Tambah Rekening
                  </Button>
                </div>
              )}
            </Card>

            {/* Recent Sales Mini Feed */}
            <Card className="lg:col-span-2 p-5 border-2 border-ink bg-surface space-y-4">
              <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                <h3 className="font-bold text-sm text-ink flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-brand-orange" /> Konversi Penjualan Terbaru
                </h3>
                <button
                  onClick={() => setActiveTab('sales')}
                  className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1"
                >
                  Lihat Semua <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {conversions.length === 0 ? (
                <p className="text-xs text-warm-gray py-6 text-center">
                  Belum ada transaksi pembelian lewat link referral Anda. Bagikan materi promosi sekarang!
                </p>
              ) : (
                <div className="divide-y divide-ink/10">
                  {conversions.slice(0, 3).map((conv) => (
                    <div key={conv.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-mono font-bold text-ink">{conv.order_number || conv.order_id}</div>
                        <div className="text-[11px] text-warm-gray">{conv.customer_email}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-brand-orange font-mono">
                          +Rp{conv.commission_amount.toLocaleString('id-ID')}
                        </div>
                        <Badge variant={conv.status === 'approved' ? 'lime' : 'orange'} size="sm">
                          {conv.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: LINK & TAGGING GENERATOR */}
      {activeTab === 'links' && (
        <div className="space-y-6">
          <Card className="p-6 border-2 border-ink bg-surface space-y-6">
            <div>
              <h3 className="text-lg font-bold text-ink">Generator Custom Tagging Referral</h3>
              <p className="text-xs text-warm-gray mt-1">
                Lacak efektivitas sumber traffic Anda (apakah dari Bio TikTok, WhatsApp Story, atau Komunitas Telegram) dengan menambahkan parameter sumber.
              </p>
            </div>

            <div className="space-y-4 bg-paper p-4 border-2 border-ink">
              <label className="block text-xs font-bold text-ink uppercase">
                Pilih atau Ketik Sumber Traffic (Source Tag):
              </label>
              <div className="flex flex-wrap gap-2">
                {['tiktok', 'ig_bio', 'wa_group', 'wa_story', 'youtube', 'telegram'].map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setCustomSource(src)}
                    className={`px-3 py-1 text-xs font-mono font-bold border border-ink ${
                      customSource === src ? 'bg-ink text-white' : 'bg-surface hover:bg-white'
                    }`}
                  >
                    src={src}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-warm-gray uppercase mb-1">
                  Ketik Tag Kustom (opsional):
                </label>
                <Input
                  value={customSource}
                  onChange={(e) => setCustomSource(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  placeholder="misal: promo1010"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-ink uppercase">
                Tautan Referral Khusus Siap Dibagikan:
              </label>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={taggedReferralUrl}
                  className="font-mono text-xs bg-paper font-semibold"
                />
                <Button
                  variant="primary"
                  onClick={() => handleCopyLink(taggedReferralUrl)}
                  className="flex-shrink-0 flex items-center gap-1.5 text-xs py-2.5"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  {copiedLink ? 'Tersalin!' : 'Salin Tautan'}
                </Button>
              </div>
              <p className="text-[11px] text-warm-gray">
                Setiap pengunjung yang mengklik link ini akan teratribusi ke akun Anda selama 30 hari ke depan secara otomatis.
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: CONVERSIONS LIST */}
      {activeTab === 'sales' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-ink">Semua Konversi Penjualan ({conversions.length})</h3>
            <span className="text-xs text-warm-gray">Komisi standar: 10% (Rp9.900 per paket)</span>
          </div>

          <div className="border-2 border-ink overflow-x-auto bg-surface shadow-[4px_4px_0px_#171717]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-paper border-b-2 border-ink font-bold text-ink uppercase text-[11px]">
                  <th className="p-3 border-r border-ink">Tanggal</th>
                  <th className="p-3 border-r border-ink">ID Pesanan</th>
                  <th className="p-3 border-r border-ink">Email Pembeli</th>
                  <th className="p-3 border-r border-ink">Nilai Pesanan</th>
                  <th className="p-3 border-r border-ink">Komisi (10%)</th>
                  <th className="p-3">Status Komisi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 font-sans">
                {conversions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-warm-gray">
                      Belum ada penjualan tercatat. Mulai promosikan materi untuk menghasilkan komisi pertama Anda!
                    </td>
                  </tr>
                ) : (
                  conversions.map((conv) => (
                    <tr key={conv.id} className="hover:bg-paper/50">
                      <td className="p-3 border-r border-ink/10 whitespace-nowrap text-warm-gray">
                        {new Date(conv.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="p-3 border-r border-ink/10 font-mono font-bold text-ink">
                        {conv.order_number || conv.order_id}
                      </td>
                      <td className="p-3 border-r border-ink/10 text-warm-gray">
                        {conv.customer_email || 'anonim@gmail.com'}
                      </td>
                      <td className="p-3 border-r border-ink/10 font-mono">
                        Rp{conv.order_amount.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3 border-r border-ink/10 font-mono font-bold text-brand-orange">
                        Rp{conv.commission_amount.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={
                            conv.status === 'approved'
                              ? 'lime'
                              : conv.status === 'paid'
                              ? 'orange'
                              : 'coral'
                          }
                          size="sm"
                        >
                          {conv.status.toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: MARKETING MATERIALS & SWIPE COPY */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-ink">Materi Promosi & Swipe Copy Siap Pakai</h3>
              <p className="text-xs text-warm-gray mt-1">
                Tautan referral Anda otomatis terintegrasi ke dalam teks promosi di bawah ini. Cukup klik &quot;Salin Teks&quot; lalu tempel di media sosial Anda.
              </p>
            </div>
            <Sparkle className="w-6 h-6 text-brand-orange hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketingMaterials.map((mat) => (
              <Card key={mat.id} className="p-5 border-2 border-ink bg-surface shadow-[3px_3px_0px_#171717] space-y-4">
                <div className="flex items-start justify-between gap-3 border-b border-ink/10 pb-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-paper border border-ink uppercase">
                      {mat.category}
                    </span>
                    <h4 className="font-bold text-sm text-ink">{mat.title}</h4>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyMaterial(mat.copy_text || '', mat.id)}
                    className="flex-shrink-0 flex items-center gap-1.5 text-xs py-1.5"
                  >
                    {copiedMaterialId === mat.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Teks</span>
                      </>
                    )}
                  </Button>
                </div>

                <div className="bg-paper p-3.5 border-2 border-ink">
                  <pre className="text-xs text-ink whitespace-pre-wrap font-sans leading-relaxed">
                    {mat.copy_text?.replace(/\{\{AFFILIATE_LINK\}\}/g, baseReferralUrl)}
                  </pre>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PAYOUTS & WITHDRAWAL */}
      {activeTab === 'payouts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Balance Overview */}
            <Card className="p-5 border-2 border-ink bg-paper space-y-4">
              <h4 className="font-bold text-sm text-ink flex items-center gap-2">
                <Wallet className="w-4 h-4 text-brand-orange" /> Saldo & Penarikan
              </h4>
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] font-bold text-warm-gray uppercase">Saldo Siap Dicairkan</span>
                  <div className="text-3xl font-black text-ink font-mono">
                    Rp{availableBalance.toLocaleString('id-ID')}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-warm-gray uppercase">Total Telah Ditransfer</span>
                  <div className="text-sm font-bold text-ink font-mono">
                    Rp{totalPaidCommission.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => setIsPayoutModalOpen(true)}
                disabled={availableBalance < 50000}
                className="w-full text-xs py-2.5"
              >
                Tarik Saldo Sekarang
              </Button>
              <p className="text-[10px] text-warm-gray text-center">
                Batas minimal penarikan adalah Rp50.000
              </p>
            </Card>

            {/* Payout History Table */}
            <Card className="md:col-span-2 p-5 border-2 border-ink bg-surface space-y-4">
              <h4 className="font-bold text-sm text-ink">Riwayat Permohonan Penarikan</h4>
              <div className="border border-ink overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-paper border-b border-ink font-bold text-ink uppercase text-[10px]">
                      <th className="p-2.5 border-r border-ink">Tanggal</th>
                      <th className="p-2.5 border-r border-ink">Jumlah</th>
                      <th className="p-2.5 border-r border-ink">Rekening Tujuan</th>
                      <th className="p-2.5 border-r border-ink">Status</th>
                      <th className="p-2.5">Catatan Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    {payouts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-warm-gray">
                          Belum ada riwayat permohonan penarikan dana.
                        </td>
                      </tr>
                    ) : (
                      payouts.map((py) => (
                        <tr key={py.id} className="hover:bg-paper/40">
                          <td className="p-2.5 border-r border-ink/10 whitespace-nowrap text-warm-gray">
                            {new Date(py.created_at).toLocaleDateString('id-ID')}
                          </td>
                          <td className="p-2.5 border-r border-ink/10 font-mono font-bold text-ink">
                            Rp{py.amount.toLocaleString('id-ID')}
                          </td>
                          <td className="p-2.5 border-r border-ink/10">
                            <span className="font-bold">{py.bank_name}</span>
                            <span className="text-[11px] text-warm-gray block font-mono">
                              {py.bank_account_number}
                            </span>
                          </td>
                          <td className="p-2.5 border-r border-ink/10">
                            <Badge
                              variant={
                                py.status === 'completed'
                                  ? 'lime'
                                  : py.status === 'processing'
                                  ? 'orange'
                                  : 'paper'
                              }
                              size="sm"
                            >
                              {py.status.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="p-2.5 text-[11px] text-warm-gray italic">
                            {py.admin_notes || '-'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 6: TERMS & COMPLIANCE */}
      {activeTab === 'terms' && (
        <Card className="p-6 border-2 border-ink bg-surface space-y-4">
          <h3 className="text-xl font-bold text-ink flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-brand-orange" /> Ketentuan & Aturan Kemitraan Affiliate
          </h3>
          <div className="space-y-3 text-xs leading-relaxed text-ink divide-y divide-ink/10">
            <div className="pt-2">
              <strong className="block text-brand-orange font-bold text-sm mb-1">
                1. Struktur Komisi (10%)
              </strong>
              Affiliate berhak mendapatkan komisi sebesar 10% (Rp9.900) dari setiap pembelian Paket Akses Premium Rp99.000 yang teratribusi melalui kode referral unik dalam masa berlaku cookie 30 hari.
            </div>
            <div className="pt-2">
              <strong className="block text-brand-orange font-bold text-sm mb-1">
                2. Larangan Self-Purchase (Pembelian Sendiri)
              </strong>
              Affiliate dilarang menggunakan link referral miliknya sendiri untuk mendaftarkan akun pribadi. Sistem mencocokkan hash IP, nomor rekening pencairan, dan riwayat login. Pelanggaran mengakibatkan pembatalan komisi terkait.
            </div>
            <div className="pt-2">
              <strong className="block text-brand-orange font-bold text-sm mb-1">
                3. Kebijakan Anti-Spam
              </strong>
              Promosi harus dilakukan secara etis. Dilarang menyebarkan link di kolom komentar orang lain secara acak, spam grup pesan tanpa izin, atau menggunakan klaim palsu (e.g. &quot;Pasti kaya dalam 2 hari&quot;).
            </div>
            <div className="pt-2">
              <strong className="block text-brand-orange font-bold text-sm mb-1">
                4. Ketentuan Penarikan Saldo (Payout)
              </strong>
              Minimal saldo penarikan adalah Rp50.000. Dana ditransfer ke nomor rekening atau e-wallet terdaftar setiap hari kerja maksimal 1x24 jam setelah diverifikasi oleh tim administrasi.
            </div>
          </div>
        </Card>
      )}

      {/* Payout Modal */}
      <Modal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        title="Tarik Saldo Komisi Affiliate"
      >
        <form onSubmit={handleSubmitPayout} className="space-y-4">
          {payoutError && (
            <div className="p-3 bg-red-100 border-2 border-red-500 text-red-800 text-xs font-bold">
              {payoutError}
            </div>
          )}
          {payoutSuccess && (
            <div className="p-3 bg-green-100 border-2 border-green-500 text-green-800 text-xs font-bold">
              {payoutSuccess}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Jumlah Penarikan (Rp) <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              step="5000"
              min="50000"
              max={availableBalance}
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(Number(e.target.value))}
              required
            />
            <span className="text-[11px] text-warm-gray mt-1 block">
              Saldo tersedia: <strong>Rp{availableBalance.toLocaleString('id-ID')}</strong> (Min. Rp50.000)
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Bank / E-Wallet Tujuan <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2.5 text-xs border-2 border-ink bg-surface focus:outline-none"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
            >
              <option value="BCA (Bank Central Asia)">BCA (Bank Central Asia)</option>
              <option value="Bank Mandiri">Bank Mandiri</option>
              <option value="BRI (Bank Rakyat Indonesia)">BRI (Bank Rakyat Indonesia)</option>
              <option value="BNI (Bank Negara Indonesia)">BNI (Bank Negara Indonesia)</option>
              <option value="Bank Syariah Indonesia (BSI)">Bank Syariah Indonesia (BSI)</option>
              <option value="Bank Jago">Bank Jago</option>
              <option value="DANA">DANA (Nomor HP)</option>
              <option value="GoPay">GoPay (Nomor HP)</option>
              <option value="OVO">OVO (Nomor HP)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Nomor Rekening / Akun E-Wallet <span className="text-red-500">*</span>
            </label>
            <Input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Contoh: 8271928491"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Nama Pemilik Rekening (Sesuai Buku Tabungan) <span className="text-red-500">*</span>
            </label>
            <Input
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Contoh: Budi Santoso"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t-2 border-ink">
            <Button variant="outline" type="button" onClick={() => setIsPayoutModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" type="submit">
              Ajukan Penarikan
            </Button>
          </div>
        </form>
      </Modal>

      {/* Bank Account Edit Modal */}
      <Modal
        isOpen={isBankModalOpen}
        onClose={() => setIsBankModalOpen(false)}
        title="Edit Data Rekening Bank / E-Wallet"
      >
        <form onSubmit={handleSaveBankInfo} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Pilihan Bank / Dompet Digital
            </label>
            <select
              className="w-full p-2.5 text-xs border-2 border-ink bg-surface focus:outline-none"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            >
              <option value="BCA (Bank Central Asia)">BCA (Bank Central Asia)</option>
              <option value="Bank Mandiri">Bank Mandiri</option>
              <option value="BRI (Bank Rakyat Indonesia)">BRI (Bank Rakyat Indonesia)</option>
              <option value="BNI (Bank Negara Indonesia)">BNI (Bank Negara Indonesia)</option>
              <option value="Bank Syariah Indonesia (BSI)">Bank Syariah Indonesia (BSI)</option>
              <option value="Bank Jago">Bank Jago</option>
              <option value="DANA">DANA (Nomor HP)</option>
              <option value="GoPay">GoPay (Nomor HP)</option>
              <option value="OVO">OVO (Nomor HP)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Nomor Rekening / No HP
            </label>
            <Input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Contoh: 8271928491"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Nama Pemilik Rekening
            </label>
            <Input
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Contoh: Budi Santoso"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t-2 border-ink">
            <Button variant="outline" type="button" onClick={() => setIsBankModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" type="submit">
              Simpan Rekening
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
