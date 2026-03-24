import React from 'react';

const FilterBar = ({
  filterType,
  setFilterType,
  showLowAttendance,
  setShowLowAttendance,
  sortOrder,
  setSortOrder,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/50 rounded-3xl p-4 mb-8 flex flex-col xl:flex-row justify-between items-center gap-4 transition-all relative z-20">
      {/* Segmented Control for Filters */}
      <div className="flex flex-col sm:flex-row w-full xl:w-auto gap-4 items-center">
        <div className="flex w-full sm:w-auto p-1.5 bg-slate-950/80 rounded-2xl relative shadow-inner shadow-black/20">
        {['All', 'Present', 'Absent'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 z-10 ${filterType === type
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
          >
            {type}
          </button>
        ))}
        </div>
        
        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-white/10 text-white text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all placeholder-slate-500 shadow-inner"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full xl:w-auto gap-3">
        {/* Toggle Show <75% Attendance */}
        <button
          onClick={() => setShowLowAttendance(!showLowAttendance)}
          className={`flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border w-full sm:w-auto overflow-hidden relative group ${showLowAttendance
              ? 'border-rose-500/50 bg-rose-500/10 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
              : 'border-white/5 bg-slate-950/50 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-white/10 shadow-lg'
            }`}
        >
          {showLowAttendance && <div className="absolute inset-0 bg-rose-500/10 group-hover:bg-rose-500/20 transition-colors"></div>}
          <div className={`w-2.5 h-2.5 rounded-full relative z-10 shadow-sm ${showLowAttendance ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,1)] animate-pulse' : 'bg-slate-600'}`}></div>
          <span className="relative z-10">{showLowAttendance ? 'Showing <75%' : 'Show <75%'}</span>
        </button>

        {/* Sort Button */}
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-950/50 text-slate-300 border border-white/5 text-sm font-bold rounded-2xl hover:bg-slate-800 hover:text-white hover:border-white/10 transition-all duration-300 w-full sm:w-auto shadow-lg group"
        >
          {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
          <div className="bg-slate-800 border border-slate-700 rounded-full p-1 group-hover:bg-slate-600 transition-colors shadow-inner">
            <svg
              className={`w-3.5 h-3.5 transform transition-transform duration-500 text-slate-300 group-hover:text-white ${sortOrder === 'asc' ? 'rotate-180' : 'rotate-0'}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
