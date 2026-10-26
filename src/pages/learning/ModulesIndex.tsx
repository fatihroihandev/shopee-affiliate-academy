import React from 'react';
import { Link } from 'react-router-dom';
import { MODULES, LESSONS } from '@/data/curriculumData';
import { useLessonProgress } from '@/features/learning/useLessonProgress';
import { useAuth } from '@/features/auth/AuthContext';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import { BookOpen, CheckCircle2, Lock, ArrowRight, Clock } from 'lucide-react';

export const ModulesIndex: React.FC = () => {
  const { completedLessonIds, isLessonCompleted } = useLessonProgress();
  const { isPremium } = useAuth();

  const totalLessons = LESSONS.length;
  const completedCount = completedLessonIds.length;
  const overallPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. HEADER & OVERALL PROGRESS */}
      <div className="brutalist-card p-6 sm:p-8 bg-surface space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <StickerBadge variant="orange">KURIKULUM 5 LEVEL</StickerBadge>
              <span className="text-xs font-bold text-warm-gray">7 Tahap • 30 Pelajaran</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2">
              Jalur Pembelajaran Shopee Affiliate
              <Sparkle className="w-5 h-5 text-brand-orange" />
            </h1>
            <p className="text-xs sm:text-sm text-warm-gray font-medium max-w-2xl">
              Kurikulum terstruktur dari persiapan dasar hingga scaling multi-channel. Pelajari materi berurutan dan selesaikan tugas praktik di tiap tahap.
            </p>
          </div>

          <div className="p-4 bg-paper border-2 border-ink rounded-lg shadow-[2px_2px_0px_#171717] min-w-[200px] text-center space-y-1.5 shrink-0">
            <div className="text-xs font-bold text-warm-gray uppercase">Progres Keseluruhan</div>
            <div className="text-2xl font-extrabold text-brand-orange">{overallPercent}%</div>
            <div className="w-full h-2.5 bg-surface border border-ink rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-brand-orange rounded-full transition-all duration-300"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <div className="text-[10px] font-bold text-ink">
              {completedCount} dari {totalLessons} Selesai
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIST OF 7 MODULES */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-ink flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-orange" />
          Daftar 7 Tahap Pembelajaran (M00 — M06)
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {MODULES.map((module) => {
            const moduleLessons = LESSONS.filter((l) => l.module_id === module.id);
            const completedInModule = moduleLessons.filter((l) => isLessonCompleted(l.id)).length;
            const modulePercent = Math.round((completedInModule / moduleLessons.length) * 100);
            const isFree = module.id === 'm00';
            const isLocked = !isFree && !isPremium;

            return (
              <div
                key={module.id}
                className="brutalist-card p-5 sm:p-6 bg-surface hover:bg-paper/40 transition-all space-y-4 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="w-12 h-12 bg-paper border-2 border-ink rounded-lg flex items-center justify-center font-extrabold text-base text-ink shrink-0 shadow-[2px_2px_0px_#171717]">
                      {module.code}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold text-base sm:text-lg text-ink group-hover:text-brand-orange transition-colors">
                          {module.title}
                        </h3>
                        {isFree ? (
                          <span className="text-[10px] font-extrabold bg-acid-lime border border-ink px-1.5 py-0.2 rounded">
                            FREE PREVIEW
                          </span>
                        ) : isLocked ? (
                          <span className="text-[10px] font-extrabold bg-soft-coral/40 text-ink border border-ink px-1.5 py-0.2 rounded flex items-center gap-1">
                            <Lock className="w-3 h-3 text-brand-orange" />
                            PREMIUM
                          </span>
                        ) : (
                          <span className="text-[10px] font-extrabold bg-brand-orange text-white border border-ink px-1.5 py-0.2 rounded">
                            TERBUKA
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-warm-gray font-medium leading-relaxed max-w-3xl">
                        {module.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-ink/10">
                    <div className="text-xs font-bold text-warm-gray flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{moduleLessons.length} Pelajaran</span>
                    </div>
                    <Link
                      to={`/learn/${module.slug}`}
                      className="brutalist-btn bg-brand-orange text-white text-xs px-4 py-2 gap-1.5"
                    >
                      <span>Buka Modul</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Progress in module */}
                <div className="border-t-2 border-ink/10 pt-3 flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2 flex-1 max-w-xs">
                    <div className="w-full h-2 bg-paper border border-ink rounded-full overflow-hidden p-0.2">
                      <div
                        className="h-full bg-acid-lime rounded-full transition-all"
                        style={{ width: `${modulePercent}%` }}
                      />
                    </div>
                    <span className="text-warm-gray text-[11px] shrink-0">
                      {completedInModule}/{moduleLessons.length}
                    </span>
                  </div>

                  {modulePercent === 100 && (
                    <span className="text-acid-lime font-extrabold flex items-center gap-1 text-[11px] bg-ink px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3" />
                      SELESAI
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
