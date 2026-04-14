
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks, AudienceSections } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { InternshipExplorer } from './components/InternshipExplorer';
import { StudentDashboard } from './components/Dashboard';
import { RecruiterDashboard } from './components/RecruiterDashboard';
import { AuthPage } from './components/Auth';
import { IntroAnimation } from './components/IntroAnimation';
import { Onboarding } from './components/Onboarding';
import { Logo } from './components/Logo';
import { UserRole, UserProfile, Application, Assignment, Internship, Course } from './types';

type View = 'gateway' | 'home' | 'explore' | 'dashboard' | 'recruiter' | 'login' | 'signup' | 'onboarding';
type LegalType = 'privacy' | 'terms' | 'about' | 'referral' | 'none';

// Mock Talent Data for Recruiters
const INITIAL_TALENT = [
  { id: 't1', name: 'Amina Okonkwo', email: 'amina@certiyup.com', age: 22, location: 'Lagos, Nigeria', tags: ['Technology', 'Design', 'React'], img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200', bio: 'Frontend enthusiast with a passion for clean UI.', education: 'B.Sc Computer Science', experience: '1 Year Freelance', rating: 4.8 },
  { id: 't2', name: 'Kwame Asante', email: 'kwame@certiyup.com', age: 24, location: 'Accra, Ghana', tags: ['Marketing', 'Business', 'Strategy'], img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', bio: 'Marketing graduate with experience in digital campaigns.', education: 'MBA Candidate', experience: 'Marketing Intern @ GlobalAds', rating: 4.5 },
];

const LegalModal: React.FC<{ type: LegalType; onClose: () => void; referralCode?: string }> = ({ type, onClose, referralCode }) => {
  if (type === 'none') return null;

  const contentMap = {
    privacy: {
      title: "Privacy Policy",
      body: (
        <div className="space-y-6">
          <p>Last Updated: April 13, 2026</p>
          <p>At Certiyup, we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.</p>
          <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest">1. Information We Collect</h4>
          <p>We collect information that you provide directly to us when you create an account, such as your name, email address, educational background, and professional interests. We also collect data related to your internship applications and course progress.</p>
          <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest">2. How We Use Your Information</h4>
          <p>We use your information to facilitate the matching process between students and recruiters, provide access to professional courses, and improve our platform's services. Your professional data is shared with recruiters only when you explicitly apply for an internship.</p>
          <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest">3. Data Security</h4>
          <p>We implement industry-standard security measures, including encryption and secure server protocols, to protect your data from unauthorized access or disclosure.</p>
          <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest">4. Your Rights</h4>
          <p>You have the right to access, update, or delete your personal information at any time through your account settings. You may also contact us to request a copy of the data we hold about you.</p>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      body: (
        <div className="space-y-6">
          <p>Last Updated: April 13, 2026</p>
          <p>By accessing or using the Certiyup platform, you agree to be bound by these Terms of Service. Please read them carefully.</p>
          <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest">1. Eligibility</h4>
          <p>You must be at least 16 years old to use Certiyup. By creating an account, you represent and warrant that you meet this eligibility requirement.</p>
          <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest">2. User Conduct</h4>
          <p>You agree to provide truthful and accurate information in your profile and applications. Any fraudulent activity, including misrepresentation of credentials or misuse of the platform, will result in immediate account termination.</p>
          <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest">3. Recruiter Obligations</h4>
          <p>Recruiters agree to post only legitimate internship opportunities and to respect the privacy and professional integrity of all candidates.</p>
          <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest">4. Limitation of Liability</h4>
          <p>Certiyup is a platform for connecting talent and opportunities. We do not guarantee employment and are not responsible for the conduct of any user or third-party partner.</p>
        </div>
      )
    },
    about: {
      title: "About Us",
      body: (
        <div className="space-y-6">
          <p>Certiyup was founded with a clear mission: to solve the trust deficit in the early-career job market. We believe that every student deserves access to real, verified growth opportunities, and every recruiter deserves to find reliable, pre-vetted talent without the noise of fake postings.</p>
          <p>Our platform combines advanced verification protocols with a gamified learning ecosystem (CertiAcademy) to ensure that talent is not just found, but also nurtured and rewarded.</p>
          <p>Built by Paragon Studios, Certiyup is the next evolution of professional networking for the global workforce.</p>
        </div>
      )
    },
    referral: {
      title: "Referral Program",
      body: (
        <div className="space-y-6">
          <p>Share the gift of a verified career start. When your friends sign up using your unique link, they join a community of trusted talent and gain immediate access to our internship ecosystem.</p>
          <p>For every successful signup from your network, you'll earn 50 CertiTokens, which can be used to unlock premium courses and exclusive placement opportunities.</p>
        </div>
      )
    }
  };

  const current = contentMap[type as keyof typeof contentMap];

  return (
    <div className="fixed inset-0 z-[9999] ag-flex-center p-6 bg-slate-900/80 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] p-12 border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-y-auto max-h-[90vh]">
        <div className="ag-flex-between mb-10">
           <h3 className="ag-heading">{current.title}</h3>
           <button onClick={onClose} className="w-12 h-12 ag-flex-center rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-red-50 text-xl transition-all">✕</button>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <div className="ag-text-muted leading-relaxed mb-8">
            {current.body}
          </div>
          {type === 'referral' && referralCode && (
            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border-2 border-dashed border-emerald-500/30 text-center">
              <p className="ag-label mb-3">Your Unique Link</p>
              <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <code className="flex-grow text-emerald-600 font-bold break-all">certiyup.com/ref/{referralCode}</code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`https://certiyup.com/ref/${referralCode}`);
                    alert("Referral link copied!");
                  }}
                  className="px-6 py-2 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-12">
          <button onClick={onClose} className="ag-button-primary w-full text-lg py-5">{LOCALE.common.done}</button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentView, setCurrentView] = useState<View>('gateway');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [legalView, setLegalView] = useState<LegalType>('none');
  const [toast, setToast] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Global State
  const [profile, setProfile] = useState<UserProfile>(() => {
    const savedUser = localStorage.getItem('certiyup_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      return {
        firstName: user.firstName,
        lastNameInitial: user.lastNameInitial,
        email: user.email,
        emailVerified: true,
        role: user.role,
        rating: user.rating || 4.8,
        region: user.region || 'San Francisco, CA',
        tokenBalance: user.tokenBalance || 250,
        ownedCourses: [],
        education: { institution: 'SF State University', level: 'Undergraduate', fieldOfStudy: 'Computer Science' },
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
        availability: { type: 'Full-time', duration: '3 Months' },
        interests: ['Engineering', 'Product Design', 'FinTech'],
        bio: user.bio || "Passionate frontend developer with a focus on creating accessible and high-performance user interfaces.",
        links: { email: user.email, linkedin: 'linkedin.com/in/alexj', portfolio: 'alexj.dev' },
        referralStats: {
          code: user.id ? user.id.toUpperCase().slice(0, 8) : 'ALEXJ2023',
          totalReferrals: 12,
          successfulHires: 3
        }
      };
    }
    return {
      firstName: 'Alex',
      lastNameInitial: 'J.',
      email: 'alex@certiyup.com',
      emailVerified: true,
      role: 'student',
      rating: 4.8,
      region: 'San Francisco, CA',
      tokenBalance: 250,
      ownedCourses: [],
      education: { institution: 'SF State University', level: 'Undergraduate', fieldOfStudy: 'Computer Science' },
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
      availability: { type: 'Full-time', duration: '3 Months' },
      interests: ['Engineering', 'Product Design', 'FinTech'],
      bio: "Passionate frontend developer with a focus on creating accessible and high-performance user interfaces.",
      links: { email: 'alex@certiyup.com', linkedin: 'linkedin.com/in/alexj', portfolio: 'alexj.dev' },
      referralStats: {
        code: 'ALEXJ2023',
        totalReferrals: 12,
        successfulHires: 3
      }
    };
  });

  const [apps, setApps] = useState<Application[]>([
    { id: 'a1', internshipId: '1', status: 'reviewed', appliedDate: '2023-11-05', internshipTitle: 'Frontend Developer Intern', companyName: 'TechFlow Systems' },
    { id: 'a2', internshipId: '4', status: 'interviewing', appliedDate: '2023-11-06', internshipTitle: 'Data Analyst Intern', companyName: 'InsightMetrics' },
  ]);

  const [tasks, setTasks] = useState<Assignment[]>([
    { id: 'as1', title: 'React Performance Audit', description: 'Analyze the current landing page and suggest 3 performance improvements.', dueDate: '2023-11-20', status: 'pending', senderName: 'TechFlow Systems' }
  ]);

  const [talentPool, setTalentPool] = useState(INITIAL_TALENT);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleApply = async (internship: Internship) => {
    if (apps.find(a => a.internshipId === internship.id)) {
      showToast("You've already applied to this!");
      return;
    }

    const savedUser = localStorage.getItem('certiyup_user');
    const user = savedUser ? JSON.parse(savedUser) : null;

    if (!user || !user.id) {
       showToast("Please log in to apply!");
       return;
    }

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, internshipId: internship.id })
      });

      if (res.ok) {
        const newApp = await res.json();
        setApps([{
          id: newApp.id,
          internshipId: newApp.internshipId,
          status: newApp.status,
          appliedDate: new Date(newApp.appliedDate).toISOString().split('T')[0],
          internshipTitle: internship.title,
          companyName: internship.company
        }, ...apps]);
        showToast(`Successfully applied to ${internship.company}!`);
      }
    } catch (e) {
      showToast("Failed to save application to cloud.");
    }
  };

  const handleBuyTokens = (amount: number) => {
    setProfile(prev => ({ ...prev, tokenBalance: prev.tokenBalance + amount }));
    showToast(`Added ${amount} CertiTokens to your wallet!`);
  };

  const handleBuyCourse = (course: Course) => {
    if (profile.tokenBalance < course.priceInTokens) {
      showToast("Not enough tokens! Refer a friend or top up.");
      return;
    }
    setProfile(prev => ({
      ...prev,
      tokenBalance: prev.tokenBalance - course.priceInTokens,
      ownedCourses: [...prev.ownedCourses, course.id]
    }));
    showToast(`Enrolled in ${course.title}! Your internship path is now active.`);
  };

  const handleSubmitTask = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'submitted' as const } : t));
    showToast("Assignment submitted successfully!");
  };

  const handleRateTalent = (talentId: string) => {
    setTalentPool(talentPool.map(t => {
      if (t.id === talentId) {
        const newRating = Math.min(5, t.rating + 0.1);
        showToast(`Increased ${t.name}'s trust rating to ${newRating.toFixed(1)} ⭐`);
        return { ...t, rating: Number(newRating.toFixed(1)) };
      }
      return t;
    }));
  };

  useEffect(() => {
    const session = localStorage.getItem('certiyup_session');
    const role = localStorage.getItem('certiyup_role') as UserRole | null;
    
    const timer = setTimeout(() => {
      setShowIntro(false);
      if (session === 'active' && role) {
        setUserRole(role);
        setCurrentView('home');
      } 
      else if (session === 'active' && !role) {
        setCurrentView('onboarding');
      }
      else {
        setCurrentView('gateway');
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchUserApps = async () => {
      const savedUser = localStorage.getItem('certiyup_user');
      const user = savedUser ? JSON.parse(savedUser) : null;
      if (user && user.id) {
        try {
          const res = await fetch(`/api/applications?userId=${user.id}`);
          if (res.ok) {
            const data = await res.json();
            setApps(data.map((a: any) => ({
              id: a.id,
              internshipId: a.internshipId,
              status: a.status,
              appliedDate: new Date(a.appliedDate).toISOString().split('T')[0],
              internshipTitle: a.internship?.title || 'Internship',
              companyName: a.internship?.company || 'Company'
            })));
          }
        } catch (e) {
          console.error("Failed to fetch apps", e);
        }
      }
    };
    if (currentView === 'home' || currentView === 'dashboard') {
      fetchUserApps();
    }
  }, [currentView]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem('certiyup_session');
    localStorage.removeItem('certiyup_role');
    setUserRole(null);
    setCurrentView('gateway');
  };

  const handleAuthSuccess = () => {
    const role = localStorage.getItem('certiyup_role') as UserRole | null;
    if (role) {
      setUserRole(role);
      setCurrentView('home');
    } else {
      setCurrentView('onboarding');
    }
  };

  const handleOnboardingComplete = (role: UserRole) => {
    localStorage.setItem('certiyup_role', role);
    setUserRole(role);
    setCurrentView('home');
  };

  if (showIntro) {
    return <IntroAnimation />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'gateway':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-md w-full text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <Logo size="lg" className="justify-center mb-8" />
              <div className="space-y-4">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Access Your Future</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Verified internships for students, top-tier talent for recruiters.</p>
              </div>
              <div className="grid gap-4">
                <button 
                  onClick={() => setCurrentView('signup')}
                  className="w-full py-5 bg-[#00a859] text-white rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-900/20 active:scale-95"
                >
                  Create New Account
                </button>
                <button 
                  onClick={() => setCurrentView('login')}
                  className="w-full py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-black text-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        );
      case 'home':
        return (
          <>
            <Hero onExplore={() => setCurrentView('explore')} onSignUp={() => setCurrentView(userRole ? 'dashboard' : 'signup')} />
            <HowItWorks />
            <AudienceSections onStudentCta={() => setCurrentView('explore')} onRecruiterCta={() => setCurrentView('recruiter')} />
            <Testimonials />
          </>
        );
      case 'explore':
        return <InternshipExplorer onApply={handleApply} currentApps={apps} />;
      case 'recruiter':
      case 'dashboard':
        if (!userRole) { setCurrentView('login'); return null; }
        if (userRole === 'recruiter') {
          return (
            <RecruiterDashboard 
              onLogout={handleLogout} 
              onBackToHome={() => setCurrentView('home')}
              isDarkMode={isDarkMode} 
              toggleDarkMode={toggleDarkMode}
              talentPool={talentPool}
              onRateTalent={handleRateTalent}
              onNotify={showToast}
            />
          );
        }
        return (
          <StudentDashboard 
            onLogout={handleLogout} 
            onBackToHome={() => setCurrentView('home')}
            isDarkMode={isDarkMode} 
            toggleDarkMode={toggleDarkMode}
            profile={profile}
            apps={apps}
            tasks={tasks}
            onApply={handleApply}
            onSubmitTask={handleSubmitTask}
            onUpdateProfile={(p) => { setProfile(p); showToast("Profile updated!"); }}
            onBuyTokens={handleBuyTokens}
            onBuyCourse={handleBuyCourse}
          />
        );
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'login':
        return <AuthPage type="login" onSwitch={(t) => setCurrentView(t as any)} onSuccess={handleAuthSuccess} />;
      case 'signup':
        return <AuthPage type="signup" onSwitch={(t) => setCurrentView(t as any)} onSuccess={handleAuthSuccess} />;
      default:
        return <Hero onExplore={() => setCurrentView('explore')} onSignUp={() => setCurrentView('signup')} />;
    }
  };

  const showNavAndFooter = !['login', 'signup', 'onboarding', 'gateway', 'dashboard'].includes(currentView);

  return (
    <Layout>
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[99999] px-8 py-4 bg-[#00a859] text-white rounded-full font-black text-xs uppercase tracking-widest shadow-2xl animate-in slide-in-from-top-4">
          ✨ {toast}
        </div>
      )}
      <LegalModal type={legalView} onClose={() => setLegalView('none')} referralCode={profile.referralStats?.code} />
      {showNavAndFooter && (
        <Navbar 
          onNavigate={(view) => setCurrentView(view)} 
          currentView={currentView} 
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          userRole={userRole}
          onLogout={handleLogout}
        />
      )}
      <div className={`${showNavAndFooter ? "min-h-[calc(100vh-80px)]" : ""} transition-colors duration-300`}>
        {renderContent()}
      </div>
      {showNavAndFooter && <Footer onShowLegal={(t) => setLegalView(t)} />}
    </Layout>
  );
};

export default App;
