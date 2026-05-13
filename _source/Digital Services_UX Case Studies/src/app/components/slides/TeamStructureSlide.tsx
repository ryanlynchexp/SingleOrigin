import { SlideLayout } from '@/app/components/SlideLayout';
import { LucideIcon } from 'lucide-react';

interface TeamPillar {
  icon: LucideIcon;
  title: string;
  description: string;
  capabilities: string[];
}

interface TeamStructureSlideProps {
  title: string;
  subtitle?: string;
  pillars: TeamPillar[];
}

export function TeamStructureSlide({ title, subtitle, pillars }: TeamStructureSlideProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
        
      <div className="relative h-full flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12 overflow-y-auto">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-slate-300">
                {subtitle}
              </p>
            )}
          </div>

          <div className="relative">
            {/* Connecting line that runs through all pillars */}
            <div className="absolute top-[60px] left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 via-emerald-500 to-amber-500 opacity-40 rounded-full hidden lg:block" />
            
            {/* Grid layout for pillars - responsive: stacks vertically on small screens, equal heights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative auto-rows-fr">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                const processLabels = ['Discover', 'Structure', 'Design', 'Build'];
                const processLabel = processLabels[index];
                const gradients = [
                  'from-blue-500 to-cyan-500',
                  'from-violet-500 to-purple-500',
                  'from-emerald-500 to-teal-500',
                  'from-amber-500 to-orange-500',
                ];
                const gradient = gradients[index];
                
                return (
                  <div key={index} className="relative group h-full">
                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`} />
                    
                    {/* Pillar card - responsive layout */}
                    <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all shadow-2xl h-full">
                      {/* Desktop: vertical card layout */}
                      <div className="hidden lg:flex lg:flex-col p-5 h-full">
                        {/* Process label badge */}
                        <div className="flex justify-center mb-3">
                          <span className={`text-xs uppercase tracking-[0.15em] font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r ${gradient} text-white shadow-lg`}>
                            {processLabel}
                          </span>
                        </div>

                        {/* Icon with gradient background */}
                        <div className="flex flex-col items-center mb-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 shadow-lg relative z-10`}>
                            <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                          </div>
                          <h3 className="text-lg text-white text-center font-semibold">
                            {pillar.title}
                          </h3>
                        </div>
                        
                        <p className="text-sm text-slate-300 mb-3 leading-relaxed text-center">
                          {pillar.description}
                        </p>
                        
                        <ul className="space-y-1.5 flex-1">
                          {pillar.capabilities.map((capability, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-[1.4]">
                              <div className="w-1 h-1 rounded-full border-2 border-slate-400 mt-1.5 flex-shrink-0" />
                              <span>{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Mobile/Tablet: horizontal card layout */}
                      <div className="lg:hidden p-4 flex gap-3">
                        {/* Left: Icon and badge */}
                        <div className="flex-shrink-0">
                          <div className="flex flex-col items-center gap-2">
                            <span className={`text-xs uppercase tracking-[0.15em] font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r ${gradient} text-white shadow-lg`}>
                              {processLabel}
                            </span>
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                              <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                            </div>
                          </div>
                        </div>

                        {/* Right: Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg text-white font-semibold mb-2">
                            {pillar.title}
                          </h3>
                          <p className="text-sm text-slate-300 mb-3 leading-relaxed">
                            {pillar.description}
                          </p>
                          <ul className="space-y-1.5">
                            {pillar.capabilities.map((capability, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-[1.6]">
                                <div className="w-1 h-1 rounded-full border-2 border-slate-400 mt-1.5 flex-shrink-0" />
                                <span>{capability}</span>
                              </li>
                            ))}
                          </ul>
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
  );
}