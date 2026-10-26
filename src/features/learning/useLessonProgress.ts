import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabase';

export function useLessonProgress() {
  const { user } = useAuth();
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load completed lessons
  useEffect(() => {
    const loadProgress = async () => {
      // 1. Check localStorage first
      const stored = localStorage.getItem('shopee_academy_completed_lessons');
      let initialList: string[] = stored ? JSON.parse(stored) : [];

      // 2. If Supabase is connected & not demo
      if (user && !user.id.startsWith('00000000-0000-0000-0000')) {
        try {
          const { data } = await supabase
            .from('lesson_progress')
            .select('lesson_id')
            .eq('user_id', user.id)
            .eq('is_completed', true);

          if (data && data.length > 0) {
            const dbList = data.map((d: any) => d.lesson_id);
            initialList = Array.from(new Set([...initialList, ...dbList]));
          }
        } catch (e) {
          // fallback to localStorage
        }
      }

      setCompletedLessonIds(initialList);
      setLoading(false);
    };

    loadProgress();
  }, [user]);

  // Toggle completion
  const toggleLessonCompleted = async (lessonId: string) => {
    const isCompleted = completedLessonIds.includes(lessonId);
    const updated = isCompleted
      ? completedLessonIds.filter((id) => id !== lessonId)
      : [...completedLessonIds, lessonId];

    setCompletedLessonIds(updated);
    localStorage.setItem('shopee_academy_completed_lessons', JSON.stringify(updated));

    // Sync to Supabase if connected
    if (user && !user.id.startsWith('00000000-0000-0000-0000')) {
      try {
        await supabase
          .from('lesson_progress')
          .upsert({
            user_id: user.id,
            lesson_id: lessonId,
            is_completed: !isCompleted,
            completed_at: !isCompleted ? new Date().toISOString() : null,
          });
      } catch (e) {
        // ignore offline error
      }
    }
  };

  const isLessonCompleted = (lessonId: string) => completedLessonIds.includes(lessonId);

  return {
    completedLessonIds,
    toggleLessonCompleted,
    isLessonCompleted,
    loading,
  };
}
