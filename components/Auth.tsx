import React, { useState, useMemo } from 'react';
import { Logo } from './Logo';

interface AuthProps {
  type: 'login' | 'signup';
  onSwitch: (type: 'login' | 'signup') => void;
  onSuccess: () => void;
}

export const AuthPage: React.FC<AuthProps> = ({ type, onSwitch, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const calculateStrength = (p: string) => {
    if (!p) return 0;
    let strength = 0;
    if (p.length >= 8) strength += 1;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) strength += 1;
    if (/[0-9]/.test(p)) strength += 1;
    if (/[^A-Za-z0-9]/.test(p)) strength += 1;
    return strength;
  };

  const getStrengthMeta = (strength: number) => {
    switch (strength) {
      case 0: return { label: 'Too short', color: 'text-slate-400', bar: 'bg-slate-200 dark:bg-slate-700' };
      case 1: return { label: 'Weak', color: 'text-red-500', bar: 'bg-red-500' };
      case 2: return { label: 'Fair', color: 'text-orange-500', bar: 'bg-orange-500' };
      case 3: return { label: 'Good', color: 'text-yellow-500', bar: 'bg-yellow-500' };
      case 4: return { label: 'Strong', color: 'text-emerald-500', bar: 'bg-emerald-500' };
      default: return { label: '', color: '', bar: '' };
    }
  };

  const passwordStrength = useMemo(() => calculateStrength(password), [password]);
  const strengthLabel = useMemo(() => getStrengthMeta(passwordStrength), [passwordStrength]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: type,
          email,
          password,
          firstName: name.split(' ')[0] || 'User',
          lastNameInitial: name.split(' ')[1] ? name.split(' ')[1][0] + '.' : '',
          role: 'student'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('certiyup_session', 'active');
        localStorage.setItem('certiyup_user', JSON.stringify(data.user));
        onSuccess();
      } else {
        alert(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-300">
      <div className="w-full max-w-[1200px] grid lg:grid-cols-2 gap-12 items-center">
        {/* Brand Side */}
        <div className="hidden lg:flex flex-col gap-12">
          <Logo className="scale-150 origin-left" />
          <div className="space-y-6">
            <h1 className="text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-[0.9]">
              Verified <br />
              <span className="text-emerald-500">Internships</span> <br />
              for Global <br />
              Talent.
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-md leading-relaxed">
              The trusted ecosystem where students find growth and recruiters find pre-vetted reliability.
            </p>
          </div>
          <div className="flex gap-6">
             <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-2">
                <div className="text-3xl font-bold text-emerald-500">5k+</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Placements</div>
             </div>
             <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-2">
                <div className="text-3xl font-bold text-sky-500">98%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Success Rate</div>
             </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
          {isLoading && (
            <div className="absolute top-0 left-0 h-1 bg-emerald-500 w-full overflow-hidden">
              <div className="w-full h-full bg-emerald-400 origin-left animate-pulse"></div>
            </div>
          )}

          <div className="mb-10">
            <div className="lg:hidden mb-12">
               <Logo />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              {type === 'login' ? 'Log In' : 'Create Account'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {type === 'login' ? "Welcome back! Please enter your details." : "Join the ecosystem of verified professional talent."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {type === 'signup' && (
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  placeholder="Amina Okonkwo"
                  className="w-full px-5 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                placeholder="name@company.com"
                className="w-full px-5 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                {type === 'login' && (
                  <button 
                    type="button"
                    className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest hover:text-emerald-700"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  placeholder="Enter your password"
                  className="w-full px-5 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all pr-14"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>

              {type === 'signup' && password && (
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-slate-400 uppercase tracking-widest">Security Level</span>
                    <span className={strengthLabel.color}>{strengthLabel.label}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <div 
                        key={step} 
                        className={`h-1.5 rounded-full transition-all duration-500 ${step <= passwordStrength ? strengthLabel.bar : 'bg-slate-100 dark:bg-slate-800'}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {type === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="peer hidden"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <div className="w-6 h-6 rounded-lg border-2 border-slate-200 dark:border-slate-800 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all flex items-center justify-center text-white text-xs">
                      {rememberMe && '✓'}
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 transition-colors">
                    Remember me
                  </span>
                </label>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-[#00a859] text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl"
            >
              {isLoading ? 'Processing...' : type === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-50 dark:border-slate-800 text-center space-y-6">
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {type === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => onSwitch(type === 'login' ? 'signup' : 'login')}
                className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-xs hover:text-emerald-700"
              >
                {type === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </p>
            {type === 'signup' && (
              <p className="text-[10px] text-slate-400 font-bold max-w-[280px] mx-auto">
                By continuing, you agree to our Terms and Privacy Policy.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
