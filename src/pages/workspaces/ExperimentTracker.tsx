import React, { useState, useEffect } from 'react';
import {
  ExperimentItem,
  getStoredExperiments,
  saveStoredExperiment,
  deleteStoredExperiment,
  syncExperimentsFromCloud,
} from '@/features/workspaces/workspaceStorage';
import { useAuth } from '@/features/auth/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  FlaskConical,
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  Info,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

export const ExperimentTracker: React.FC = () => {
  const { user } = useAuth();
  const [experiments, setExperiments] = useState<ExperimentItem[]>(getStoredExperiments());
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<ExperimentItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ExperimentItem>>({
    name: '',
    goal: '',
    variable: 'Hook 3 Detik Pertama',
    hypothesis: '',
    primary_metric: 'CTR',
    baseline: 0,
    result: 0,
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    sample_size: 1000,
    limitations: '',
    decision: 'continue',
    decision_reason: '',
    lessons: '',
  });

  useEffect(() => {
    if (user?.id) {
      syncExperimentsFromCloud(user.id).then((fresh) => {
        if (fresh) setExperiments(fresh);
      });
    } else {
      setExperiments(getStoredExperiments());
    }
  }, [user]);

  const handleOpenAdd = () => {
    setEditingExp(null);
    setFormData({
      name: '',
      goal: '',
      variable: '3 Detik Pertama Video (Hook)',
      hypothesis:
        'Perubahan yang diuji:\nAlasan hipotesis:\nTolok ukur metrik utama:\nKriteria keputusan:',
      primary_metric: 'CTR (Click-Through Rate)',
      baseline: 0,
      result: 0,
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      sample_size: 1000,
      limitations: '',
      decision: 'optimize',
      decision_reason: '',
      lessons: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp: ExperimentItem) => {
    setEditingExp(exp);
    setFormData(exp);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus dokumentasi eksperimen ini?')) {
      deleteStoredExperiment(id, user?.id);
      setExperiments(getStoredExperiments());
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.hypothesis) {
      alert('Nama eksperimen dan hipotesis wajib diisi!');
      return;
    }

    const item: ExperimentItem = {
      id: editingExp ? editingExp.id : (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `exp-${Date.now()}`),
      user_id: user?.id || 'default',
      name: formData.name || 'Eksperimen Baru',
      goal: formData.goal || '',
      hypothesis: formData.hypothesis || '',
      variable: formData.variable || 'Hook',
      primary_metric: formData.primary_metric || 'CTR',
      baseline: Number(formData.baseline) || 0,
      result: Number(formData.result) || 0,
      start_date: formData.start_date || new Date().toISOString().split('T')[0],
      end_date: formData.end_date || '',
      sample_size: Number(formData.sample_size) || 0,
      limitations: formData.limitations || '',
      decision: formData.decision as any || 'continue',
      decision_reason: formData.decision_reason || '',
      lessons: formData.lessons || '',
    };

    saveStoredExperiment(item, user?.id);
    setExperiments(getStoredExperiments());
    setIsModalOpen(false);
  };

  const getDecisionBadge = (decision: ExperimentItem['decision']) => {
    switch (decision) {
      case 'continue':
        return <Badge variant="lime">Lanjutkan</Badge>;
      case 'optimize':
        return <Badge variant="orange">Optimalkan</Badge>;
      case 'retest':
        return <Badge variant="default">Uji Ulang</Badge>;
      case 'deprioritize':
        return <Badge variant="paper">Kurangi Prioritas</Badge>;
      case 'stop':
        return <Badge variant="coral">Hentikan</Badge>;
      default:
        return <Badge variant="default">{decision}</Badge>;
    }
  };

  const filteredExperiments = experiments.filter((exp) => {
    if (selectedFilter === 'all') return true;
    return exp.decision === selectedFilter;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-ink pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-brand-orange text-white border-2 border-ink shadow-[2px_2px_0px_#171717]">
              <FlaskConical className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-warm-gray">
              Workspace & Project 07
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-ink font-serif">
            Experiment Tracker (Sprint A/B)
          </h1>
          <p className="text-sm text-warm-gray mt-1">
            Validasi hipotesis konten secara metodologis dengan 4 bagian terukur: Perubahan, Alasan, Metrik, & Kriteria Keputusan.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" onClick={handleOpenAdd} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Uji Hipotesis Baru
          </Button>
        </div>
      </div>

      {/* Method Guide Card */}
      <Card className="bg-paper border-2 border-ink p-5">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs leading-relaxed text-ink">
            <h4 className="font-bold text-sm">
              Pedoman Disiplin Riset Modul 16 & Project 07:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1">
              <div className="bg-surface p-2.5 border border-ink shadow-[2px_2px_0px_#171717]">
                <strong className="block text-brand-orange mb-1">1. Satu Variabel</strong>
                Uji satu perubahan dalam satu waktu (misal: hanya hook 3 detik awal, atau hanya call-to-action).
              </div>
              <div className="bg-surface p-2.5 border border-ink shadow-[2px_2px_0px_#171717]">
                <strong className="block text-brand-orange mb-1">2. Ukuran Sampel Cukup</strong>
                Minimal 1.000–3.000 views organik sebelum menarik kesimpulan agar tidak terjebak noise.
              </div>
              <div className="bg-surface p-2.5 border border-ink shadow-[2px_2px_0px_#171717]">
                <strong className="block text-brand-orange mb-1">3. Standar 5 Keputusan</strong>
                Gunakan 5 kategori baku: Lanjutkan, Optimalkan, Uji Ulang, Kurangi Prioritas, atau Hentikan.
              </div>
              <div className="bg-surface p-2.5 border border-ink shadow-[2px_2px_0px_#171717]">
                <strong className="block text-brand-orange mb-1">4. Catat Pelajaran</strong>
                Setiap eksperimen gagal tetap bernilai jika menghasilkan aturan kerja (SOP) baru.
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-ink pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-warm-gray mr-2">
          Filter Keputusan:
        </span>
        {[
          { key: 'all', label: 'Semua' },
          { key: 'continue', label: 'Lanjutkan' },
          { key: 'optimize', label: 'Optimalkan' },
          { key: 'retest', label: 'Uji Ulang' },
          { key: 'deprioritize', label: 'Kurangi Prioritas' },
          { key: 'stop', label: 'Hentikan' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedFilter(tab.key)}
            className={`px-3 py-1 text-xs font-bold border-2 border-ink transition-all ${
              selectedFilter === tab.key
                ? 'bg-ink text-white shadow-[2px_2px_0px_#FF7A24]'
                : 'bg-surface hover:bg-paper'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Experiments Grid / List */}
      <div className="space-y-6">
        {filteredExperiments.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-warm-gray/40 bg-surface">
            <FlaskConical className="w-12 h-12 text-warm-gray mx-auto mb-3 opacity-40" />
            <h3 className="font-bold text-base text-ink mb-1">Belum Ada Eksperimen</h3>
            <p className="text-xs text-warm-gray max-w-sm mx-auto mb-4">
              Mulai uji satu variabel konten (hook, CTA, audio, atau visual) untuk meningkatkan konversi secara sistematis.
            </p>
            <Button variant="primary" onClick={handleOpenAdd} className="text-xs">
              Buat Eksperimen Pertama
            </Button>
          </div>
        ) : (
          filteredExperiments.map((exp) => {
            const diff = exp.result - exp.baseline;
            const diffPct = exp.baseline > 0 ? ((diff / exp.baseline) * 100).toFixed(1) : '0';
            const isPositive = diff >= 0;

            return (
              <Card key={exp.id} className="p-6 border-2 border-ink bg-surface shadow-[4px_4px_0px_#171717] space-y-5">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b-2 border-ink/10 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold px-2 py-0.5 bg-paper border border-ink uppercase">
                        Variabel: {exp.variable}
                      </span>
                      {getDecisionBadge(exp.decision)}
                      <span className="text-xs text-warm-gray">
                        Periode: {exp.start_date} {exp.end_date ? `s/d ${exp.end_date}` : '(Sedang Berjalan)'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-ink">{exp.name}</h3>
                    {exp.goal && (
                      <p className="text-xs text-warm-gray italic">
                        <strong>Tujuan:</strong> {exp.goal}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <button
                      onClick={() => handleOpenEdit(exp)}
                      className="p-1.5 border border-ink hover:bg-paper transition-all"
                      title="Edit Eksperimen"
                    >
                      <Edit2 className="w-4 h-4 text-ink" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="p-1.5 border border-ink hover:bg-soft-coral/30 transition-all text-soft-coral"
                      title="Hapus Eksperimen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metrics Comparison Box */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-paper p-3.5 border-2 border-ink">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-warm-gray block">
                      Metrik Utama
                    </span>
                    <span className="text-xs font-bold text-ink">{exp.primary_metric}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-warm-gray block">
                      Baseline Awal
                    </span>
                    <span className="text-sm font-extrabold text-ink">{exp.baseline}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-warm-gray block">
                      Hasil Uji Coba
                    </span>
                    <span className="text-sm font-extrabold text-ink flex items-center gap-1">
                      {exp.result}%
                      <span
                        className={`text-[10px] font-bold px-1 ${
                          isPositive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                        }`}
                      >
                        {isPositive ? `+${diffPct}%` : `${diffPct}%`}
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-warm-gray block">
                      Ukuran Sampel
                    </span>
                    <span className="text-xs font-bold text-ink">
                      {exp.sample_size.toLocaleString('id-ID')} tayangan
                    </span>
                  </div>
                </div>

                {/* 4-Part Hypothesis Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface p-3.5 border border-ink space-y-1">
                    <h5 className="text-xs font-bold text-brand-orange uppercase flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> Hipotesis & Rencana Uji
                    </h5>
                    <pre className="text-xs text-ink whitespace-pre-wrap font-sans leading-relaxed">
                      {exp.hypothesis}
                    </pre>
                  </div>
                  <div className="bg-surface p-3.5 border border-ink space-y-2">
                    <div>
                      <h5 className="text-xs font-bold text-ink uppercase flex items-center gap-1 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Alasan Keputusan
                      </h5>
                      <p className="text-xs text-ink">{exp.decision_reason || 'Belum diisi alasan keputusan.'}</p>
                    </div>
                    {exp.limitations && (
                      <div>
                        <h5 className="text-[11px] font-bold text-warm-gray uppercase flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-500" /> Keterbatasan / Noise
                        </h5>
                        <p className="text-xs text-warm-gray">{exp.limitations}</p>
                      </div>
                    )}
                    {exp.lessons && (
                      <div className="pt-1 border-t border-ink/10">
                        <h5 className="text-xs font-bold text-ink uppercase flex items-center gap-1 text-brand-orange">
                          <Lightbulb className="w-3.5 h-3.5" /> Pembelajaran Penting
                        </h5>
                        <p className="text-xs text-ink italic font-medium">{exp.lessons}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExp ? 'Edit Dokumentasi Eksperimen' : 'Uji Hipotesis Baru (Sprint A/B)'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Nama Eksperimen <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Uji Hook Masalah vs Demonstrasi Ceplok Telur"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1">
                Variabel yang Diubah
              </label>
              <Input
                value={formData.variable || ''}
                onChange={(e) => setFormData({ ...formData, variable: e.target.value })}
                placeholder="Hook, CTA, Cover, Jam Upload, dll"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1">
                Metrik Utama
              </label>
              <Input
                value={formData.primary_metric || ''}
                onChange={(e) => setFormData({ ...formData, primary_metric: e.target.value })}
                placeholder="CTR (%), CVR (%), Views, Watch Time"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Tujuan Eksperimen
            </label>
            <Input
              value={formData.goal || ''}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              placeholder="Contoh: Naikkan CTR dari 3.1% ke 4.5% di Shopee Video"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Format 4 Bagian Hipotesis <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full p-2.5 text-xs border-2 border-ink bg-surface focus:outline-none focus:ring-1 focus:ring-brand-orange"
              rows={4}
              value={formData.hypothesis || ''}
              onChange={(e) => setFormData({ ...formData, hypothesis: e.target.value })}
              placeholder="1. Perubahan yang diuji: ...&#10;2. Alasan hipotesis: ...&#10;3. Tolok ukur metrik utama: ...&#10;4. Kriteria keputusan: ..."
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1">
                Baseline (%)
              </label>
              <Input
                type="number"
                step="0.01"
                value={formData.baseline || 0}
                onChange={(e) => setFormData({ ...formData, baseline: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1">
                Hasil Uji (%)
              </label>
              <Input
                type="number"
                step="0.01"
                value={formData.result || 0}
                onChange={(e) => setFormData({ ...formData, result: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1">
                Sampel (Views)
              </label>
              <Input
                type="number"
                value={formData.sample_size || 1000}
                onChange={(e) => setFormData({ ...formData, sample_size: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1">
                Tanggal Mulai
              </label>
              <Input
                type="date"
                value={formData.start_date || ''}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1">
                Tanggal Selesai
              </label>
              <Input
                type="date"
                value={formData.end_date || ''}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1">
                Keputusan Standar
              </label>
              <select
                className="w-full p-2.5 text-xs border-2 border-ink bg-surface focus:outline-none"
                value={formData.decision || 'continue'}
                onChange={(e) => setFormData({ ...formData, decision: e.target.value as any })}
              >
                <option value="continue">Lanjutkan (Berhasil & Adopsi)</option>
                <option value="optimize">Optimalkan (Potensial Perlu Iterasi)</option>
                <option value="retest">Uji Ulang (Data Kurang Konklusif)</option>
                <option value="deprioritize">Kurangi Prioritas (Kurang Efektif)</option>
                <option value="stop">Hentikan (Tidak Bekerja)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1">
                Keterbatasan / Noise
              </label>
              <Input
                value={formData.limitations || ''}
                onChange={(e) => setFormData({ ...formData, limitations: e.target.value })}
                placeholder="Misal: Efek event tanggal kembar 10.10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Alasan Keputusan
            </label>
            <Input
              value={formData.decision_reason || ''}
              onChange={(e) => setFormData({ ...formData, decision_reason: e.target.value })}
              placeholder="Jelaskan dasar pengambilan keputusan"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink uppercase mb-1">
              Pembelajaran (Actionable Lesson)
            </label>
            <textarea
              className="w-full p-2 text-xs border-2 border-ink bg-surface focus:outline-none"
              rows={2}
              value={formData.lessons || ''}
              onChange={(e) => setFormData({ ...formData, lessons: e.target.value })}
              placeholder="Prinsip apa yang bisa dijadikan SOP berikutnya?"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t-2 border-ink">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" type="submit">
              Simpan Eksperimen
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
