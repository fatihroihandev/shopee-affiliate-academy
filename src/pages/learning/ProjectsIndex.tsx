import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRACTICE_PROJECTS } from '@/data/curriculumData';
import { StickerBadge } from '@/components/common/Doodles';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const ProjectsIndex: React.FC = () => {
  const [completedProjects, setCompletedProjects] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('shopee_academy_completed_projects');
    if (saved) {
      try {
        setCompletedProjects(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const totalProjects = PRACTICE_PROJECTS.length;
  const completedCount = completedProjects.length;
  const progressPercent = Math.round((completedCount / totalProjects) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. HEADER */}
      <div className="brutalist-card p-6 sm:p-8 bg-surface space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <StickerBadge variant="coral">BUKTI EKSEKUSI</StickerBadge>
              <span className="text-xs font-bold text-warm-gray">Bukan Sekadar Teori</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
              8 Project Praktik Wajib
            </h1>
            <p className="text-xs sm:text-sm text-warm-gray font-medium max-w-2xl leading-relaxed">
              Delapan proyek ini adalah bukti nyata penerapan materi. Kerjakan berurutan dari P01 sampai P08. Anda dinilai dari kualitas data dan keputusan, bukan besaran komisi.
            </p>
          </div>

          <div className="p-4 bg-paper border-2 border-ink rounded-lg shadow-[2px_2px_0px_#171717] text-center min-w-[180px] shrink-0 space-y-1">
            <div className="text-[11px] font-bold text-warm-gray uppercase">Kelulusan Proyek</div>
            <div className="text-2xl font-extrabold text-brand-orange">{progressPercent}%</div>
            <div className="w-full h-2 bg-surface border border-ink rounded-full overflow-hidden p-0.2">
              <div
                className="h-full bg-brand-orange rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] font-bold text-ink">
              {completedCount} dari {totalProjects} Selesai
            </div>
          </div>
        </div>
      </div>

      {/* 2. PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRACTICE_PROJECTS.map((project) => {
          const isDone = completedProjects.includes(project.code);

          return (
            <div
              key={project.id}
              className={`brutalist-card p-6 bg-surface hover:bg-paper/40 transition-all flex flex-col justify-between space-y-4 group ${
                isDone ? 'border-acid-lime border-3' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs bg-paper border-2 border-ink px-2.5 py-1 rounded shadow-[1px_1px_0px_#171717]">
                    {project.code}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {project.supporting_modules.map((mod) => (
                      <span
                        key={mod}
                        className="text-[10px] font-bold bg-surface border border-ink/40 px-1.5 py-0.2 rounded text-warm-gray"
                      >
                        Modul {mod}
                      </span>
                    ))}
                    {isDone && (
                      <span className="text-[10px] font-extrabold bg-acid-lime text-ink border border-ink px-1.5 py-0.2 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-ink" />
                        LULUS
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-extrabold text-lg text-ink group-hover:text-brand-orange transition-colors">
                  {project.code} — {project.title}
                </h3>

                <p className="text-xs text-warm-gray font-medium leading-relaxed">
                  {project.objective}
                </p>

                <div className="p-3 bg-paper border border-ink/30 rounded-md text-xs space-y-1">
                  <div className="font-bold text-ink text-[11px] uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
                    Kriteria Selesai:
                  </div>
                  <p className="text-warm-gray text-[11px] leading-relaxed">
                    {project.criteria}
                  </p>
                </div>
              </div>

              <div className="border-t-2 border-ink/10 pt-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-warm-gray">
                  {project.checklist.length} Butir Checklist
                </span>
                <Link
                  to={`/projects/${project.code.toLowerCase()}`}
                  className="brutalist-btn bg-brand-orange text-white text-xs px-4 py-2 gap-1.5"
                >
                  <span>{isDone ? 'Buka Bukti' : 'Kerjakan Proyek'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
