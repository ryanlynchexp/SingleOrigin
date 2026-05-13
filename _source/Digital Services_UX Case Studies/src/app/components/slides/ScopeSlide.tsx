import { SlideLayout } from '@/app/components/SlideLayout';
import { Building2, Briefcase, Clock, Users } from 'lucide-react';

interface ScopeSlideProps {
  title: string;
  client: string;
  industry: string;
  duration: string;
  teamSize: string;
  overview: string;
  deliverables: string[];
  backgroundImage?: string;
}

export function ScopeSlide({ 
  title, 
  client, 
  industry, 
  duration, 
  teamSize, 
  overview, 
  deliverables,
  backgroundImage 
}: ScopeSlideProps) {
  const infoItems = [
    { icon: Building2, label: 'Client', value: client },
    { icon: Briefcase, label: 'Industry', value: industry },
    { icon: Clock, label: 'Duration', value: duration },
    { icon: Users, label: 'Team Size', value: teamSize },
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 overflow-y-auto">
        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 md:mb-8 lg:mb-12 text-white tracking-tight">
            {title}
          </h2>
          
          {/* Info Items Row with Glass Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6 md:mb-8 auto-rows-fr">
            {infoItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-lg md:rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-2.5 sm:p-3 md:p-4 lg:p-5 xl:p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-full">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mb-1.5 sm:mb-2 md:mb-3 lg:mb-4">
                      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5 text-white" strokeWidth={2} />
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-[0.15em] font-semibold mb-1 sm:mb-1.5 md:mb-2">
                      {item.label}
                    </div>
                    <div className="text-sm md:text-base text-white font-medium leading-tight">
                      {item.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Two Column Layout for Overview and Deliverables with Glass Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 auto-rows-fr">
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg md:rounded-xl lg:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg md:rounded-xl lg:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-2 md:gap-2.5 mb-2 md:mb-3">
                  <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xs text-slate-300 uppercase tracking-[0.15em] font-semibold">Overview</h3>
                </div>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed flex-1">{overview}</p>
              </div>
            </div>

            <div className="relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg md:rounded-xl lg:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg md:rounded-xl lg:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-2 md:gap-2.5 mb-2 md:mb-3">
                  <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xs text-slate-300 uppercase tracking-[0.15em] font-semibold">Deliverables</h3>
                </div>
                <ul className="space-y-2 md:space-y-2.5 flex-1">
                  {deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-slate-300 leading-[1.4]">
                      <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-400 mt-2 flex-shrink-0" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}