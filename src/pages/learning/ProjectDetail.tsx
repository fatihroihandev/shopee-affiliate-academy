import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PRACTICE_PROJECTS } from '@/data/curriculumData';
import { useAuth } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabase';
import { StickerBadge } from '@/components/common/Doodles';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  Save,
  Wrench
} from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { projectCode } = useParams<{ projectCode: string }>();
  const { user } = useAuth();

  const currentProject = PRACTICE_PROJECTS.find(
    (p) => p.code.toLowerCase() === projectCode?.toLowerCase()
  );

  if (!currentProject) {
    return <Navigate to="/projects" replace />;
  }

  // Related workspace mapping
  const workspaceMap: Record<string, { title: string; link: string }> = {
    P01: { title: 'Buka Research Notes', link: '/tools/research-notes' },
    P02: { title: 'Buka Product Research Lab', link: '/tools/products' },
    P03: { title: 'Buka Research Notes', link: '/tools/research-notes' },
    P04: { title: 'Buka Content Creation Studio', link: '/tools/content' },
    P05: { title: 'Buka Link Archive', link: '/tools/links' },
    P06: { title: 'Buka Performance Tracker', link: '/tools/tracker' },
    P07: { title: 'Buka Experiment Tracker', link: '/tools/experiments' },
    P08: { title: 'Buka SOP Documents', link: '/tools/sop' },
  };

  const relatedWorkspace = workspaceMap[currentProject.code];

  const storageKey = `shopee_academy_project_${currentProject.code}`;
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [reflection, setReflection] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    // 1. Load local cache
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCheckedItems(parsed.checkedItems || []);
        setEvidenceUrl(parsed.evidenceUrl || '');
        setReflection(parsed.reflection || '');
      } catch (e) {}
    }

    // 2. Hydrate from Supabase if authenticated
    if (user && !user.id.startsWith('00000000-0000-0000-0000')) {
      const fetchCloudProgress = async () => {
        try {
          const { data, error } = await supabase
            .from('project_progress')
            .select('*')
            .eq('user_id', user.id)
            .eq('project_id', currentProject.id)
            .maybeSingle();

          if (!error && data) {
            if (Array.isArray(data.completed_checklist) && data.completed_checklist.length > 0) {
              setCheckedItems(data.completed_checklist);
            }
            if (data.reflection_notes) {
              setReflection(data.reflection_notes);
            }
            if (Array.isArray(data.evidence_urls) && data.evidence_urls.length > 0) {
              setEvidenceUrl(data.evidence_urls[0]);
            }
          }
        } catch (e) {
          // offline or network error fallback
        }
      };
      fetchCloudProgress();
    }
  }, [storageKey, user, currentProject.id]);

  const handleToggleCheck = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = {
      checkedItems,
      evidenceUrl,
      reflection,
      isCompleted: checkedItems.length === currentProject.checklist.length,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(storageKey, JSON.stringify(dataToSave));

    // Update global list of completed projects
    const allCompletedRaw = localStorage.getItem('shopee_academy_completed_projects');
    let allCompleted: string[] = allCompletedRaw ? JSON.parse(allCompletedRaw) : [];
    if (dataToSave.isCompleted) {
      if (!allCompleted.includes(currentProject.code)) allCompleted.push(currentProject.code);
    } else {
      allCompleted = allCompleted.filter((c) => c !== currentProject.code);
    }
    localStorage.setItem('shopee_academy_completed_projects', JSON.stringify(allCompleted));

    // If connected to live Supabase
    if (user && !user.id.startsWith('00000000-0000-0000-0000')) {
      try {
        const { error } = await supabase.from('project_progress').upsert(
          {
            user_id: user.id,
            project_id: currentProject.id,
            completed_checklist: checkedItems,
            reflection_notes: reflection,
            evidence_urls: evidenceUrl ? [evidenceUrl] : [],
            status: dataToSave.isCompleted ? 'completed' : 'in_progress',
            completed_at: dataToSave.isCompleted ? new Date().toISOString() : null,
          },
          { onConflict: 'user_id,project_id' }
        );
        if (error) {
          console.warn('Sync project progress error:', error.message);
        }
      } catch (e) {}
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const isAllChecked = checkedItems.length === currentProject.checklist.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-warm-gray hover:text-brand-orange transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke 8 Project Praktik</span>
      </Link>

      {/* Project Header */}
      <div className="brutalist-card p-6 sm:p-8 bg-surface space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <StickerBadge variant="coral">{currentProject.code}</StickerBadge>
            <div className="flex items-center gap-1">
              {currentProject.supporting_modules.map((m) => (
                <span
                  key={m}
                  className="text-xs font-bold bg-paper border border-ink px-2 py-0.5 rounded"
                >
                  Modul {m}
                </span>
              ))}
            </div>
          </div>

          {isAllChecked && (
            <span className="text-xs font-extrabold bg-acid-lime text-ink border border-ink px-2.5 py-1 rounded flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-ink" />
              <span>Proyek Selesai Lulus</span>
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
          {currentProject.code} — {currentProject.title}
        </h1>

        <p className="text-sm text-warm-gray font-medium leading-relaxed">
          {currentProject.objective}
        </p>

        {relatedWorkspace && (
          <div className="pt-2">
            <Link
              to={relatedWorkspace.link}
              className="brutalist-btn bg-acid-lime text-ink px-4 py-2 text-xs font-bold gap-1.5 inline-flex"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>{relatedWorkspace.title}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      {/* Interactive Sheet Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Checklist */}
        <div className="brutalist-card p-6 bg-surface space-y-4">
          <h3 className="text-base font-extrabold text-ink flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-brand-orange" />
            Checklist Langkah Wajib:
          </h3>

          <div className="space-y-2.5">
            {currentProject.checklist.map((item) => {
              const isChecked = checkedItems.includes(item.id);
              return (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3.5 rounded-lg border-2 border-ink cursor-pointer transition-all ${
                    isChecked ? 'bg-acid-lime/20 shadow-[1px_1px_0px_#171717]' : 'bg-paper hover:bg-surface'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleCheck(item.id)}
                    className="mt-0.5 w-4 h-4 rounded border-2 border-ink accent-brand-orange"
                  />
                  <span className={`text-xs sm:text-sm font-semibold text-ink leading-relaxed ${isChecked ? 'line-through text-warm-gray' : ''}`}>
                    {item.label}
                  </span>
                </label>
              );
            })}
          </div>

          <div className="p-3 bg-paper border border-ink/30 rounded-md text-xs space-y-1 mt-4">
            <div className="font-bold text-ink flex items-center gap-1 text-[11px] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
              Kriteria Kelulusan Proyek:
            </div>
            <p className="text-warm-gray text-xs leading-relaxed font-medium">
              {currentProject.criteria}
            </p>
          </div>
        </div>

        {/* Evidence & Reflection */}
        <div className="brutalist-card p-6 bg-surface space-y-4">
          <h3 className="text-base font-extrabold text-ink">Bukti Observasi & Catatan Refleksi</h3>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-ink block">
              URL Bukti Observasi (Google Sheets, Notion, Link Video / Konten)
            </label>
            <input
              type="url"
              value={evidenceUrl}
              onChange={(e) => setEvidenceUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/..."
              className="brutalist-input w-full px-3.5 py-2.5 text-sm"
            />
            <p className="text-[11px] text-warm-gray">
              Tautkan dokumen spreadsheet riset produk atau URL video yang telah Anda publikasikan.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-ink block">
              Catatan Refleksi & Temuan Utama
            </label>
            <textarea
              rows={4}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Tuliskan apa yang Anda pelajari dari proyek ini, keputusan apa yang diambil, dan apa langkah perbaikan berikutnya..."
              className="brutalist-input w-full px-3.5 py-2.5 text-sm"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="brutalist-btn bg-brand-orange text-white px-6 py-3 text-sm font-extrabold gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Progres Proyek</span>
            </button>

            {savedSuccess && (
              <span className="text-xs font-bold text-brand-orange flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Berhasil disimpan!</span>
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
