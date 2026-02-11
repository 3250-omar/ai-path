"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Reusable Markdown Renderer component with premium styling.
 * Used across the dashboard and lessons to display AI-generated content.
 */
export default function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          // Custom styling for markdown elements
          p: ({ children }) => (
            <p className="mb-4 last:mb-0 leading-relaxed text-muted-foreground">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 mb-4 space-y-1 text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 mb-4 space-y-1 text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,
          code: ({
            inline,
            children,
            ...props
          }: {
            inline?: boolean;
            children?: React.ReactNode;
            [key: string]: any;
          }) => {
            return inline ? (
              <code
                className="bg-slate-100 px-1.5 py-0.5 rounded text-primary font-mono text-xs font-semibold"
                {...props}
              >
                {children}
              </code>
            ) : (
              <div className="relative my-4 group">
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto font-mono text-sm border border-slate-800 shadow-lg">
                  <code {...props}>{children}</code>
                </pre>
              </div>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-xl font-bold mb-4 text-foreground tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold mb-3 text-foreground tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-md font-bold mb-2 text-foreground tracking-tight">
              {children}
            </h3>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/20 pl-4 py-1 italic my-4 text-muted-foreground bg-slate-50 rounded-r-lg">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 underline decoration-primary/30 underline-offset-4 transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="my-6 border-slate-200" />,
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 bg-slate-50 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-sm text-slate-600 border-t border-slate-200">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
