import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface CaseStudy {
  title: string;
  categories: string[];
  slideNumber: number;
  onNavigate: () => void;
}

interface CaseStudyIndexSlideProps {
  title: string;
  subtitle: string;
  caseStudies: CaseStudy[];
}

export function CaseStudyIndexSlide({ title, subtitle, caseStudies }: CaseStudyIndexSlideProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex flex-col items-center justify-start px-3 sm:px-6 md:px-10 lg:px-14 xl:px-24 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 tracking-tight">
            {title}
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-slate-300 max-w-3xl mx-auto px-2 sm:px-4">
            {subtitle}
          </p>
        </motion.div>

        {/* Case Study Index */}
        <div className="w-full max-w-5xl space-y-2 sm:space-y-2.5 md:space-y-3">
          {caseStudies.map((study, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={study.onNavigate}
              className="group w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-left"
            >
              <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
                {/* Left: Number badge */}
                <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                  <span className="text-base sm:text-lg md:text-xl font-bold text-white index-number">{index + 1}</span>
                </div>

                {/* Middle: Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-1.5 group-hover:text-blue-300 transition-colors">
                    {study.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {study.categories.map((category, catIndex) => (
                      <span
                        key={catIndex}
                        className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs md:text-sm font-medium bg-white/10 text-slate-300 border border-white/10"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Page number and arrow */}
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mb-0.5">Page</div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-white page-number">{study.slideNumber}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}