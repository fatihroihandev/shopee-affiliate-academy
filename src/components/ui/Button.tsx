import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'lime' | 'coral' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className,
  disabled,
  ...props
}) => {
  const variants = {
    primary: 'bg-brand-orange text-white hover:bg-brand-orange/90',
    secondary: 'bg-surface text-ink hover:bg-paper',
    lime: 'bg-acid-lime text-ink hover:bg-acid-lime/90',
    coral: 'bg-soft-coral text-ink hover:bg-soft-coral/90',
    outline: 'bg-transparent text-ink hover:bg-surface border-2 border-ink',
    ghost: 'bg-transparent text-ink hover:bg-ink/5 border-none shadow-none',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const isGhost = variant === 'ghost';

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-bold gap-2 select-none",
        !isGhost && "border-2 border-ink shadow-[3px_3px_0px_#171717] rounded-md transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#171717]",
        variants[variant],
        sizes[size],
        (disabled || loading) && "opacity-60 cursor-not-allowed active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0px_#171717]",
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      {children}
    </button>
  );
};
