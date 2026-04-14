
import React from 'react';

export const Logo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({ className = "", size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} bg-[#00a859] rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100 dark:shadow-emerald-950/20 transition-all duration-300 transform hover:rotate-3`}>
        {/* Refined SVG matching the provided graduation cap icon */}
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-[70%] h-[70%]"
        >
          {/* Top Diamond / Mortarboard */}
          <path 
            d="M50 25L90 45L50 65L10 45L50 25Z" 
            fill="white" 
          />
          {/* Cap Base */}
          <path 
            d="M26 53V64C26 64 36 72 50 72C64 72 74 64 74 64V53L50 65L26 53Z" 
            fill="white" 
            opacity="0.9"
          />
          {/* Tassel Cord */}
          <path 
            d="M78 45C78 45 82 48 88 56C90 58.5 90 62 88 64" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          {/* Tassel Brush */}
          <path 
            d="M88 64C86 66 82 72 78 76C74 80 70 82 66 84" 
            stroke="white" 
            strokeWidth="5" 
            strokeLinecap="round"
            strokeDasharray="1 4"
          />
          <path 
            d="M88 64C89 67 92 73 95 76C98 79 100 81 102 82" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round"
            opacity="0.5"
          />
          <circle cx="88" cy="64" r="3.5" fill="white" />
        </svg>
      </div>
      <span className={`${textSizes[size]} font-black text-slate-900 dark:text-white tracking-tighter transition-colors`}>
        Certiyup
      </span>
    </div>
  );
};
