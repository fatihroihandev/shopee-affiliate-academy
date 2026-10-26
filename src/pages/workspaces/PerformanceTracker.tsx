import React, { useState } from 'react';
import { PerformanceRecord } from '@/types/database';
import {
  getStoredPerformanceRecords,
  saveStoredPerformanceRecord,
  getStoredContentItems
} from '@/features/workspaces/workspaceStorage';
import { formatRupiah, formatPercent } from '@/lib/utils';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import { FormulaBox } from '@/components/ui/FormulaBox';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  Plus,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const PerformanceTracker: React.FC = () => {
  const [records, setRecords] = useState<PerformanceRecord[]>(getStoredPerformanceRecords());
  const contentItems = getStoredContentItems();
  const [activeTab, setActiveTab] = useState<'daily' | 'formulas'>('daily');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Omit<PerformanceRecord, 'id' | 'user_id'>>({
    content_item_id: contentItems[0]?.id || '',
    record_date: new Date().toISOString().slice(0, 10),
    views: 10000,
    clicks: 450,
    orders: 15,
    cancelled_orders: 1,
    qualified_orders: 14,
    commission_estimated: 150000,
    commission_pending: 150000,
    commission_approved: 140000,
    commission_paid: 0,
    notes: '',
  });

  // Calculate Aggregates
  const totalViews = records.reduce((acc, r) => acc + (r.views || 0), 0);
  const totalClicks = records.reduce((acc, r) => acc + (r.clicks || 0), 0);
  const totalOrders = records.reduce((acc, r) => acc + (r.orders || 0), 0);
  const totalApprovedCommission = records.reduce((acc, r) => acc + (Number(r.commission_approved) || 0), 0);
  const totalPaidCommission = records.reduce((acc, r) => acc + (Number(r.commission_paid) || 0), 0);

  const avgCTR = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;
  const avgCVR = totalClicks > 0 ? (totalOrders / totalClicks) * 100 : 0;
  const avgEPC = totalClicks > 0 ? totalApprovedCommission / totalClicks : 0;

  // Live modal calculations
  const modalCTR = formData.views > 0 ? (formData.clicks / formData.views) * 100 : 0;
  const modalCVR = formData.clicks > 0 ? (formData.orders / formData.clicks) * 100 : 0;
  const modalEPC = formData.clicks > 0 ? formData.commission_approved / formData.clicks : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: PerformanceRecord = {
      id: `perf-${Date.now()}`,
      user_id: 'current_user',
      content_item_id: formData.content_item_id,
      record_date: formData.record_date,
      views: Number(formData.views),
      clicks: Number(formData.clicks),
      orders: Number(formData.orders),
      cancelled_orders: Number(formData.cancelled_orders),
      qualified_orders: Number(formData.qualified_orders),
      commission_estimated: Number(formData.commission_estimated),
      commission_pending: Number(formData.commission_pending),
      commission_approved: Number(formData.commission_approved),
      commission_paid: Number(formData.commission_paid),
      notes: formData.notes,
    };

    saveStoredPerformanceRecord(payload);
    setRecords(getStoredPerformanceRecords());
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. HEADER */}
      <div className="brutalist-card p-6 sm:p-8 bg-surface space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <StickerBadge variant="orange">WORKSPACE 06</StickerBadge>
              <span className="text-xs font-bold text-warm-gray">Mendukung Modul 16 & Project 06</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2">
              Performance Tracker & Metrik Baku
              <Sparkle className="w-5 h-5 text-brand-orange" />
            </h1>
            <p className="text-xs sm:text-sm text-warm-gray font-medium max-w-2xl leading-relaxed">
              Catat performa konten harian secara objektif. Hormati pemisahan 4 status komisi resmi dan evaluasi metrik CTR, CVR, dan EPC berdasarkan data riil.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Input Rekap Performa
          </Button>
        </div>
      </div>

      {/* 2. AGGREGATE KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="brutalist-card p-4 sm:p-5 bg-surface text-center space-y-1">
          <span className="text-[11px] font-bold text-warm-gray uppercase">CTR Rata-rata</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-ink">{formatPercent(avgCTR)}</div>
          <p className="text-[10px] text-warm-gray font-semibold">
            {totalClicks.toLocaleString('id-ID')} Klik / {totalViews.toLocaleString('id-ID')} Views
          </p>
        </div>

        <div className="brutalist-card p-4 sm:p-5 bg-surface text-center space-y-1">
          <span className="text-[11px] font-bold text-warm-gray uppercase">CVR Pesanan</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-ink">{formatPercent(avgCVR)}</div>
          <p className="text-[10px] text-warm-gray font-semibold">
            {totalOrders} Pesanan Teratribusi
          </p>
        </div>

        <div className="brutalist-card p-4 sm:p-5 bg-surface text-center space-y-1">
          <span className="text-[11px] font-bold text-warm-gray uppercase">EPC Rata-rata</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-brand-orange">
            {formatRupiah(avgEPC)}
          </div>
          <p className="text-[10px] text-warm-gray font-semibold">Hasil bersih per klik</p>
        </div>

        <div className="brutalist-card p-4 sm:p-5 bg-surface text-center space-y-1">
          <span className="text-[11px] font-bold text-warm-gray uppercase">Komisi Disetujui</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-acid-lime bg-ink px-2 rounded">
            {formatRupiah(totalApprovedCommission)}
          </div>
          <p className="text-[10px] text-warm-gray font-semibold">
            Telah dibayar: {formatRupiah(totalPaidCommission)}
          </p>
        </div>
      </div>

      {/* 3. TABS */}
      <div className="flex items-center gap-2 border-b-2 border-ink pb-2">
        <button
          onClick={() => setActiveTab('daily')}
          className={`px-4 py-2 text-xs font-extrabold border-2 rounded-md transition-all ${
            activeTab === 'daily'
              ? 'bg-brand-orange text-white border-ink shadow-[2px_2px_0px_#171717]'
              : 'bg-surface text-ink border-ink hover:bg-paper'
          }`}
        >
          Catatan Harian Per Konten
        </button>
        <button
          onClick={() => setActiveTab('formulas')}
          className={`px-4 py-2 text-xs font-extrabold border-2 rounded-md transition-all ${
            activeTab === 'formulas'
              ? 'bg-brand-orange text-white border-ink shadow-[2px_2px_0px_#171717]'
              : 'bg-surface text-ink border-ink hover:bg-paper'
          }`}
        >
          Lembar Rumus Baku (Modul 16)
        </button>
      </div>

      {activeTab === 'daily' ? (
        <div className="space-y-4">
          <div className="overflow-x-auto border-2 border-ink rounded-lg shadow-[3px_3px_0px_#171717]">
            <table className="w-full text-left text-xs bg-surface border-collapse">
              <thead className="bg-paper border-b-2 border-ink text-ink font-extrabold uppercase">
                <tr>
                  <th className="p-3 border-r border-ink/20">Tanggal</th>
                  <th className="p-3 border-r border-ink/20">Konten</th>
                  <th className="p-3 border-r border-ink/20 text-right">Views</th>
                  <th className="p-3 border-r border-ink/20 text-right">Klik</th>
                  <th className="p-3 border-r border-ink/20 text-center">CTR</th>
                  <th className="p-3 border-r border-ink/20 text-right">Pesanan</th>
                  <th className="p-3 border-r border-ink/20 text-center">CVR</th>
                  <th className="p-3 border-r border-ink/20 text-right">Komisi Disetujui</th>
                  <th className="p-3 text-right">EPC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 font-semibold">
                {records.map((r) => {
                  const matchedContent = contentItems.find((c) => c.id === r.content_item_id);
                  const ctr = r.views > 0 ? (r.clicks / r.views) * 100 : 0;
                  const cvr = r.clicks > 0 ? (r.orders / r.clicks) * 100 : 0;
                  const epc = r.clicks > 0 ? Number(r.commission_approved) / r.clicks : 0;

                  return (
                    <tr key={r.id} className="hover:bg-paper/40 transition-colors">
                      <td className="p-3 border-r border-ink/20 font-mono text-[11px]">
                        {r.record_date}
                      </td>
                      <td className="p-3 border-r border-ink/20 max-w-[200px] truncate">
                        {matchedContent ? matchedContent.title : 'Konten Umum'}
                      </td>
                      <td className="p-3 border-r border-ink/20 text-right font-mono">
                        {r.views.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3 border-r border-ink/20 text-right font-mono">
                        {r.clicks.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3 border-r border-ink/20 text-center font-bold text-brand-orange font-mono">
                        {formatPercent(ctr)}
                      </td>
                      <td className="p-3 border-r border-ink/20 text-right font-mono">
                        {r.orders}
                      </td>
                      <td className="p-3 border-r border-ink/20 text-center font-bold font-mono">
                        {formatPercent(cvr)}
                      </td>
                      <td className="p-3 border-r border-ink/20 text-right font-bold text-ink font-mono">
                        {formatRupiah(Number(r.commission_approved))}
                      </td>
                      <td className="p-3 text-right font-extrabold text-brand-orange font-mono">
                        {formatRupiah(epc)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-paper border-2 border-ink rounded-lg text-xs space-y-1.5">
            <span className="font-extrabold text-ink uppercase flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-brand-orange" />
              Catatan Disiplin Data Komisi:
            </span>
            <p className="text-warm-gray leading-relaxed font-medium">
              Komisi di Shopee melalui 4 tahapan resmi. Jangan menjumlahkan komisi estimasi, pending, dan disetujui menjadi satu angka total karena transaksi yang sama bisa tercatat bertahap di ketiga status tersebut.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormulaBox
            title="CTR (Click-Through Rate)"
            formula="CTR = (Klik ÷ Tayangan / Views) × 100%"
            explanation="Mengukur seberapa kuat hook dan CTA Anda dalam memicu penonton mengklik tautan affiliate."
            example="500 klik ÷ 10.000 views = 5.0% CTR"
          />
          <FormulaBox
            title="CVR (Conversion Rate)"
            formula="CVR = (Pesanan ÷ Klik) × 100%"
            explanation="Mengukur seberapa relevan produk dan toko tujuan terhadap ekspektasi pembeli setelah mengeklik link."
            example="15 pesanan ÷ 500 klik = 3.0% CVR"
          />
          <FormulaBox
            title="EPC (Earnings Per Click)"
            formula="EPC = Komisi Disetujui ÷ Klik"
            explanation="Nilai rupiah riil yang dihasilkan dari setiap klik pengunjung ke tautan affiliate Anda."
            example="Rp150.000 komisi disetujui ÷ 500 klik = Rp300 per klik"
          />
          <FormulaBox
            title="RPM (Komisi per 1.000 Views)"
            formula="RPM = (Komisi Disetujui ÷ Views) × 1.000"
            explanation="Mengukur efisiensi monetisasi dari total impresi jangkauan konten Anda."
            example="(Rp150.000 ÷ 10.000 views) × 1.000 = Rp15.000 per 1.000 views"
          />
        </div>
      )}

      {/* 4. MODAL INPUT REKAP PERFORMA */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <span className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-orange" />
            <span>Input Catatan Performa Harian</span>
          </span>
        }
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Pilih Konten Terkait *</label>
              <select
                value={formData.content_item_id}
                onChange={(e) => setFormData({ ...formData, content_item_id: e.target.value })}
                className="brutalist-input w-full px-3 py-2 text-sm bg-surface truncate"
              >
                {contentItems.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Tanggal Rekap</label>
              <input
                type="date"
                value={formData.record_date}
                onChange={(e) => setFormData({ ...formData, record_date: e.target.value })}
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Views (Tayangan)</label>
              <input
                type="number"
                value={formData.views}
                onChange={(e) => setFormData({ ...formData, views: Number(e.target.value) })}
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Klik Masuk</label>
              <input
                type="number"
                value={formData.clicks}
                onChange={(e) => setFormData({ ...formData, clicks: Number(e.target.value) })}
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Total Pesanan</label>
              <input
                type="number"
                value={formData.orders}
                onChange={(e) => setFormData({ ...formData, orders: Number(e.target.value) })}
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Pesanan Batal</label>
              <input
                type="number"
                value={formData.cancelled_orders}
                onChange={(e) => setFormData({ ...formData, cancelled_orders: Number(e.target.value) })}
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* 4 STATUS KOMISI (SEPARATE FIELDS) */}
          <div className="p-4 bg-paper border-2 border-ink rounded-lg space-y-3">
            <span className="font-extrabold text-xs uppercase text-ink block">
              Empat Status Komisi Shopee (Catat Terpisah, Jangan Dijumlah):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-warm-gray">1. Komisi Estimasi (Rp)</label>
                <input
                  type="number"
                  value={formData.commission_estimated}
                  onChange={(e) => setFormData({ ...formData, commission_estimated: Number(e.target.value) })}
                  className="brutalist-input w-full px-3 py-1.5 text-xs bg-surface"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-warm-gray">2. Komisi Pending (Rp)</label>
                <input
                  type="number"
                  value={formData.commission_pending}
                  onChange={(e) => setFormData({ ...formData, commission_pending: Number(e.target.value) })}
                  className="brutalist-input w-full px-3 py-1.5 text-xs bg-surface"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-brand-orange">3. Komisi Disetujui (Rp) *</label>
                <input
                  type="number"
                  value={formData.commission_approved}
                  onChange={(e) => setFormData({ ...formData, commission_approved: Number(e.target.value) })}
                  className="brutalist-input w-full px-3 py-1.5 text-xs bg-surface border-brand-orange"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-ink">4. Komisi Dibayarkan (Rp)</label>
                <input
                  type="number"
                  value={formData.commission_paid}
                  onChange={(e) => setFormData({ ...formData, commission_paid: Number(e.target.value) })}
                  className="brutalist-input w-full px-3 py-1.5 text-xs bg-surface"
                />
              </div>
            </div>
          </div>

          {/* LIVE METRIC PREVIEW */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-surface border border-ink rounded text-center text-xs font-bold">
            <div>
              <span className="text-[10px] text-warm-gray block">Estimasi CTR:</span>
              <span className="text-brand-orange">{formatPercent(modalCTR)}</span>
            </div>
            <div>
              <span className="text-[10px] text-warm-gray block">Estimasi CVR:</span>
              <span>{formatPercent(modalCVR)}</span>
            </div>
            <div>
              <span className="text-[10px] text-warm-gray block">Estimasi EPC:</span>
              <span className="text-brand-orange">{formatRupiah(modalEPC)}</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">Catatan & Evaluasi Harian</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Contoh: Terjadi lonjakan klik berkat thumbnail sebelum-sesudah yang kontras."
              className="brutalist-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-ink/10">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Simpan Data Performa
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
