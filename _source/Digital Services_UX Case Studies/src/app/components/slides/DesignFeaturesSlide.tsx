import { SlideLayout } from '@/app/components/SlideLayout';

interface DesignFeaturesSlideProps {
  title: string;
  subtitle?: string;
  isLiteMode?: boolean;
  features: {
    title: string;
    description: string;
    position: {
      x: number; // percentage from left
      y: number; // percentage from top
    };
    alignment?: 'left' | 'right' | 'top' | 'bottom';
  }[];
}

export function DesignFeaturesSlide({ title, subtitle, features, isLiteMode = false }: DesignFeaturesSlideProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${
      isLiteMode 
        ? 'bg-gradient-to-br from-sky-50 via-purple-50 to-blue-50' 
        : 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
    }`}>
      {/* Ambient background effects */}
      {isLiteMode ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-200/30 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-200/30 via-transparent to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        </>
      )}
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex items-center justify-center px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 overflow-y-auto">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="mb-3 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10 text-center">
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-1.5 sm:mb-2 md:mb-3 tracking-tight ${isLiteMode ? 'text-slate-900' : 'text-white'}`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl ${isLiteMode ? 'text-slate-700' : 'text-slate-300'}`}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Dashboard Mockup with Floating Callouts */}
          <div className="relative">
            {/* Main Dashboard Interface */}
            <div className="relative mx-auto max-w-[900px]">
              {/* Browser/App Window Frame */}
              <div className={`backdrop-blur-sm rounded-t-xl px-4 py-3 flex items-center gap-2 ${
                isLiteMode 
                  ? 'bg-slate-300/40 border border-slate-300/60' 
                  : 'bg-slate-700/50 border border-white/10'
              }`}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className={`flex-1 backdrop-blur-sm rounded px-3 py-1.5 ml-3 ${
                  isLiteMode 
                    ? 'bg-slate-400/20' 
                    : 'bg-slate-600/30'
                }`}>
                  <div className={`w-48 h-2 rounded ${
                    isLiteMode 
                      ? 'bg-slate-500/40' 
                      : 'bg-slate-500/50'
                  }`}></div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className={`backdrop-blur-xl rounded-b-xl shadow-2xl overflow-hidden ${
                isLiteMode 
                  ? 'bg-white/60 border-x border-b border-slate-200/80' 
                  : 'bg-white/5 border-x border-b border-white/10'
              }`}>
                {/* Top Navigation/Header */}
                <div className={`px-6 py-5 flex items-center justify-between ${
                  isLiteMode 
                    ? 'bg-gradient-to-r from-slate-300/40 to-slate-400/40' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded ${
                      isLiteMode ? 'bg-slate-400/30' : 'bg-white/20'
                    }`}></div>
                    <div className={`w-32 h-3 rounded ${
                      isLiteMode ? 'bg-slate-500/50' : 'bg-white/90'
                    }`}></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`w-24 h-3 rounded ${
                      isLiteMode ? 'bg-slate-500/40' : 'bg-white/60'
                    }`}></div>
                    <div className={`w-8 h-8 rounded-full ${
                      isLiteMode ? 'bg-slate-400/30' : 'bg-white/20'
                    }`}></div>
                  </div>
                </div>

                {/* Dashboard Main Content */}
                <div className="p-6">
                  {/* Patient Info Header */}
                  <div className={`mb-5 pb-4 border-b flex items-start justify-between ${
                    isLiteMode ? 'border-slate-300/40' : 'border-white/10'
                  }`}>
                    <div className="space-y-2">
                      <div className={`w-48 h-4 rounded ${
                        isLiteMode ? 'bg-slate-400/25' : 'bg-slate-400/30'
                      }`}></div>
                      <div className="flex gap-3">
                        <div className={`w-24 h-2 rounded ${
                          isLiteMode ? 'bg-slate-500/20' : 'bg-slate-500/20'
                        }`}></div>
                        <div className={`w-20 h-2 rounded ${
                          isLiteMode ? 'bg-slate-500/20' : 'bg-slate-500/20'
                        }`}></div>
                        <div className={`w-28 h-2 rounded ${
                          isLiteMode ? 'bg-slate-500/20' : 'bg-slate-500/20'
                        }`}></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className={`w-20 h-8 rounded border ${
                        isLiteMode 
                          ? 'bg-slate-400/15 border-slate-400/30' 
                          : 'bg-slate-400/15 border-slate-400/25'
                      }`}></div>
                      <div className={`w-20 h-8 rounded border ${
                        isLiteMode 
                          ? 'bg-white/25 border-slate-300/40' 
                          : 'bg-white/10 border-white/20'
                      }`}></div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-4 mb-5">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`rounded-lg p-4 space-y-2 ${
                        isLiteMode 
                          ? 'bg-gradient-to-br from-slate-300/20 to-slate-400/15 border border-slate-400/25' 
                          : 'bg-gradient-to-br from-slate-400/15 to-slate-500/8 border border-slate-400/25'
                      }`}>
                        <div className={`w-16 h-2 rounded ${
                          isLiteMode ? 'bg-slate-400/35' : 'bg-slate-400/35'
                        }`}></div>
                        <div className={`w-20 h-6 rounded ${
                          isLiteMode ? 'bg-slate-500/40' : 'bg-slate-400/50'
                        }`}></div>
                        <div className={`w-12 h-1.5 rounded ${
                          isLiteMode ? 'bg-slate-400/30' : 'bg-slate-400/25'
                        }`}></div>
                      </div>
                    ))}
                  </div>

                  {/* Main Content Area - Two Columns */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Left Column - Recent Activity */}
                    <div className="space-y-3">
                      <div className={`rounded-lg p-4 space-y-2 ${
                        isLiteMode 
                          ? 'bg-white/40 border border-slate-200/60' 
                          : 'bg-white/5 border border-white/10'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-32 h-3 rounded ${
                            isLiteMode ? 'bg-slate-400/35' : 'bg-slate-300/40'
                          }`}></div>
                          <div className={`w-16 h-2 rounded ${
                            isLiteMode ? 'bg-slate-400/30' : 'bg-slate-400/30'
                          }`}></div>
                        </div>
                        <div className="space-y-1.5">
                          <div className={`w-full h-2 rounded ${
                            isLiteMode ? 'bg-slate-400/30' : 'bg-slate-400/30'
                          }`}></div>
                          <div className={`w-5/6 h-2 rounded ${
                            isLiteMode ? 'bg-slate-400/30' : 'bg-slate-400/30'
                          }`}></div>
                          <div className={`w-4/6 h-2 rounded ${
                            isLiteMode ? 'bg-slate-400/30' : 'bg-slate-400/30'
                          }`}></div>
                        </div>
                      </div>
                      <div className={`rounded-lg p-4 space-y-2 ${
                        isLiteMode 
                          ? 'bg-white/40 border border-slate-200/60' 
                          : 'bg-white/5 border border-white/10'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-32 h-3 rounded ${
                            isLiteMode ? 'bg-slate-400/35' : 'bg-slate-300/40'
                          }`}></div>
                          <div className={`w-16 h-2 rounded ${
                            isLiteMode ? 'bg-slate-400/30' : 'bg-slate-400/30'
                          }`}></div>
                        </div>
                        <div className="space-y-1.5">
                          <div className={`w-full h-2 rounded ${
                            isLiteMode ? 'bg-slate-400/30' : 'bg-slate-400/30'
                          }`}></div>
                          <div className={`w-4/6 h-2 rounded ${
                            isLiteMode ? 'bg-slate-400/30' : 'bg-slate-400/30'
                          }`}></div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Chart/Visualization */}
                    <div className={`rounded-lg p-4 ${
                      isLiteMode 
                        ? 'bg-white/40 border border-slate-200/60' 
                        : 'bg-white/5 border border-white/10'
                    }`}>
                      <div className={`w-28 h-3 rounded mb-3 ${
                        isLiteMode ? 'bg-slate-400/35' : 'bg-slate-300/40'
                      }`}></div>
                      <div className="h-32 flex items-end gap-2">
                        {[60, 80, 45, 90, 70].map((height, i) => (
                          <div 
                            key={i}
                            className={`flex-1 rounded-t ${
                              isLiteMode 
                                ? 'bg-gradient-to-t from-slate-500/50 to-slate-400/50' 
                                : 'bg-gradient-to-t from-slate-500 to-slate-400'
                            }`} 
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Callout Boxes */}
            {features.map((feature, idx) => {
              const alignment = feature.alignment || 'right';
              
              return (
                <div
                  key={idx}
                  className="absolute"
                  style={{
                    left: `${feature.position.x}%`,
                    top: `${feature.position.y}%`,
                  }}
                >
                  {/* Connector Dot */}
                  <div className="relative" style={{ transform: 'translateY(25px)' }}>
                    <div className={`w-3 h-3 rounded-full shadow-lg ${
                      isLiteMode 
                        ? 'bg-blue-500 border-2 border-white/60' 
                        : 'bg-blue-500 border-2 border-white/20'
                    }`}></div>
                    
                    {/* Connector Line */}
                    {alignment === 'right' && (
                      <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-6 h-[2px] ${
                        isLiteMode ? 'bg-slate-400/60' : 'bg-slate-400/50'
                      }`}></div>
                    )}
                    {alignment === 'left' && (
                      <div className={`absolute right-3 top-1/2 -translate-y-1/2 w-6 h-[2px] ${
                        isLiteMode ? 'bg-slate-400/60' : 'bg-slate-400/50'
                      }`}></div>
                    )}
                    {alignment === 'top' && (
                      <div className={`absolute left-1/2 -translate-x-1/2 bottom-3 w-[2px] h-6 ${
                        isLiteMode ? 'bg-slate-400/60' : 'bg-slate-400/50'
                      }`}></div>
                    )}
                    {alignment === 'bottom' && (
                      <div className={`absolute left-1/2 -translate-x-1/2 top-3 w-[2px] h-6 ${
                        isLiteMode ? 'bg-slate-400/60' : 'bg-slate-400/50'
                      }`}></div>
                    )}
                    
                    {/* Callout Card */}
                    <div 
                      className={`absolute min-w-[220px] max-w-[240px] rounded-xl shadow-2xl ${
                        isLiteMode 
                          ? 'bg-white backdrop-blur-2xl px-5 py-4 transition-all duration-500 ease-out' 
                          : 'bg-white/10 border-2 border-white/20 backdrop-blur-xl px-3 py-2.5'
                      } ${
                        alignment === 'right' ? 'left-9 top-1/2' :
                        alignment === 'left' ? 'right-9 top-1/2' :
                        alignment === 'top' ? 'left-1/2 bottom-9' :
                        'left-1/2 top-9'
                      }`}
                      style={
                        isLiteMode 
                          ? { 
                              transform: alignment === 'right' || alignment === 'left' ? 'translateY(-50%)' : 'translateX(-50%)',
                              boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.3), 0 0 0 4px rgba(59, 130, 246, 0.1), 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1)',
                              border: '2px solid rgba(59, 130, 246, 0.2)'
                            }
                          : { 
                              transform: alignment === 'right' || alignment === 'left' ? 'translateY(-50%)' : 'translateX(-50%)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                            }
                      }
                      onMouseEnter={isLiteMode && (alignment === 'right' || alignment === 'left') ? (e) => {
                        if (alignment === 'right') {
                          e.currentTarget.style.transform = 'translateY(-50%) translateX(8px)';
                        } else if (alignment === 'left') {
                          e.currentTarget.style.transform = 'translateY(-50%) translateX(-8px)';
                        }
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.6), 0 0 0 6px rgba(59, 130, 246, 0.15), 0 32px 80px rgba(0, 0, 0, 0.2), 0 12px 32px rgba(0, 0, 0, 0.15)';
                      } : undefined}
                      onMouseLeave={isLiteMode && (alignment === 'right' || alignment === 'left') ? (e) => {
                        e.currentTarget.style.transform = 'translateY(-50%)';
                        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(59, 130, 246, 0.3), 0 0 0 4px rgba(59, 130, 246, 0.1), 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1)';
                      } : undefined}
                    >
                      {isLiteMode ? (
                        <>
                          <h4 className="text-xs uppercase tracking-wider text-blue-600 mb-2 font-semibold">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-slate-800 leading-relaxed">
                            {feature.description}
                          </p>
                        </>
                      ) : (
                        <>
                          <h4 className="text-xs font-semibold text-white mb-0.5">
                            {feature.title}
                          </h4>
                          <p className="text-[11px] text-slate-300 leading-snug">
                            {feature.description}
                          </p>
                        </>
                      )}
                    </div>
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