import { SlideLayout } from '@/app/components/SlideLayout';

interface FullImageSlideProps {
  image: string;
  title?: string;
  subtitle?: string;
  overlayPosition?: 'center' | 'bottom-left' | 'bottom' | 'top-left';
}

export function FullImageSlide({ 
  image, 
  title, 
  subtitle,
  overlayPosition = 'center'
}: FullImageSlideProps) {
  const positionClasses = {
    'center': 'items-center justify-center text-center',
    'bottom-left': 'items-end justify-start pb-20 pl-16 text-left',
    'bottom': 'items-end justify-center pb-20 text-center',
    'top-left': 'items-start justify-start pt-20 pl-16 text-left',
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80" />
      </div>
      
      {(title || subtitle) && (
        <div className={`relative z-10 h-full flex ${positionClasses[overlayPosition as keyof typeof positionClasses] || positionClasses.center} px-16`}>
          <div className="max-w-4xl">
            {title && (
              <h2 className="text-6xl text-white mb-4 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-2xl text-slate-300">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}