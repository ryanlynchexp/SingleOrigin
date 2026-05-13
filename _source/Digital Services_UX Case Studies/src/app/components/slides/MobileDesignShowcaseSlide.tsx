import { SlideLayout } from '@/app/components/SlideLayout';

interface PopoutComponent {
  title: string;
  description: string;
  color?: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose';
  component: React.ReactNode;
}

interface MobileDesignShowcaseSlideProps {
  title: string;
  subtitle?: string;
  accentColor?: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose';
  popoutComponents?: PopoutComponent[];
}

export function MobileDesignShowcaseSlide({ 
  title, 
  subtitle, 
  accentColor = 'emerald',
  popoutComponents = []
}: MobileDesignShowcaseSlideProps) {
  const colorMap = {
    emerald: {
      gradient: 'from-emerald-600 to-teal-700',
      bg: 'from-emerald-500/20 to-emerald-600/10 border-emerald-400/30',
      dot: 'bg-emerald-500',
      accent: 'bg-emerald-500',
      text: 'text-emerald-100',
      glow: 'from-emerald-900/20',
    },
    blue: {
      gradient: 'from-blue-600 to-indigo-700',
      bg: 'from-blue-500/20 to-blue-600/10 border-blue-400/30',
      dot: 'bg-blue-500',
      accent: 'bg-blue-500',
      text: 'text-blue-100',
      glow: 'from-blue-900/20',
    },
    purple: {
      gradient: 'from-purple-600 to-violet-700',
      bg: 'from-purple-500/20 to-purple-600/10 border-purple-400/30',
      dot: 'bg-purple-500',
      accent: 'bg-purple-500',
      text: 'text-purple-100',
      glow: 'from-purple-900/20',
    },
    amber: {
      gradient: 'from-amber-500 to-orange-600',
      bg: 'from-amber-500/20 to-amber-600/10 border-amber-400/30',
      dot: 'bg-amber-500',
      accent: 'bg-amber-500',
      text: 'text-amber-100',
      glow: 'from-amber-900/20',
    },
    rose: {
      gradient: 'from-rose-600 to-pink-700',
      bg: 'from-rose-500/20 to-rose-600/10 border-rose-400/30',
      dot: 'bg-rose-500',
      accent: 'bg-rose-500',
      text: 'text-rose-100',
      glow: 'from-rose-900/20',
    },
  };

  const componentColorMap = {
    emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-400/30',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-400/30',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-400/30',
    amber: 'from-amber-500/20 to-amber-600/10 border-amber-400/30',
    rose: 'from-rose-500/20 to-rose-600/10 border-rose-400/30',
  };

  const theme = colorMap[accentColor];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${theme.glow} via-transparent to-transparent`} />
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] ${theme.glow} via-transparent to-transparent`} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex flex-col px-12 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-5xl mb-3 text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-slate-300">
              {subtitle}
            </p>
          )}
        </div>

        {/* Main Content - Phone + Popout Components */}
        <div className="flex-1 flex items-center gap-8">
          {/* Left Side - iPhone Mockup */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-[300px] h-[610px] bg-slate-900 rounded-[46px] border-[13px] border-slate-800 shadow-2xl overflow-hidden relative">
                {/* Phone Notch - Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-950 rounded-[18px] z-30 shadow-inner"></div>
                
                {/* App Screen */}
                <div className={`relative w-full h-full bg-gradient-to-br ${theme.gradient} overflow-hidden`}>
                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 right-0 pt-2.5 px-5 flex items-center justify-between z-20">
                    <div className="text-[9px] text-white/90 font-semibold">9:41</div>
                    <div className="flex items-center gap-0.5">
                      <div className="w-3.5 h-1.5 bg-white/80 rounded-sm"></div>
                      <div className="w-3.5 h-1.5 bg-white/80 rounded-sm"></div>
                      <div className="w-4 h-2 bg-white/80 rounded-sm"></div>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="px-5 pt-11 pb-3 flex items-center justify-between relative z-10">
                    <div>
                      <div className={`${theme.text} text-xs mb-0.5 font-bold tracking-wide`}>Starbucks</div>
                      <div className="w-32 h-5 bg-white/95 rounded shadow-sm"></div>
                    </div>
                    <div className="w-8 h-8 bg-white/25 backdrop-blur-md rounded-full border border-white/30"></div>
                  </div>

                  {/* Rewards Card */}
                  <div className="mx-5 mb-3 relative z-10">
                    <div className="bg-white/95 backdrop-blur-xl rounded-[22px] p-4 shadow-2xl border border-white/20">
                      {/* Stars Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="w-18 h-2.5 bg-slate-800 rounded"></div>
                          <div className="w-12 h-2 bg-slate-300 rounded"></div>
                        </div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          {[1, 2, 3, 4, 5].map((star, i) => (
                            <div 
                              key={i} 
                              className={`w-6 h-6 rounded-full ${
                                i < 3 ? theme.accent : 'bg-slate-200'
                              } flex items-center justify-center`}
                            >
                              <div className="w-2.5 h-2.5 bg-white/90 rounded-sm"></div>
                            </div>
                          ))}
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className={`w-[60%] h-full ${theme.accent} rounded-full`}></div>
                        </div>
                      </div>
                      
                      {/* Reward Details */}
                      <div className="flex items-center justify-between mb-2.5 pb-2.5 border-b border-slate-200">
                        <div>
                          <div className="w-28 h-3 bg-slate-800 rounded mb-1"></div>
                          <div className="w-20 h-2 bg-slate-300 rounded"></div>
                        </div>
                        <div className={`px-2.5 py-1 ${theme.accent} rounded-full`}>
                          <div className="w-10 h-2 bg-white rounded"></div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="bg-slate-50 rounded-lg p-2">
                          <div className="w-8 h-1.5 bg-slate-400 rounded mb-0.5"></div>
                          <div className="w-14 h-3.5 bg-slate-700 rounded"></div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2">
                          <div className="w-8 h-1.5 bg-slate-400 rounded mb-0.5"></div>
                          <div className="w-14 h-3.5 bg-slate-700 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Personalized Offers */}
                  <div className="mx-5 mb-3 relative z-10">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-24 h-3.5 bg-white/90 rounded shadow-sm"></div>
                      <div className="w-10 h-2.5 bg-white/60 rounded"></div>
                    </div>
                    <div className="flex gap-2.5 overflow-hidden">
                      <div className="min-w-[140px] bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3.5 shadow-lg">
                        <div className="w-10 h-10 bg-white/40 rounded-lg mb-2.5"></div>
                        <div className="w-18 h-2.5 bg-white/80 rounded mb-1"></div>
                        <div className="w-full h-1.5 bg-white/60 rounded"></div>
                      </div>
                      <div className="min-w-[140px] bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3.5 shadow-lg">
                        <div className="w-10 h-10 bg-white/40 rounded-lg mb-2.5"></div>
                        <div className="w-18 h-2.5 bg-white/80 rounded mb-1"></div>
                        <div className="w-full h-1.5 bg-white/60 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mx-5 mb-3 relative z-10">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-white/25 backdrop-blur-md border border-white/40 rounded-xl p-3.5 h-18 flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-white/50 rounded-lg"></div>
                        <div className="w-14 h-2 bg-white/80 rounded"></div>
                      </div>
                      <div className="bg-white/25 backdrop-blur-md border border-white/40 rounded-xl p-3.5 h-18 flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-white/50 rounded-lg"></div>
                        <div className="w-14 h-2 bg-white/80 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 px-5 py-3.5">
                    <div className="flex items-center justify-between">
                      {[1, 2, 3, 4].map((tab, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div className={`w-5 h-5 ${i === 0 ? theme.accent : 'bg-white/30'} rounded-lg`}></div>
                          <div className={`w-8 h-0.5 ${i === 0 ? theme.accent + '/80' : 'bg-white/30'} rounded`}></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Popout Components Column */}
          <div className="flex-1 grid grid-cols-1 gap-5 content-center pr-8">
            {popoutComponents.map((component, idx) => {
              const componentColor = component.color || accentColor;
              return (
                <div
                  key={idx}
                  className={`backdrop-blur-xl bg-gradient-to-br ${componentColorMap[componentColor]} border rounded-2xl p-5 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300`}
                >
                  {/* Component Preview */}
                  <div className="mb-4 flex items-center justify-center">
                    {component.component}
                  </div>
                  
                  {/* Component Details */}
                  <div>
                    <h4 className="text-base font-semibold text-white mb-2">
                      {component.title}
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {component.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
