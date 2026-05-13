import { SlideLayout } from '@/app/components/SlideLayout';
import { ReactNode } from 'react';

interface SplitContentSlideProps {
  title: string;
  leftContent: ReactNode;
  rightContent: ReactNode;
  background?: string;
}

export function SplitContentSlide({ 
  title, 
  leftContent, 
  rightContent,
  background = 'bg-white'
}: SplitContentSlideProps) {
  return (
    <SlideLayout background={background}>
      <div className="h-full flex items-center overflow-y-auto">
        <div className="w-full max-w-[1600px] mx-auto px-16 py-20">
          <h2 className="text-5xl mb-12 text-slate-900 text-center">
            {title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>{leftContent}</div>
            <div>{rightContent}</div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}