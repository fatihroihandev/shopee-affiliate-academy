import React, { useState, useEffect } from 'react';
import {
  SopItem,
  getStoredSops,
  saveStoredSop,
  deleteStoredSop,
  syncSopsFromCloud,
} from '@/features/workspaces/workspaceStorage';
import { useAuth } from '@/features/auth/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  BookCheck,
  Plus,
  Trash2,
  Edit2,
  Copy,
  Check,
  Info,
  Calendar,
  Layers,
  FileText,
} from 'lucide-react';

export const SopDocuments: React.FC = () => {
  const { user } = useAuth();
  const [sops, setSops] = useState<SopItem[]>(getStoredSops());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSop, setEditingSop] = useState<SopItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<SopItem>>({
    title: '',
    category: 'Riset & Verifikasi',
    procedure: '',
    last_reviewed_at: new Date().toISOString().split('T')[0],
    review_notes: '',
  });

  useEffect(() => {
    if (user?.id) {
      syncSopsFromCloud(user.id).then((fresh) => {
        if (fresh) setSops(fresh);
      });
    } else {
      setSops(getStoredSops());
    }
  }, [user]);

  const handleOpenAdd = () => {
    setEditingSop(null);
    setFormData({
      title: '',
      category: 'Produksi Konten',
      procedure: '1. Langkah pertama: ...\n2. Langkah kedua: ...\n3. Langkah ketiga: ...',
      last_reviewed_at: new Date().toISOString().split('T')[0],
      review_notes: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sop: SopItem) => {
    setEditingSop(sop);
    setFormData(sop);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus dokumen SOP ini?')) {
      deleteStoredSop(id, user?.id);
      setSops(getStoredSops());
    }
  };

  const handleCopyProcedure = (sop: SopItem) => {
    const text = `${sop.title}\nKategori: ${sop.category}\n\nPROSEDUR KERJA:\n${sop.procedure}\n\nCatatan Review (${sop.last_reviewed_at}): ${sop.review_notes || '-'}`;
    navigator.clipboard.writeText(text);
    setCopiedId(sop.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.procedure) {
      alert('Judul dan prosedur kerja SOP wajib diisi!');
      return;
    }

    const item: SopItem = {
      id: editingSop ? editingSop.id : (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `sop-${Date.now()}`),
      user_id: user?.id || 'default',
      title: formData.title || 'SOP Baru',
      category: formData.category || 'Operasional',
      procedure: formData.procedure || '',
      last_reviewed_at: formData.last_reviewed_at || new Date().toISOString().split('T')[0],
      review_notes: formData.review_notes || '',
    };

    saveStoredSop(item, user?.id);
    setSops(getStoredSops());
    setIsModalOpen(false);
  };

  const categories = ['all', ...Array.from(new Set(sops.map((s) => s.category)))];

  const filteredSops = sops.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-ink pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-brand-orange text-white border-2 border-ink shadow-[2px_2px_0px_#171717]">
              <BookCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-warm-gray">
              Workspace & Project 08
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-ink font-serif">
            SOP & Knowledge Hub
          </h1>
          <p className="text-sm text-warm-gray mt-1">
            Dokumentasi Standar Operasional Prosedur untuk sistematisasi alur kerja affiliate, delegasi asisten, dan mitigasi risiko akun.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" onClick={handleOpenAdd} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Buat Dokumen SOP Baru
          </Button>
        </div>
      </div>

      {/* Guide Card */}
      <Card className="bg-paper border-2 border-ink p-5">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs leading-relaxed text-ink">
            <h4 className="font-bold text-sm">
              Pedoman Standardisasi Alur Kerja (Project 08):
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="bg-surface p-2.5 border border-ink shadow-[2px_2px_0px_#171717]">
                <strong className="block text-brand-orange mb-1">SOP 01: Verifikasi Toko</strong>
                Kriteria seleksi toko Star/Mall, ketiadaan ulasan negatif fatal, stok aman, dan persentase komisi minimal 5%.
              </div>
              <div className="bg-surface p-2.5 border border-ink shadow-[2px_2px_0px_#171717]">
                <strong className="block text-brand-orange mb-1">SOP 02: QC Produksi Video</strong>
                11 butir pengecekan video, rasio 9:16, audio jernih, kejelasan nomor link, dan kepatuhan disclaimer affiliate.
              </div>
              <div className="bg-surface p-2.5 border border-ink shadow-[2px_2px_0px_#171717]">
                <strong className="block text-brand-orange mb-1">SOP 03: Evaluasi Mingguan</strong>
                Rekonsiliasi transaksi, evaluasi link rusak/out-of-stock, dan perumusan sprint eksperimen berikutnya.
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-ink pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-warm-gray mr-2 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" /> Kategori SOP:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 text-xs font-bold border-2 border-ink transition-all ${
              selectedCategory === cat
                ? 'bg-ink text-white shadow-[2px_2px_0px_#FF7A24]'
                : 'bg-surface hover:bg-paper'
            }`}
          >
            {cat === 'all' ? 'Semua Kategori' : cat}
          </button>
        ))}
      </div>

      {/* SOP List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSops.length === 0 ? (
          <div className="col-span-2 text-center py-12 border-2 border-dashed border-warm-gray/40 bg-surface">
            <FileText className="w-12 h-12 text-warm-gray mx-auto mb-3 opacity-40" />
            <h3 className="font-bold text-base text-ink mb-1">Belum Ada Dokumen SOP</h3>
            <p className="text-xs text-warm-gray max-w-sm mx-auto mb-4">
              Buat SOP pertama Anda untuk mendokumentasikan instruksi kerja yang konsisten dan siap didelegasikan.
            </p>
            <Button variant="primary" onClick={handleOpenAdd} className="text-xs">
              Buat Dokumen SOP
            </Button>
          </div>
        ) : (
          filteredSops.map((sop) => (
            <Card key={sop.id} className="p-6 border-2 border-ink bg-surface shadow-[4px_4px_0px_#171717] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Header Badge & Actions */}
                <div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 bg-acid-lime border border-ink text-ink uppercase">
                    {sop.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyProcedure(sop)}
                      className="p-1.5 border border-ink bg-paper hover:bg-amber-100 transition-all text-ink text-xs flex items-center gap-1"
                      title="Salin SOP"
                    >
                      {copiedId === sop.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-[10px] font-bold text-green-700">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold">Salin</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleOpenEdit(sop)}
                      className="p-1.5 border border-ink hover:bg-paper transition-all"
                      title="Edit SOP"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-ink" />
                    </button>
                    <button
                      onClick={() => handleDelete(sop.id)}
                      className="p-1.5 border border-ink hover:bg-soft-coral/30 transition-all text-soft-coral"
                      title="Hapus SOP"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-ink">{sop.title}</h3>

                {/* Procedure Body */}
                <div className="bg-paper p-3.5 border-2 border-ink">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-warm-gray block mb-2">
                    Instruksi Prosedur Langkah Demi Langkah:
                  </span>
                  <pre className="text-xs text-ink whitespace-pre-wrap font-sans leading-relaxed">
                    {sop.procedure}
                  </pre>
                </div>

                {/* Review Notes */}
                {sop.review_notes && (
                  <div className="text-xs bg-surface p-2.5 border border-ink">
                    <strong className="text-warm-gray block text-[10px] uppercase">Catatan Review & Kepatuhan:</strong>
                    <span className="text-ink italic">{sop.review_notes}</span>
                  </div>
                )}
              </div>

              {/* Footer info */}
              <div className="pt-3 border-t border-ink/10 flex items-center justify-between text-[11px] text-warm-gray">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Terakhir Ditinjau: {sop.last_reviewed_at}
                </span>
                <span className="font-mono text-[10px] bg-paper px-1.5 py-0.5 border border-ink">
                  ID: {sop.id}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSop ? 'Edit Dokumen SOP' : 'Buat Dokumen SOP Baru'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Judul SOP <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Contoh: SOP 01: Verifikasi Produk & Kepatuhan Toko"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1">
                Kategori Operasional
              </label>
              <Input
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Riset, Produksi, Distribusi, Review"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1">
                Tanggal Peninjauan Terakhir
              </label>
              <Input
                type="date"
                value={formData.last_reviewed_at || ''}
                onChange={(e) => setFormData({ ...formData, last_reviewed_at: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Prosedur Langkah Demi Langkah <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full p-2.5 text-xs border-2 border-ink bg-surface focus:outline-none focus:ring-1 focus:ring-brand-orange"
              rows={8}
              value={formData.procedure || ''}
              onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
              placeholder="1. Buka Shopee Affiliate Dashboard...&#10;2. Periksa rating toko minimal 4.7...&#10;3. Pastikan stok > 100..."
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Catatan Peninjauan / Kepatuhan
            </label>
            <textarea
              className="w-full p-2 text-xs border-2 border-ink bg-surface focus:outline-none"
              rows={2}
              value={formData.review_notes || ''}
              onChange={(e) => setFormData({ ...formData, review_notes: e.target.value })}
              placeholder="Catatan tambahan untuk delegasi atau mitigasi risiko..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t-2 border-ink">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" type="submit">
              Simpan Dokumen SOP
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
