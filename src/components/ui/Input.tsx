import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <input
          ref={ref}
          className={cn(
            "brutalist-input w-full px-3.5 py-2.5 text-sm bg-surface text-ink placeholder:text-warm-gray/60",
            error && "border-soft-coral shadow-[2px_2px_0px_#FF9278]",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs font-bold text-soft-coral">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <textarea
          ref={ref}
          className={cn(
            "brutalist-input w-full px-3.5 py-2.5 text-sm bg-surface text-ink placeholder:text-warm-gray/60 min-h-[100px]",
            error && "border-soft-coral shadow-[2px_2px_0px_#FF9278]",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs font-bold text-soft-coral">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }> = ({
  children,
  className,
  required,
  ...props
}) => (
  <label
    className={cn("block text-xs font-extrabold uppercase tracking-wider text-ink", className)}
    {...props}
  >
    {children}
    {required && <span className="text-brand-orange ml-1">*</span>}
  </label>
);
