import React from 'react';
import { FaClipboardList, FaLightbulb, FaPlug } from 'react-icons/fa';

function Category({ label, icon, children }) {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-3 px-4 py-2 mb-3">
        <span className="text-neutral-500">{icon}</span>
        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
          {label}
        </h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export default function Sidebar({ sections, activeSectionId, onSelectSection }) {
  const groups = {
    introduction: { label: 'Introdução', icon: <FaClipboardList className="w-4 h-4" /> },
    concepts: { label: 'Conceitos', icon: <FaLightbulb className="w-4 h-4" /> },
    endpoints: { label: 'Endpoints', icon: <FaPlug className="w-4 h-4" /> },
  };

  return (
    <aside className="hidden md:block w-80 h-full bg-neutral-900/80 backdrop-blur-sm border-r border-neutral-700/30 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
      {/* Cabeçalho da Sidebar */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-neutral-700/50 border border-neutral-600/50 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-neutral-100 font-bold text-sm">API</span>
          </div>
          <div>
            <h2 className="text-neutral-100 font-bold text-lg">Documentação</h2>
            <p className="text-xs text-neutral-400">Vetuspay API v2.0</p>
          </div>
        </div>
        
        {/* Search Bar Futura */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-800/70 border border-neutral-700/80 rounded-lg text-sm text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all"
            disabled
            aria-label="Buscar na documentação"
          />
        </div>
      </div>

      {/* Navegação por Categorias */}
      <nav className="space-y-6">
        {Object.entries(groups).map(([key, { label, icon }]) => {
          const items = sections.filter(s => s.category === key);
          if (!items.length) return null;
          
          return (
            <Category key={key} label={label} icon={icon}>
              {items.map(item => {
                const isActive = activeSectionId === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-neutral-500 ${
                      isActive 
                        ? 'bg-neutral-700/50 border border-neutral-600/70 shadow-lg'
                        : 'bg-transparent hover:bg-neutral-800/60'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium transition-colors ${
                        isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                      }`}>
                        {item.title}
                      </span>
                      {isActive && (
                        <div className="w-2 h-2 bg-neutral-400 rounded-full shadow-[0_0_8px_theme(colors.neutral.400)]"></div>
                      )}
                    </div>
                  </button>
                );
              })}
            </Category>
          );
        })}
      </nav>
    </aside>
  );
}