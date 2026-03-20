import React, { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import StudentTable from './components/StudentTable';

function App() {
  const [students, setStudents] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showLowAttendance, setShowLowAttendance] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((data) => {
          const processedData = data.map((user) => ({
            ...user,
            attendance: Math.floor(Math.random() * 101),
            status: Math.random() > 0.3 ? 'Present' : 'Absent',
          }));
          setStudents(processedData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, 800);
  }, []);

  const displayedStudents = students.filter((student) => {
    if (filterType !== 'All' && student.status !== filterType) {
      return false;
    }
    if (showLowAttendance && student.attendance >= 75) {
      return false;
    }
    return true;
  });

  displayedStudents.sort((a, b) => {
    if (sortOrder === 'asc') return a.attendance - b.attendance;
    return b.attendance - a.attendance;
  });

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020617] text-slate-300 selection:bg-violet-500/30 font-sans">
      {/* Dynamic colorful glowing background orbs */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/20 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full bg-fuchsia-600/15 blur-[100px] pointer-events-none mix-blend-screen" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/50 shadow-[0_0_15px_rgba(139,92,246,0.15)] backdrop-blur-md text-violet-400 text-xs font-bold tracking-widest uppercase mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              Dashboard Live
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
              Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">Attendance</span>
            </h1>
            <p className="text-slate-400 mt-4 text-lg font-light max-w-xl">
              Monitor, track, and manage student attendance records with real-time insights.
            </p>
          </div>
          
          {!loading && (
            <div className="flex gap-4">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 shadow-xl shadow-black/50 rounded-2xl p-5 min-w-[130px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 relative z-10">Total Limit</p>
                <p className="text-4xl font-black text-white relative z-10">{students.length}</p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 shadow-xl shadow-black/50 rounded-2xl p-5 min-w-[130px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 relative z-10">Avg Rate</p>
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 relative z-10 drop-shadow-sm">
                  {students.length ? Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length) : 0}%
                </p>
              </div>
            </div>
          )}
        </header>

        <FilterBar
          filterType={filterType}
          setFilterType={setFilterType}
          showLowAttendance={showLowAttendance}
          setShowLowAttendance={setShowLowAttendance}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {loading ? (
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/50 rounded-3xl p-8">
            <div className="animate-pulse flex flex-col gap-6">
              <div className="h-14 bg-slate-800/50 rounded-2xl w-full"></div>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex gap-6 items-center">
                   <div className="h-12 w-12 bg-slate-800/50 rounded-2xl"></div>
                   <div className="flex flex-col gap-3 w-1/3">
                      <div className="h-5 bg-slate-800/50 rounded-md w-3/4"></div>
                      <div className="h-3 bg-slate-800/50 rounded-md w-1/2"></div>
                   </div>
                   <div className="h-4 bg-slate-800/50 rounded-md w-1/5 ml-auto"></div>
                   <div className="h-8 bg-slate-800/50 rounded-xl w-24"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <StudentTable
            students={displayedStudents}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
          />
        )}
      </div>
    </div>
  );
}

export default App;
