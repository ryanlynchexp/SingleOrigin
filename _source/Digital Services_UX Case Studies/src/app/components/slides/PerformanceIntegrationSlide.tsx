import { TrendingUp, Users, Target, ArrowRight, Clock, Zap, CheckCircle, LucideIcon } from 'lucide-react';

interface PerformanceItem {
  label: string;
  before: string;
  after: string;
  improvement: string;
}

interface IntegrationStat {
  value: string;
  label: string;
  icon: LucideIcon;
  gradient: string;
}

interface PerformanceIntegrationSlideProps {
  title: string;
  subtitle?: string;
  performanceItems?: PerformanceItem[];
  stats?: IntegrationStat[];
}

export function PerformanceIntegrationSlide({ title, subtitle, performanceItems = [], stats = [] }: PerformanceIntegrationSlideProps) {

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex items-center justify-center px-12 py-16 overflow-y-auto">
        <div className="w-full max-w-[1000px] mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl mb-2 text-white tracking-tight">{title}</h2>
            {subtitle && <p className="text-sm text-slate-400 uppercase tracking-wider">{subtitle}</p>}
          </div>

          {/* Integration Success */}
          <div className="mb-8">
            <h3 className="text-lg text-slate-300 mb-4 text-center uppercase tracking-wider">Integration Success</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`} />
                    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1 tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-300">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Improvements */}
          <div>
            <h3 className="text-lg text-slate-300 mb-4 text-center uppercase tracking-wider">Performance Improvements</h3>
            <div className="space-y-2.5">
              {performanceItems.map((item, index) => (
                <div 
                  key={index}
                  className="group flex items-center justify-between py-3 px-4 border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                >
                  <div className="flex-1 text-slate-200 tracking-wide">{item.label}</div>
                  <div className="flex items-center gap-6">
                    <div className="text-rose-300/70 tabular-nums text-right min-w-[80px]">{item.before}</div>
                    <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" strokeWidth={2} />
                    <div className="text-emerald-300 font-medium tabular-nums text-left min-w-[80px]">{item.after}</div>
                    <div className="text-emerald-400 text-sm font-medium min-w-[110px] text-right tabular-nums">
                      {item.improvement}
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