import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { useResume } from '../../contexts/ResumeContext';
import ResumeList from './ResumeList';
import { v4 as uuidv4 } from 'uuid';

function Sidebar({ onBackToHome }) {
  const { state, dispatch } = useApp();
  const { createEmptyResume, saveToLocalStorage } = useResume();

  const handleNewResume = () => {
    const newResume = createEmptyResume();
    saveToLocalStorage(newResume);
    dispatch({ type: 'CREATE_RESUME', payload: { id: newResume.id } });
  };

  const handleToggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <aside className="w-72 bg-[#101922] text-white flex flex-col h-full border-r border-[#2d3947] shadow-2xl lg:shadow-none">
      <div className="p-4 sm:p-6 flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary p-2 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white">description</span>
          </div>
          <div>
            <h1 className="text-white text-base font-bold leading-tight uppercase tracking-tight">
              Resumate
            </h1>
          </div>
        </div>

        {/* New Resume Button */}
        <button
          onClick={handleNewResume}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl h-12 bg-primary text-white text-sm font-bold transition-all hover:bg-primary/90 mb-8 shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined">add</span>
          <span>New Resume</span>
        </button>

        {/* Resume List */}
        <ResumeList />

        {/* Settings Panel */}
        <div className="mt-auto pt-6 flex flex-col gap-3 border-t border-white/10">
          <div className="flex flex-col gap-1">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-3 px-3 py-3 text-[#94a3b8] hover:text-white cursor-pointer transition-colors rounded-xl hover:bg-white/5"
            >
              <span className="material-symbols-outlined">home</span>
              <p className="text-sm font-medium">Back to Home</p>
            </button>
            <button
              onClick={handleToggleDarkMode}
              className="flex items-center justify-between w-full px-3 py-3 text-[#94a3b8] hover:text-white cursor-pointer transition-all rounded-xl hover:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">dark_mode</span>
                <p className="text-sm font-medium">Dark Mode</p>
              </div>
              <div className="w-8 h-4 bg-white/10 rounded-full relative">
                <div
                  className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                    state.darkMode ? 'left-4' : 'left-0.5'
                  }`}
                ></div>
              </div>
            </button>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center justify-center gap-2 px-2">
            <a
              href="https://github.com/AyushPandey218"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#94a3b8] hover:text-white transition-colors"
              title="GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/ayushpandey0618/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#94a3b8] hover:text-white transition-colors"
              title="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://x.com/home"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#94a3b8] hover:text-white transition-colors"
              title="Twitter/X"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/ayush_wg218/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#94a3b8] hover:text-white transition-colors"
              title="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="mailto:ayushpandey0618@gmail.com"
              className="p-2 text-[#94a3b8] hover:text-white transition-colors"
              title="Email"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
          </div>
          
          {/* Buy Me a Coffee Button */}
          <a
            href="https://buymeacoffee.com/ayush_wg218"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#FFDD00] hover:bg-[#FFED4E] text-black rounded-xl font-semibold text-sm transition-all hover:scale-105"
          >
            <span>☕</span>
            <span>Buy Me a Coffee</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
