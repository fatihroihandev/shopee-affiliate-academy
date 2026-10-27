import React from 'react';
import { cn } from '@/lib/utils';

export interface AcademyLogoProps {
  /** Ukuran preset logo icon */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  imgClassName?: string;
  /** Tampilkan teks brand di samping logo */
  showText?: boolean;
  /** Varian teks (untuk tema gelap/terang) */
  textVariant?: 'dark' | 'light';
}

const SIZE_MAP: Record<string, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-16 h-16 sm:w-20 sm:h-20',
  '2xl': 'w-24 h-24 sm:w-28 sm:h-28',
};

export const AcademyLogo: React.FC<AcademyLogoProps> = ({
  size = 'md',
  className,
  imgClassName,
  showText = false,
  textVariant = 'dark',
}) => {
  const imgSize = SIZE_MAP[size] || SIZE_MAP.md;
  const isDark = textVariant === 'dark';

  return (
    <div className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      <img
        src="/logo.png"
        alt="Shopee Affiliate Academy Logo"
        className={cn(
          imgSize,
          'object-contain flex-shrink-0 transition-transform duration-200 filter drop-shadow-sm',
          imgClassName
        )}
        draggable={false}
      />

      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'font-extrabold text-[15px] sm:text-base tracking-tight',
                isDark ? 'text-ink' : 'text-white'
              )}
            >
              Affiliate <span className="text-brand-orange">Academy</span>
            </span>
            <span className="bg-acid-lime text-ink text-[9px] font-black uppercase px-1.5 py-0.5 rounded border border-ink shadow-[1px_1px_0px_#171717]">
              V2.0
            </span>
          </div>
          <span
            className={cn(
              'text-[10px] font-bold uppercase tracking-wider',
              isDark ? 'text-warm-gray' : 'text-white/70'
            )}
          >
            Shopee Learning & Workspaces
          </span>
        </div>
      )}
    </div>
  );
};
