import { SlideLayout } from '@/app/components/SlideLayout';

interface TouchPoint {
  label: string;
  quote?: string;
  position: number; // 0-100
}

interface JourneyPhase {
  name: string;
  color: string;
  description: string;
  steps: string[];
  recommendations: string[];
}

interface JourneyMapSlideProps {
  title: string;
  persona: string;
  subtitle?: string;
  scenario: string;
  goal: string;
  touchPoints: TouchPoint[];
  emotionalPath: number[]; // Y values for emotional experience
  effortPath: number[]; // Y values for effort
  phases: JourneyPhase[];
  approaches?: { label: string; start: number; end: number }[];
}

export function JourneyMapSlide({ 
  title, 
  persona, 
  subtitle, 
  scenario,
  goal,
  touchPoints, 
  emotionalPath,
  effortPath,
  phases,
  approaches = []
}: JourneyMapSlideProps) {
  
  // Generate smooth curve using Catmull-Rom spline
  const generateSmoothPoints = (values: number[]) => {
    const points: Array<{x: number, y: number}> = [];
    const width = 100;
    const step = width / (values.length - 1);
    
    values.forEach((value, i) => {
      points.push({ x: i * step, y: value });
    });
    
    return points;
  };

  // Generate SVG path for smooth area chart using quadratic bezier curves
  const generateAreaPath = (values: number[], baseline: number = 100) => {
    const points = generateSmoothPoints(values);
    const width = 100;
    
    if (points.length === 0) return '';
    
    let path = `M 0 ${baseline} `;
    path += `L ${points[0].x} ${baseline - points[0].y} `;
    
    // Use quadratic bezier curves for smooth transitions
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;
      
      path += `Q ${current.x} ${baseline - current.y}, ${midX} ${baseline - midY} `;
    }
    
    const last = points[points.length - 1];
    path += `L ${last.x} ${baseline - last.y} `;
    path += `L ${width} ${baseline} Z`;
    
    return path;
  };

  const generateLinePath = (values: number[]) => {
    const points = generateSmoothPoints(values);
    
    if (points.length === 0) return '';
    
    let path = `M ${points[0].x} ${100 - points[0].y} `;
    
    // Use quadratic bezier curves for smooth line
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;
      
      path += `Q ${current.x} ${100 - current.y}, ${midX} ${100 - midY} `;
    }
    
    const last = points[points.length - 1];
    path += `L ${last.x} ${100 - last.y}`;
    
    return path;
  };
  
  // Generate steadily rising collaboration path
  const generateCollaborationPath = (length: number, endValue: number) => {
    const values: number[] = [];
    for (let i = 0; i < length; i++) {
      const progress = i / (length - 1);
      // Gradual rise from near 0 to endValue
      const value = 5 + (endValue - 5) * progress;
      values.push(value);
    }
    return values;
  };
  
  const collaborationPath = generateCollaborationPath(emotionalPath.length, 70);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative h-full flex flex-col justify-start px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10 overflow-y-auto">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-3xl mb-1 text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-400">{subtitle}</p>
          )}
        </div>

        {/* Persona, Scenario, Goal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-5">
          {/* Persona */}
          <div className="flex items-start gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
              QA
            </div>
            <div>
              <div className="text-[8px] uppercase tracking-widest text-slate-500 mb-0.5">Persona</div>
              <div className="text-xs text-white font-medium leading-tight">{persona}</div>
            </div>
          </div>

          {/* Scenario */}
          <div>
            <div className="text-[8px] uppercase tracking-widest text-slate-500 mb-0.5">Scenario</div>
            <p className="text-[10px] text-slate-300 leading-snug">{scenario}</p>
          </div>

          {/* Goal */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-2">
            <div className="text-[8px] uppercase tracking-widest text-slate-500 mb-0.5">Goal</div>
            <p className="text-[10px] text-white leading-snug">{goal}</p>
          </div>
        </div>

        {/* Journey Map Visualization */}
        <div className="flex items-start gap-3 mb-5">
          {/* Left column labels (no background) */}
          <div className="w-24 flex flex-col text-[8px] uppercase tracking-widest text-slate-500 pt-5">
            <div>Touchpoints</div>
            <div className="mt-5">Emotional Experience</div>
            
            {/* Purple graph layer labels */}
            <div className="mt-[100px] flex flex-col normal-case tracking-normal mr-[0px] mb-[0px] ml-[0px]">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 bg-gradient-to-r from-[rgb(192,132,252)] to-transparent opacity-70"></div>
                <span className="text-[7px]" style={{ color: 'rgb(192, 132, 252)' }}>Effort</span>
              </div>
              <div className="flex items-center gap-1.5 mt-[6px] mr-[0px] mb-[0px] ml-[0px]">
                <div className="w-3 h-0.5 bg-gradient-to-r from-[rgb(168,85,247)] to-transparent opacity-70"></div>
                <span className="text-[7px]" style={{ color: 'rgb(168, 85, 247)' }}>Emotional</span>
              </div>
              <div className="flex items-center gap-1.5 mt-[6px] mr-[0px] mb-[0px] ml-[0px]">
                <div className="w-3 h-0.5 bg-gradient-to-r from-[rgb(216,180,254)] to-transparent opacity-70"></div>
                <span className="text-[7px]" style={{ color: 'rgb(216, 180, 254)' }}>Collaboration</span>
              </div>
            </div>
            

            
            {/* Stages label */}
            {approaches.length > 0 && (
              <div className="mt-[10px] flex items-center h-9 mr-[0px] mb-[0px] ml-[0px] p-[0px]">Stages</div>
            )}
          </div>

          {/* Graph card (with background) */}
          <div className="flex-1 backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-xl p-4">
            {/* Graph area */}
            <div className="relative h-48">
              {/* Touchpoint columns */}
              <div className="absolute inset-0 flex">
                {touchPoints.map((tp, idx) => (
                  <div
                    key={idx}
                    className="flex-1 relative border-l border-dashed border-white/10"
                  >
                    {/* Label */}
                    <div className="absolute top-0 left-2 text-[7px] text-slate-400 leading-tight whitespace-nowrap">
                      {tp.label}
                    </div>
                    
                    {/* Quote */}
                    {tp.quote && (
                      <div className="absolute top-7 left-1 right-1 flex items-start">
                        <div className="backdrop-blur-sm bg-purple-500/10 border border-purple-400/20 rounded px-2 py-1 text-[7px] text-purple-200 italic leading-snug whitespace-normal break-words w-full">
                          "{tp.quote}"
                        </div>
                      </div>
                    )}


                  </div>
                ))}
              </div>

              {/* SVG for emotional layers */}
              <svg 
                className="absolute left-0 top-24 w-full h-28"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {/* Collaboration layer - lightest, steadily rising */}
                <path
                  d={generateAreaPath(collaborationPath, 100)}
                  fill="url(#collaborationGradient)"
                  opacity="0.4"
                />
                
                {/* Effort layer - medium */}
                <path
                  d={generateAreaPath(effortPath, 100)}
                  fill="url(#effortGradient)"
                  opacity="0.5"
                />
                
                {/* Emotional experience - darkest/most saturated */}
                <path
                  d={generateAreaPath(emotionalPath, 100)}
                  fill="url(#emotionalGradient)"
                  opacity="0.6"
                />

                {/* Line on top */}
                <path
                  d={generateLinePath(emotionalPath)}
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="0.3"
                  fill="none"
                />

                {/* Gradients */}
                <defs>
                  <linearGradient id="emotionalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(168, 85, 247)" />
                    <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="effortGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(192, 132, 252)" />
                    <stop offset="100%" stopColor="rgb(192, 132, 252)" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="collaborationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(216, 180, 254)" />
                    <stop offset="100%" stopColor="rgb(216, 180, 254)" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Approach timeline */}
            {approaches.length > 0 && (
              <div className="mt-2 pt-3 border-t border-white/5">
                <div className="relative h-9">
                  {(() => {
                    const minStart = Math.min(...approaches.map(a => a.start));
                    const maxEnd = Math.max(...approaches.map(a => a.end));
                    const range = maxEnd - minStart;
                    
                    return approaches.map((approach, idx) => {
                      const normalizedStart = ((approach.start - minStart) / range) * 100;
                      const normalizedEnd = ((approach.end - minStart) / range) * 100;
                      
                      return (
                        <div
                          key={idx}
                          className="absolute top-1/2 -translate-y-1/2 h-5 backdrop-blur-sm bg-purple-500/20 border border-purple-400/30 rounded-full flex items-center justify-center"
                          style={{
                            left: `${normalizedStart}%`,
                            width: `${normalizedEnd - normalizedStart}%`,
                          }}
                        >
                          <span className="text-[7px] text-purple-200 px-1">{approach.label}</span>
                        </div>
                      );
                    });
                  })()}
                  
                  {/* Connecting dots */}
                  {(() => {
                    const minStart = Math.min(...approaches.map(a => a.start));
                    const maxEnd = Math.max(...approaches.map(a => a.end));
                    const range = maxEnd - minStart;
                    
                    return approaches.map((approach, idx) => {
                      const normalizedStart = ((approach.start - minStart) / range) * 100;
                      const normalizedEnd = ((approach.end - minStart) / range) * 100;
                      const nextNormalizedStart = idx < approaches.length - 1 
                        ? ((approaches[idx + 1].start - minStart) / range) * 100 
                        : 0;
                      
                      return (
                        <div key={`dot-${idx}`}>
                          <div
                            className="absolute top-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full border border-slate-800"
                            style={{ left: `${normalizedStart}%`, transform: 'translate(-50%, -50%)' }}
                          />
                          {idx < approaches.length - 1 && (
                            <div
                              className="absolute top-1/2 h-px bg-purple-400/30 border-t border-dashed border-purple-400/30"
                              style={{
                                left: `${normalizedEnd}%`,
                                width: `${nextNormalizedStart - normalizedEnd}%`,
                              }}
                            />
                          )}
                        </div>
                      );
                    });
                  })()}

                </div>
              </div>
            )}
          </div>
        </div>

        {/* Journey Phases */}
        <div className="flex items-start gap-3">
          <div className="w-24 text-[8px] uppercase tracking-widest text-slate-500 pt-1.5">
            Journey Phases
          </div>
          <div className="flex-1 grid grid-cols-6 gap-2.5">
            {phases.map((phase, idx) => (
              <div key={idx} className="flex flex-col">
                {/* Phase header */}
                <div 
                  className="rounded-t px-2 py-1 text-[8px] font-medium text-white text-center"
                  style={{ backgroundColor: phase.color }}
                >
                  {phase.name}
                </div>
                
                {/* Phase content */}
                <div className="flex-1 backdrop-blur-md bg-white/5 border border-white/10 border-t-0 rounded-b p-2 space-y-1.5">
                  {/* Description */}
                  <div>
                    <p className="text-[7.5px] text-slate-400 leading-snug">{phase.description}</p>
                  </div>

                  {/* Steps */}
                  <div>
                    <div className="text-[6.5px] uppercase tracking-widest text-slate-500 mb-0.5">Steps</div>
                    <ul className="space-y-0.5">
                      {phase.steps.slice(0, 2).map((step, i) => (
                        <li key={i} className="text-[7.5px] text-slate-300 leading-[1.4] flex items-start gap-1">
                          <div className="w-0.5 h-0.5 rounded-full border border-slate-400 mt-[2px] flex-shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <div className="text-[6.5px] uppercase tracking-widest text-slate-500 mb-0.5">Key Action</div>
                    <p className="text-[7.5px] text-emerald-300/70 leading-snug">→ {phase.recommendations[0]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}