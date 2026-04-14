import React, { useState } from 'react';
import { Logo } from './Logo';
import { UserRole } from '../types';

interface NavbarProps {
  onNavigate: (view: 'home' | 'explore' | 'dashboard' | 'recruiter' | 'login' | 'signup') => void;
  currentView: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userRole: UserRole | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  currentView, 
  isDarkMode, 
  toggleDarkMode,
  userRole,
  onLogout
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <button 
          className="cursor-pointer transition-transform hover:scale-105" 
          onClick={() => onNavigate('home')}
        >
          <Logo />
        </button>
        
        <div className="hidden md:flex items-center gap-8 text-slate-600 dark:text-slate-400 font-medium">
          <button 
            onClick={() => onNavigate('home')}
            className={`hover:text-emerald-600 dark:hover:text-sky-400 transition-colors ${currentView === 'home' ? 'text-emerald-600 dark:text-sky-400 font-bold' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('explore')}
            className={`hover:text-emerald-600 dark:hover:text-sky-400 transition-colors ${currentView === 'explore' ? 'text-emerald-600 dark:text-sky-400 font-bold' : ''}`}
          >
            Explore
          </button>
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`hover:text-emerald-600 dark:hover:text-sky-400 transition-colors ${currentView === 'dashboard' ? 'text-emerald-600 dark:text-sky-400 font-bold' : ''}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => onNavigate('recruiter')}
            className={`hover:text-emerald-600 dark:hover:text-sky-400 transition-colors ${currentView === 'recruiter' ? 'text-emerald-600 dark:text-sky-400 font-bold' : ''}`}
          >
            Recruiters
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all mr-2"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>

          {!userRole ? (
            <>
              <button 
                onClick={() => onNavigate('login')}
                className="hidden sm:block px-5 py-2.5 text-slate-600 dark:text-slate-300 font-semibold hover:text-emerald-600 dark:hover:text-sky-400"
              >
                Log In
              </button>
              <button 
                onClick={() => onNavigate('signup')}
                className="px-5 py-2.5 bg-[#00a859] text-white rounded-lg font-semibold hover:bg-emerald-700 shadow-md transition-all"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 pr-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all group"
              >
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl">👤</div>
                <div className="hidden sm:block text-left">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active {userRole}</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Alex J.</div>
                </div>
                <span className="text-slate-400 group-hover:text-emerald-500 ml-2">▾</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-4 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                   <div className="space-y-1">
                      <button onClick={() => { onNavigate('dashboard'); setShowProfileMenu(false); }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm font-bold text-slate-600 dark:text-slate-300">
                        <span>👤</span> Profile Settings
                      </button>
                      <button onClick={() => { onNavigate('dashboard'); setShowProfileMenu(false); }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm font-bold text-slate-600 dark:text-slate-300">
                        <span>📋</span> My Applications
                      </button>
                      <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
                      <button onClick={() => { onLogout(); setShowProfileMenu(false); }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-all text-sm font-bold text-red-500">
                        <span>🚪</span> Log Out
                      </button>
                   </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
