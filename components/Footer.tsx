
import React from 'react';
import { Logo } from './Logo';

interface FooterProps {
  onShowLegal: (type: 'privacy' | 'terms' | 'about' | 'referral') => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowLegal }) => {
  const FEEDBACK_URL = "https://docs.google.com/forms/d/e/1FAIpQLSebzm4BnjfxQQyEl18Ry2pghoGmV0CcvY7bd5OLk3_FHgRGYQ/viewform?usp=sharing&ouid=111656557488244709132";

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-20 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-16 mb-20">
          <div className="col-span-2">
            <Logo size="sm" className="mb-8" />
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs leading-relaxed">
              Certiyup – Internships you can trust. Connecting verified talent with amazing opportunities.
            </p>
            <div className="flex gap-6">
               {['LinkedIn', 'Instagram', 'Twitter'].map(s => (
                 <a key={s} href="#" className="text-sm font-bold uppercase tracking-wider text-slate-400 hover:text-emerald-600 transition-colors">{s}</a>
               ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-8 text-slate-900 dark:text-white">Product</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-emerald-600 transition-colors">Explore</button></li>
              <li><button onClick={() => onShowLegal('about')} className="hover:text-emerald-600 transition-colors">About Us</button></li>
              <li><button onClick={() => onShowLegal('referral')} className="text-emerald-600 dark:text-emerald-400 font-black hover:underline transition-all">Referral Program</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-8 text-slate-900 dark:text-white">Support</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li>
                <a 
                  href={FEEDBACK_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-4 py-2 bg-[#00a859] text-white rounded-lg font-bold hover:bg-emerald-700 shadow-lg transition-all text-[10px]"
                >
                  Give Feedback
                </a>
              </li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-8 text-slate-900 dark:text-white">Legal</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li><button onClick={() => onShowLegal('privacy')} className="hover:text-emerald-600 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onShowLegal('terms')} className="hover:text-emerald-600 transition-colors">Terms of Service</button></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold uppercase tracking-wider text-slate-400">© 2026 Certiyup Platform. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-sm font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 transition-colors">Status</a>
            <a href="#" className="text-sm font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
