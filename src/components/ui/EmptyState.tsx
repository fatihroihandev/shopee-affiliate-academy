import React from 'react';
import { Button } from './Button';
import { Sparkle } from '@/components/common/Doodles';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  actionLink?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  actionLink,
}) => {
  return (
    <div className="brutalist-card p-8 sm:p-12 bg-surface text-center space-y-4 max-w-md mx-auto my-6 border-dashed">
      <div className="w-14 h-14 bg-paper border-2 border-ink rounded-full flex items-center justify-center mx-auto shadow-[2px_2px_0px_#171717]">
        {icon || <Sparkle className="w-6 h-6 text-brand-orange" />}
      </div>

      <div className="space-y-1.5">
        <h4 className="font-extrabold text-base text-ink">{title}</h4>
        <p className="text-xs text-warm-gray leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>

      {actionText && (
        <div className="pt-2">
          {actionLink ? (
            <a href={actionLink} className="brutalist-btn bg-brand-orange text-white px-4 py-2 text-xs">
              {actionText}
            </a>
          ) : (
            <Button variant="primary" size="sm" onClick={onAction}>
              {actionText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
