import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MODULES, LESSONS } from '@/data/curriculumData';
import { useLessonProgress } from '@/features/learning/useLessonProgress';
import { useAuth } from '@/features/auth/AuthContext';
import { MarkdownRenderer } from '@/features/learning/MarkdownRenderer';
import { PaywallBanner } from '@/components/ui/PaywallBanner';
import { StickerBadge, Sparkle } from '@/components/common/Doodles';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';

export const LessonReader: React.FC = () => {
  const { moduleSlug, lessonSlug } = useParams<{ moduleSlug: string; lessonSlug: string }>();
  const { isLessonCompleted, toggleLessonCompleted } = useLessonProgress();
  const { isPremium } = useAuth();
  const [focusMode, setFocusMode] = useState(false);

  const currentModule = MODULES.find((m) => m.slug === moduleSlug);
  const currentLesson = LESSONS.find(
    (l) => l.slug === lessonSlug && l.module_id === currentModule?.id
  );

  if (!currentModule || !currentLesson) {
    return <Navigate to="/learn" replace />;
  }

  const moduleLessons = LESSONS.filter((l) => l.module_id === currentModule.id);
  const currentIndex = moduleLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? moduleLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < moduleLessons.length - 1 ? moduleLessons[currentIndex + 1] : null;

  const isCompleted = isLessonCompleted(currentLesson.id);
  const isAccessible = currentLesson.is_free_preview || isPremium;

  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 ${focusMode ? 'max-w-5xl' : ''}`}>
      {/* 1. TOP BREADCRUMBS & FOCUS TOGGLE */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-warm-gray overflow-x-auto whitespace-nowrap">
          <Link to="/learn" className="hover:text-brand-orange">
            Kurikulum
          </Link>
          <span>/</span>
          <Link to={`/learn/${currentModule.slug}`} className="hover:text-brand-orange">
            {currentModule.code}
          </Link>
          <span>/</span>
          <span className="text-ink truncate max-w-[200px] sm:max-w-none">
            {currentLesson.title}
          </span>
        </div>

        <button
          onClick={() => setFocusMode(!focusMode)}
          className="brutalist-btn bg-surface text-ink px-3 py-1.5 text-xs font-bold gap-1.5 shrink-0 hidden sm:inline-flex"
          title="Toggle Focus Mode"
        >
          {focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span>{focusMode ? 'Mode Normal' : 'Mode Fokus'}</span>
        </button>
      </div>

      {/* 2. LESSON HEADER */}
      <div className="brutalist-card p-6 sm:p-8 bg-surface space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <StickerBadge variant="orange">{currentModule.code}</StickerBadge>
            <span className="text-xs font-extrabold bg-paper border border-ink px-2 py-0.5 rounded">
              Pelajaran {currentIndex + 1} dari {moduleLessons.length}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-warm-gray">
            <Clock className="w-4 h-4 text-brand-orange" />
            <span>~{currentLesson.estimated_minutes} Menit Waktu Baca</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-ink leading-tight">
          {currentLesson.title}
        </h1>

        <div className="border-t-2 border-ink/10 pt-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-warm-gray">
            Rujukan Materi: <strong className="text-ink">{currentLesson.source_ref}</strong>
          </span>

          {isCompleted ? (
            <span className="text-xs font-extrabold bg-acid-lime text-ink border border-ink px-2.5 py-1 rounded flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-ink" />
              <span>Selesai Dipelajari</span>
            </span>
          ) : (
            <span className="text-xs font-bold text-warm-gray">Belum Selesai</span>
          )}
        </div>
      </div>

      {/* 3. CONTENT AREA / PAYWALL */}
      <div className="brutalist-card p-6 sm:p-10 bg-surface">
        {isAccessible ? (
          <div className="space-y-8">
            <MarkdownRenderer content={currentLesson.content} />

            {/* ACTION CHECKLIST AT BOTTOM OF LESSON */}
            <div className="p-6 bg-paper border-2 border-ink rounded-lg shadow-[3px_3px_0px_#171717] space-y-4 mt-12">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm uppercase tracking-wider text-ink flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                  Konfirmasi Penyelesaian Pelajaran
                </span>
                <Sparkle className="w-4 h-4 text-brand-orange" />
              </div>

              <p className="text-xs text-warm-gray leading-relaxed font-medium">
                Pastikan Anda telah membaca materi di atas, memahami contoh simulasi perhitungan, dan menyelesaikan tugas mandiri sebelum menandai pelajaran ini selesai.
              </p>

              <button
                onClick={() => toggleLessonCompleted(currentLesson.id)}
                className={`brutalist-btn w-full sm:w-auto px-6 py-3 text-sm gap-2 font-extrabold transition-all ${
                  isCompleted
                    ? 'bg-paper text-warm-gray hover:bg-soft-coral/30'
                    : 'bg-acid-lime text-ink'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-ink" />
                <span>{isCompleted ? 'Batalkan Status Selesai' : 'Tandai Pelajaran Selesai'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-5 bg-paper border-2 border-ink rounded-lg space-y-2">
              <h3 className="font-extrabold text-base text-ink">Ringkasan Pelajaran:</h3>
              <p className="text-sm text-warm-gray font-medium leading-relaxed">
                {currentLesson.summary}
              </p>
            </div>

            <PaywallBanner
              lessonTitle={currentLesson.title}
              moduleCode={currentModule.code}
            />
          </div>
        )}
      </div>

      {/* 4. PREV / NEXT NAVIGATION */}
      <div className="flex items-center justify-between gap-4 pt-4">
        {prevLesson ? (
          <Link
            to={`/learn/${currentModule.slug}/${prevLesson.slug}`}
            className="brutalist-btn bg-surface text-ink px-4 py-2.5 text-xs font-bold gap-2 flex-1 sm:flex-initial"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Pelajaran Sebelumnya:</span>
            <span className="truncate max-w-[150px]">{prevLesson.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            to={`/learn/${currentModule.slug}/${nextLesson.slug}`}
            className="brutalist-btn bg-brand-orange text-white px-5 py-2.5 text-xs font-bold gap-2 flex-1 sm:flex-initial ml-auto"
          >
            <span className="hidden sm:inline">Pelajaran Berikutnya:</span>
            <span className="truncate max-w-[150px]">{nextLesson.title}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            to="/learn"
            className="brutalist-btn bg-acid-lime text-ink px-5 py-2.5 text-xs font-bold gap-2 ml-auto"
          >
            <span>Kembali ke Kurikulum</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
};
