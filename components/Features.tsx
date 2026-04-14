
import React from 'react';

export const HowItWorks = () => {
  const steps = [
    {
      title: 'Discover Opportunities',
      desc: 'Browse verified internships across tech, business, design, and more.',
      icon: '🔍'
    },
    {
      title: 'Apply Easily',
      desc: 'One-click applications with your profile and resume.',
      icon: '⚡'
    },
    {
      title: 'Get Matched',
      desc: 'Recruiters review verified profiles and connect directly.',
      icon: '🤝'
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Get your career started in three simple steps.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-sky-500 transition-all">
              <div className="text-4xl mb-6">{step.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              {idx < 2 && (
                 <div className="hidden lg:block absolute top-1/2 -right-6 text-slate-300 dark:text-slate-700 text-3xl transition-colors">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AudienceSections = ({ onStudentCta, onRecruiterCta }: { onStudentCta: () => void, onRecruiterCta: () => void }) => {
  return (
    <section className="py-24 space-y-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* For Students */}
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" alt="Students" className="rounded-[3rem] shadow-2xl grayscale dark:grayscale-0 dark:opacity-80 transition-all" />
        </div>
        <div className="order-1 lg:order-2">
          <span className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-sky-400">For Students</span>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mt-4 mb-8 transition-colors">Access verified internships without worrying about fake postings.</h2>
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-sky-900 text-emerald-600 dark:text-sky-400 flex items-center justify-center text-xs transition-colors">✓</div>
              Track applications in one dashboard.
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-sky-900 text-emerald-600 dark:text-sky-400 flex items-center justify-center text-xs transition-colors">✓</div>
              Build a portfolio recruiters trust.
            </li>
          </ul>
          <button 
            onClick={onStudentCta}
            className="px-8 py-4 bg-[#00a859] text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl transition-all text-lg"
          >
            Start Your Internship Journey
          </button>
        </div>
      </div>

      {/* For Recruiters */}
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-sky-400">For Recruiters</span>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mt-4 mb-8 transition-colors">Post internships with verification badges and save time.</h2>
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-sky-900 text-emerald-600 dark:text-sky-400 flex items-center justify-center text-xs transition-colors">✓</div>
              Save time with pre-qualified candidates.
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-sky-900 text-emerald-600 dark:text-sky-400 flex items-center justify-center text-xs transition-colors">✓</div>
              Manage applications in a simple dashboard.
            </li>
          </ul>
          <button 
            onClick={onRecruiterCta}
            className="px-8 py-4 bg-[#00a859] text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl transition-all text-lg"
          >
            Hire Interns with Certiyup
          </button>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Recruiters" className="rounded-[3rem] shadow-2xl grayscale dark:grayscale-0 dark:opacity-80 transition-all" />
        </div>
      </div>
    </section>
  );
};
