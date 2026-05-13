import { SlideLayout } from '@/app/components/SlideLayout';

interface TitleSlideProps {
  title: string;
  subtitle?: string;
  category?: string | string[];
  backgroundImage?: string;
}

export function TitleSlide({ title, subtitle, category, backgroundImage }: TitleSlideProps) {
  // Convert category to array if it's a string
  const categories = category 
    ? (Array.isArray(category) ? category : [category])
    : [];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      <div className="relative z-10 h-full flex items-center justify-start px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto text-center">
          {categories.length > 0 && (
            <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3">
              {categories.map((cat, index) => (
                <span 
                  key={index}
                  className="inline-block px-2.5 sm:px-3 md:px-3.5 lg:px-4 py-1 sm:py-1.5 md:py-1.75 lg:py-2 bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-xs md:text-sm tracking-wider uppercase rounded-full border border-white/20"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-3 sm:mb-4 md:mb-5 lg:mb-6 tracking-tight text-white px-2 sm:px-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-slate-300 px-2 sm:px-4">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}