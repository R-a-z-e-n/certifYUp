import React from 'react';

interface HeroProps {
  onExplore: () => void;
  onSignUp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onSignUp }) => {
  return (
    <div className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 transition-colors duration-300">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-emerald-50 dark:bg-sky-950 text-emerald-600 dark:text-sky-400 rounded-full text-sm font-semibold mb-6 transition-colors">
            Trusted by 10,000+ Students & Recruiters
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-8 leading-[1.1] transition-colors">
            Find <span className="text-[#00a859] dark:text-sky-400">Verified</span> Internships. <br />
            Build Real Career.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed transition-colors">
            Certiyup connects students, graduates, and recruiters on a trusted internship platform. 
            Verified opportunities, transparent processes, and faster matches.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onExplore}
              className="px-8 py-4 bg-[#00a859] text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl transition-all w-full sm:w-auto text-lg"
            >
              Explore Internships
            </button>
            <button 
              onClick={onSignUp}
              className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-lg transition-all w-full sm:w-auto text-lg"
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-10 dark:opacity-20">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-emerald-400 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-green-400 dark:bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-emerald-300 dark:bg-sky-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};
