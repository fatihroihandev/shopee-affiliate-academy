import React from 'react';
import { cn } from '@/lib/utils';
import { Calculator } from 'lucide-react';
import { StickerBadge } from '@/components/common/Doodles';

export interface FormulaBoxProps {
  title: string;
  formula: string;
  explanation?: string;
  example?: string;
  className?: string;
}

export const FormulaBox: React.FC<FormulaBoxProps> = ({
  title,
  formula,
  explanation,
  example,
  className,
}) => {
  return (
    <div className={cn("brutalist-card p-5 bg-surface space-y-3", className)}>
      <div className="flex items-center justify-between border-b-2 border-ink pb-2">
        <span className="font-extrabold text-sm text-ink flex items-center gap-1.5">
          <Calculator className="w-4 h-4 text-brand-orange" />
          {title}
        </span>
        <StickerBadge variant="paper">RUMUS BAKU</StickerBadge>
      </div>

      <div className="p-3 bg-paper border-2 border-ink rounded-md font-mono text-xs sm:text-sm font-bold text-ink text-center">
        {formula}
      </div>

      {explanation && (
        <p className="text-xs text-warm-gray leading-relaxed font-medium">
          <strong className="text-ink">Keterangan:</strong> {explanation}
        </p>
      )}

      {example && (
        <div className="p-2.5 bg-acid-lime/20 border border-ink/40 rounded text-[11px] text-ink font-semibold">
          <span className="font-bold text-brand-orange">Contoh Simulasi:</span> {example}
        </div>
      )}
    </div>
  );
};
