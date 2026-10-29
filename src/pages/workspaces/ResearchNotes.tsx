import React, { useState, useEffect } from 'react';
import {
  ResearchNoteItem,
  getStoredResearchNotes,
  saveStoredResearchNote,
  deleteStoredResearchNote,
  syncResearchNotesFromCloud,
} from '@/features/workspaces/workspaceStorage';
import { useAuth } from '@/features/auth/AuthContext';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  FileText,
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  Clock,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

export const ResearchNotes: React.FC = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<ResearchNoteItem[]>(getStoredResearchNotes());
  const [activeFilter, setActiveFilter] = useState<'all' | 'niche' | 'competitor'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<ResearchNoteItem | null>(null);

  useEffect(() => {
    if (user?.id) {
      syncResearchNotesFromCloud(user.id).then((fresh) => {
        if (fresh) setNotes(fresh);
      });
    }
  }, [user]);

  const [formData, setFormData] = useState<Omit<ResearchNoteItem, 'id'>>({
    note_type: 'niche',
    title: '',
    subject: '',
    findings: '',
    evidence_urls: [''],
    observed_at: new Date().toISOString().slice(0, 10),
    facts: '',
    assumptions: '',
    content_gaps: '',
    next_step: '',
  });

  const handleOpenAdd = (type: 'niche' | 'competitor' = 'niche') => {
    setEditingNote(null);
    setFormData({
      note_type: type,
      title: type === 'niche' ? 'Riset Masalah Audiens Baru' : 'Audit Akun Kompetitor Baru',
      subject: '',
      findings: '',
      evidence_urls: [''],
      observed_at: new Date().toISOString().slice(0, 10),
      facts: '',
      assumptions: '',
      content_gaps: '',
      next_step: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (note: ResearchNoteItem) => {
    setEditingNote(note);
    setFormData({
      note_type: note.note_type,
      title: note.title,
      subject: note.subject,
      findings: note.findings,
      evidence_urls: note.evidence_urls.length > 0 ? note.evidence_urls : [''],
      observed_at: note.observed_at,
      facts: note.facts,
      assumptions: note.assumptions,
      content_gaps: note.content_gaps,
      next_step: note.next_step,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus catatan riset ini?')) {
      deleteStoredResearchNote(id, user?.id);
      setNotes(getStoredResearchNotes());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: ResearchNoteItem = {
      id: editingNote ? editingNote.id : (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `note-${Date.now()}`),
      user_id: user?.id || 'default',
      note_type: formData.note_type,
      title: formData.title,
      subject: formData.subject,
      findings: formData.findings,
      evidence_urls: formData.evidence_urls.filter((url) => url.trim().length > 0),
      observed_at: formData.observed_at,
      facts: formData.facts,
      assumptions: formData.assumptions,
      content_gaps: formData.content_gaps,
      next_step: formData.next_step,
    };

    saveStoredResearchNote(payload, user?.id);
    setNotes(getStoredResearchNotes());
    setIsModalOpen(false);
  };

  const filteredNotes = notes.filter((n) => {
    const matchesTab = activeFilter === 'all' || n.note_type === activeFilter;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.findings.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. HEADER */}
      <div className="brutalist-card p-6 sm:p-8 bg-surface space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <StickerBadge variant="coral">WORKSPACE 02</StickerBadge>
              <span className="text-xs font-bold text-warm-gray">Mendukung Project 01 & 03</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2">
              Research Notes: Niche & Kompetitor
              <Sparkle className="w-5 h-5 text-brand-orange" />
            </h1>
            <p className="text-xs sm:text-sm text-warm-gray font-medium max-w-2xl leading-relaxed">
              Catat bukti fakta nyata dan bedakan dengan asumsi hipotesis. Temukan 10 celah konten yang belum dijawab dengan baik oleh kompetitor.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleOpenAdd('niche')}
              icon={<Plus className="w-4 h-4" />}
            >
              + Riset Niche
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleOpenAdd('competitor')}
              icon={<Plus className="w-4 h-4" />}
            >
              + Audit Kompetitor
            </Button>
          </div>
        </div>
      </div>

      {/* 2. CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: 'Semua Catatan' },
            { id: 'niche', label: 'Niche & Audiens (P01)' },
            { id: 'competitor', label: 'Riset Kompetitor (P03)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-bold border-2 rounded-md transition-all ${
                activeFilter === tab.id
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
            placeholder="Cari catatan riset..."
            className="brutalist-input w-full pl-9 pr-3.5 py-1.5 text-xs"
          />
        </div>
      </div>

      {/* 3. LIST OF NOTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotes.map((note) => {
          const isNiche = note.note_type === 'niche';

          return (
            <div
              key={note.id}
              className="brutalist-card p-6 bg-surface hover:bg-paper/30 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-ink ${
                      isNiche ? 'bg-acid-lime text-ink' : 'bg-soft-coral text-ink'
                    }`}
                  >
                    {isNiche ? 'Niche & Audiens' : 'Audit Kompetitor'}
                  </span>
                  <span className="text-[11px] font-semibold text-warm-gray flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-orange" />
                    {note.observed_at}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-ink leading-snug">
                  {note.title}
                </h3>

                <div className="text-xs font-bold text-brand-orange">
                  Target: {note.subject}
                </div>

                <p className="text-xs text-warm-gray leading-relaxed font-medium">
                  {note.findings}
                </p>

                {/* Facts vs Assumptions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 bg-paper border border-ink/30 rounded space-y-1">
                    <span className="font-extrabold text-[10px] text-ink uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-acid-lime fill-ink" />
                      Fakta Teramati:
                    </span>
                    <p className="text-warm-gray text-[11px] leading-tight">{note.facts || '-'}</p>
                  </div>
                  <div className="p-2.5 bg-paper border border-ink/30 rounded space-y-1">
                    <span className="font-extrabold text-[10px] text-ink uppercase flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-brand-orange" />
                      Asumsi Hipotesis:
                    </span>
                    <p className="text-warm-gray text-[11px] leading-tight">{note.assumptions || '-'}</p>
                  </div>
                </div>

                {note.content_gaps && (
                  <div className="p-3 bg-brand-orange/10 border border-brand-orange/40 rounded text-xs space-y-1">
                    <span className="font-extrabold text-ink text-[11px] uppercase flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-brand-orange" />
                      Celah Konten Pembeda:
                    </span>
                    <p className="text-ink text-[11px] leading-relaxed font-semibold">
                      {note.content_gaps}
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-ink/10 pt-3 flex items-center justify-between text-xs">
                {note.evidence_urls.length > 0 && note.evidence_urls[0] ? (
                  <a
                    href={note.evidence_urls[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-orange font-bold hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Lihat Bukti URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[11px] text-warm-gray">Tidak ada link</span>
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(note)}
                    className="p-1.5 border border-ink rounded hover:bg-paper"
                    title="Edit Catatan"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
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

      {/* 4. MODAL ADD / EDIT NOTE */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <span className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-orange" />
            <span>{editingNote ? 'Edit Catatan Riset' : 'Tambah Catatan Riset Baru'}</span>
          </span>
        }
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Tipe Riset *</label>
              <select
                value={formData.note_type}
                onChange={(e) =>
                  setFormData({ ...formData, note_type: e.target.value as 'niche' | 'competitor' })
                }
                className="brutalist-input w-full px-3 py-2 text-sm bg-surface"
              >
                <option value="niche">Niche & Audiens (Project 01)</option>
                <option value="competitor">Audit Kompetitor (Project 03)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">Tanggal Observasi</label>
              <input
                type="date"
                value={formData.observed_at}
                onChange={(e) => setFormData({ ...formData, observed_at: e.target.value })}
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">Judul Catatan *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Contoh: Audit Akun @DapurMinimalis atau Riset Masalah Ibu Muda"
              className="brutalist-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">
              Subjek / Akun / Niche Target *
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Contoh: Akun @kreatordapur / Niche Peralatan Masak WFH"
              className="brutalist-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">Temuan Utama</label>
            <textarea
              rows={2}
              value={formData.findings}
              onChange={(e) => setFormData({ ...formData, findings: e.target.value })}
              placeholder="Rangkum apa yang Anda temukan dari pengamatan ini..."
              className="brutalist-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">
                Fakta Teramati (Ada Buktinya)
              </label>
              <textarea
                rows={3}
                value={formData.facts}
                onChange={(e) => setFormData({ ...formData, facts: e.target.value })}
                placeholder="Fakta yang terlihat di layar, komentar nyata penonton..."
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-ink">
                Asumsi Hipotesis (Belum Tervalidasi)
              </label>
              <textarea
                rows={3}
                value={formData.assumptions}
                onChange={(e) => setFormData({ ...formData, assumptions: e.target.value })}
                placeholder="Dugaan Anda yang masih butuh pembuktian..."
                className="brutalist-input w-full px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">
              10 Celah Konten / Sudut Pandang Pembeda
            </label>
            <textarea
              rows={2}
              value={formData.content_gaps}
              onChange={(e) => setFormData({ ...formData, content_gaps: e.target.value })}
              placeholder="Pertanyaan penonton yang belum dijawab dengan baik oleh kompetitor..."
              className="brutalist-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase text-ink">URL Bukti Observasi</label>
            <input
              type="url"
              value={formData.evidence_urls[0] || ''}
              onChange={(e) => setFormData({ ...formData, evidence_urls: [e.target.value] })}
              placeholder="https://tiktok.com/@kompetitor/video/..."
              className="brutalist-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-ink/10">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Simpan Catatan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
