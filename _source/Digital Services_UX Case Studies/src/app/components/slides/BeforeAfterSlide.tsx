import { ArrowRight } from 'lucide-react';

interface BeforeAfterItem {
  label: string;
  before: string;
  after: string;
  improvement?: string;
}

interface BeforeAfterSlideProps {
  title: string;
  subtitle?: string;
  items?: BeforeAfterItem[];
  beforeTitle?: string;
  beforePoints?: string[];
  afterTitle?: string;
  afterPoints?: string[];
}

export function BeforeAfterSlide({ title, subtitle, items, beforeTitle, beforePoints, afterTitle, afterPoints }: BeforeAfterSlideProps) {
  // Handle both prop formats
  const hasItemsFormat = items && items.length > 0;
  const hasPointsFormat = beforePoints && afterPoints;
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12 overflow-y-auto">
        <div className="w-full max-w-[1300px] mx-auto">
          <h2 className="text-5xl mb-12 text-white text-center tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-slate-400 text-center mb-12">{subtitle}</p>
          )}
          
          {/* Items format (original) */}
          {hasItemsFormat && (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-xl bg-white/5 rounded-xl p-4 md:p-5 shadow-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="grid grid-cols-[1fr_auto_1fr_auto] gap-6 items-center">
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wide mb-1.5">Before</div>
                      <div className="text-2xl text-rose-400 font-semibold">{item.before}</div>
                    </div>
                    
                    <ArrowRight className="w-7 h-7 text-slate-500" />
                    
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wide mb-1.5">After</div>
                      <div className="text-2xl text-emerald-400 font-semibold">{item.after}</div>
                    </div>
                    
                    {item.improvement && (
                      <div className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-lg border border-emerald-500/30">
                        <div className="text-sm font-medium">{item.improvement}</div>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-base text-slate-300">{item.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Points format (before/after comparison) */}
          {hasPointsFormat && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 auto-rows-fr">
              {/* Before Column */}
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-5 lg:p-6 shadow-lg border border-white/10">
                <h3 className="text-xl lg:text-2xl font-bold text-rose-400 mb-4">{beforeTitle || 'Before'}</h3>
                <ul className="space-y-3">
                  {beforePoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                      <span className="text-slate-300 text-sm lg:text-base leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* After Column */}
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-5 lg:p-6 shadow-lg border border-white/10">
                <h3 className="text-xl lg:text-2xl font-bold text-emerald-400 mb-4">{afterTitle || 'After'}</h3>
                <ul className="space-y-3">
                  {afterPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                      <span className="text-slate-300 text-sm lg:text-base leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}