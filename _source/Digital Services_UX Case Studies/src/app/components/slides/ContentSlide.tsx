import { SlideLayout } from '@/app/components/SlideLayout';
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface ContentItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ContentSlideProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  items?: ContentItem[];
  content?: ReactNode;
  image?: string;
  imagePosition?: 'left' | 'right';
  children?: ReactNode;
}

export function ContentSlide({ 
  title,
  subtitle,
  icon,
  items,
  content, 
  image, 
  imagePosition = 'right',
  children 
}: ContentSlideProps) {
  return (
    <SlideLayout background="bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="h-full flex items-center overflow-y-auto">
        <div className="w-full max-w-[1400px] mx-auto px-16 py-20">
          <div className="mb-16">
            <h2 className="text-4xl mb-3 text-slate-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-base text-slate-600">
                {subtitle}
              </p>
            )}
          </div>

          {items && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 grid-auto-rows-1fr">
              {items.map((item, index) => {
                const Icon = item.icon;
                const gradients = [
                  'from-blue-500 to-cyan-500',
                  'from-violet-500 to-purple-500',
                  'from-emerald-500 to-teal-500',
                  'from-amber-500 to-orange-500',
                ];
                const gradient = gradients[index % gradients.length];
                
                return (
                  <div key={index} className="relative group h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500`} />
                    <div className="relative backdrop-blur-xl bg-white/60 border border-slate-200/60 rounded-2xl p-8 hover:bg-white/80 hover:border-slate-300/60 hover:shadow-xl transition-all duration-300 h-full">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {(content || image) && (
            <div className={`grid grid-cols-2 gap-16 items-center ${imagePosition === 'left' ? 'direction-rtl' : ''}`}>
              <div className={imagePosition === 'left' ? 'text-right' : ''}>
                {content && (
                  <div className="text-xl text-slate-600 leading-relaxed space-y-4">
                    {content}
                  </div>
                )}
                {children}
              </div>
              {image && (
                <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={image} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SlideLayout>
  );
}