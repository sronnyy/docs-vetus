/**
 * ExamplesSection
 * Lista exemplos de código para uma seção.
 * @version 1.0.0
 */
import React, { useState, useMemo } from 'react';
import CodeExample from './CodeExample';
import { FaReact, FaPython, FaNodeJs, FaCode } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';

export default function ExamplesSection({ examples }) {
  const [activeTab, setActiveTab] = useState(0);
  const iconFor = useMemo(() => ({
    react: <FaReact className="w-4 h-4 text-cyan-300" />,
    javascript: <SiJavascript className="w-4 h-4 text-yellow-300" />,
    node: <FaNodeJs className="w-4 h-4 text-green-400" />,
    python: <FaPython className="w-4 h-4 text-[var(--color-primary-2)]" />,
    java: <FaCode className="w-4 h-4 text-orange-300" />,
  }), []);
  
  if (!examples || !examples.length) return null;
  
  if (examples.length === 1) {
    return (
      <section className="mt-8">
        <h3 className="text-neutral-200 text-lg sm:text-xl font-semibold mb-4">Exemplo</h3>
        <CodeExample {...examples[0]} />
      </section>
    );
  }
  
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-neutral-200 text-lg sm:text-xl font-semibold">Exemplos</h3>
        
        {/* Navegação por tabs */}
        <div
          role="tablist"
          aria-label="Linguagens de exemplo"
          className="flex flex-nowrap gap-2 rounded-lg p-1 bg-neutral-800/60 border border-neutral-700/50 backdrop-blur-sm overflow-x-auto overscroll-x-contain snap-x snap-mandatory scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-800"
        >
          {examples.map((ex, idx) => (
            <button
              key={idx}
              id={`example-tab-${idx}`}
              role="tab"
              aria-selected={activeTab === idx}
              aria-controls={`example-panel-${idx}`}
              tabIndex={activeTab === idx ? 0 : -1}
              onClick={() => setActiveTab(idx)}
              className={`shrink-0 snap-start px-4 py-2 text-sm font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-[var(--color-primary-2)]/50 ${
                activeTab === idx
                  ? 'bg-[var(--color-primary-2)]/20 text-[var(--color-primary-2)] border border-[var(--color-primary-2)]/30 shadow-md'
                  : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-neutral-200'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                {(iconFor[(ex.language || '').toLowerCase()]) || <SiJavascript className="w-4 h-4 text-yellow-300" />}
                <span className="capitalize">{ex.language}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Exemplo ativo */}
      <div id={`example-panel-${activeTab}`} role="tabpanel" aria-labelledby={`example-tab-${activeTab}`}>
        <CodeExample {...examples[activeTab]} />
      </div>
    </section>
  );
}