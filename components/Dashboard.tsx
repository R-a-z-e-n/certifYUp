import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Logo } from './Logo';
import { MOCK_INTERNSHIPS, MOCK_COURSES } from '../constants';
import { UserProfile, Application, Assignment, Internship, Course } from '../types';

interface DashboardProps {
  onLogout: () => void;
  onBackToHome: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  profile: UserProfile;
  apps: Application[];
  tasks: Assignment[];
  onApply: (internship: Internship) => void;
  onSubmitTask: (taskId: string) => void;
  onUpdateProfile: (profile: UserProfile) => void;
  onBuyTokens: (amount: number) => void;
  onBuyCourse: (course: Course) => void;
}

type DashboardTab = 'home' | 'applications' | 'view-resume' | 'edit-resume' | 'assignments' | 'settings' | 'referrals' | 'academy' | 'wallet';

export const StudentDashboard: React.FC<DashboardProps> = ({ 
  onLogout, onBackToHome, isDarkMode, toggleDarkMode, profile, apps, tasks, onApply, onSubmitTask, onUpdateProfile, onBuyTokens, onBuyCourse
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedAppDetail, setSelectedAppDetail] = useState<Application | null>(null);
  const [submittingAssignment, setSubmittingAssignment] = useState<Assignment | null>(null);
  const [tokenPackModal, setTokenPackModal] = useState(false);

  const FEEDBACK_URL = "https://docs.google.com/forms/d/e/1FAIpQLSebzm4BnjfxQQyEl18Ry2pghoGmV0CcvY7bd5OLk3_FHgRGYQ/viewform?usp=sharing&ouid=111656557488244709132";

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reviewed': return 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400';
      case 'interviewing': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
      case 'hired': return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'submitted': return 'bg-emerald-50 text-emerald-500';
      default: return 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const renderHome = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard Home 👋</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Explore curated internships and track matches.</p>
        </div>
        <div className="flex items-center gap-6">
           <button onClick={() => setActiveTab('wallet')} className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-2xl border border-emerald-100 dark:border-emerald-800 group hover:bg-emerald-500 transition-all">
              <span className="text-xl">💎</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-white">{profile.tokenBalance}</span>
           </button>
           <button onClick={() => setShowNotifications(!showNotifications)} className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-2xl relative">
              🔔
              <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></span>
            </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Application Analytics 📊</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-10">Real-time status of your active opportunities.</p>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Submitted', value: apps.filter(a => a.status === 'submitted').length + 1 },
                    { name: 'Interview', value: apps.filter(a => a.status === 'interviewing').length },
                    { name: 'Hired', value: apps.filter(a => a.status === 'hired').length },
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#6366f1" />
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Submitted</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interview</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500"></div><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hired</span></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm !bg-emerald-50 dark:!bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/50 flex flex-col justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-3xl shadow-sm">🎓</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Academy 🎓</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Path to career.</p>
              </div>
            </div>
            <button onClick={() => setActiveTab('academy')} className="px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#00a859] transition-all w-full">Browse</button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm !bg-amber-50 dark:!bg-amber-950/20 border-amber-100 dark:border-amber-900/50 flex flex-col justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-3xl shadow-sm">🎁</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Refer 🎁</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Get 50 tokens.</p>
              </div>
            </div>
            <button onClick={() => setActiveTab('referrals')} className="px-6 py-4 bg-amber-600 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-amber-700 transition-all w-full">Earn</button>
          </div>
        </div>
      </div>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_INTERNSHIPS.map(i => (
          <div key={i.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:border-[#00a859] hover:shadow-2xl flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-bold text-2xl text-[#00a859]">{i.company[0]}</div>
              <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${i.verified ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                {i.verified ? 'Verified' : 'Member'}
              </span>
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">{i.title}</h4>
            <p className="text-sm font-bold text-slate-500 mb-6">{i.company}</p>
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50 dark:border-slate-800">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{i.stipend}</span>
               <button 
                onClick={() => onApply(i)}
                className="px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#00a859] hover:text-white transition-all !px-6 !py-2.5 !rounded-xl"
               >
                 {apps.some(a => a.internshipId === i.id) ? 'Applied ✓' : 'Apply Now'}
               </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );

  const renderAcademy = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex items-center justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">CertiAcademy 🎓</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Premium courses with guaranteed internship path.</p>
        </div>
        <button onClick={() => setActiveTab('wallet')} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm !p-4 flex items-center gap-3 hover:border-emerald-500">
           <span className="text-xl">💎</span>
           <span className="font-bold text-slate-900 dark:text-white">{profile.tokenBalance} Tokens</span>
        </button>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_COURSES.map(course => {
          const isOwned = profile.ownedCourses.includes(course.id);
          return (
            <div key={course.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all !p-0 overflow-hidden group hover:shadow-2xl">
              <div className="h-48 relative overflow-hidden">
                <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest">{course.provider}</div>
              </div>
              <div className="p-8">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{course.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 line-clamp-2">{course.description}</p>
                <div className="space-y-3 mb-8">
                  {course.perks.map(perk => (
                    <div key={perk} className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                      <span>⚡</span> {perk}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                   <div className="flex items-center gap-2">
                     <span className="text-lg">💎</span>
                     <span className="text-xl font-bold text-slate-900 dark:text-white">{course.priceInTokens}</span>
                   </div>
                   <button 
                    disabled={isOwned || profile.tokenBalance < course.priceInTokens}
                    onClick={() => onBuyCourse(course)}
                    className={`px-6 py-4 bg-[#00a859] text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg !px-6 !py-3 !rounded-xl ${
                      isOwned 
                        ? "!bg-slate-100 !text-slate-400 cursor-default" 
                        : profile.tokenBalance >= course.priceInTokens 
                          ? "!bg-emerald-500 !text-white hover:!bg-emerald-600"
                          : "!bg-slate-200 !text-slate-400 cursor-not-allowed"
                    }`}
                   >
                     {isOwned ? 'Enrolled ✓' : profile.tokenBalance >= course.priceInTokens ? 'Enroll with Tokens' : 'Not Enough Tokens'}
                   </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderWallet = () => (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
      <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight text-center mb-10">Token Wallet 💎</h2>
      
      <div className="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Current Balance</p>
        <div className="text-6xl font-bold text-slate-900 dark:text-white mb-8">{profile.tokenBalance} <span className="text-emerald-500">CertiTokens</span></div>
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <button onClick={() => setActiveTab('referrals')} className="px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#00a859] hover:text-white transition-all !bg-emerald-50 dark:!bg-emerald-950/30 !text-emerald-600 dark:!text-emerald-400 hover:!bg-emerald-500 hover:!text-white">Earn Tokens</button>
          <button onClick={() => setTokenPackModal(true)} className="px-6 py-4 bg-[#00a859] text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg text-xs">Wallet</button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">Transaction History</h3>
        {[
          { type: 'Referral Bonus', amount: '+50', date: '2023-11-06', icon: '🎁' },
          { type: 'Sign up Bonus', amount: '+100', date: '2023-11-01', icon: '✨' },
        ].map((tx, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-xl">{tx.icon}</div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{tx.type}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.date}</p>
              </div>
            </div>
            <span className="text-lg font-bold text-emerald-600">{tx.amount} 💎</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReferrals = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Refer & Earn 🎁</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">Your Referral Link</h3>
          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Unique Code</p>
               <div className="text-2xl font-bold text-emerald-600 tracking-wider mb-6">{profile.referralStats?.code}</div>
               <button 
                onClick={() => {
                  navigator.clipboard.writeText(`https://certiyup.com/ref/${profile.referralStats?.code}`);
                  alert("Link copied!");
                }}
                className="px-6 py-4 bg-[#00a859] text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg w-full"
               >
                 Copy Referral Link
               </button>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900">
              <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest text-center">
                ✨ Reward: 50 CertiTokens / signup
              </p>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Share this link with your peers. Earning tokens has never been easier! Use them to unlock professional courses and guaranteed internships.
            </p>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-8">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center text-center">
             <div className="text-4xl font-bold text-emerald-600 mb-2">{profile.referralStats?.totalSignups}</div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Referrals</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center text-center">
             <div className="text-4xl font-bold text-sky-600 mb-2">{profile.referralStats?.totalTokensEarned} 💎</div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tokens Earned</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">My Applications 💼</h2>
      <div className="grid gap-6">
        {apps.length > 0 ? apps.map(app => (
          <div key={app.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between group hover:border-emerald-500 gap-6">
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-bold text-2xl text-emerald-600">{app.companyName[0]}</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{app.internshipTitle}</h4>
                <p className="text-sm font-bold text-slate-500 mb-1">{app.companyName}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applied on {app.appliedDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest ${getStatusColor(app.status)}`}>
                {app.status}
              </span>
              <button 
                onClick={() => setSelectedAppDetail(app)}
                className="px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#00a859] hover:text-white transition-all !px-6 !py-2.5 !rounded-xl"
              >
                Details
              </button>
            </div>
          </div>
        )) : (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm text-center py-20">
             <div className="text-6xl mb-6">🔍</div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">No applications yet</h3>
             <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">Start exploring internships and find your perfect match.</p>
             <button onClick={() => onBackToHome()} className="px-6 py-4 bg-[#00a859] text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg">Explore Internships</button>
          </div>
        )}
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Assignments 📋</h2>
      <div className="grid gap-8">
        {tasks.map(task => (
          <div key={task.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-emerald-500">
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl">📋</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{task.title}</h4>
                <p className="text-sm font-bold text-slate-500 mb-1">{task.companyName}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deadline: {task.deadline}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
               <span className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest ${task.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                 {task.status}
               </span>
               {task.status === 'pending' && (
                 <button 
                  onClick={() => setSubmittingAssignment(task)}
                  className="px-6 py-4 bg-[#00a859] text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg !px-6 !py-2.5 !rounded-xl"
                 >
                   Submit Task
                 </button>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in duration-500">
      <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight text-center">Settings ⚙️</h2>
      
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-8">Personal Information</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">First Name</label>
              <input type="text" defaultValue={profile.firstName} className="w-full px-5 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Last Name Initial</label>
              <input type="text" defaultValue={profile.lastNameInitial} className="w-full px-5 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Institution</label>
            <input type="text" defaultValue={profile.education.institution} className="w-full px-5 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
          </div>
          <button className="px-6 py-4 bg-[#00a859] text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg w-full">Save Changes</button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm !border-red-100 dark:!border-red-900/30">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight !text-red-600 mb-6">Danger Zone</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="w-full py-4 border-2 border-red-100 text-red-600 rounded-2xl font-bold text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-red-50 transition-all">Delete Account</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-80 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 p-8 fixed h-full z-50">
        <div className="mb-12">
          <Logo />
        </div>
        
        <nav className="flex-grow space-y-2">
          {[
            { id: 'home', label: 'Dashboard', icon: '🏠' },
            { id: 'explore', label: 'Explore', icon: '🔍' },
            { id: 'applications', label: 'Applications', icon: '💼' },
            { id: 'assignments', label: 'Assignments', icon: '📋' },
            { id: 'academy', label: 'CertiAcademy', icon: '🎓' },
            { id: 'wallet', label: 'Wallet', icon: '💎' },
            { id: 'referrals', label: 'Referrals', icon: '🎁' },
            { id: 'view-resume', label: 'Resume', icon: '👤' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => item.id === 'explore' ? onBackToHome() : setActiveTab(item.id as DashboardTab)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-all ${
                activeTab === item.id 
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                  : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-bold text-slate-400 uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
          >
            <span className="text-xl">🚪</span>
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-80 p-6 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'home' && renderHome()}
          {activeTab === 'academy' && renderAcademy()}
          {activeTab === 'wallet' && renderWallet()}
          {activeTab === 'applications' && renderApplications()}
          {activeTab === 'assignments' && renderAssignments()}
          {activeTab === 'referrals' && renderReferrals()}
          {activeTab === 'settings' && renderSettings()}
          {activeTab === 'view-resume' && (
             <div className="animate-in fade-in duration-500">
               <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-10">Professional Resume</h2>
               <div className="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all !p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32"></div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-12 relative z-10">
                     <div className="w-32 h-32 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-5xl text-white shadow-2xl">👤</div>
                     <div className="text-center md:text-left">
                       <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{profile.firstName} {profile.lastNameInitial}</h3>
                       <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs">{profile.education.institution}</p>
                       <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                         {profile.interests.map(tag => (
                           <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-500">{tag}</span>
                         ))}
                       </div>
                     </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12 relative z-10">
                     <div className="space-y-8">
                        <div>
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-emerald-600 mb-4">Education</h4>
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                             <p className="font-bold text-slate-900 dark:text-white">{profile.education.degree}</p>
                             <p className="text-sm text-slate-500 font-medium mt-1">{profile.education.institution}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">Graduating {profile.education.gradYear}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-emerald-600 mb-4">Profile Badges</h4>
                          <div className="flex gap-4">
                             <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl flex items-center justify-center text-2xl border border-emerald-100 dark:border-emerald-800 shadow-sm" title="Verified Account">🛡️</div>
                             <div className="w-16 h-16 bg-sky-50 dark:bg-sky-950/30 rounded-2xl flex items-center justify-center text-2xl border border-sky-100 dark:border-sky-800 shadow-sm" title="Early Adopter">🚀</div>
                             <div className="w-16 h-16 bg-amber-50 dark:bg-amber-950/30 rounded-2xl flex items-center justify-center text-2xl border border-amber-100 dark:border-amber-800 shadow-sm" title="Top Talent">💎</div>
                          </div>
                        </div>
                     </div>
                     <div className="space-y-8">
                        <div>
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-emerald-600 mb-4">Course Progress</h4>
                          <div className="space-y-4">
                             {profile.ownedCourses.length > 0 ? (
                               profile.ownedCourses.map(cid => {
                                 const course = MOCK_COURSES.find(c => c.id === cid);
                                 return (
                                   <div key={cid} className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                                      <p className="font-bold text-slate-900 dark:text-white text-sm">{course?.title}</p>
                                      <div className="mt-4 h-2 bg-white dark:bg-slate-900 rounded-full overflow-hidden">
                                         <div className="h-full bg-emerald-500 w-[45%]"></div>
                                      </div>
                                      <div className="flex items-center justify-between mt-2">
                                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-slate-400">Progress</span>
                                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-emerald-600">45%</span>
                                      </div>
                                   </div>
                                 );
                               })
                             ) : (
                               <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-slate-400">No active courses</p>
                               </div>
                             )}
                          </div>
                        </div>
                     </div>
                  </div>
               </div>
             </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {selectedAppDetail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] p-12 border border-slate-100 dark:border-slate-800 shadow-2xl relative">
              <button onClick={() => setSelectedAppDetail(null)} className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-red-50 text-xl transition-all">✕</button>
              <div className="flex gap-8 items-center mb-10">
                 <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/30 rounded-3xl flex items-center justify-center font-bold text-4xl text-emerald-600">{selectedAppDetail.companyName[0]}</div>
                 <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{selectedAppDetail.internshipTitle}</h3>
                    <p className="text-emerald-600 font-bold">{selectedAppDetail.companyName}</p>
                 </div>
              </div>
              <div className="space-y-8">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Current Status</p>
                       <span className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest inline-block ${getStatusColor(selectedAppDetail.status)}`}>{selectedAppDetail.status}</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Applied Date</p>
                       <p className="font-bold text-slate-900 dark:text-white">{selectedAppDetail.appliedDate}</p>
                    </div>
                 </div>
                 <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border-2 border-dashed border-emerald-500/20">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Next Step</h4>
                    {selectedAppDetail.status === 'submitted' && <p className="font-medium text-slate-600 dark:text-slate-400">The recruiter is currently reviewing your application. You'll be notified of any status updates.</p>}
                    {selectedAppDetail.status === 'reviewed' && <p className="font-medium text-slate-600 dark:text-slate-400">Your application has been reviewed! The recruiter will reach out soon if they wish to move forward.</p>}
                    {selectedAppDetail.status === 'interviewing' && <p className="font-medium text-slate-600 dark:text-slate-400">Check your email for an interview invitation. Prepare to shine!</p>}
                 </div>
              </div>
              <button onClick={() => setSelectedAppDetail(null)} className="px-6 py-4 bg-[#00a859] text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg w-full mt-10 text-lg py-5">Got it</button>
           </div>
        </div>
      )}

      {submittingAssignment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] p-12 border border-slate-100 dark:border-slate-800 shadow-2xl">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Submit Assignment</h3>
                 <button onClick={() => setSubmittingAssignment(null)} className="text-2xl hover:text-red-500 transition-colors">✕</button>
              </div>
              <div className="space-y-8">
                 <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Submission Link (Google Drive/GitHub/Portfolio)</label>
                    <input type="url" placeholder="https://..." className="w-full px-5 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Additional Notes</label>
                    <textarea rows={4} placeholder="Anything you'd like the recruiter to know..." className="w-full px-5 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"></textarea>
                 </div>
                 <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-3xl border border-emerald-100 dark:border-emerald-800 flex gap-4 items-center">
                    <div className="text-2xl">💡</div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold leading-relaxed">Double-check your links! Once submitted, you cannot edit your assignment response.</p>
                 </div>
                 <button 
                  onClick={() => {
                    onSubmitTask(submittingAssignment.id);
                    setSubmittingAssignment(null);
                  }}
                  className="px-6 py-4 bg-[#00a859] text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg w-full text-lg py-5"
                 >
                   Confirm Submission
                 </button>
              </div>
           </div>
        </div>
      )}

      {tokenPackModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[3rem] p-12 border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full -mr-24 -mt-24"></div>
              <div className="flex items-center justify-between mb-10 relative z-10">
                 <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Buy CertiTokens</h3>
                 <button onClick={() => setTokenPackModal(false)} className="text-2xl hover:text-red-500 transition-colors">✕</button>
              </div>
              <div className="space-y-6 relative z-10">
                 {[
                   { amount: 100, price: '$9.99', label: 'Starter Pack' },
                   { amount: 500, price: '$39.99', label: 'Pro Bundle', badge: 'Best Value' },
                   { amount: 1200, price: '$89.99', label: 'Career Launch', badge: 'Expert Choice' },
                 ].map((pack, idx) => (
                   <button 
                    key={idx}
                    onClick={() => {
                      onBuyTokens(pack.amount);
                      setTokenPackModal(false);
                    }}
                    className="w-full bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all !p-6 flex items-center justify-between group hover:border-emerald-500 hover:scale-[1.02]"
                   >
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                           <span className="font-bold text-slate-900 dark:text-white">{pack.label}</span>
                           {pack.badge && <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 text-[8px] font-bold uppercase rounded-md tracking-widest">{pack.badge}</span>}
                        </div>
                        <div className="text-2xl font-bold text-emerald-500 mt-1">{pack.amount} 💎</div>
                      </div>
                      <div className="text-xl font-bold text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{pack.price}</div>
                   </button>
                 ))}
                 <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-8">Secure payment via Stripe & Crypto</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
