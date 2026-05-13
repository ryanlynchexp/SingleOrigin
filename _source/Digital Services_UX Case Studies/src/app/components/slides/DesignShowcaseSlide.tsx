import { SlideLayout } from '@/app/components/SlideLayout';

interface DesignShowcaseSlideProps {
  title: string;
  subtitle?: string;
  image: string;
  caption?: string;
}

export function DesignShowcaseSlide({ title, subtitle, image, caption }: DesignShowcaseSlideProps) {
  return (
    <SlideLayout background="bg-slate-900">
      <div className="h-full flex items-center overflow-y-auto">
        <div className="w-full max-w-[1600px] mx-auto px-16 py-20">
          <div className="text-center mb-12">
            <h2 className="text-5xl mb-4 text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-8">
            <img 
              src={image} 
              alt={title}
              className="w-full h-auto object-contain mx-auto"
            />
          </div>
          {caption && (
            <p className="text-center text-slate-400 mt-6 text-lg">
              {caption}
            </p>
          )}
        </div>
      </div>
    </SlideLayout>
  );
}