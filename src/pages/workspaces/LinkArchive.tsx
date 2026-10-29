import React, { useState, useEffect } from 'react';
import {
  AffiliateLinkItem,
  getStoredAffiliateLinks,
  saveStoredAffiliateLink,
  deleteStoredAffiliateLink,
  syncAffiliateLinksFromCloud,
  getStoredProducts
} from '@/features/workspaces/workspaceStorage';
import { useAuth } from '@/features/auth/AuthContext';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  Link2,
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  Copy,
  Check,
  Clock,
  Search
} from 'lucide-react';

export const LinkArchive: React.FC = () => {
  const { user } = useAuth();
  const [links, setLinks] = useState<AffiliateLinkItem[]>(getStoredAffiliateLinks());
  const products = getStoredProducts();

  useEffect(() => {
    if (user?.id) {
      syncAffiliateLinksFromCloud(user.id).then((fresh) => {
        if (fresh) setLinks(fresh);
      });
    }
  }, [user]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<AffiliateLinkItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<AffiliateLinkItem, 'id'>>({
    product_id: products[0]?.id || '',
    product_name: products[0]?.name || '',
    shop_name: '',
    url: '',
    platform: 'Shopee Affiliate Universal Link',
    status: 'active',
    checked_at: new Date().toISOString().slice(0, 10),
    notes: '',
  });

  const handleOpenAdd = () => {
    setEditingLink(null);
    setFormData({
      product_id: products[0]?.id || '',
      product_name: products[0]?.name || '',
      shop_name: 'Official Star+ Seller',
      url: 'https://shope.ee/...',
      platform: 'Shopee Affiliate Universal Link',
      status: 'active',
      checked_at: new Date().toISOString().slice(0, 10),
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (l: AffiliateLinkItem) => {
    setEditingLink(l);
    setFormData({
      product_id: l.product_id || '',
      product_name: l.product_name || '',
      shop_name: l.shop_name,
      url: l.url,
      platform: l.platform,
      status: l.status,
      checked_at: l.checked_at,
      notes: l.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus arsip tautan ini?')) {
      deleteStoredAffiliateLink(id, user?.id);
      setLinks(getStoredAffiliateLinks());
    }
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = products.find((p) => p.id === formData.product_id);

    const payload: AffiliateLinkItem = {
      id: editingLink ? editingLink.id : (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lnk-${Date.now()}`),
      user_id: user?.id || 'default',
      product_id: formData.product_id,
      product_name: matched ? matched.name : formData.product_name,
      shop_name: formData.shop_name,
      url: formData.url,
      platform: formData.platform,
      status: formData.status,
      checked_at: formData.checked_at,
      notes: formData.notes,
    };

    saveStoredAffiliateLink(payload, user?.id);
    setLinks(getStoredAffiliateLinks());
    setIsModalOpen(false);
  };

  const filteredLinks = links.filter(
    (l) =>
      l.shop_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.product_name && l.product_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      l.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. HEADER */}
      <div className="brutalist-card p-6 sm:p-8 bg-surface space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <StickerBadge variant="orange">WORKSPACE 05</StickerBadge>
              <span className="text-xs font-bold text-warm-gray">Mendukung Modul 14 & Project 05</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2">
              Link Archive (Manajemen Tautan)
              <Sparkle className="w-5 h-5 text-brand-orange" />
            </h1>
            <p className="text-xs sm:text-sm text-warm-gray font-medium max-w-2xl leading-relaxed">
              Arsipkan tautan affiliate Anda, hubungkan ke produk riset, dan pantau tanggal verifikasi keaktifan toko agar terhindar dari promosi tautan mati.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleOpenAdd}
            icon={<Plus className="w-4 h-4" />}
          >
            Tambah Link Affiliate
          </Button>
        </div>
      </div>

      {/* 2. CONTROLS */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-extrabold uppercase text-warm-gray">
          Total Tersimpan: {links.length} Tautan
        </span>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-warm-gray absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari toko / produk / URL..."
            className="brutalist-input w-full pl-9 pr-3.5 py-1.5 text-xs"
          />
        </div>
      </div>

      {/* 3. TABLE / LIST */}
      <div className="space-y-3">
        {filteredLinks.map((link) => {
          const isCopied = copiedId === link.id;

          return (
            <div
              key={link.id}
              className="brutalist-card p-5 bg-surface hover:bg-paper/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-ink bg-acid-lime text-ink">
                    {link.status === 'active' ? 'AKTIF' : link.status === 'needs_check' ? 'PERLU DICEK' : 'ARSIP'}
                  </span>
                  <span className="text-xs font-bold text-ink">
                    Toko: <strong>{link.shop_name}</strong>
                  </span>
                  {link.product_name && (
                    <span className="text-xs font-semibold text-brand-orange truncate max-w-[200px]">
                      • {link.product_name}
                    </span>
                  )}
                </div>

                <div className="font-mono text-xs text-ink bg-paper p-2 rounded border border-ink/30 truncate max-w-xl">
                  {link.url}
                </div>

                {link.notes && (
                  <p className="text-xs text-warm-gray font-medium">{link.notes}</p>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-ink/10">
                <div className="text-xs text-warm-gray flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Dicek: {link.checked_at}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(link.id, link.url)}
                    className="brutalist-btn bg-acid-lime text-ink px-3 py-1.5 text-xs font-bold gap-1"
                    title="Salin Tautan"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-ink" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Tersalin!' : 'Salin'}</span>
                  </button>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 border border-ink rounded hover:bg-paper"
                    title="Buka URL"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleOpenEdit(link)}
                    className="p-1.5 border border-ink rounded hover:bg-paper"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
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

      {/* 4. MODAL ADD / EDIT LINK */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <span className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-brand-orange" />
            <span>{editingLink ? 'Edit Link Affiliate' : 'Tambah Link Affiliate Baru'}</span>
          </span>
        }
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">Produk Terkait</label>
            <select
              value={formData.product_id || ''}
              onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
              className="brutalist-input w-full px-3 py-2 text-sm bg-surface truncate"
            >
              <option value="">-- Pilih Produk Riset --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">Nama Toko *</label>
            <input
              type="text"
              required
              value={formData.shop_name}
              onChange={(e) => setFormData({ ...formData, shop_name: e.target.value })}
              placeholder="Contoh: DapurKitchen Official Store"
              className="brutalist-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">URL Affiliate Link *</label>
            <input
              type="url"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://shope.ee/..."
              className="brutalist-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as AffiliateLinkItem['status'] })
                }
                className="brutalist-input w-full px-3 py-2 text-sm bg-surface"
              >
                <option value="active">Aktif</option>
                <option value="needs_check">Perlu Dicek</option>
                <option value="unused">Tidak Digunakan</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Tanggal Pemeriksaan</label>
              <input
                type="date"
                value={formData.checked_at}
                onChange={(e) => setFormData({ ...formData, checked_at: e.target.value })}
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">Catatan Toko / Syarat</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Contoh: Toko Star+, pengiriman cepat, diskon ongkir min belanja 30rb."
              className="brutalist-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-ink/10">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Simpan Link
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
