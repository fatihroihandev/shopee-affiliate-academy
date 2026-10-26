import React from 'react';
import { cn } from '@/lib/utils';

export const Sparkle: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("w-6 h-6 text-brand-orange inline-block", className)}
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

export const CurvedArrow: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 100 50"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-16 h-8 text-brand-orange inline-block", className)}
  >
    <path d="M10 40 C 30 10, 70 10, 85 30" />
    <path d="M75 32 L 85 30 L 83 20" />
  </svg>
);

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

export const StickerBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'lime' | 'orange' | 'coral';
  rotate?: string;
  className?: string;
}> = ({ children, variant = 'lime', rotate = '-rotate-2', className }) => {
  const bgColors = {
    lime: 'bg-acid-lime text-ink',
    orange: 'bg-brand-orange text-white',
    coral: 'bg-soft-coral text-ink',
  };

  return (
    <span
      className={cn(
        "inline-block font-extrabold text-xs uppercase px-2.5 py-1 border-2 border-ink shadow-[2px_2px_0px_#171717] rounded-sm transform transition-transform hover:rotate-0",
        bgColors[variant],
        rotate,
        className
      )}
    >
      {children}
    </span>
  );
};
