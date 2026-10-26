import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MODULES, LESSONS } from '@/data/curriculumData';
import { useLessonProgress } from '@/features/learning/useLessonProgress';
import { useAuth } from '@/features/auth/AuthContext';
import { StickerBadge } from '@/components/common/Doodles';
import { ArrowLeft, Clock, CheckCircle2, Lock, ArrowRight, BookOpen } from 'lucide-react';

export const ModuleDetail: React.FC = () => {
  const { moduleSlug } = useParams<{ moduleSlug: string }>();
  const { isLessonCompleted } = useLessonProgress();
  const { isPremium } = useAuth();

  const currentModule = MODULES.find((m) => m.slug === moduleSlug);

  if (!currentModule) {
    return <Navigate to="/learn" replace />;
  }

  const moduleLessons = LESSONS.filter((l) => l.module_id === currentModule.id);
  const completedCount = moduleLessons.filter((l) => isLessonCompleted(l.id)).length;
  const progressPercent = Math.round((completedCount / moduleLessons.length) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Button */}
      <Link
        to="/learn"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-warm-gray hover:text-brand-orange transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Daftar 7 Tahap</span>
      </Link>

      {/* Module Header */}
      <div className="brutalist-card p-6 sm:p-8 bg-surface space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <StickerBadge variant="orange">{currentModule.code}</StickerBadge>
              <span className="text-xs font-bold text-warm-gray">
                {moduleLessons.length} Pelajaran Total
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
              {currentModule.title}
            </h1>
            <p className="text-xs sm:text-sm text-warm-gray font-medium max-w-2xl leading-relaxed">
              {currentModule.description}
            </p>
          </div>

          <div className="p-4 bg-paper border-2 border-ink rounded-lg shadow-[2px_2px_0px_#171717] text-center min-w-[160px] shrink-0 space-y-1">
            <div className="text-[11px] font-bold text-warm-gray uppercase">Progres Tahap</div>
            <div className="text-2xl font-extrabold text-ink">{progressPercent}%</div>
            <div className="w-full h-2 bg-surface border border-ink rounded-full overflow-hidden p-0.2">
              <div
                className="h-full bg-brand-orange rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] font-bold text-brand-orange">
              {completedCount} / {moduleLessons.length} Selesai
            </div>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-ink uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-orange" />
          Daftar Pelajaran
        </h2>

        <div className="space-y-3">
          {moduleLessons.map((lesson, index) => {
            const isCompleted = isLessonCompleted(lesson.id);
            const isFree = lesson.is_free_preview;
            const isLocked = !isFree && !isPremium;

            return (
              <div
                key={lesson.id}
                className="brutalist-card p-4 sm:p-5 bg-surface hover:bg-paper/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <span className="w-9 h-9 bg-paper border-2 border-ink rounded-md flex items-center justify-center font-extrabold text-xs text-ink shrink-0 shadow-[1px_1px_0px_#171717]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-sm sm:text-base text-ink group-hover:text-brand-orange transition-colors">
                        {lesson.title}
                      </h3>
                      {isCompleted && (
                        <span className="text-[10px] font-extrabold bg-acid-lime text-ink border border-ink px-1.5 py-0.2 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-ink" />
                          SELESAI
                        </span>
                      )}
                      {isFree && (
                        <span className="text-[10px] font-extrabold bg-paper text-ink border border-ink px-1.5 py-0.2 rounded">
                          PREVIEW
                        </span>
                      )}
                      {isLocked && (
                        <span className="text-[10px] font-extrabold bg-soft-coral/30 text-ink border border-ink px-1.5 py-0.2 rounded flex items-center gap-1">
                          <Lock className="w-3 h-3 text-brand-orange" />
                          TERKUNCI
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-warm-gray font-medium line-clamp-2">
                      {lesson.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-ink/10">
                  <div className="text-xs font-semibold text-warm-gray flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-orange" />
                    <span>~{lesson.estimated_minutes} Menit</span>
                  </div>

                  <Link
                    to={`/learn/${currentModule.slug}/${lesson.slug}`}
                    className="brutalist-btn bg-brand-orange text-white text-xs px-4 py-2 gap-1.5"
                  >
                    <span>{isCompleted ? 'Buka Ulang' : 'Mulai Baca'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
