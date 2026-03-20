import React from 'react';

const StudentTable = ({ students, selectedStudent, setSelectedStudent }) => {
  if (students.length === 0) {
    return (
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/50 rounded-3xl p-16 flex flex-col items-center justify-center text-center transition-all duration-500">
        <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <span className="text-4xl opacity-50">📭</span>
        </div>
        <h3 className="text-2xl font-extrabold text-white mb-2">No students found</h3>
        <p className="text-slate-400 font-medium max-w-md text-lg">
          We couldn't find any students matching your current filters. Adjust your view to see more.
        </p>
      </div>
    );
  }

  const getAvatarStyle = (name) => {
    const styles = [
      'bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]',
      'bg-gradient-to-br from-fuchsia-400 to-violet-600 text-white shadow-[0_0_15px_rgba(232,121,249,0.3)]',
      'bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-[0_0_15px_rgba(52,211,153,0.3)]',
      'bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-[0_0_15px_rgba(251,191,36,0.3)]',
      'bg-gradient-to-br from-rose-400 to-red-600 text-white shadow-[0_0_15px_rgba(251,113,133,0.3)]'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return styles[Math.abs(hash) % styles.length];
  };

  const handleRowClick = (student) => {
    if (selectedStudent?.id === student.id) {
      setSelectedStudent(null);
    } else {
      setSelectedStudent(student);
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/50 rounded-3xl overflow-hidden transition-all duration-500 relative z-10">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-950/40 border-b border-white/5">
              <th className="px-8 py-6 font-extrabold text-slate-500 text-xs uppercase tracking-widest w-1/2">Student Name</th>
              <th className="px-8 py-6 font-extrabold text-slate-500 text-xs uppercase tracking-widest">Attendance</th>
              <th className="px-8 py-6 font-extrabold text-slate-500 text-xs uppercase tracking-widest text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {students.map((student) => {
              const isSelected = selectedStudent?.id === student.id;
              const avatarStyle = getAvatarStyle(student.name);
              const isLowAttendance = student.attendance < 75;

              return (
                <React.Fragment key={student.id}>
                  {/* Primary Row */}
                  <tr
                    onClick={() => handleRowClick(student)}
                    className={`cursor-pointer transition-all duration-300 group relative ${
                      isSelected 
                        ? 'bg-violet-900/10 hover:bg-violet-900/20' 
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="px-8 py-5 relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-cyan-500 transform origin-left transition-transform duration-300 shadow-[0_0_10px_rgba(139,92,246,0.8)]" 
                          style={{ scale: isSelected ? '1 1' : '0 1' }} />
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 ${
                          isSelected ? 'ring-2 ring-violet-400/50 ring-offset-2 ring-offset-slate-900 bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]' : avatarStyle
                        }`}>
                          {student.name.charAt(0)}
                        </div>
                        
                        <div className="flex flex-col">
                          <span className={`text-base font-bold transition-colors ${
                            isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                          }`}>
                            {student.name}
                          </span>
                          <span className="text-xs text-slate-500 font-medium mt-0.5 group-hover:text-slate-400 transition-colors">
                            {student.username.toLowerCase()}@school.edu
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex items-center gap-5 max-w-[200px]">
                        <span className={`text-base font-black w-14 text-right ${
                          isLowAttendance ? 'text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]' : 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]'
                        }`}>
                          {student.attendance}%
                        </span>
                        <div className="flex-1 h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5 relative shadow-inner">
                          <div 
                            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${
                              isLowAttendance 
                                ? 'bg-gradient-to-r from-rose-500 to-orange-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]' 
                                : 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                            }`}
                            style={{ width: `${student.attendance}%` }}
                          >
                             <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/30 w-full animate-pulse blur-[1px]"></div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5 text-right">
                      <span
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                          student.status === 'Present'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:bg-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.15)] group-hover:bg-rose-500/20'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${
                          student.status === 'Present' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]'
                        } ${student.status === 'Present' && 'animate-pulse'}`} />
                        {student.status}
                      </span>
                    </td>
                  </tr>

                  {/* Secondary Expansion Row */}
                  <tr>
                    <td colSpan="3" className="p-0 border-0">
                      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                         isSelected ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="px-8 py-5 mx-6 mb-6 mt-2 bg-slate-950/50 rounded-2xl border border-white/5 shadow-inner backdrop-blur-sm relative">
                          {/* Inner soft glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 pointer-events-none rounded-2xl"></div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                            {/* Contact Info */}
                            <div className="flex flex-col gap-2">
                              <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_5px_rgba(167,139,250,0.8)]"></span> Contact
                              </h4>
                              <div className="text-sm font-medium text-slate-300">
                                <p className="flex items-center gap-2 mt-1 truncate">
                                  <span className="text-slate-500 text-base">📧</span> {student.email}
                                </p>
                                <p className="flex items-center gap-2 mt-2">
                                  <span className="text-slate-500 text-base">📞</span> {student.phone.split(' ')[0]}
                                </p>
                              </div>
                            </div>

                            {/* Organization/Portal */}
                            <div className="flex flex-col gap-2">
                              <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]"></span> Portal
                              </h4>
                              <div className="text-sm font-medium text-slate-300 mt-1">
                                <a href={`https://${student.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                                  <span className="text-slate-500 text-base">🌐</span> {student.website}
                                </a>
                                <p className="flex items-center gap-2 mt-2 truncate">
                                  <span className="text-slate-500 text-base">🏢</span> {student.company?.name || 'N/A'}
                                </p>
                              </div>
                            </div>

                            {/* Location */}
                            <div className="flex flex-col gap-2">
                              <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_5px_rgba(251,191,36,0.8)]"></span> Location
                              </h4>
                              <div className="text-sm font-medium text-slate-300 mt-1">
                                <p className="flex items-start gap-2 leading-relaxed">
                                  <span className="text-slate-500 text-base mt-0.5">📍</span> 
                                  <span>
                                    {student.address?.suite} {student.address?.street}<br/>
                                    <span className="text-slate-400">{student.address?.city}, {student.address?.zipcode}</span>
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
