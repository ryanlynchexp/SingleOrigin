import { SlideLayout } from '@/app/components/SlideLayout';

interface AppIntegrationSlideProps {
  title: string;
  subtitle?: string;
  callouts: {
    title: string;
    description: string;
    position: {
      x: number; // percentage from left
      y: number; // percentage from top
    };
    alignment?: 'left' | 'right';
    color?: 'emerald' | 'blue' | 'purple' | 'amber';
    offsetX?: number; // pixel offset from percentage position
    offsetY?: number; // pixel offset from percentage position
  }[];
}

export function AppIntegrationSlide({ title, subtitle, callouts }: AppIntegrationSlideProps) {
  // Split callouts based on their position (left phone vs right phone)
  const leftPhoneCallouts = callouts.filter(c => c.position.x < 50);
  const rightPhoneCallouts = callouts.filter(c => c.position.x >= 50);

  const colorMap = {
    emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-400/30',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-400/30',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-400/30',
    amber: 'from-amber-500/20 to-amber-600/10 border-amber-400/30',
  };
  const dotColorMap = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex items-center justify-center px-12 py-16 overflow-y-auto">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-5xl mb-3 text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-slate-300">
                {subtitle}
              </p>
            )}
          </div>

          {/* Phone Mockups Container */}
          <div className="relative flex items-center justify-center gap-8">
            {/* Left Phone - Acquired App (Before) with Callouts */}
            <div className="relative z-10">
              <div className="w-[280px] h-[580px] bg-slate-800 rounded-[40px] border-[12px] border-slate-700 shadow-2xl overflow-hidden relative">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-700 rounded-b-2xl z-20"></div>
                
                {/* App Screen */}
                <div className="relative w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 p-6 pt-10">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="text-slate-300 text-xs mb-2">Legacy App</div>
                    <div className="w-32 h-6 bg-slate-500/40 rounded"></div>
                  </div>

                  {/* Main Card */}
                  <div className="bg-slate-700/60 backdrop-blur-sm border border-slate-500/30 rounded-2xl p-5 mb-4 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-20 h-4 bg-slate-400/50 rounded"></div>
                      <div className="w-16 h-3 bg-amber-500/40 rounded-full px-2 py-1 text-[8px]"></div>
                    </div>
                    <div className="space-y-2.5">
                      <div className="w-full h-3 bg-slate-500/30 rounded"></div>
                      <div className="w-4/5 h-3 bg-slate-500/30 rounded"></div>
                      <div className="w-3/5 h-3 bg-slate-500/30 rounded"></div>
                    </div>
                  </div>

                  {/* Grid of Features */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-600/40 rounded-lg p-3 h-20">
                      <div className="w-6 h-6 bg-slate-400/30 rounded mb-2"></div>
                      <div className="w-12 h-2 bg-slate-400/40 rounded"></div>
                    </div>
                    <div className="bg-slate-600/40 rounded-lg p-3 h-20">
                      <div className="w-6 h-6 bg-slate-400/30 rounded mb-2"></div>
                      <div className="w-12 h-2 bg-slate-400/40 rounded"></div>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="absolute bottom-8 left-6 right-6">
                    <div className="w-full h-12 bg-slate-500/40 rounded-xl"></div>
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="text-xs text-slate-400 font-medium">Acquired App</div>
              </div>

              {/* Left Phone Callouts */}
              {leftPhoneCallouts.map((callout, idx) => {
                const color = callout.color || 'emerald';
                const alignment = callout.alignment || 'right';
                
                return (
                  <div
                    key={idx}
                    className="absolute z-20"
                    style={{
                      top: `${callout.position.y}%`,
                      left: alignment === 'right' ? '100%' : 'auto',
                      right: alignment === 'left' ? `calc(100% - ${callout.offsetX || 0}px)` : 'auto',
                      transform: `translateY(${callout.offsetY || 0}px)`,
                    }}
                  >
                    {/* Callout Card - No connector for left alignment */}
                    {alignment === 'left' ? (
                      <div 
                        className={`min-w-[220px] max-w-[260px] backdrop-blur-xl bg-gradient-to-br ${colorMap[color]} border rounded-xl px-4 py-3.5 shadow-2xl`}
                      >
                        <h4 className="text-sm font-semibold text-white mb-1.5">
                          {callout.title}
                        </h4>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {callout.description}
                        </p>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className={`w-3 h-3 rounded-full ${dotColorMap[color]} border-2 border-white/20 shadow-lg`}></div>
                        
                        {/* Connector Line */}
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-[2px] bg-slate-400/40"></div>
                        
                        {/* Callout Card */}
                        <div 
                          className={`absolute min-w-[220px] max-w-[260px] backdrop-blur-xl bg-gradient-to-br ${colorMap[color]} border rounded-xl px-4 py-3.5 shadow-2xl left-9 top-1/2 -translate-y-1/2`}
                        >
                          <h4 className="text-sm font-semibold text-white mb-1.5">
                            {callout.title}
                          </h4>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            {callout.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Center Connector */}
            <div className="relative z-0 flex flex-col items-center gap-2">
              <div className="w-24 h-[2px] bg-gradient-to-r from-emerald-500/50 to-teal-500/50"></div>
              <div className="text-slate-400 text-[10px] uppercase tracking-wider font-medium">Integration</div>
              <div className="w-24 h-[2px] bg-gradient-to-r from-emerald-500/50 to-teal-500/50 mb-2"></div>
              
              {/* Integration Details */}
              <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 shadow-lg max-w-[240px] text-center">
                <p className="text-[10px] text-slate-300 leading-relaxed">
                  Comparative UX analysis of both platforms informed design decisions. User interviews 
                  with existing customers validated feature priorities. Iterative prototyping with both 
                  user bases ensured familiar patterns remained while introducing elevated aesthetics.
                </p>
              </div>
            </div>

            {/* Right Phone - Unified Passport App (After) with Callouts */}
            <div className="relative z-10">
              <div className="w-[280px] h-[580px] bg-slate-900 rounded-[40px] border-[12px] border-slate-800 shadow-2xl overflow-hidden relative">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20"></div>
                
                {/* App Screen */}
                <div className="relative w-full h-full bg-gradient-to-br from-emerald-600 to-teal-700 overflow-hidden">
                  {/* Header */}
                  <div className="px-6 pt-10 pb-3 flex items-center justify-between">
                    <div>
                      <div className="text-emerald-100 text-xs mb-1 font-semibold">Passport</div>
                      <div className="w-32 h-5 bg-white/90 rounded"></div>
                    </div>
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full"></div>
                  </div>

                  {/* Map View */}
                  <div className="mx-6 mb-3 h-32 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl overflow-hidden relative">
                    {/* Map grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px]" />
                    {/* Location pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-6 h-6 bg-emerald-600 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                    {/* Zone markers */}
                    <div className="absolute top-4 left-4 w-4 h-4 bg-white/60 rounded-full"></div>
                    <div className="absolute bottom-6 right-6 w-3 h-3 bg-white/60 rounded-full"></div>
                  </div>

                  {/* Active Parking Card with Progress */}
                  <div className="mx-6 mb-3">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="w-16 h-2.5 bg-slate-300 rounded"></div>
                          <div className="w-12 h-2 bg-slate-200 rounded"></div>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="w-[60%] h-full bg-emerald-500 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Parking Details */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-24 h-5 bg-slate-800 rounded"></div>
                        <div className="px-3 py-1.5 bg-emerald-500 rounded-full">
                          <div className="w-10 h-2 bg-white rounded"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full h-2.5 bg-slate-200 rounded"></div>
                        <div className="w-5/6 h-2.5 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions Grid */}
                  <div className="mx-6 mb-3">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-3 h-16">
                        <div className="w-6 h-6 bg-white/40 rounded-lg mb-1.5"></div>
                        <div className="w-12 h-2 bg-white/70 rounded"></div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-3 h-16">
                        <div className="w-6 h-6 bg-white/40 rounded-lg mb-1.5"></div>
                        <div className="w-12 h-2 bg-white/70 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Footer Navigation */}
                  <div className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-white/10 px-6 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 bg-emerald-500 rounded-lg"></div>
                        <div className="w-8 h-1 bg-emerald-400/80 rounded"></div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 bg-white/20 rounded-lg"></div>
                        <div className="w-8 h-1 bg-white/30 rounded"></div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 bg-white/20 rounded-lg"></div>
                        <div className="w-8 h-1 bg-white/30 rounded"></div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 bg-white/20 rounded-lg"></div>
                        <div className="w-8 h-1 bg-white/30 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="text-xs text-emerald-400 font-medium">Unified Passport</div>
              </div>

              {/* Right Phone Callouts */}
              {rightPhoneCallouts.map((callout, idx) => {
                const color = callout.color || 'emerald';
                const alignment = callout.alignment || 'right';
                
                return (
                  <div
                    key={idx}
                    className="absolute z-20"
                    style={{
                      top: `${callout.position.y}%`,
                      left: alignment === 'right' ? `calc(100% - ${callout.offsetX || 0}px)` : 'auto',
                      right: alignment === 'left' ? `calc(100% - ${callout.offsetX || 0}px)` : 'auto',
                      transform: `translateY(${callout.offsetY || 0}px)`,
                    }}
                  >
                    {/* Callout Card - No connector for right alignment */}
                    {alignment === 'right' ? (
                      <div 
                        className={`min-w-[220px] max-w-[260px] backdrop-blur-xl bg-gradient-to-br ${colorMap[color]} border rounded-xl px-4 py-3.5 shadow-2xl`}
                      >
                        <h4 className="text-sm font-semibold text-white mb-1.5">
                          {callout.title}
                        </h4>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {callout.description}
                        </p>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className={`w-3 h-3 rounded-full ${dotColorMap[color]} border-2 border-white/20 shadow-lg`}></div>
                        
                        {/* Connector Line */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-[2px] bg-slate-400/40"></div>
                        
                        {/* Callout Card */}
                        <div 
                          className={`absolute min-w-[220px] max-w-[260px] backdrop-blur-xl bg-gradient-to-br ${colorMap[color]} border rounded-xl px-4 py-3.5 shadow-2xl right-9 top-1/2 -translate-y-1/2`}
                        >
                          <h4 className="text-sm font-semibold text-white mb-1.5">
                            {callout.title}
                          </h4>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            {callout.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}