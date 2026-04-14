
import React from 'react';

export const IntroAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[1000] bg-[#00a859] flex items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center gap-12">
        <div className="text-center text-white space-y-4 opacity-0 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter drop-shadow-2xl">CertifyUp™</h1>
          <p className="text-emerald-100 font-black tracking-[0.4em] text-[10px] uppercase opacity-70">Powered by Paragon Studios™</p>
        </div>

        {/* Spiraling Logo Container - Settles underneath the text */}
        <div className="animate-spiral-settle">
          <div className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-emerald-950/40 border-8 border-white/20">
            <svg 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-24 h-24 md:w-32 md:h-32"
            >
              <path d="M50 25L90 45L50 65L10 45L50 25Z" fill="#00a859" />
              <path d="M26 53V64C26 64 36 72 50 72C64 72 74 64 74 64V53L50 65L26 53Z" fill="#00a859" opacity="0.9" />
              <circle cx="88" cy="64" r="3.5" fill="#00a859" />
              <path d="M78 45C78 45 82 48 88 56C90 58.5 90 62 88 64" stroke="#00a859" strokeWidth="3" />
              <path d="M88 64C86 66 82 72 78 76C74 80 70 82 66 84" stroke="#00a859" strokeWidth="5" strokeDasharray="1 4" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spiral-settle {
          0% { transform: rotate(0deg) scale(0); opacity: 0; }
          30% { transform: rotate(720deg) scale(1.1); opacity: 1; }
          60% { transform: rotate(1080deg) scale(1); }
          100% { transform: rotate(1080deg) scale(1); opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { transform: translateY(-30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-spiral-settle {
          animation: spiral-settle 3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out forwards;
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};
