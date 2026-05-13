import { SlideLayout } from '@/app/components/SlideLayout';
import { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGridSlideProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export function FeatureGridSlide({ title, subtitle, features }: FeatureGridSlideProps) {
  return (
    <SlideLayout background="bg-white">
      <div className="h-full flex items-center overflow-y-auto">
        <div className="w-full max-w-[1400px] mx-auto px-16 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4 text-slate-900">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-slate-600">
                {subtitle}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-shadow border border-slate-200"
                >
                  <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-2xl text-slate-900 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}