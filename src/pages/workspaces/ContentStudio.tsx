import React, { useState, useEffect } from 'react';
import { ContentItem } from '@/types/database';
import {
  getStoredContentItems,
  saveStoredContentItem,
  deleteStoredContentItem,
  syncContentItemsFromCloud,
  getStoredProducts
} from '@/features/workspaces/workspaceStorage';
import { useAuth } from '@/features/auth/AuthContext';
import { HOOK_BANK, HookTemplate } from '@/data/hookBankData';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  Video,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Send
} from 'lucide-react';

export const ContentStudio: React.FC = () => {
  const { user } = useAuth();
  const [contentList, setContentList] = useState<ContentItem[]>(getStoredContentItems());
  const products = getStoredProducts();

  useEffect(() => {
    if (user?.id) {
      syncContentItemsFromCloud(user.id).then((fresh) => {
        if (fresh) setContentList(fresh);
      });
    }
  }, [user]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHookBankOpen, setIsHookBankOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  // Filter for Hook Bank category
  const [hookCategory, setHookCategory] = useState<HookTemplate['category']>('masalah');

  // Form State
  const [formData, setFormData] = useState<Omit<ContentItem, 'id' | 'user_id'>>({
    title: '',
    product_id: products[0]?.id || '',
    platform: 'Shopee Video',
    pillar: 'Demonstrasi Produk',
    format: 'Video Vertikal (9:16)',
    hook_type: 'masalah',
    hook: '',
    angle: '',
    script: '',
    cta: 'Klik keranjang oranye nomor 01 sekarang!',
    has_disclosure: true,
    status: 'idea',
    scheduled_at: '',
    published_at: '',
    content_url: '',
    qc_checklist: {
      authentic: true,
      audio_quality: true,
      cta_clear: true,
      disclosure_present: true,
    },
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      product_id: products[0]?.id || '',
      platform: 'Shopee Video',
      pillar: 'Demonstrasi Produk',
      format: 'Video Vertikal (9:16)',
      hook_type: 'masalah',
      hook: '',
      angle: '',
      script: '',
      cta: 'Klik keranjang oranye nomor 01 sekarang!',
      has_disclosure: true,
      status: 'idea',
      scheduled_at: '',
      published_at: '',
      content_url: '',
      qc_checklist: {
        authentic: false,
        audio_quality: false,
        cta_clear: false,
        disclosure_present: true,
      },
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ContentItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      product_id: item.product_id || '',
      platform: item.platform,
      pillar: item.pillar || 'Demonstrasi Produk',
      format: item.format || 'Video Vertikal (9:16)',
      hook_type: item.hook_type || 'masalah',
      hook: item.hook || '',
      angle: item.angle || '',
      script: item.script || '',
      cta: item.cta || '',
      has_disclosure: item.has_disclosure,
      status: item.status,
      scheduled_at: item.scheduled_at || '',
      published_at: item.published_at || '',
      content_url: item.content_url || '',
      qc_checklist: item.qc_checklist || {},
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus draf konten ini?')) {
      deleteStoredContentItem(id, user?.id);
      setContentList(getStoredContentItems());
    }
  };

  const handleSelectHook = (hook: HookTemplate) => {
    setFormData((prev) => ({
      ...prev,
      hook_type: hook.category,
      hook: hook.hookText,
      angle: hook.angle,
      script: `[3 DETIK HOOK]:\n${hook.hookText}\n\n[KONTEKS MASALAH]:\n...\n\n[BUKTI & DEMO SOLUSI]:\n...\n\n[CALL TO ACTION]:\n${prev.cta}\n\n[DISCLOSURE AFFILIATE]:\nLink ini memuat tautan affiliate resmi.`,
    }));
    setIsHookBankOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: ContentItem = {
      id: editingItem ? editingItem.id : (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `cnt-${Date.now()}`),
      user_id: user?.id || 'default',
      title: formData.title,
      product_id: formData.product_id || null,
      platform: formData.platform,
      pillar: formData.pillar,
      format: formData.format,
      hook_type: formData.hook_type,
      hook: formData.hook,
      angle: formData.angle,
      script: formData.script,
      cta: formData.cta,
      has_disclosure: formData.has_disclosure,
      status: formData.status,
      scheduled_at: formData.scheduled_at || null,
      published_at: formData.published_at || null,
      content_url: formData.content_url || null,
      qc_checklist: formData.qc_checklist,
    };

    saveStoredContentItem(payload, user?.id);
    setContentList(getStoredContentItems());
    setIsModalOpen(false);
  };

  const statusLabels: Record<ContentItem['status'], { label: string; color: string }> = {
    idea: { label: 'Ide', color: 'bg-paper text-ink' },
    research: { label: 'Riset', color: 'bg-paper text-ink' },
    script: { label: 'Skrip', color: 'bg-brand-orange/20 text-ink' },
    production: { label: 'Produksi', color: 'bg-brand-orange/30 text-ink' },
    review: { label: 'Pemeriksaan QC', color: 'bg-soft-coral text-ink' },
    ready: { label: 'Siap Tayang', color: 'bg-acid-lime text-ink' },
    published: { label: 'Terbit', color: 'bg-acid-lime text-ink font-extrabold' },
    evaluation: { label: 'Evaluasi', color: 'bg-brand-orange text-white' },
    done: { label: 'Selesai', color: 'bg-ink text-white' },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. HEADER */}
      <div className="brutalist-card p-6 sm:p-8 bg-surface space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <StickerBadge variant="orange">WORKSPACE 03</StickerBadge>
              <span className="text-xs font-bold text-warm-gray">Mendukung Project 04</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2">
              Content Creation Studio
              <Sparkle className="w-5 h-5 text-brand-orange" />
            </h1>
            <p className="text-xs sm:text-sm text-warm-gray font-medium max-w-2xl leading-relaxed">
              Hubungkan ide konten ke produk riset, pilih formula dari 30+ Hook Bank, buat naskah video 5 bagian, dan validasi dengan 11 butir QC sebelum dipublikasikan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsHookBankOpen(true)}
              icon={<Sparkles className="w-4 h-4 text-brand-orange" />}
            >
              Buka Hook Bank (30+)
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenAdd}
              icon={<Plus className="w-4 h-4" />}
            >
              Buat Draf Konten
            </Button>
          </div>
        </div>
      </div>

      {/* 2. CONTENT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentList.map((item) => {
          const matchedProduct = products.find((p) => p.id === item.product_id);
          const st = statusLabels[item.status] || { label: item.status, color: 'bg-paper text-ink' };

          return (
            <div
              key={item.id}
              className="brutalist-card p-5 bg-surface hover:bg-paper/30 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-ink bg-paper">
                    {item.platform}
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-ink ${st.color}`}>
                    {st.label}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-ink leading-snug line-clamp-2">
                  {item.title}
                </h3>

                {matchedProduct && (
                  <div className="text-xs font-bold text-brand-orange bg-brand-orange/10 p-2 rounded border border-brand-orange/30 truncate">
                    Produk: {matchedProduct.name}
                  </div>
                )}

                {item.hook && (
                  <div className="p-2.5 bg-paper border border-ink/30 rounded text-xs space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-warm-gray block">
                      Hook 3 Detik:
                    </span>
                    <p className="text-ink font-semibold italic text-[11px] line-clamp-2">
                      "{item.hook}"
                    </p>
                  </div>
                )}

                {item.cta && (
                  <p className="text-xs text-warm-gray font-medium">
                    <strong className="text-ink">CTA:</strong> {item.cta}
                  </p>
                )}
              </div>

              <div className="border-t-2 border-ink/10 pt-3 flex items-center justify-between text-xs">
                {item.content_url ? (
                  <a
                    href={item.content_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-orange font-bold hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Lihat Konten Terbit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[11px] text-warm-gray">Draf Produksi</span>
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 border border-ink rounded hover:bg-paper"
                    title="Edit Skrip"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 border border-ink rounded hover:bg-soft-coral/30"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-soft-coral" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. MODAL HOOK BANK BROWSER */}
      <Modal
        isOpen={isHookBankOpen}
        onClose={() => setIsHookBankOpen(false)}
        title={
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-orange" />
            <span>Pustaka Hook Bank Bawaan (30 Formula Teruji)</span>
          </span>
        }
        maxWidth="xl"
      >
        <div className="space-y-4">
          <p className="text-xs text-warm-gray leading-relaxed font-medium">
            Pilih kategori hook sesuai sudut pandang kontenmu. Klik <strong>"Gunakan Hook Ini"</strong> untuk otomatis memasukkannya ke naskah skrip.
          </p>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'masalah', label: '1. Masalah (6)' },
              { id: 'penasaran', label: '2. Rasa Penasaran (6)' },
              { id: 'demonstrasi', label: '3. Demonstrasi (6)' },
              { id: 'komparasi', label: '4. Komparasi (6)' },
              { id: 'keberatan', label: '5. Solusi Keberatan (6)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setHookCategory(cat.id as any)}
                className={`px-3 py-1.5 text-xs font-bold border-2 rounded-md transition-all whitespace-nowrap ${
                  hookCategory === cat.id
                    ? 'bg-ink text-white border-ink shadow-[2px_2px_0px_#171717]'
                    : 'bg-paper text-ink border-ink hover:bg-surface'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
            {HOOK_BANK.filter((h) => h.category === hookCategory).map((hook) => (
              <div
                key={hook.id}
                className="p-4 bg-paper border-2 border-ink rounded-lg space-y-2 hover:bg-surface transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-acid-lime border border-ink">
                    Formula {hook.categoryLabel}
                  </span>
                  <span className="text-xs text-warm-gray italic">{hook.angle}</span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-ink leading-snug">
                  "{hook.hookText}"
                </p>

                <p className="text-[11px] text-warm-gray bg-surface p-2 rounded border border-ink/20">
                  <strong className="text-brand-orange">Contoh Pemakaian:</strong> {hook.exampleContext}
                </p>

                <div className="pt-1 flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSelectHook(hook)}
                    icon={<Send className="w-3.5 h-3.5" />}
                  >
                    Gunakan Hook Ini
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* 4. MODAL ADD / EDIT CONTENT DRAFT */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <span className="flex items-center gap-2">
            <Video className="w-5 h-5 text-brand-orange" />
            <span>{editingItem ? 'Edit Naskah & Status Konten' : 'Buat Draf Konten Baru'}</span>
          </span>
        }
        maxWidth="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">Judul Konten / Konsep *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Contoh: Tes Masak Telur Tanpa Minyak: Beneran Gak Lengket?"
              className="brutalist-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Produk Terkait</label>
              <select
                value={formData.product_id || ''}
                onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                className="brutalist-input w-full px-3 py-2 text-sm bg-surface truncate"
              >
                <option value="">-- Tanpa Produk Khusus --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="brutalist-input w-full px-3 py-2 text-sm bg-surface"
              >
                <option value="Shopee Video">Shopee Video</option>
                <option value="TikTok">TikTok</option>
                <option value="Instagram Reels">Instagram Reels</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Status Alur Kerja</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as ContentItem['status'] })
                }
                className="brutalist-input w-full px-3 py-2 text-sm bg-surface"
              >
                <option value="idea">1. Ide</option>
                <option value="research">2. Riset</option>
                <option value="script">3. Skrip</option>
                <option value="production">4. Produksi</option>
                <option value="review">5. Pemeriksaan QC</option>
                <option value="ready">6. Siap Publikasi</option>
                <option value="published">7. Terbit</option>
                <option value="evaluation">8. Evaluasi</option>
                <option value="done">9. Selesai</option>
              </select>
            </div>
          </div>

          {/* HOOK INPUT WITH HOOK BANK TRIGGER */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase text-ink">
                Hook Kalimat Pembuka (3 Detik Pertama) *
              </label>
              <button
                type="button"
                onClick={() => setIsHookBankOpen(true)}
                className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pilih dari Hook Bank</span>
              </button>
            </div>
            <textarea
              rows={2}
              required
              value={formData.hook}
              onChange={(e) => setFormData({ ...formData, hook: e.target.value })}
              placeholder="Tulis hook kalimat pemikat di 3 detik pertama..."
              className="brutalist-input w-full px-3 py-2 text-sm"
            />
          </div>

          {/* SCRIPT EDITOR */}
          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">
              Naskah Lengkap (Hook → Konteks → Bukti Solusi → CTA → Disclosure)
            </label>
            <textarea
              rows={6}
              value={formData.script}
              onChange={(e) => setFormData({ ...formData, script: e.target.value })}
              placeholder="Tuliskan naskah adegan dan narasi video..."
              className="brutalist-input w-full px-3 py-2 text-sm font-mono text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Call To Action (CTA)</label>
              <input
                type="text"
                value={formData.cta}
                onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                placeholder="Klik keranjang oranye nomor 01!"
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">URL Konten (Jika Sudah Terbit)</label>
              <input
                type="url"
                value={formData.content_url || ''}
                onChange={(e) => setFormData({ ...formData, content_url: e.target.value })}
                placeholder="https://tiktok.com/@kamu/video/..."
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* QC CHECKLIST ACCORDION */}
          <div className="p-4 bg-paper border-2 border-ink rounded-lg space-y-2.5">
            <span className="font-extrabold text-xs uppercase text-ink flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              Quality Control (QC) Kepatuhan Sebelum Terbit:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-ink">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.has_disclosure}
                  onChange={(e) => setFormData({ ...formData, has_disclosure: e.target.checked })}
                  className="accent-brand-orange"
                />
                <span>Memuat Affiliate Disclosure</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!formData.qc_checklist?.authentic}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      qc_checklist: { ...formData.qc_checklist, authentic: e.target.checked },
                    })
                  }
                  className="accent-brand-orange"
                />
                <span>Tidak ada klaim palsu tanpa bukti</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!formData.qc_checklist?.audio_quality}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      qc_checklist: { ...formData.qc_checklist, audio_quality: e.target.checked },
                    })
                  }
                  className="accent-brand-orange"
                />
                <span>Audio jernih & visual tajam</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!formData.qc_checklist?.cta_clear}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      qc_checklist: { ...formData.qc_checklist, cta_clear: e.target.checked },
                    })
                  }
                  className="accent-brand-orange"
                />
                <span>Nomor link / CTA jelas di layar</span>
              </label>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-ink/10">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Simpan Draf Konten
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
