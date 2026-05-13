import { SlideLayout } from '@/app/components/SlideLayout';
import { TrendingUp, Users, Clock, Target } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
  icon?: 'trending' | 'users' | 'clock' | 'target';
  change?: string;
}

interface StatsSlideProps {
  title: string;
  stats: Stat[];
  subtitle?: string;
}

const iconMap = {
  trending: TrendingUp,
  users: Users,
  clock: Clock,
  target: Target,
};

export function StatsSlide({ title, stats, subtitle }: StatsSlideProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
        
      <div className="relative h-full flex items-center justify-center px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12 overflow-y-auto">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-1.5 sm:mb-2 md:mb-3 text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-slate-300">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 auto-rows-fr">
            {stats.map((stat, index) => {
              const Icon = stat.icon ? iconMap[stat.icon] : null;
              const gradients = [
                'from-blue-500 to-cyan-500',
                'from-violet-500 to-purple-500',
                'from-emerald-500 to-teal-500',
                'from-amber-500 to-orange-500',
              ];
              const gradient = gradients[index % gradients.length];
              
              return (
                <div key={index} className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 rounded-xl md:rounded-2xl blur-xl transition-opacity duration-500`} />
                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl">
                    {Icon && (
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 sm:mb-4 md:mb-5 shadow-lg`}>
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" strokeWidth={2} />
                      </div>
                    )}
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1.5 sm:mb-2 md:mb-3 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 font-medium mb-1 sm:mb-2">
                      {stat.label}
                    </div>
                    {stat.change && (
                      <div className={`inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r ${gradient} text-white mt-2 sm:mt-3`}>
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        {stat.change}
                      </div>
                    )}
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