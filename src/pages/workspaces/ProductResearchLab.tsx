import React, { useState } from 'react';
import {
  AffiliateProduct
} from '@/types/database';
import {
  getStoredProducts,
  saveStoredProduct,
  deleteStoredProduct,
  calculateResearchScore
} from '@/features/workspaces/workspaceStorage';
import { formatRupiah } from '@/lib/utils';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import { ProductStatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  ShoppingBag,
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  Calculator,
  Search,
  Clock
} from 'lucide-react';

export const ProductResearchLab: React.FC = () => {
  const [products, setProducts] = useState<AffiliateProduct[]>(getStoredProducts());
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<AffiliateProduct | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    product_url: '',
    category: '',
    price: 0,
    commission_note: '',
    rating: 4.8,
    review_count: 500,
    status: 'ready' as AffiliateProduct['status'],
    notes: '',
    factors: {
      audience: 4,
      quality: 4,
      priceValue: 4,
      commission: 4,
      competition: 3,
      demo: 4,
      availability: 5,
    },
  });

  const liveCalculatedScore = calculateResearchScore(formData.factors);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      product_url: '',
      category: 'Peralatan Rumah Tangga',
      price: 99000,
      commission_note: 'Komisi 8% (Rp7.920)',
      rating: 4.8,
      review_count: 1200,
      status: 'ready',
      notes: '',
      factors: {
        audience: 4,
        quality: 4,
        priceValue: 4,
        commission: 4,
        competition: 3,
        demo: 4,
        availability: 5,
      },
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: AffiliateProduct) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      product_url: p.product_url,
      category: p.category || '',
      price: p.price,
      commission_note: p.commission_note || '',
      rating: p.rating || 4.8,
      review_count: p.review_count || 100,
      status: p.status,
      notes: p.notes || '',
      factors: {
        audience: p.score_audience_fit || 3,
        quality: p.score_quality || 3,
        priceValue: p.score_price_value || 3,
        commission: p.score_commission || 3,
        competition: p.score_competition || 3,
        demo: p.score_demo_potential || 3,
        availability: p.score_availability || 5,
      },
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Yakin ingin menghapus produk riset ini?')) {
      deleteStoredProduct(id);
      setProducts(getStoredProducts());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const score = calculateResearchScore(formData.factors);

    const productPayload: AffiliateProduct = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      user_id: 'current_user',
      name: formData.name,
      product_url: formData.product_url,
      category: formData.category,
      price: Number(formData.price),
      commission_note: formData.commission_note,
      rating: Number(formData.rating),
      review_count: Number(formData.review_count),
      checked_at: new Date().toISOString().slice(0, 10),
      score_audience_fit: formData.factors.audience,
      score_quality: formData.factors.quality,
      score_price_value: formData.factors.priceValue,
      score_commission: formData.factors.commission,
      score_competition: formData.factors.competition,
      score_demo_potential: formData.factors.demo,
      score_availability: formData.factors.availability,
      research_score: score,
      status: formData.status,
      notes: formData.notes,
      created_at: editingProduct ? editingProduct.created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    saveStoredProduct(productPayload);
    setProducts(getStoredProducts());
    setIsModalOpen(false);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesTab = activeTab === 'all' || p.status === activeTab;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. HEADER */}
      <div className="brutalist-card p-6 sm:p-8 bg-surface space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <StickerBadge variant="orange">WORKSPACE 01</StickerBadge>
              <span className="text-xs font-bold text-warm-gray">Mendukung Project 02</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2">
              Product Research Lab
              <Sparkle className="w-5 h-5 text-brand-orange" />
            </h1>
            <p className="text-xs sm:text-sm text-warm-gray font-medium max-w-2xl leading-relaxed">
              Kalkulator evaluasi produk 7 faktor berbobot (0–100). Saring produk berdasarkan kesesuaian audiens, potensi demo, komisi, dan kemudahan pengiriman sebelum membuat konten.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleOpenAdd}
            icon={<Plus className="w-4 h-4" />}
          >
            Tambah Produk Riset
          </Button>
        </div>
      </div>

      {/* 2. CONTROLS: TABS & SEARCH */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Semua Produk' },
            { id: 'ready', label: 'Siap Promosi' },
            { id: 'testing', label: 'Diuji' },
            { id: 'research', label: 'Riset' },
            { id: 'dropped', label: 'Dihentikan' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-bold border-2 rounded-md transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-ink text-white border-ink shadow-[2px_2px_0px_#171717]'
                  : 'bg-surface text-ink border-ink hover:bg-paper'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-warm-gray absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama produk / kategori..."
            className="brutalist-input w-full pl-9 pr-3.5 py-1.5 text-xs"
          />
        </div>
      </div>

      {/* 3. PRODUCTS LIST / TABLE */}
      {filteredProducts.length === 0 ? (
        <div className="brutalist-card p-12 bg-surface text-center space-y-3">
          <ShoppingBag className="w-10 h-10 text-warm-gray mx-auto" />
          <h3 className="font-extrabold text-base text-ink">Belum Ada Produk di Kategori Ini</h3>
          <p className="text-xs text-warm-gray max-w-sm mx-auto">
            Klik tombol "Tambah Produk Riset" untuk mengevaluasi produk Shopee pertamamu dengan skor 7 faktor.
          </p>
          <Button variant="primary" size="sm" onClick={handleOpenAdd}>
            Mulai Riset Produk
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const score = product.research_score || 0;
            const scoreBadgeClass =
              score >= 80
                ? 'bg-acid-lime text-ink'
                : score >= 65
                ? 'bg-brand-orange text-white'
                : 'bg-soft-coral text-ink';

            return (
              <div
                key={product.id}
                className="brutalist-card p-5 bg-surface hover:bg-paper/30 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-warm-gray uppercase tracking-wider truncate max-w-[150px]">
                      {product.category || 'Umum'}
                    </span>
                    <ProductStatusBadge status={product.status} />
                  </div>

                  <h3 className="font-extrabold text-base text-ink leading-snug line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline justify-between border-b-2 border-ink/10 pb-3">
                    <span className="text-lg font-extrabold text-ink">
                      {formatRupiah(product.price)}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-warm-gray">
                      <span>★ {product.rating || '4.8'}</span>
                      <span>({product.review_count || 0})</span>
                    </div>
                  </div>

                  {/* SCORE BADGE */}
                  <div className="p-3 bg-paper border-2 border-ink rounded-lg flex items-center justify-between shadow-[2px_2px_0px_#171717]">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-extrabold uppercase text-warm-gray block">
                        Skor 7 Faktor
                      </span>
                      <span className="text-xs font-bold text-ink">
                        {score >= 80 ? 'Kandidat Prioritas' : score >= 65 ? 'Perlu Ditinjau' : 'Evaluasi Kembali'}
                      </span>
                    </div>
                    <span
                      className={`text-xl font-extrabold px-2.5 py-1 rounded border-2 border-ink ${scoreBadgeClass}`}
                    >
                      {score}
                    </span>
                  </div>

                  {/* COMMISSION & NOTES */}
                  {product.commission_note && (
                    <p className="text-xs text-brand-orange font-bold bg-brand-orange/10 p-2 rounded border border-brand-orange/30">
                      {product.commission_note}
                    </p>
                  )}

                  {product.notes && (
                    <p className="text-xs text-warm-gray font-medium line-clamp-2">
                      {product.notes}
                    </p>
                  )}
                </div>

                <div className="border-t-2 border-ink/10 pt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-warm-gray">
                    <Clock className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Dicek: {product.checked_at}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={product.product_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 border border-ink rounded hover:bg-paper"
                      title="Buka URL Shopee"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="p-1.5 border border-ink rounded hover:bg-paper"
                      title="Edit Produk"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
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
      )}

      {/* 4. MODAL ADD / EDIT PRODUCT */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <span className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-orange" />
            <span>{editingProduct ? 'Edit Produk Riset' : 'Tambah Produk Riset Baru'}</span>
          </span>
        }
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">Nama Produk *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Wajan Granit Anti Lengket 24cm"
              className="brutalist-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">URL Produk Shopee *</label>
              <input
                type="url"
                required
                value={formData.product_url}
                onChange={(e) => setFormData({ ...formData, product_url: e.target.value })}
                placeholder="https://shopee.co.id/product/..."
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Kategori</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Peralatan Dapur / Elektronik"
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Harga (Rp)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Rating Toko</label>
              <input
                type="number"
                step="0.1"
                max="5"
                min="1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Jumlah Ulasan</label>
              <input
                type="number"
                value={formData.review_count}
                onChange={(e) => setFormData({ ...formData, review_count: Number(e.target.value) })}
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as AffiliateProduct['status'] })
                }
                className="brutalist-input w-full px-3 py-2 text-sm bg-surface"
              >
                <option value="research">Riset</option>
                <option value="ready">Siap Promosi</option>
                <option value="testing">Diuji</option>
                <option value="dropped">Dihentikan</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">Catatan Komisi Shopee</label>
            <input
              type="text"
              value={formData.commission_note}
              onChange={(e) => setFormData({ ...formData, commission_note: e.target.value })}
              placeholder="Contoh: Komisi 8% (Rp7.920 per pesanan)"
              className="brutalist-input w-full px-3 py-2 text-sm"
            />
          </div>

          {/* 7 FAKTOR BOBOT SLIDERS */}
          <div className="p-4 bg-paper border-2 border-ink rounded-lg space-y-3 shadow-[2px_2px_0px_#171717]">
            <div className="flex items-center justify-between border-b border-ink/20 pb-2">
              <span className="font-extrabold text-xs uppercase text-ink">
                Penilaian 7 Faktor (Skala 1–5):
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-warm-gray">Live Skor:</span>
                <span className="font-extrabold text-sm px-2 py-0.5 rounded bg-acid-lime border border-ink">
                  {liveCalculatedScore} / 100
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { key: 'audience', label: '1. Kesesuaian Audiens (Bobot 25%)', val: formData.factors.audience },
                { key: 'quality', label: '2. Kualitas & Reputasi Toko (Bobot 20%)', val: formData.factors.quality },
                { key: 'priceValue', label: '3. Nilai Guna terhadap Harga (Bobot 15%)', val: formData.factors.priceValue },
                { key: 'commission', label: '4. Besaran Komisi (Bobot 15%)', val: formData.factors.commission },
                { key: 'competition', label: '5. Tingkat Persaingan Pasar (Bobot 10%)', val: formData.factors.competition },
                { key: 'demo', label: '6. Kemudahan Demonstrasi Konten (Bobot 10%)', val: formData.factors.demo },
                { key: 'availability', label: '7. Ketersediaan Stok & Pengiriman (Bobot 5%)', val: formData.factors.availability },
              ].map((f) => (
                <div key={f.key} className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-ink flex-1 truncate">{f.label}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            factors: { ...formData.factors, [f.key]: num },
                          })
                        }
                        className={`w-7 h-7 text-xs font-bold border-2 rounded transition-all ${
                          f.val === num
                            ? 'bg-brand-orange text-white border-ink shadow-[1px_1px_0px_#171717]'
                            : 'bg-surface text-ink border-ink/40 hover:bg-paper'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">Catatan Strategi & Sudut Konten</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Contoh: Sangat cocok untuk video unboxing dan tes masak telur tanpa minyak."
              className="brutalist-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-ink/10">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Simpan Hasil Riset
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
