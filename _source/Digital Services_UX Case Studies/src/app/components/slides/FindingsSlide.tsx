import { SlideLayout } from '@/app/components/SlideLayout';
import { AlertTriangle, Clock, Users, TrendingDown, CheckCircle, Target } from 'lucide-react';

interface FindingsSlideProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
  findings: {
    title: string;
    description: string;
    recommendation: string;
  }[];
  stats?: {
    value: string;
    label: string;
    icon?: 'alert' | 'clock' | 'users' | 'trending' | 'target';
  }[];
}

export function FindingsSlide({ title, subtitle, heroImage, findings, stats }: FindingsSlideProps) {
  const iconMap = {
    alert: AlertTriangle,
    clock: Clock,
    users: Users,
    trending: TrendingDown,
    target: Target,
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12 overflow-y-auto">
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-4 sm:mb-6 md:mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300">
                {subtitle}
              </p>
            )}
          </div>

          {/* Key Stats Row - if stats exist */}
          {stats && stats.length > 0 && (
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h3 className="text-[10px] text-slate-400 uppercase tracking-[0.15em] font-semibold mb-3 sm:mb-4 md:mb-6">
                Quantitative
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 auto-rows-fr">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon ? iconMap[stat.icon] : AlertTriangle;
                  return (
                    <div
                      key={idx}
                      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-rose-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 text-red-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-0.5 sm:mb-1 tracking-tight">
                            {stat.value}
                          </div>
                          <div className="text-[10px] sm:text-xs text-slate-300 leading-tight">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Main Content: Hero Image + Findings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 items-start">
            {/* Left: Hero Image */}
            {heroImage && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <img 
                    src={heroImage} 
                    alt="Research context"
                    className="w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] xl:h-[340px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                </div>
              </div>
            )}

            {/* Right: Findings List */}
            <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
              <h3 className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-[0.15em] font-semibold mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                Qualitative
              </h3>
              {findings.map((finding, idx) => (
                <div key={idx}>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 sm:mb-1.5 md:mb-2">
                    {finding.title}
                  </h3>
                  <div className="flex items-start gap-1.5 sm:gap-2 mb-2 sm:mb-2.5 md:mb-3">
                    <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {finding.description}
                    </p>
                  </div>
                  
                  {/* Recommendation - simple with small icon */}
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {finding.recommendation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}