import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export const MarkdownRenderer: React.FC<{ content: string; className?: string }> = ({
  content,
  className,
}) => {
  return (
    <div
      className={cn(
        "prose prose-slate max-w-none text-ink leading-relaxed space-y-4",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight border-b-2 border-ink pb-3 mb-6 mt-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight border-b-2 border-ink/20 pb-2 mt-8 mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-brand-orange border border-ink inline-block rounded-xs"></span>
              <span>{children}</span>
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold text-ink mt-6 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-sm sm:text-base text-ink/90 leading-relaxed my-3 font-normal">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-5 space-y-1.5 text-sm sm:text-base my-3 font-medium">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-5 space-y-1.5 text-sm sm:text-base my-3 font-medium">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-1 text-ink">{children}</li>
          ),
          blockquote: ({ children }) => (
            <div className="p-4 my-4 bg-paper border-l-4 border-brand-orange border-2 border-ink rounded-md shadow-[2px_2px_0px_#171717] text-xs sm:text-sm font-semibold text-ink leading-relaxed">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">{children}</div>
              </div>
            </div>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 border-2 border-ink rounded-lg shadow-[3px_3px_0px_#171717]">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-surface">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-paper border-b-2 border-ink text-ink uppercase tracking-wider text-xs font-extrabold">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="p-3 border-r border-ink/20 last:border-r-0 font-extrabold text-ink">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-3 border-b border-ink/10 border-r border-ink/20 last:border-r-0 font-medium text-ink">
              {children}
            </td>
          ),
          hr: () => <hr className="my-8 border-ink/20 border-t-2" />,
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-paper border border-ink/40 text-brand-orange font-mono font-bold px-1.5 py-0.5 rounded text-xs">
                {children}
              </code>
            ) : (
              <pre className="p-4 bg-ink text-paper font-mono text-xs rounded-lg overflow-x-auto border-2 border-ink shadow-[3px_3px_0px_#171717] my-4">
                <code>{children}</code>
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
