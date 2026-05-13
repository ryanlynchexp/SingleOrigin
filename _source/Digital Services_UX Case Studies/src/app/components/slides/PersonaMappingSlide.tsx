import { SlideLayout } from '@/app/components/SlideLayout';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface PersonaCardProps {
  name: string;
  age?: string;
  role: string;
  goals?: string[];
  painPoints?: string[];
  needs?: string[];
  traits?: { label: string; value: number }[];
  insight?: string;
  description?: string;
  avatar?: string;
  color?: string;
}

interface PersonaMappingSlideProps {
  title: string;
  subtitle?: string;
  personas: PersonaCardProps[];
}

export function PersonaMappingSlide({ title, subtitle, personas }: PersonaMappingSlideProps) {
  const colorMap: Record<string, { gradient: string; badge: string; checkIcon: string; xIcon: string }> = {
    blue: { gradient: 'from-blue-500 to-cyan-500', badge: 'bg-gradient-to-br from-blue-500 to-cyan-500', checkIcon: 'text-green-400', xIcon: 'text-rose-400' },
    purple: { gradient: 'from-purple-500 to-violet-500', badge: 'bg-gradient-to-br from-purple-500 to-violet-500', checkIcon: 'text-green-400', xIcon: 'text-rose-400' },
    emerald: { gradient: 'from-emerald-500 to-teal-500', badge: 'bg-gradient-to-br from-emerald-500 to-teal-500', checkIcon: 'text-green-400', xIcon: 'text-rose-400' },
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12 overflow-y-auto">
        <div className="w-full max-w-[1500px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-5xl mb-3 text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-slate-300">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex gap-4 justify-center max-w-full">
            {personas.map((persona, index) => {
              const colors = colorMap[persona.color || 'blue'] || colorMap.blue;
              const displayGoals = persona.goals || persona.needs || [];
              const displayPainPoints = persona.painPoints || [];
              const headshots = [
                'https://images.unsplash.com/photo-1652471949169-9c587e8898cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY5NTg1NTM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
                'https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2OTU5NTE1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
                'https://images.unsplash.com/photo-1758691737644-ef8be18256c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW5hZ2VyJTIwaGVhZHNob3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk2MzczOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
                'https://images.unsplash.com/photo-1758599543154-76ec1c4257df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBleGVjdXRpdmUlMjBoZWFkc2hvdHxlbnwxfHx8fDE3Njk2MzczOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
                'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTU4MzY2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
              ];
              return (
                <div 
                  key={index}
                  className="relative group flex-1 min-w-[180px] max-w-[220px] flex"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 rounded-xl blur-xl transition-opacity duration-500`} />
                  <div className="relative h-full flex flex-col backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/[0.07] hover:border-white/20 transition-all shadow-2xl">
                    {/* Header with avatar and name */}
                    <div className="bg-gradient-to-b from-white/[0.08] to-transparent p-3 border-b border-white/5 flex-shrink-0">
                      <div className="flex flex-col items-center text-center gap-2">
                        <ImageWithFallback 
                          src={persona.avatar || headshots[index]}
                          alt={persona.name}
                          className="w-16 h-16 rounded-full object-cover ring-2 ring-white/20"
                        />
                        <div>
                          <h3 className="text-sm text-white font-semibold leading-tight">
                            {persona.name}
                          </h3>
                          <div className="text-[10px] text-slate-400 mt-0.5">{persona.role}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 space-y-3 flex-grow">
                      {/* Key insight or description */}
                      {(persona.insight || persona.description) && (
                        <div className="py-1.5 border-l-2 border-white/20 pl-2">
                          <p className="text-[9px] text-slate-300 italic leading-relaxed">
                            "{persona.insight || persona.description}"
                          </p>
                        </div>
                      )}

                      {/* Goals / Needs */}
                      {displayGoals.length > 0 && (
                        <div>
                          <h4 className="text-[9px] uppercase tracking-widest text-slate-400 mb-1.5">{persona.needs ? 'Needs' : 'Goals'}</h4>
                          <ul className="space-y-1">
                            {displayGoals.slice(0, 2).map((goal, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-[9px] text-slate-300 leading-[1.4]">
                                <div className="w-0.5 h-0.5 rounded-full border border-slate-400 mt-[3px] flex-shrink-0" />
                                <span>{goal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Pain Points */}
                      {displayPainPoints.length > 0 && (
                        <div>
                          <h4 className="text-[9px] uppercase tracking-widest text-slate-400 mb-1.5">Pain Points</h4>
                          <ul className="space-y-1">
                            {displayPainPoints.slice(0, 2).map((pain, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-[9px] text-slate-300 leading-[1.4]">
                                <div className="w-0.5 h-0.5 rounded-full border border-slate-400 mt-[3px] flex-shrink-0" />
                                <span>{pain}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}