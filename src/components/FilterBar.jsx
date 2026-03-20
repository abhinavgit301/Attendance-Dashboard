import React from 'react';

const FilterBar = ({
  filterType,
  setFilterType,
  showLowAttendance,
  setShowLowAttendance,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/50 rounded-3xl p-3 mb-8 flex flex-col lg:flex-row justify-between items-center gap-4 transition-all relative z-20">
      {/* Segmented Control for Filters */}
      <div className="flex w-full lg:w-auto p-1.5 bg-slate-950/80 rounded-2xl relative shadow-inner shadow-black/20">
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

      <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
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
          Sort
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
