import React from 'react';
import { cn } from '@/lib/utils';

// 1. Sparkle / Bintang Coretan Tangan (Editorial Hand-Drawn Burst)
export const Sparkle: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-6 h-6 text-brand-orange inline-block shrink-0", className)}
  >
    <path d="M12 2 V22 M2 12 H22 M4.93 4.93 L19.07 19.07 M4.93 19.07 L19.07 4.93" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

// 2. Bintang Berbintang Ganda
export const DoodleStar: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-6 h-6 text-brand-orange inline-block shrink-0", className)}
  >
    <path d="M16 2 L19 11 L29 12 L21 18 L24 28 L16 22 L8 28 L11 18 L3 12 L13 11 Z" />
  </svg>
);

// 3. Panah Melengkung Atas/Kanan (Curved Arrow)
export const CurvedArrow: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 100 50"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-16 h-8 text-brand-orange inline-block shrink-0", className)}
  >
    <path d="M10 40 C 30 10, 70 10, 85 30" />
    <path d="M75 32 L 85 30 L 83 20" />
  </svg>
);

// 4. Panah Menunjuk Bawah Coretan
export const DoodleArrowDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 40 60"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-8 h-12 text-brand-orange inline-block shrink-0", className)}
  >
    <path d="M20 5 Q 18 30, 20 50" />
    <path d="M10 42 Q 18 48, 20 52 Q 24 48, 30 42" />
  </svg>
);

// 5. Garis Bawah Bergelombang (Wavy Underline)
export const WavyUnderline: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 200 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    className={cn("w-full h-3 text-brand-orange block", className)}
  >
    <path d="M5 12 Q 25 4, 45 12 T 85 12 T 125 12 T 165 12 T 195 12" />
  </svg>
);

// 6. Lingkaran Coretan Tangan (Hand-drawn Circle untuk Highlight Angka/Teks)
export const DoodleCircle: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("absolute inset-0 w-full h-full text-brand-orange pointer-events-none -m-1", className)}
  >
    <path d="M50 8 C 80 5, 95 25, 92 55 C 89 85, 65 95, 45 92 C 15 88, 5 65, 8 40 C 12 15, 35 6, 55 8 C 65 9, 82 14, 88 22" />
  </svg>
);

// 7. Kotak Coretan Catatan (Sketch Frame)
export const DoodleBox: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 120 60"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-full h-full text-ink", className)}
  >
    <path d="M8 8 Q 60 4, 112 8 Q 116 30, 112 52 Q 60 56, 8 52 Q 4 30, 8 8 Z" />
  </svg>
);

// 8. Tanda Centang Coretan (Hand-drawn Checkmark)
export const DoodleCheck: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-5 h-5 text-acid-lime inline-block shrink-0", className)}
  >
    <path d="M4 12 L9 18 L20 6" />
  </svg>
);

// 9. Highlighter Pen Strip (Garis Stabilo)
export const DoodleHighlight: React.FC<{ children: React.ReactNode; color?: 'lime' | 'orange' | 'coral' }> = ({
  children,
  color = 'lime',
}) => {
  const bgColors = {
    lime: 'bg-acid-lime/40',
    orange: 'bg-brand-orange/30',
    coral: 'bg-soft-coral/40',
  };

  return (
    <span className="relative inline-block px-1">
      <span className={cn("absolute inset-x-0 bottom-1 h-3 -z-10 rounded-sm transform -rotate-1", bgColors[color])} />
      <span className="relative z-10">{children}</span>
    </span>
  );
};

// 10. Stiker Editorial Badge
export const StickerBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'lime' | 'orange' | 'coral' | 'paper' | 'ink';
  rotate?: string;
  className?: string;
}> = ({ children, variant = 'lime', rotate = '-rotate-2', className }) => {
  const bgColors = {
    lime: 'bg-acid-lime text-ink',
    orange: 'bg-brand-orange text-white',
    coral: 'bg-soft-coral text-ink',
    paper: 'bg-paper text-ink',
    ink: 'bg-ink text-white',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-1 border-2 border-ink shadow-[2px_2px_0px_#171717] rounded-sm transform transition-transform hover:rotate-0 select-none",
        bgColors[variant],
        rotate,
        className
      )}
    >
      {children}
    </span>
  );
};
