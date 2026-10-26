import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'surface' | 'paper' | 'highlight';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'surface',
  className,
  ...props
}) => {
  const variants = {
    default: 'bg-surface border-2 border-ink shadow-[4px_4px_0px_#171717]',
    surface: 'bg-surface border-2 border-ink shadow-[4px_4px_0px_#171717]',
    paper: 'bg-paper border-2 border-ink shadow-[3px_3px_0px_#171717]',
    highlight: 'bg-surface border-4 border-brand-orange shadow-[5px_5px_0px_#171717]',
  };

  return (
    <div
      className={cn("rounded-lg p-5 transition-all", variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn("space-y-1.5 border-b-2 border-ink/10 pb-3 mb-4", className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h3 className={cn("font-extrabold text-lg text-ink tracking-tight flex items-center justify-between", className)} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => (
  <p className={cn("text-xs text-warm-gray font-medium leading-relaxed", className)} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn("space-y-3", className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn("border-t-2 border-ink/10 pt-3 mt-4 flex items-center justify-between", className)} {...props}>
    {children}
  </div>
);
