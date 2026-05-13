import { SlideLayout } from '@/app/components/SlideLayout';
import { CheckCircle } from 'lucide-react';

interface Phase {
  phase: string;
  duration: string;
  activities: string[];
}

interface TimelineSlideProps {
  title: string;
  subtitle?: string;
  challengePoints?: string[];
  approachPoints?: string[];
  phases: Phase[];
}

export function TimelineSlide({ title, subtitle, challengePoints, approachPoints, phases }: TimelineSlideProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex items-center px-3 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16 py-3 sm:py-4 md:py-6 lg:py-8 xl:py-12 2xl:py-20 overflow-y-auto">
        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-3 md:mb-4 lg:mb-5 text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-3 sm:mb-4 md:mb-5 lg:mb-7 xl:mb-9">{subtitle}</p>
          )}

          {/* Challenge & Approach Section with Glass Cards */}
          {(challengePoints || approachPoints) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-4 sm:mb-5 md:mb-6 lg:mb-8 auto-rows-fr">
              {challengePoints && (
                <div className="relative group flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-orange-500/20 rounded-lg md:rounded-xl lg:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex-1 flex flex-col backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg md:rounded-xl lg:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-2 md:gap-2.5 mb-2 md:mb-3">
                      <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h3 className="text-xs text-slate-300 uppercase tracking-[0.15em] font-semibold">
                        The Challenge
                      </h3>
                    </div>
                    <ul className="space-y-2 md:space-y-2.5 flex-1">
                      {challengePoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 md:gap-2.5 text-sm md:text-base text-slate-300 leading-[1.4]">
                          <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-400 mt-2 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {approachPoints && (
                <div className="relative group flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-lg md:rounded-xl lg:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex-1 flex flex-col backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg md:rounded-xl lg:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-2 md:gap-2.5 mb-2 md:mb-3">
                      <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-xs text-slate-300 uppercase tracking-[0.15em] font-semibold">
                        Our Approach
                      </h3>
                    </div>
                    <ul className="space-y-2 md:space-y-2.5 flex-1">
                      {approachPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 md:gap-2.5 text-sm md:text-base text-slate-300 leading-[1.4]">
                          <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-400 mt-2 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Timeline Section with Glass Cards */}
          <div>
            <h3 className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-[0.15em] font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-5">
              Project Timeline
            </h3>
            
            {/* Mobile: Simple Phase List (hidden on md+) */}
            <div className="md:hidden space-y-2">
              {phases?.map((item, index) => {
                const colors = [
                  { from: 'from-blue-500', to: 'to-cyan-500' },
                  { from: 'from-purple-500', to: 'to-pink-500' },
                  { from: 'from-violet-500', to: 'to-indigo-500' },
                  { from: 'from-pink-500', to: 'to-rose-500' },
                ];
                const color = colors[index % colors.length];
                
                return (
                  <div key={index} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-2.5 sm:p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className={`inline-block px-2 py-0.5 rounded bg-gradient-to-r ${color.from} ${color.to}`}>
                        <span className="text-[9px] text-white font-bold uppercase tracking-wide">
                          Phase {index + 1}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        {item.duration}
                      </div>
                    </div>
                    <div className="text-xs text-white font-semibold mb-1">
                      {item.phase}
                    </div>
                    {item.activities && item.activities.length > 0 && (
                      <ul className="space-y-0.5 mt-1.5">
                        {item.activities.slice(0, 2).map((activity, actIdx) => (
                          <li key={actIdx} className="text-[10px] text-slate-300 leading-[1.4] flex items-start gap-1">
                            <div className="w-1 h-1 rounded-full border border-slate-400 mt-[3px] flex-shrink-0" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Desktop: Gantt Chart Style Visualization (hidden on mobile) */}
            <div className="relative hidden md:block">
              {/* Timeline Header */}
              <div className="flex items-center mb-2 md:mb-3 lg:mb-4">
                <div className="w-56 flex-shrink-0" />
                <div className="flex-1 grid grid-cols-12 gap-px">
                  {['Week 1-2', 'Week 3-4', 'Week 5-6', 'Week 7-8', 'Week 9-10', 'Week 11-12', 'Week 13-14', 'Week 15-16', 'Week 17-18', 'Week 19-20', 'Week 21-22', 'Week 23-24'].map((week, i) => (
                    <div key={i} className="text-center">
                      <span className="text-[9px] text-slate-400 font-medium">{week}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gantt Chart Rows */}
              <div className="space-y-2 md:space-y-2.5 lg:space-y-3">
                {phases?.map((item, index) => {
                  const colors = [
                    { from: 'from-blue-500', to: 'to-cyan-500', glow: 'from-blue-500/30 to-cyan-500/30', bg: 'bg-blue-500/20', border: 'border-blue-500/40' },
                    { from: 'from-purple-500', to: 'to-pink-500', glow: 'from-purple-500/30 to-pink-500/30', bg: 'bg-purple-500/20', border: 'border-purple-500/40' },
                    { from: 'from-violet-500', to: 'to-indigo-500', glow: 'from-violet-500/30 to-indigo-500/30', bg: 'bg-violet-500/20', border: 'border-violet-500/40' },
                    { from: 'from-pink-500', to: 'to-rose-500', glow: 'from-pink-500/30 to-rose-500/30', bg: 'bg-pink-500/20', border: 'border-pink-500/40' },
                  ];
                  const color = colors[index % colors.length];
                  
                  // Define start and span for each phase (in grid columns out of 12)
                  const ganttConfig = [
                    { start: 1, span: 4 },  // Phase 1: Week 1-8
                    { start: 3, span: 5 },  // Phase 2: Week 5-14
                    { start: 6, span: 4 },  // Phase 3: Week 11-18
                    { start: 8, span: 5 },  // Phase 4: Week 15-24
                  ];
                  const config = ganttConfig[index % ganttConfig.length];
                  
                  return (
                    <div key={index} className="flex items-center group">
                      {/* Phase Label Card */}
                      <div className="w-56 flex-shrink-0 pr-3">
                        <div className="relative">
                          <div className={`absolute inset-0 bg-gradient-to-r ${color.glow} rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-2 hover:bg-white/8 hover:border-white/20 transition-all duration-300">
                            <div className={`inline-block px-2 py-0.5 rounded bg-gradient-to-r ${color.from} ${color.to} mb-1.5`}>
                              <span className="text-[9px] text-white font-bold uppercase tracking-wide leading-none flex items-center">
                                Phase {index + 1}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-xs text-white font-semibold leading-tight">
                                {item.phase}
                              </div>
                              <div className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                                {item.duration}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Gantt Timeline Grid */}
                      <div className="flex-1 relative h-12">
                        {/* Grid background */}
                        <div className="absolute inset-0 grid grid-cols-12 gap-px">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="border-l border-slate-700/20" />
                          ))}
                        </div>

                        {/* Gantt Bar */}
                        <div 
                          className="absolute top-0 bottom-0 grid grid-cols-12"
                          style={{ left: 0, right: 0 }}
                        >
                          <div 
                            className="relative"
                            style={{ 
                              gridColumn: `${config.start} / span ${config.span}`,
                            }}
                          >
                            <div className={`absolute inset-0 bg-gradient-to-r ${color.glow} rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                            <div className={`relative h-full backdrop-blur-md bg-gradient-to-r ${color.from} ${color.to} opacity-30 border ${color.border} rounded-lg group-hover:opacity-50 transition-all duration-300 overflow-hidden`}>
                              {/* Shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </div>
                            
                            {/* Activities Tooltip on Hover - centered above the bar */}
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-20">
                              <div className="relative">
                                <div className={`absolute inset-0 bg-gradient-to-br ${color.glow} rounded-lg blur-xl opacity-100`} />
                                <div className="relative backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-lg p-3 shadow-2xl">
                                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">Key Activities</div>
                                  <ul className="space-y-1.5">
                                    {item.activities?.map((activity, actIdx) => (
                                      <li key={actIdx} className="text-[10px] text-slate-200 leading-[1.4] flex items-start gap-1.5">
                                        <div className="w-1 h-1 rounded-full border border-slate-400 mt-[3px] flex-shrink-0" />
                                        <span>{activity}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                {/* Downward-pointing caret */}
                                <div className="absolute left-1/2 -translate-x-1/2 top-full">
                                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/20" />
                                  <div className="absolute left-1/2 -translate-x-1/2 -top-[1px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-slate-900/95" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}