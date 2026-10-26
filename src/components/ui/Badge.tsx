import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'orange' | 'lime' | 'coral' | 'paper' | 'ink';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const variants = {
    default: 'bg-paper text-ink border-ink',
    orange: 'bg-brand-orange text-white border-ink',
    lime: 'bg-acid-lime text-ink border-ink',
    coral: 'bg-soft-coral text-ink border-ink',
    paper: 'bg-paper text-ink border-ink',
    ink: 'bg-ink text-white border-ink',
  };

  const sizes = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-extrabold uppercase tracking-wider rounded border-2 shadow-[1px_1px_0px_#171717] select-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

// Specialized Helper Badges according to Master Specifications
export const CommissionBadge: React.FC<{ status: 'estimated' | 'pending' | 'approved' | 'paid' }> = ({ status }) => {
  const config = {
    estimated: { label: 'Estimasi', variant: 'paper' as const },
    pending: { label: 'Pending', variant: 'coral' as const },
    approved: { label: 'Disetujui', variant: 'orange' as const },
    paid: { label: 'Dibayarkan', variant: 'lime' as const },
  };
  const { label, variant } = config[status] || config.estimated;
  return <Badge variant={variant}>{label}</Badge>;
};

export const ProductStatusBadge: React.FC<{ status: 'research' | 'ready' | 'testing' | 'dropped' }> = ({ status }) => {
  const config = {
    research: { label: 'Riset', variant: 'paper' as const },
    ready: { label: 'Siap Promosi', variant: 'lime' as const },
    testing: { label: 'Diuji', variant: 'orange' as const },
    dropped: { label: 'Dihentikan', variant: 'coral' as const },
  };
  const { label, variant } = config[status] || config.research;
  return <Badge variant={variant}>{label}</Badge>;
};

export const DecisionBadge: React.FC<{ decision: 'continue' | 'optimize' | 'retest' | 'deprioritize' | 'stop' }> = ({ decision }) => {
  const config = {
    continue: { label: 'Lanjutkan', variant: 'lime' as const },
    optimize: { label: 'Optimalkan', variant: 'orange' as const },
    retest: { label: 'Uji Ulang', variant: 'paper' as const },
    deprioritize: { label: 'Kurangi Prioritas', variant: 'coral' as const },
    stop: { label: 'Hentikan', variant: 'ink' as const },
  };
  const { label, variant } = config[decision] || config.continue;
  return <Badge variant={variant}>{label}</Badge>;
};
