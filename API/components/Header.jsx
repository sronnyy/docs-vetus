import React from 'react';
import { FaBars, FaTimes, FaGithub } from 'react-icons/fa';

export default function Header({ 
  title = "API Vetuspay", 
  onToggleMobileMenu,
  isMobileMenuOpen = false 
}) {

  return (
    <header className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Botão do menu móvel e título */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-neutral-700/50 border border-neutral-600/50 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-neutral-200 font-bold text-xs">API</span>
              </div>
              <h1 className="text-lg font-semibold text-neutral-100 tracking-tight">
                {title}
              </h1>
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/eloydotdev/solutpag"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800/60 rounded-lg transition-colors border border-transparent hover:border-neutral-700"
            >
              <FaGithub className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            
            {/* Botão de login futuro */}
            {/* <button className="px-4 py-2 text-sm font-semibold text-white bg-dual-gradient hover:opacity-90 rounded-lg transition-colors shadow-lg shadow-[var(--color-primary-2)]/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-[var(--color-primary-2)]/50">
              Dashboard
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
}