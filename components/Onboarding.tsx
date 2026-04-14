import React, { useState } from 'react';
import { Logo } from './Logo';
import { UserRole } from '../types';

interface OnboardingProps {
  onComplete: (role: UserRole) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleContinue = () => {
    if (selectedRole) {
      setShowConfirmModal(true);
    }
  };

  const handleFinalConfirm = () => {
    if (selectedRole) {
      onComplete(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 transition-colors duration-300">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <Logo size="lg" className="justify-center mb-10" />
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Choose Your Role</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Select how you want to use the Certiyup platform.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          {/* Intern / Student Role */}
          <button
            onClick={() => setSelectedRole('student')}
            className={`group relative p-12 rounded-[3.5rem] border-4 transition-all duration-500 text-left overflow-hidden ${
              selectedRole === 'student'
                ? 'bg-white dark:bg-slate-900 border-[#00a859] shadow-2xl shadow-emerald-900/10'
                : 'bg-white/50 dark:bg-slate-900/50 border-transparent hover:bg-white dark:hover:bg-slate-900 border-slate-100 dark:border-slate-800'
            }`}
          >
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-5xl mb-8 transition-transform duration-500 group-hover:scale-110 ${
              selectedRole === 'student' ? 'bg-[#00a859] text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}>
              🎓
            </div>
            <h3 className={`text-3xl font-black mb-4 ${selectedRole === 'student' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
              I'm an Intern
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Find verified opportunities, build your professional portfolio, and kickstart your career.
            </p>
            {selectedRole === 'student' && (
              <div className="absolute top-8 right-8 w-10 h-10 bg-[#00a859] rounded-full flex items-center justify-center text-white text-lg shadow-lg">
                ✓
              </div>
            )}
          </button>

          {/* Recruiter Role */}
          <button
            onClick={() => setSelectedRole('recruiter')}
            className={`group relative p-12 rounded-[3.5rem] border-4 transition-all duration-500 text-left overflow-hidden ${
              selectedRole === 'recruiter'
                ? 'bg-white dark:bg-slate-900 border-[#00a859] shadow-2xl shadow-emerald-900/10'
                : 'bg-white/50 dark:bg-slate-900/50 border-transparent hover:bg-white dark:hover:bg-slate-900 border-slate-100 dark:border-slate-800'
            }`}
          >
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-5xl mb-8 transition-transform duration-500 group-hover:scale-110 ${
              selectedRole === 'recruiter' ? 'bg-[#00a859] text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}>
              💼
            </div>
            <h3 className={`text-3xl font-black mb-4 ${selectedRole === 'recruiter' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
              I'm a Recruiter
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Hire top talent, post verified listings, and manage your internship pipeline efficiently.
            </p>
            {selectedRole === 'recruiter' && (
              <div className="absolute top-8 right-8 w-10 h-10 bg-[#00a859] rounded-full flex items-center justify-center text-white text-lg shadow-lg">
                ✓
              </div>
            )}
          </button>
        </div>

        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="px-8 py-4 bg-[#00a859] text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl transition-all !py-6 !px-16 !text-2xl shadow-2xl shadow-emerald-900/20 active:scale-95 transform hover:-translate-y-1"
          >
            Continue as {selectedRole === 'student' ? 'Intern' : selectedRole === 'recruiter' ? 'Recruiter' : 'Selected Role'}
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3rem] p-12 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Confirm Selection</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
              You've chosen to join Certiyup as <span className="text-[#00a859] font-black uppercase tracking-widest">{selectedRole === 'student' ? 'an Intern' : 'a Recruiter'}</span>. This will customize your experience and cannot be changed easily.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleFinalConfirm}
                className="px-8 py-4 bg-[#00a859] text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl transition-all !py-5 !text-lg"
              >
                Yes, Confirm Role
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-6 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-lg transition-all !py-5 !text-lg !bg-transparent border border-slate-200 dark:border-slate-800"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scale-up-center {
          animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
        }
        @keyframes scale-up-center {
          0% { transform: scale(0.5); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};