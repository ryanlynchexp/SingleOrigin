import { SlideLayout } from '@/app/components/SlideLayout';
import { Quote } from 'lucide-react';

interface QuoteSlideProps {
  quote: string;
  title: string;
  company: string;
  image?: string;
}

export function QuoteSlide({ quote, title, company, image }: QuoteSlideProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex items-center justify-center px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-12 md:py-16 lg:py-20 overflow-y-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Quote icon with glass morphism */}
          <div className="inline-flex w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 items-center justify-center mb-3 sm:mb-4 md:mb-6 lg:mb-8">
            <Quote className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-blue-400" />
          </div>
          
          <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-white mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10 leading-relaxed font-light px-2 sm:px-4">
            "{quote}"
          </blockquote>
          
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4">
            {image && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur opacity-50" />
                <img 
                  src={image} 
                  alt={title}
                  className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover border-2 border-white/20"
                />
              </div>
            )}
            <div className="text-center">
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-medium">
                {title}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-slate-300">
                {company}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}