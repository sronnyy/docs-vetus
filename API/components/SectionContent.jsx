/**
 * SectionContent - Conteúdo principal da documentação
 * Design premium com glassmorphism, gradientes e tipografia moderna
 * @version 2.0.0
 */
import React from 'react';
import ExamplesSection from './ExamplesSection';
import { FaCopy, FaRegFileAlt } from 'react-icons/fa';

function MethodBadge({ method }) {
  if (!method) return null;
  
  const methodStyles = {
    GET: 'bg-[var(--color-primary-2)]/20 text-[var(--color-primary-2)] border-[var(--color-primary-2)]/30',
    POST: 'bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] border-[var(--color-secondary)]/30',
    PUT: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    DELETE: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
    PATCH: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
  };
  
  const cls = methodStyles[method] || 'bg-neutral-500/20 text-neutral-300 border-neutral-400/30';
  
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${cls}`}>
      {method}
    </span>
  );
}

function EndpointInfo({ endpoint, method }) {
  if (!endpoint) return null;
  
  return (
    <div className="flex flex-wrap items-center gap-3 mt-6 p-4 bg-neutral-900/50 rounded-xl border border-neutral-700/50 backdrop-blur-sm">
      <MethodBadge method={method} />
      <code className="flex-1 min-w-0 px-4 py-2.5 bg-neutral-800/70 rounded-lg text-sm font-mono break-all text-neutral-200 border border-neutral-700/60 shadow-inner">
        {endpoint}
      </code>
      <button className="shrink-0 p-2.5 bg-neutral-700/60 hover:bg-[var(--color-primary-2)]/20 rounded-lg transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-[var(--color-primary-2)]/50 border border-neutral-600/80 hover:border-[var(--color-primary-2)]/30">
        <FaCopy className="w-4 h-4 text-neutral-400 group-hover:text-[var(--color-primary-2)] transition-colors" />
      </button>
    </div>
  );
}

export default function SectionContent({ section }) {
  if (!section) return (
    <div className="text-center py-20 px-6">
      <div className="w-24 h-24 mx-auto mb-8 bg-neutral-800/60 border border-neutral-700/50 rounded-3xl flex items-center justify-center shadow-2xl">
        <FaRegFileAlt className="w-12 h-12 text-neutral-500" />
      </div>
      <h2 className="text-neutral-100 text-3xl font-bold mb-3">Bem-vindo</h2>
      <p className="text-neutral-400 text-lg max-w-md mx-auto">Selecione uma seção na navegação para começar a explorar a documentação da API.</p>
    </div>
  );

  const { title, description, content, endpoint, method, examples = [] } = section;

  return (
    <article className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-neutral-700/30">
      {/* Header */}
      <div className="bg-neutral-700/40 px-4 sm:px-6 md:px-8 py-6 sm:py-8 border-b border-neutral-700/20">
        <header>
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-3">{title}</h1>
          
          {description && (
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              {description}
            </p>
          )}
          
          <EndpointInfo endpoint={endpoint} method={method} />
        </header>
      </div>

      {/* Conteúdo principal */}
      <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {content && (
          <div className="prose prose-lg max-w-none prose-invert prose-headings:font-semibold prose-headings:text-neutral-100 prose-a:text-[var(--color-primary-2)] hover:prose-a:text-[var(--color-secondary)] prose-strong:text-neutral-200">
            {Array.isArray(content) ? (
              <ul className="list-disc pl-5 space-y-2 marker:text-[var(--color-primary-2)]">
                {content.map((c, idx) => (
                  <li key={idx}>
                    {c}
                  </li>
                ))}
              </ul>
            ) : (
              typeof content === 'string' ? (
                <p>{content}</p>
              ) : (
                content
              )
            )}
          </div>
        )}
        
        {/* Seção de exemplos */}
        {examples.length > 0 && (
          <div className="mt-8">
            <ExamplesSection examples={examples} />
          </div>
        )}
      </div>
    </article>
  );
}