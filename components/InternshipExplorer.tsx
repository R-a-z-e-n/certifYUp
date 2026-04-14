import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_INTERNSHIPS, CATEGORIES } from '../constants';
import { Internship, Application } from '../types';

interface InternshipExplorerProps {
  onApply: (internship: Internship) => void;
  currentApps: Application[];
}

export const InternshipExplorer: React.FC<InternshipExplorerProps> = ({ onApply, currentApps }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [experienceLevel, setExperienceLevel] = useState('All');
  const [interviewType, setInterviewType] = useState('All');
  const [minStipend, setMinStipend] = useState<string>('');
  const [maxStipend, setMaxStipend] = useState<string>('');
  const [dateFilter, setDateFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'stipend-high' | 'stipend-low'>('newest');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  
  const [liveInternships, setLiveInternships] = useState<Internship[]>(MOCK_INTERNSHIPS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch('/api/internships');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setLiveInternships(data);
          }
        }
      } catch (e) {
        console.warn("Live fetch failed, using mock data", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInternships();
  }, []);

  // Using a fixed "today" for mock data consistency
  const MOCK_TODAY = new Date('2026-04-14');

  const filteredAndSorted = useMemo(() => {
    let result = liveInternships.filter(i => {
      const matchesSearch = i.title.toLowerCase().includes(search.toLowerCase()) || 
                            i.company.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || i.category === category;
      const matchesExp = experienceLevel === 'All' || i.experienceLevel === experienceLevel;
      const matchesInterview = interviewType === 'All' || i.interviewType === interviewType;
      const matchesVerified = !showVerifiedOnly || i.verified;
      
      const val = i.stipendValue || 0;
      const minVal = minStipend === '' ? -Infinity : Number(minStipend);
      const maxVal = maxStipend === '' ? Infinity : Number(maxStipend);
      const matchesStipend = val >= minVal && val <= maxVal;

      let matchesDate = true;
      const postedDate = new Date(i.postedDate);
      const diffTime = Math.abs(MOCK_TODAY.getTime() - postedDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (dateFilter === '24h') matchesDate = diffDays <= 1;
      else if (dateFilter === '7d') matchesDate = diffDays <= 7;
      else if (dateFilter === '30d') matchesDate = diffDays <= 30;

      return matchesSearch && matchesCategory && matchesExp && matchesInterview && matchesStipend && matchesDate && matchesVerified;
    });

    return result.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      if (sortBy === 'stipend-high') return (b.stipendValue || 0) - (a.stipendValue || 0);
      if (sortBy === 'stipend-low') return (a.stipendValue || 0) - (b.stipendValue || 0);
      return 0;
    });
  }, [search, category, experienceLevel, interviewType, minStipend, maxStipend, dateFilter, sortBy, showVerifiedOnly]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (category !== 'All') count++;
    if (experienceLevel !== 'All') count++;
    if (interviewType !== 'All') count++;
    if (minStipend !== '' || maxStipend !== '') count++;
    if (dateFilter !== 'All') count++;
    if (showVerifiedOnly) count++;
    return count;
  }, [category, experienceLevel, interviewType, minStipend, maxStipend, dateFilter, showVerifiedOnly]);

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setExperienceLevel('All');
    setInterviewType('All');
    setMinStipend('');
    setMaxStipend('');
    setDateFilter('All');
    setSortBy('newest');
    setShowVerifiedOnly(false);
  };

  return (
    <div className="py-12 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Verified Internships</h1>
              <p className="text-slate-500 dark:text-slate-400">Connect with real companies and build your professional history.</p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all !py-3 !text-[10px] !font-black !uppercase !tracking-widest appearance-none pr-12 cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="stipend-high">Pay: High</option>
                  <option value="stipend-low">Pay: Low</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
              </div>
              {activeFiltersCount > 0 && (
                <button 
                  onClick={clearFilters}
                  className="w-12 h-12 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-2xl hover:bg-red-100 transition-all text-xl flex items-center justify-center"
                  title="Clear all filters"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl p-8 space-y-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative flex-grow">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search role or company..."
                  className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all !pl-16 !py-5"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                className={`px-10 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-4 relative shadow-lg ${
                  isFiltersExpanded 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                    : 'px-8 py-4 bg-[#00a859] text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl transition-all'
                }`}
              >
                <span>{isFiltersExpanded ? 'Close Panel' : 'Filters'}</span>
                <span className="text-lg">{isFiltersExpanded ? '▴' : '▾'}</span>
                {activeFiltersCount > 0 && !isFiltersExpanded && (
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-4 border-white dark:border-slate-900 animate-bounce">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isFiltersExpanded ? 'max-h-[1200px] opacity-100 pt-8 border-t border-slate-100 dark:border-slate-800' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 pb-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Field</label>
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none pr-10 cursor-pointer"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="All">All Categories</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Experience</label>
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none pr-10 cursor-pointer"
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                    >
                      <option value="All">Any Experience</option>
                      <option value="Entry Level">Entry Level</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Interview</label>
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none pr-10 cursor-pointer"
                      value={interviewType}
                      onChange={(e) => setInterviewType(e.target.value)}
                    >
                      <option value="All">Any Format</option>
                      <option value="Online">Online</option>
                      <option value="In-person">In-person</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Date Posted</label>
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none pr-10 cursor-pointer"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    >
                      <option value="All">Any Time</option>
                      <option value="24h">Past 24 Hours</option>
                      <option value="7d">Past 7 Days</option>
                      <option value="30d">Past 30 Days</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                  </div>
                </div>

                <div className="space-y-3 sm:col-span-2 lg:col-span-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Stipend Range ($)</label>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-inner">
                    <input 
                      type="number"
                      placeholder="Min"
                      className="w-full bg-transparent border-none text-slate-900 dark:text-white text-sm font-bold outline-none"
                      value={minStipend}
                      onChange={(e) => setMinStipend(e.target.value)}
                    />
                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>
                    <input 
                      type="number"
                      placeholder="Max"
                      className="w-full bg-transparent border-none text-slate-900 dark:text-white text-sm font-bold outline-none"
                      value={maxStipend}
                      onChange={(e) => setMaxStipend(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 lg:items-center pt-8 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quick Pay:</span>
                  {[
                    { label: 'Unpaid', min: '0', max: '0' },
                    { label: 'Paid', min: '1', max: '' },
                    { label: '$1k+', min: '1000', max: '' },
                  ].map((range) => (
                    <button
                      key={range.label}
                      onClick={() => { setMinStipend(range.min); setMaxStipend(range.max); }}
                      className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                        minStipend === range.min && maxStipend === range.max
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-6 lg:ml-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Only</span>
                  <button
                    onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
                    className={`w-16 h-9 rounded-full transition-all relative p-1.5 ${
                      showVerifiedOnly ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full bg-white shadow-xl transition-all transform ${
                      showVerifiedOnly ? 'translate-x-7' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
          {filteredAndSorted.map(internship => {
            const postedDate = new Date(internship.postedDate);
            const isNew = Math.ceil(Math.abs(MOCK_TODAY.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24)) <= 1;
            const isApplied = currentApps.some(a => a.internshipId === internship.id);

            return (
              <div key={internship.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl p-8 hover:border-emerald-500 hover:shadow-2xl flex flex-col group relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl font-black text-slate-300 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    {internship.company.charAt(0)}
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex flex-wrap justify-end gap-2">
                      {isNew && (
                        <span className="px-3 py-1 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-sky-100 dark:border-sky-900">
                          New
                        </span>
                      )}
                      {internship.verified && (
                        <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 border border-emerald-100 dark:border-emerald-900">
                          🛡️ Verified
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                        {internship.experienceLevel || 'Entry Level'}
                      </span>
                      {internship.interviewType && (
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-slate-500 !tracking-normal">
                          {internship.interviewType === 'Online' ? '🌐 Online Interview' : '📍 In-person Interview'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex-grow">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors line-clamp-1">{internship.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold mb-8 text-sm flex items-center gap-3">
                    <span className="text-emerald-600">{internship.company}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800"></span>
                    <span>{internship.location}</span>
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl !p-4 !bg-slate-50 dark:!bg-slate-800/50 border-none shadow-none">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest !text-slate-400 mb-1">Duration</p>
                      <p className="font-black text-slate-900 dark:text-white text-sm">⏱️ {internship.duration}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl !p-4 !bg-slate-50 dark:!bg-slate-800/50 border-none shadow-none">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest !text-slate-400 mb-1">Stipend</p>
                      <p className={`font-black text-sm ${internship.stipendValue && internship.stipendValue > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                        💰 {internship.stipend}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 mb-10 line-clamp-2 leading-relaxed">
                    {internship.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-8 border-t border-slate-50 dark:border-slate-800 relative z-10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest !text-slate-400">
                    {new Date(internship.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <button 
                    onClick={() => onApply(internship)}
                    className={`px-8 py-4 bg-[#00a859] text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl transition-all !px-8 !py-3 !rounded-xl ${
                      isApplied 
                        ? "!bg-slate-100 !text-slate-400 !shadow-none cursor-default" 
                        : "group-hover:!bg-emerald-600"
                    }`}
                  >
                    {isApplied ? "Applied" : "Apply Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAndSorted.length === 0 && (
          <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl !bg-transparent border-4 border-dashed border-slate-100 dark:border-slate-800 animate-in fade-in duration-500">
            <div className="text-8xl mb-10">🏜️</div>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">No internships found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-md mx-auto">Try broadening your search or resetting the filters to see more opportunities in the ecosystem.</p>
            <button 
              onClick={clearFilters}
              className="px-8 py-4 bg-[#00a859] text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl transition-all !py-5 !px-12 !text-lg"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};