import React, { useState, useMemo } from 'react';
import { Logo } from './Logo';
import { MOCK_INTERNSHIPS } from '../constants';
import { Internship, Assignment } from '../types';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface RecruiterProps {
  onLogout: () => void;
  onBackToHome: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  talentPool: any[];
  onRateTalent: (talentId: string) => void;
  onNotify: (msg: string) => void;
}

type RecruiterTab = 'home' | 'postings' | 'discovery' | 'leaderboard' | 'assignments' | 'settings';

const TOP_RECRUITERS = [
  { name: 'Paragon Studios', count: 45, rating: 4.9, types: ['Paid', 'Verified'], img: '🏢' },
  { name: 'TechFlow', count: 38, rating: 4.8, types: ['Paid'], img: '💻' },
  { name: 'GreenSpace', count: 32, rating: 4.7, types: ['Unpaid', 'Verified'], img: '🌿' },
];

const MOCK_CHART_DATA = [
  { name: 'Oct 30', apps: 12 },
  { name: 'Oct 31', apps: 18 },
  { name: 'Nov 01', apps: 25 },
  { name: 'Nov 02', apps: 22 },
  { name: 'Nov 03', apps: 38 },
  { name: 'Nov 04', apps: 45 },
  { name: 'Nov 05', apps: 32 },
  { name: 'Nov 06', apps: 58 },
];

export const RecruiterDashboard: React.FC<RecruiterProps> = ({ 
  onLogout, onBackToHome, isDarkMode, toggleDarkMode, talentPool, onRateTalent, onNotify 
}) => {
  const [activeTab, setActiveTab] = useState<RecruiterTab>('home');
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Internship | null>(null);
  const [selectedTalent, setSelectedTalent] = useState<any | null>(null);
  const [showApplicants, setShowApplicants] = useState<Internship | null>(null);
  const [assignmentModal, setAssignmentModal] = useState<any | null>(null);
  
  const [leaderboardFilter, setLeaderboardFilter] = useState<'all' | 'paid' | 'unpaid'>('all');
  
  // Advanced Search States
  const [searchName, setSearchName] = useState('');
  const [searchRegion, setSearchRegion] = useState('');
  const [searchInterest, setSearchInterest] = useState('');

  const FEEDBACK_URL = "https://docs.google.com/forms/d/e/1FAIpQLSebzm4BnjfxQQyEl18Ry2pghoGmV0CcvY7bd5OLk3_FHgRGYQ/viewform?usp=sharing&ouid=111656557488244709132";

  const filteredTalent = useMemo(() => {
    return talentPool.filter(talent => {
      const nameMatch = talent.name.toLowerCase().includes(searchName.toLowerCase());
      const regionMatch = !searchRegion || talent.location.toLowerCase().includes(searchRegion.toLowerCase());
      const interestMatch = !searchInterest || (talent.tags && talent.tags.some((tag: string) => 
        tag.toLowerCase().includes(searchInterest.toLowerCase())
      ));
      return nameMatch && regionMatch && interestMatch;
    });
  }, [talentPool, searchName, searchRegion, searchInterest]);

  const filteredRecruiters = useMemo(() => {
    let list = [...TOP_RECRUITERS];
    if (leaderboardFilter === 'paid') list = list.filter(r => r.types.includes('Paid'));
    if (leaderboardFilter === 'unpaid') list = list.filter(r => r.types.includes('Unpaid'));
    return list.sort((a, b) => b.count - a.count);
  }, [leaderboardFilter]);

  const handleInvite = (talent: any) => {
    onNotify(`Official selection email sent to ${talent.name} (${talent.email})`);
    setSelectedTalent(null);
  };

  const renderLeaderboard = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center items-end">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Top Recruiters</h2>
          <p className="text-slate-500 dark:text-slate-400">Global ranking based on successful placements and feedback.</p>
        </div>
        <div className="flex gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          {['all', 'paid', 'unpaid'].map(f => (
            <button
              key={f}
              onClick={() => setLeaderboardFilter(f as any)}
              className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                leaderboardFilter === f ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>
      <div className="grid gap-6">
        {filteredRecruiters.map((rec) => (
          <div key={rec.name} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-lg flex justify-between items-center group">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-4xl shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                {rec.img}
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">{rec.name}</h4>
                <div className="text-xs font-bold text-slate-400 mt-1">{rec.rating} ⭐ • {rec.types.join(' & ')}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{rec.count}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Placements</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApplicantsModal = (job: Internship) => (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] border border-slate-200 dark:border-slate-800 p-10 shadow-2xl relative">
        <button onClick={() => setShowApplicants(null)} className="absolute top-8 right-8 text-2xl text-slate-400">✕</button>
        <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-10">Applicants for {job.title}</h3>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
          {talentPool.map(applicant => (
            <div key={applicant.id} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex justify-between items-center border border-slate-100 dark:border-slate-800">
               <div className="flex items-center gap-4">
                 <img src={applicant.img} className="w-12 h-12 rounded-xl object-cover" />
                 <div>
                   <p className="font-bold text-slate-900 dark:text-white">{applicant.name} <span className="text-emerald-600">({applicant.rating} ⭐)</span></p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{applicant.location}</p>
                 </div>
               </div>
               <div className="flex gap-2">
                 <button onClick={() => onRateTalent(applicant.id)} className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl text-lg flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">★</button>
                 <button onClick={() => setAssignmentModal(applicant)} className="px-8 py-4 bg-[#00a859] text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl transition-all !px-4 !py-2 !rounded-xl !text-[10px]">Assign Task</button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResumeModal = (talent: any) => (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl relative">
        <div className="h-40 bg-emerald-500 relative">
          <button onClick={() => setSelectedTalent(null)} className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/20 text-white text-xl">✕</button>
        </div>
        <div className="px-12 pb-12 -mt-16">
          <div className="flex items-end justify-between mb-8">
            <div className="flex items-end gap-6">
              <img src={talent.img} className="w-32 h-32 rounded-[2.5rem] border-8 border-white dark:border-slate-900 shadow-2xl" />
              <div className="mb-2">
                <h3 className="text-4xl font-bold text-slate-900 dark:text-white">{talent.name}</h3>
                <p className="text-emerald-600 font-bold">{talent.rating} ⭐ User Score</p>
              </div>
            </div>
            <button onClick={() => onRateTalent(talent.id)} className="px-6 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-lg transition-all !bg-emerald-50 !text-emerald-600 hover:!bg-emerald-500 hover:!text-white">Increase Rating +</button>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Bio</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 italic">"{talent.bio}"</p>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Education</h4>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl font-bold">{talent.education}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-10">
            <button onClick={() => setAssignmentModal(talent)} className="px-8 py-4 bg-[#00a859] text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl transition-all !bg-amber-500 !py-5 !text-lg">Assign Task</button>
            <button onClick={() => handleInvite(talent)} className="px-8 py-4 bg-[#00a859] text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl transition-all !py-5 !text-lg">Select & Hire</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {showPostModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl">
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">Create New Internship</h3>
            <div className="space-y-6">
               <input placeholder="Job Title" className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
               <input placeholder="Stipend" className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
               <button onClick={() => setShowPostModal(false)} className="px-8 py-4 bg-[#00a859] text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl transition-all w-full">Post Listing</button>
            </div>
          </div>
        </div>
      )}
      
      {showApplicants && renderApplicantsModal(showApplicants)}
      {selectedTalent && renderResumeModal(selectedTalent)}
      
      {assignmentModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative">
            <button onClick={() => setAssignmentModal(null)} className="absolute top-8 right-8 text-slate-400">✕</button>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Assign Task: {assignmentModal.name}</h3>
            <div className="space-y-6">
              <input placeholder="Task Title" className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-inner" />
              <textarea rows={3} placeholder="Requirements..." className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-inner" />
              <button onClick={() => { onNotify(`Task assigned to ${assignmentModal.name}`); setAssignmentModal(null); }} className="px-8 py-4 bg-[#00a859] text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl transition-all !bg-amber-500 w-full">Assign Task</button>
            </div>
          </div>
        </div>
      )}

      <aside className="w-24 md:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col py-8 px-4">
        <div className="mb-12 flex flex-col items-center cursor-pointer" onClick={onBackToHome}>
          <Logo className="md:flex hidden" />
          <div className="w-12 h-12 bg-[#00a859] rounded-2xl md:hidden flex items-center justify-center text-2xl shadow-lg text-white mb-2">💼</div>
          <button onClick={onBackToHome} className="mt-4 px-6 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all hidden md:block border border-emerald-100 dark:border-emerald-900">
            Back Home
          </button>
        </div>
        <nav className="flex-grow space-y-4">
          {[
            { id: 'home', label: 'Overview', icon: '🏠' },
            { id: 'postings', label: 'My Postings', icon: '📄' },
            { id: 'discovery', label: 'Talent Discovery', icon: '🔍' },
            { id: 'assignments', label: 'Assigned Tasks', icon: '📝' },
            { id: 'leaderboard', label: 'Ranking', icon: '🏆' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center justify-center md:justify-start gap-4 p-5 rounded-[1.5rem] font-black transition-all ${
                activeTab === tab.id 
                  ? "bg-[#00a859] text-white shadow-xl" 
                  : "text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </nav>
        <button onClick={onLogout} className="w-full flex items-center justify-center md:justify-start gap-4 p-5 rounded-[1.5rem] font-black text-red-500 hover:bg-red-50 transition-all mt-auto">
          <span className="text-2xl">🚪</span>
          <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest">Log Out</span>
        </button>
      </aside>

      <main className="flex-grow p-10 overflow-y-auto">
          {activeTab === 'home' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <header className="flex justify-between items-center">
                  <div>
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Recruiter Dashboard</h2>
                    <p className="text-slate-500 dark:text-slate-400">Manage your postings and review incoming applications.</p>
                  </div>
                  <div className="flex gap-4">
                    <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-lg transition-all !bg-white !text-slate-900 hover:!bg-[#00a859] hover:!text-white border border-slate-100 shadow-sm flex items-center justify-center">Help Center</a>
                    <button onClick={() => setShowPostModal(true)} className="px-8 py-4 bg-[#00a859] text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl transition-all !py-4">Create New Internship</button>
                  </div>
               </header>

               {/* Quick Stats */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 {[
                   { label: 'Total Apps', value: '248', icon: '📥' },
                   { label: 'Interviews', value: '14', icon: '🗣️' },
                   { label: 'Hired', value: '08', icon: '✅' },
                   { label: 'Talent Pool', value: '1.2k', icon: '⭐' },
                 ].map(s => (
                   <div key={s.label} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-lg !p-8">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</div>
                      <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">{s.value}</div>
                   </div>
                 ))}
               </div>

               {/* Visualization Section */}
               <section className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-lg !p-10">
                  <div className="mb-10">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Application Trends</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Daily volume across all postings</p>
                  </div>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MOCK_CHART_DATA}>
                        <defs>
                          <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00a859" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#00a859" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#f1f5f9'} />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} 
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} 
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                            borderRadius: '1rem',
                            border: 'none',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            padding: '1rem'
                          }}
                          itemStyle={{
                            fontSize: '12px',
                            fontWeight: '900',
                            textTransform: 'uppercase',
                            color: '#00a859'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="apps" 
                          stroke="#00a859" 
                          strokeWidth={4}
                          fillOpacity={1} 
                          fill="url(#colorApps)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </section>
            </div>
          )}

          {activeTab === 'leaderboard' && renderLeaderboard()}

          {activeTab === 'discovery' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <header className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Talent Discovery</h2>
                  <p className="text-slate-500 dark:text-slate-400">Search for verified candidates across the Certiyup network.</p>
                </div>
                
                {/* Search & Filters */}
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-lg !p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Candidate Name</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">🔍</span>
                        <input 
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}
                          placeholder="e.g. Amina Okonkwo" 
                          className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all !pl-12" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Region</label>
                      <input 
                        value={searchRegion}
                        onChange={(e) => setSearchRegion(e.target.value)}
                        placeholder="e.g. Lagos, Nigeria" 
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Specialization</label>
                      <input 
                        value={searchInterest}
                        onChange={(e) => setSearchInterest(e.target.value)}
                        placeholder="e.g. React, Marketing" 
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                      />
                    </div>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTalent.length > 0 ? filteredTalent.map(talent => (
                  <div key={talent.id} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-lg !p-10 group hover:border-[#00a859] flex flex-col items-center text-center">
                    <img src={talent.img} className="w-24 h-24 rounded-[2.5rem] object-cover mb-6 shadow-xl" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{talent.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-emerald-600 mb-6">{talent.location}</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                       {talent.tags.map((tag: string) => (
                         <span key={tag} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400">{tag}</span>
                       ))}
                    </div>
                    <button onClick={() => setSelectedTalent(talent)} className="px-6 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-lg transition-all w-full">View Profile</button>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center">
                    <div className="text-6xl mb-6">🏜️</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white !text-slate-400 uppercase tracking-widest">No candidates found</h3>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'postings' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Active Postings</h2>
               <div className="space-y-6">
                 {MOCK_INTERNSHIPS.map(j => (
                   <div key={j.id} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between group hover:border-[#00a859] gap-6">
                      <div className="flex gap-6 items-center">
                         <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-black text-2xl text-[#00a859]">{j.company[0]}</div>
                         <div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white">{j.title}</h4>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                               <span className="text-emerald-500 font-black">Active</span>
                               <span>• {Math.floor(Math.random() * 20) + 5} Apps</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setShowApplicants(j)} className="px-6 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-lg transition-all">Review Applications</button>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-10 animate-in fade-in duration-500">
               <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Task Management</h2>
               <div className="grid md:grid-cols-2 gap-8">
                 {[
                   { intern: 'Amina Okonkwo', title: 'Home Page Design Fix', status: 'Submitted', date: '2023-11-10' },
                   { intern: 'David Mensah', title: 'SQL Query Optimization', status: 'Pending', date: '2023-11-12' },
                 ].map((ass, i) => (
                   <div key={i} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-lg flex justify-between items-center group hover:border-[#00a859]">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">{ass.title}</h4>
                        <p className="text-sm font-bold text-slate-500 mb-1">{ass.intern}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ass.date}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest ${ass.status === 'Submitted' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {ass.status}
                      </span>
                   </div>
                 ))}
               </div>
            </div>
          )}
      </main>
    </div>
  );
};