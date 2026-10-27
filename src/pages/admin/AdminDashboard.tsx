import React, { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Order, Entitlement, AdminAuditLog, AffiliatePayout } from '@/types/database';
import {
  getStoredOrders,
  getStoredEntitlements,
  getStoredAuditLogs,
  confirmPaymentAndGrantEntitlement,
  refundOrderAndRevokeEntitlement,
  approveAffiliatePayout,
  rejectAffiliatePayout,
  grantCompedEntitlement,
} from '@/features/commerce/orderStorage';
import {
  getStoredAffiliatePayouts,
} from '@/features/affiliate/affiliateStorage';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import {
  Shield,
  DollarSign,
  Users,
  ShoppingCart,
  Wallet,
  CheckCircle2,
  RotateCcw,
  History,
  ArrowUpRight,
  TrendingUp,
  UserPlus,
  Sparkles,
  Crown,
  RefreshCw,
} from 'lucide-react';
import { usePageTitle } from '@/hooks/usePageTitle';

export const AdminDashboard: React.FC = () => {
  usePageTitle('Admin Command Center', 'Panel kontrol superadmin dan backup admin untuk verifikasi pembayaran, approval komisi, dan manajemen akses VIP.');
  const { user, loginAsDemo } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'payouts' | 'users' | 'audit'>('overview');

  const [orders, setOrders] = useState<Order[]>([]);
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([]);
  const [payouts, setPayouts] = useState<AffiliatePayout[]>([]);

  // Action Modals State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isConfirmOrderModalOpen, setIsConfirmOrderModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [refundReason, setRefundReason] = useState('Pengajuan refund sesuai klausul terms.');

  const [selectedPayout, setSelectedPayout] = useState<AffiliatePayout | null>(null);
  const [isApprovePayoutModalOpen, setIsApprovePayoutModalOpen] = useState(false);
  const [transferProof, setTransferProof] = useState('TRF-FLIP-SUCCESS-9912');
  const [payoutNotes, setPayoutNotes] = useState('Transfer berhasil ke rekening.');

  const [isRejectPayoutModalOpen, setIsRejectPayoutModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('Nomor rekening atau nama pemilik tidak cocok.');

  // COMPED / INFLUENCER ACCESS STATE (Akses Cuma-cuma Rp0)
  const [isCompedModalOpen, setIsCompedModalOpen] = useState(false);
  const [compedEmail, setCompedEmail] = useState('');
  const [compedName, setCompedName] = useState('');
  const [compedTier, setCompedTier] = useState<'pro' | 'pro_plus'>('pro_plus');
  const [compedCategory, setCompedCategory] = useState('Influencer Endorsement (TikTok/IG/YouTube)');
  const [compedNotes, setCompedNotes] = useState('');
  const [compedLoading, setCompedLoading] = useState(false);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const refreshData = () => {
    setOrders(getStoredOrders());
    setEntitlements(getStoredEntitlements());
    setAuditLogs(getStoredAuditLogs());
    setPayouts(getStoredAffiliatePayouts());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Financial Stats
  const paidOrders = orders.filter((o) => o.status === 'paid');
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.amount, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const pendingPayouts = payouts.filter((p) => p.status === 'requested' || p.status === 'processing');
  const activeEntitlements = entitlements.filter((e) => e.status === 'active');

  // Handlers
  const handleConfirmOrder = () => {
    if (!selectedOrder) return;
    const res = confirmPaymentAndGrantEntitlement(
      selectedOrder.id,
      user?.id || 'admin-001',
      'Dikonfirmasi langsung oleh Admin melalui Command Center.'
    );
    showToast(res.message);
    setIsConfirmOrderModalOpen(false);
    refreshData();
  };

  const handleRefundOrder = () => {
    if (!selectedOrder) return;
    const res = refundOrderAndRevokeEntitlement(
      selectedOrder.id,
      user?.id || 'admin-001',
      refundReason
    );
    showToast(res.message);
    setIsRefundModalOpen(false);
    refreshData();
  };

  const handleApprovePayout = () => {
    if (!selectedPayout) return;
    const res = approveAffiliatePayout(
      selectedPayout.id,
      user?.id || 'admin-001',
      transferProof,
      payoutNotes
    );
    showToast(res.message);
    setIsApprovePayoutModalOpen(false);
    refreshData();
  };

  const handleRejectPayout = () => {
    if (!selectedPayout) return;
    const res = rejectAffiliatePayout(
      selectedPayout.id,
      user?.id || 'admin-001',
      rejectReason
    );
    showToast(res.message);
    setIsRejectPayoutModalOpen(false);
    refreshData();
  };

  const isBackupAdmin = user?.email?.includes('backup') || user?.id?.includes('admin0000002');

  const handleSwitchAdminRole = () => {
    const nextType = isBackupAdmin ? 'utama' : 'backup';
    loginAsDemo('admin', 'pro_plus', nextType);
    showToast(`Beralih ke sesi ${nextType === 'backup' ? 'Admin Cadangan (Backup)' : 'Admin Utama (Super Admin)'}.`);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleGrantCompedAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compedEmail.trim()) {
      showToast('Email calon penerima wajib diisi.');
      return;
    }
    setCompedLoading(true);
    const adminIdentifier = user?.email || (isBackupAdmin ? 'admin.backup@affiliateacademy.site' : 'admin.utama@affiliateacademy.site');
    const fullNotes = compedName ? `Nama/Akun: ${compedName}. ${compedNotes}` : compedNotes;

    const res = grantCompedEntitlement(
      compedEmail,
      compedTier,
      adminIdentifier,
      compedCategory,
      fullNotes
    );

    setCompedLoading(false);
    showToast(res.message);
    setIsCompedModalOpen(false);
    setCompedEmail('');
    setCompedName('');
    setCompedNotes('');
    refreshData();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 bg-ink text-white p-4 border-2 border-brand-orange shadow-[4px_4px_0px_#FF7A24] text-xs font-bold flex items-center gap-2">
          <Sparkle className="w-4 h-4 text-brand-orange" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-ink pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="p-1.5 bg-ink text-brand-orange border-2 border-ink shadow-[2px_2px_0px_#171717]">
              <Shield className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-warm-gray">
              Otoritas Admin Platform
            </span>
            <StickerBadge variant={isBackupAdmin ? 'lime' : 'orange'} rotate="-rotate-2">
              {isBackupAdmin ? 'ADMIN CADANGAN (BACKUP)' : 'ADMIN UTAMA (SUPER ADMIN)'}
            </StickerBadge>
          </div>
          <h1 className="text-3xl font-extrabold text-ink font-serif">
            Admin Command Center
          </h1>
          <p className="text-sm text-warm-gray mt-1">
            Pengelolaan transaksi e-commerce, aktivasi hak akses idempoten, audit approval pencairan komisi affiliate, dan pemberian akses VIP/Influencer.
          </p>
        </div>

        {/* Dual Admin Switcher Card */}
        <div className="p-3 bg-paper border-2 border-ink rounded-lg shadow-[3px_3px_0px_#171717] flex items-center justify-between gap-4">
          <div className="text-xs">
            <div className="text-[10px] uppercase font-bold text-warm-gray">Sesi Admin Aktif:</div>
            <div className="font-extrabold text-ink flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-brand-orange" />
              <span>{isBackupAdmin ? 'Admin Cadangan' : 'Admin Utama'}</span>
            </div>
            <div className="text-[10px] text-warm-gray font-mono">{user?.email || (isBackupAdmin ? 'admin.backup@affiliateacademy.site' : 'admin.utama@affiliateacademy.site')}</div>
          </div>
          <button
            onClick={handleSwitchAdminRole}
            className="brutalist-btn bg-surface hover:bg-paper text-ink px-3 py-1.5 text-xs font-bold flex items-center gap-1 border-2 border-ink"
            title="Ganti ke akun admin lain"
          >
            <RefreshCw className="w-3.5 h-3.5 text-brand-orange" />
            <span>Ganti ke {isBackupAdmin ? 'Utama' : 'Backup'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-ink pb-3">
        {[
          { key: 'overview', label: 'Ringkasan Finansial', icon: TrendingUp },
          { key: 'orders', label: `Verifikasi Pesanan (${pendingOrders.length} Pending)`, icon: ShoppingCart },
          { key: 'payouts', label: `Pencairan Komisi (${pendingPayouts.length} Menunggu)`, icon: Wallet },
          { key: 'users', label: `Hak Akses Siswa (${activeEntitlements.length} Premium)`, icon: Users },
          { key: 'audit', label: `Audit Trail (${auditLogs.length} Aksi)`, icon: History },
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

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 border-2 border-ink bg-surface shadow-[3px_3px_0px_#171717]">
              <div className="flex items-center justify-between text-warm-gray mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Gross Revenue (GMV)</span>
                <DollarSign className="w-4 h-4 text-brand-orange" />
              </div>
              <div className="text-2xl font-black text-ink font-mono">
                Rp{totalRevenue.toLocaleString('id-ID')}
              </div>
              <p className="text-[11px] text-warm-gray mt-1">
                {paidOrders.length} transaksi lunas terverifikasi
              </p>
            </Card>

            <Card className="p-5 border-2 border-ink bg-surface shadow-[3px_3px_0px_#171717]">
              <div className="flex items-center justify-between text-warm-gray mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Siswa Premium Aktif</span>
                <Users className="w-4 h-4 text-brand-orange" />
              </div>
              <div className="text-2xl font-black text-ink font-mono">
                {activeEntitlements.length}
              </div>
              <p className="text-[11px] text-warm-gray mt-1">Hak akses 24 modul & tools</p>
            </Card>

            <Card className="p-5 border-2 border-ink bg-paper shadow-[3px_3px_0px_#171717]">
              <div className="flex items-center justify-between text-warm-gray mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Order Pending</span>
                <ShoppingCart className="w-4 h-4 text-brand-orange" />
              </div>
              <div className="text-2xl font-black text-ink font-mono">
                {pendingOrders.length}
              </div>
              <p className="text-[11px] text-warm-gray mt-1">Menunggu konfirmasi pembayaran</p>
            </Card>

            <Card className="p-5 border-2 border-ink bg-acid-lime/20 shadow-[3px_3px_0px_#171717]">
              <div className="flex items-center justify-between text-ink mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Payout Affiliate Pending</span>
                <Wallet className="w-4 h-4 text-ink" />
              </div>
              <div className="text-2xl font-black text-ink font-mono">
                {pendingPayouts.length}
              </div>
              <p className="text-[11px] text-ink/80 mt-1">
                Total: Rp{pendingPayouts.reduce((s, p) => s + p.amount, 0).toLocaleString('id-ID')}
              </p>
            </Card>
          </div>

          {/* Quick Action Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-5 border-2 border-ink bg-surface space-y-4">
              <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                <h3 className="font-bold text-sm text-ink flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-brand-orange" /> Pesanan Menunggu Konfirmasi
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1"
                >
                  Kelola <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {pendingOrders.length === 0 ? (
                <p className="text-xs text-warm-gray py-4 text-center">Tidak ada pesanan pending saat ini.</p>
              ) : (
                <div className="space-y-2">
                  {pendingOrders.map((o) => (
                    <div key={o.id} className="p-3 bg-paper border border-ink flex items-center justify-between text-xs">
                      <div>
                        <div className="font-mono font-bold text-ink">{o.order_number}</div>
                        <div className="text-warm-gray text-[11px]">{o.customer_email} ({o.provider})</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold">Rp{o.amount.toLocaleString('id-ID')}</span>
                        <Button
                          size="sm"
                          variant="primary"
                          className="text-[10px] py-1 px-2"
                          onClick={() => {
                            setSelectedOrder(o);
                            setIsConfirmOrderModalOpen(true);
                          }}
                        >
                          Verifikasi
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-5 border-2 border-ink bg-surface space-y-4">
              <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                <h3 className="font-bold text-sm text-ink flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-brand-orange" /> Permohonan Pencairan Affiliate
                </h3>
                <button
                  onClick={() => setActiveTab('payouts')}
                  className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1"
                >
                  Kelola <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {pendingPayouts.length === 0 ? (
                <p className="text-xs text-warm-gray py-4 text-center">Tidak ada permohonan penarikan pending.</p>
              ) : (
                <div className="space-y-2">
                  {pendingPayouts.map((p) => (
                    <div key={p.id} className="p-3 bg-paper border border-ink flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-ink">{p.bank_name}</div>
                        <div className="font-mono text-[11px] text-warm-gray">{p.bank_account_number} ({p.bank_account_holder})</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-brand-orange">Rp{p.amount.toLocaleString('id-ID')}</span>
                        <Button
                          size="sm"
                          variant="primary"
                          className="text-[10px] py-1 px-2"
                          onClick={() => {
                            setSelectedPayout(p);
                            setIsApprovePayoutModalOpen(true);
                          }}
                        >
                          Proses
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-ink">Manajemen Pesanan Pembelian ({orders.length})</h3>
            <span className="text-xs text-warm-gray">Aktivasi hak akses bersifat idempoten & instan</span>
          </div>

          <div className="border-2 border-ink overflow-x-auto bg-surface shadow-[4px_4px_0px_#171717]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-paper border-b-2 border-ink font-bold text-ink uppercase text-[11px]">
                  <th className="p-3 border-r border-ink">Tanggal</th>
                  <th className="p-3 border-r border-ink">No Pesanan</th>
                  <th className="p-3 border-r border-ink">Email Pelanggan</th>
                  <th className="p-3 border-r border-ink">Kanal & Ref</th>
                  <th className="p-3 border-r border-ink">Nominal</th>
                  <th className="p-3 border-r border-ink">Status</th>
                  <th className="p-3">Aksi Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 font-sans">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-paper/50">
                    <td className="p-3 border-r border-ink/10 whitespace-nowrap text-warm-gray">
                      {new Date(o.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-3 border-r border-ink/10 font-mono font-bold text-ink">
                      {o.order_number}
                    </td>
                    <td className="p-3 border-r border-ink/10 text-ink">{o.customer_email}</td>
                    <td className="p-3 border-r border-ink/10">
                      <span className="font-bold uppercase text-[10px] px-1.5 py-0.5 bg-paper border border-ink">
                        {o.provider}
                      </span>
                      <span className="block font-mono text-[10px] text-warm-gray mt-0.5">
                        {o.provider_reference || '-'}
                      </span>
                    </td>
                    <td className="p-3 border-r border-ink/10 font-mono font-bold">
                      Rp{o.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="p-3 border-r border-ink/10">
                      <Badge
                        variant={
                          o.status === 'paid'
                            ? 'lime'
                            : o.status === 'pending'
                            ? 'orange'
                            : 'coral'
                        }
                        size="sm"
                      >
                        {o.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        {o.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="primary"
                            className="text-[10px] py-1 px-2"
                            onClick={() => {
                              setSelectedOrder(o);
                              setIsConfirmOrderModalOpen(true);
                            }}
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Konfirmasi Lunas
                          </Button>
                        )}
                        {o.status === 'paid' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-[10px] py-1 px-2 text-red-600 hover:bg-red-50"
                            onClick={() => {
                              setSelectedOrder(o);
                              setIsRefundModalOpen(true);
                            }}
                          >
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Refund & Cabut
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: AFFILIATE PAYOUTS */}
      {activeTab === 'payouts' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-ink">Verifikasi Pencairan Dana Komisi ({payouts.length})</h3>
            <span className="text-xs text-warm-gray">Minimal saldo penarikan Rp50.000</span>
          </div>

          <div className="border-2 border-ink overflow-x-auto bg-surface shadow-[4px_4px_0px_#171717]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-paper border-b-2 border-ink font-bold text-ink uppercase text-[11px]">
                  <th className="p-3 border-r border-ink">Tanggal Pengajuan</th>
                  <th className="p-3 border-r border-ink">ID Payout</th>
                  <th className="p-3 border-r border-ink">Bank / E-Wallet</th>
                  <th className="p-3 border-r border-ink">Nomor Rekening</th>
                  <th className="p-3 border-r border-ink">Nama Pemilik</th>
                  <th className="p-3 border-r border-ink">Nominal</th>
                  <th className="p-3 border-r border-ink">Status</th>
                  <th className="p-3">Aksi Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 font-sans">
                {payouts.map((py) => (
                  <tr key={py.id} className="hover:bg-paper/50">
                    <td className="p-3 border-r border-ink/10 whitespace-nowrap text-warm-gray">
                      {new Date(py.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-3 border-r border-ink/10 font-mono font-bold">{py.id}</td>
                    <td className="p-3 border-r border-ink/10 font-bold">{py.bank_name}</td>
                    <td className="p-3 border-r border-ink/10 font-mono">{py.bank_account_number}</td>
                    <td className="p-3 border-r border-ink/10">{py.bank_account_holder}</td>
                    <td className="p-3 border-r border-ink/10 font-mono font-bold text-brand-orange">
                      Rp{py.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="p-3 border-r border-ink/10">
                      <Badge
                        variant={
                          py.status === 'completed'
                            ? 'lime'
                            : py.status === 'requested' || py.status === 'processing'
                            ? 'orange'
                            : 'coral'
                        }
                        size="sm"
                      >
                        {py.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {py.status === 'requested' ? (
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="sm"
                            variant="primary"
                            className="text-[10px] py-1 px-2"
                            onClick={() => {
                              setSelectedPayout(py);
                              setIsApprovePayoutModalOpen(true);
                            }}
                          >
                            Setujui
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-[10px] py-1 px-2 text-red-600"
                            onClick={() => {
                              setSelectedPayout(py);
                              setIsRejectPayoutModalOpen(true);
                            }}
                          >
                            Tolak
                          </Button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-warm-gray italic">
                          {py.admin_notes || 'Telah diproses'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: USERS & ENTITLEMENTS */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-ink">Manajemen Hak Akses Siswa & VIP</h3>
              <p className="text-xs text-warm-gray">Kontrol lisensi Pro & Pro Plus serta penerbitan akses cuma-cuma (Rp0) untuk Influencer/Partner.</p>
            </div>
            <Button
              variant="primary"
              onClick={() => setIsCompedModalOpen(true)}
              className="bg-brand-orange text-white flex items-center gap-2 text-xs font-extrabold shadow-[2px_2px_0px_#171717]"
            >
              <UserPlus className="w-4 h-4" />
              <span>Masukkan Orang / Influencer (Rp0)</span>
            </Button>
          </div>

          <div className="border-2 border-ink overflow-x-auto bg-surface shadow-[4px_4px_0px_#171717]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-paper border-b-2 border-ink font-bold text-ink uppercase text-[11px]">
                  <th className="p-3 border-r border-ink">ID Entitlement</th>
                  <th className="p-3 border-r border-ink">User / Email Siswa</th>
                  <th className="p-3 border-r border-ink">Level Akses</th>
                  <th className="p-3 border-r border-ink">Jenis Pemberian</th>
                  <th className="p-3 border-r border-ink">Status</th>
                  <th className="p-3 border-r border-ink">Keterangan / Alasan</th>
                  <th className="p-3 border-r border-ink">Diberikan Sejak</th>
                  <th className="p-3">Pesanan Sumber</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 font-sans">
                {entitlements.map((ent) => (
                  <tr key={ent.id} className="hover:bg-paper/50">
                    <td className="p-3 border-r border-ink/10 font-mono font-bold text-ink">{ent.id}</td>
                    <td className="p-3 border-r border-ink/10">
                      <div className="font-bold text-ink">{ent.customer_email || ent.user_id}</div>
                      {ent.customer_email && ent.user_id && (
                        <div className="text-[10px] text-warm-gray font-mono">{ent.user_id}</div>
                      )}
                    </td>
                    <td className="p-3 border-r border-ink/10">
                      {ent.access_level === 'pro_plus' ? (
                        <span className="px-2 py-0.5 bg-soft-coral text-ink border border-ink uppercase text-[10px] font-black rounded inline-flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-brand-orange" />
                          PRO PLUS
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-brand-orange text-white border border-ink uppercase text-[10px] font-bold rounded">
                          PRO
                        </span>
                      )}
                    </td>
                    <td className="p-3 border-r border-ink/10">
                      {ent.grant_type === 'comped_influencer' ? (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-900 border border-purple-400 text-[10px] font-bold rounded">
                          ★ INFLUENCER VIP (Rp0)
                        </span>
                      ) : ent.grant_type === 'comped_vip' ? (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-400 text-[10px] font-bold rounded">
                          ★ PARTNER VIP (Rp0)
                        </span>
                      ) : (
                        <span className="text-[11px] text-warm-gray">Pembelian Resmi</span>
                      )}
                    </td>
                    <td className="p-3 border-r border-ink/10">
                      <Badge variant={ent.status === 'active' ? 'lime' : 'coral'} size="sm">
                        {ent.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-3 border-r border-ink/10 text-warm-gray max-w-[200px] truncate" title={ent.notes || ''}>
                      {ent.notes || '-'}
                    </td>
                    <td className="p-3 border-r border-ink/10 text-warm-gray whitespace-nowrap">
                      {new Date(ent.granted_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-3 font-mono text-warm-gray">{ent.source_order_id || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-ink">Admin Audit Trail & Jejak Keamanan</h3>
            <span className="text-xs text-warm-gray">Pencatatan aksi administratif tanpa toleransi manipulasi</span>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <Card key={log.id} className="p-4 border-2 border-ink bg-surface shadow-[2px_2px_0px_#171717]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-ink text-white">
                      {log.action}
                    </span>
                    <span className="text-xs text-warm-gray">
                      Oleh Admin: <strong className="font-mono">{log.admin_user_id}</strong>
                    </span>
                  </div>
                  <span className="text-xs text-warm-gray">
                    {new Date(log.created_at).toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="pt-2 text-xs space-y-1">
                  <div>
                    <strong>Alasan / Keterangan:</strong> {log.reason || '-'}
                  </div>
                  {log.related_order_id && (
                    <div className="text-warm-gray">
                      Terkait Order: <strong className="font-mono">{log.related_order_id}</strong>
                    </div>
                  )}
                  {log.metadata && (
                    <pre className="p-2 bg-paper border border-ink text-[11px] font-mono mt-1 overflow-x-auto">
                      {JSON.stringify(log.metadata, null, 2)}
                    </pre>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* CONFIRM ORDER MODAL */}
      <Modal
        isOpen={isConfirmOrderModalOpen}
        onClose={() => setIsConfirmOrderModalOpen(false)}
        title="Konfirmasi Pembayaran & Aktifkan Entitlement"
      >
        <div className="space-y-4">
          <p className="text-xs text-ink">
            Apakah Anda yakin telah memverifikasi mutasi pembayaran untuk pesanan{' '}
            <strong className="font-mono">{selectedOrder?.order_number}</strong> sebesar{' '}
            <strong className="font-mono">Rp{selectedOrder?.amount.toLocaleString('id-ID')}</strong>?
          </p>
          <div className="p-3 bg-paper border border-ink text-xs space-y-1">
            <div>Email Pelanggan: <strong>{selectedOrder?.customer_email}</strong></div>
            <div>Kanal: <strong>{selectedOrder?.provider}</strong></div>
            <div>Ref Merchant: <strong>{selectedOrder?.provider_reference || '-'}</strong></div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t-2 border-ink">
            <Button variant="outline" onClick={() => setIsConfirmOrderModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleConfirmOrder}>
              Ya, Konfirmasi Lunas & Aktifkan Akses
            </Button>
          </div>
        </div>
      </Modal>

      {/* REFUND MODAL */}
      <Modal
        isOpen={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
        title="Refund Pesanan & Cabut Akses"
      >
        <div className="space-y-4">
          <p className="text-xs text-red-600 font-bold">
            Tindakan ini akan membatalkan pesanan {selectedOrder?.order_number} dan mencabut hak akses premium pengguna.
          </p>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Alasan Refund / Pencabutan:</label>
            <Input
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              placeholder="Ketikkan alasan pembatalan..."
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t-2 border-ink">
            <Button variant="outline" onClick={() => setIsRefundModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" className="bg-red-600 text-white" onClick={handleRefundOrder}>
              Eksekusi Refund
            </Button>
          </div>
        </div>
      </Modal>

      {/* APPROVE PAYOUT MODAL */}
      <Modal
        isOpen={isApprovePayoutModalOpen}
        onClose={() => setIsApprovePayoutModalOpen(false)}
        title="Setujui Pencairan Dana Komisi Affiliate"
      >
        <div className="space-y-4">
          <div className="p-3 bg-paper border border-ink text-xs space-y-1">
            <div>Tujuan: <strong>{selectedPayout?.bank_name}</strong></div>
            <div>No Rekening: <strong className="font-mono">{selectedPayout?.bank_account_number}</strong></div>
            <div>Atas Nama: <strong>{selectedPayout?.bank_account_holder}</strong></div>
            <div>Jumlah Transfer: <strong className="font-mono text-brand-orange text-sm">Rp{selectedPayout?.amount.toLocaleString('id-ID')}</strong></div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Nomor Referensi Transfer / Flip ID:</label>
            <Input
              value={transferProof}
              onChange={(e) => setTransferProof(e.target.value)}
              placeholder="Contoh: TRF-FLIP-881920"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Catatan Tambahan untuk Affiliate:</label>
            <Input
              value={payoutNotes}
              onChange={(e) => setPayoutNotes(e.target.value)}
              placeholder="Catatan transfer..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t-2 border-ink">
            <Button variant="outline" onClick={() => setIsApprovePayoutModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleApprovePayout}>
              Tandai Selesai & Berhasil Ditransfer
            </Button>
          </div>
        </div>
      </Modal>

      {/* REJECT PAYOUT MODAL */}
      <Modal
        isOpen={isRejectPayoutModalOpen}
        onClose={() => setIsRejectPayoutModalOpen(false)}
        title="Tolak Permohonan Penarikan Komisi"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Alasan Penolakan:</label>
            <Input
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Jelaskan alasan penolakan..."
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t-2 border-ink">
            <Button variant="outline" onClick={() => setIsRejectPayoutModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" className="bg-red-600 text-white" onClick={handleRejectPayout}>
              Tolak Permohonan
            </Button>
          </div>
        </div>
      </Modal>

      {/* COMPED / VIP INFLUENCER GRANT MODAL */}
      <Modal
        isOpen={isCompedModalOpen}
        onClose={() => setIsCompedModalOpen(false)}
        title="Beri Akses Cuma-cuma (Rp0) — Influencer / Partner"
      >
        <form onSubmit={handleGrantCompedAccess} className="space-y-4">
          <div className="p-3 bg-paper border-2 border-ink text-xs space-y-1 rounded">
            <div className="font-bold text-ink flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-brand-orange" />
              <span>Otoritas Pemberian Akses Bebas Bayar (Comped VIP)</span>
            </div>
            <p className="text-[11px] text-warm-gray">
              Gunakan fitur ini untuk memberikan hak akses Pro atau Pro Plus tanpa biaya kepada Influencer, Content Creator mitra, atau tamu VIP. Transaksi ini akan tercatat resmi dengan nilai Rp0 di audit log.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-ink mb-1">
              Email Calon Penerima Akses <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              value={compedEmail}
              onChange={(e) => setCompedEmail(e.target.value)}
              placeholder="influencer@gmail.com"
              required
            />
            <span className="text-[10px] text-warm-gray mt-1 block">
              Ketika pengguna ini login dengan email tersebut (via Google / email), hak akses langsung aktif.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-ink mb-1">
              Nama / Akun Sosmed (Opsional)
            </label>
            <Input
              type="text"
              value={compedName}
              onChange={(e) => setCompedName(e.target.value)}
              placeholder="Contoh: Kak @SintaAffiliate (TikTok 500k)"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-ink mb-1">
              Pilih Paket Akses:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCompedTier('pro')}
                className={`p-3 border-2 text-left rounded transition-all ${
                  compedTier === 'pro'
                    ? 'border-brand-orange bg-brand-orange/10 shadow-[2px_2px_0px_#FF7A24]'
                    : 'border-ink bg-surface hover:bg-paper'
                }`}
              >
                <div className="font-black text-xs text-ink">Paket Pro</div>
                <div className="text-[11px] text-brand-orange font-bold">24 Modul + 6 Workspace</div>
                <div className="text-[10px] text-warm-gray">Biaya: <strong>Rp0 (Gratis)</strong></div>
              </button>

              <button
                type="button"
                onClick={() => setCompedTier('pro_plus')}
                className={`p-3 border-2 text-left rounded transition-all ${
                  compedTier === 'pro_plus'
                    ? 'border-brand-orange bg-brand-orange/10 shadow-[2px_2px_0px_#FF7A24]'
                    : 'border-ink bg-surface hover:bg-paper'
                }`}
              >
                <div className="font-black text-xs text-ink flex items-center gap-1">
                  Paket Pro Plus <Sparkles className="w-3 h-3 text-brand-orange" />
                </div>
                <div className="text-[11px] text-ink font-bold">Pro + 3 Bonus Eksklusif</div>
                <div className="text-[10px] text-warm-gray">Biaya: <strong>Rp0 (Gratis)</strong></div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-ink mb-1">
              Kategori Kemitraan:
            </label>
            <select
              value={compedCategory}
              onChange={(e) => setCompedCategory(e.target.value)}
              className="w-full p-2.5 bg-surface border-2 border-ink rounded text-xs font-bold text-ink focus:outline-none focus:border-brand-orange"
            >
              <option value="Influencer Endorsement (TikTok/IG/YouTube)">Influencer Endorsement (TikTok/IG/YouTube)</option>
              <option value="VIP Strategic Partner / Affiliate Ambassador">VIP Strategic Partner / Affiliate Ambassador</option>
              <option value="Beasiswa Komunitas / Pemenang Giveaway">Beasiswa Komunitas / Pemenang Giveaway</option>
              <option value="Kompensasi / Penyelesaian Kendala Sistem">Kompensasi / Penyelesaian Kendala Sistem</option>
              <option value="Akses Internal Tim / Reviewer">Akses Internal Tim / Reviewer</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-ink mb-1">
              Catatan / Kesepakatan Khusus:
            </label>
            <Input
              type="text"
              value={compedNotes}
              onChange={(e) => setCompedNotes(e.target.value)}
              placeholder="Contoh: Kesepakatan barter 2 video posting TikTok di bulan berjalan."
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t-2 border-ink">
            <Button variant="outline" type="button" onClick={() => setIsCompedModalOpen(false)}>
              Batal
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={compedLoading}
              className="bg-brand-orange text-white flex items-center gap-1.5 font-extrabold"
            >
              <UserPlus className="w-4 h-4" />
              <span>{compedLoading ? 'Menerbitkan...' : `Terbitkan Akses ${compedTier === 'pro_plus' ? 'Pro Plus' : 'Pro'} (Rp0)`}</span>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
