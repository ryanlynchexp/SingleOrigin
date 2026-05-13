import { SlideLayout } from '@/app/components/SlideLayout';
import { CheckCircle, XCircle, AlertCircle, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface FlowNode {
  id: string;
  label: string;
  percentage?: number;
  type: 'start' | 'action' | 'decision' | 'success' | 'dropoff' | 'sticky';
  dropoffRate?: number;
  stickiness?: number;
  children?: FlowNode[];
  showcaseComponent?: React.ReactNode;
}

interface UserFlowChartSlideProps {
  title: string;
  subtitle?: string;
  flowData: FlowNode;
  accentColor?: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose';
}

export function UserFlowChartSlide({ 
  title, 
  subtitle,
  flowData,
  accentColor = 'emerald'
}: UserFlowChartSlideProps) {
  const [activeShowcase, setActiveShowcase] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const colorMap = {
    emerald: {
      gradient: 'from-emerald-600 to-teal-700',
      glow: 'from-emerald-900/20',
      accent: 'emerald',
    },
    blue: {
      gradient: 'from-blue-600 to-indigo-700',
      glow: 'from-blue-900/20',
      accent: 'blue',
    },
    purple: {
      gradient: 'from-purple-600 to-violet-700',
      glow: 'from-purple-900/20',
      accent: 'purple',
    },
    amber: {
      gradient: 'from-amber-500 to-orange-600',
      glow: 'from-amber-900/20',
      accent: 'amber',
    },
    rose: {
      gradient: 'from-rose-600 to-pink-700',
      glow: 'from-rose-900/20',
      accent: 'rose',
    },
  };

  const theme = colorMap[accentColor];

  // Collect all showcase nodes
  const showcaseNodes: FlowNode[] = [];
  const collectShowcaseNodes = (node: FlowNode) => {
    if (node.showcaseComponent) {
      showcaseNodes.push(node);
    }
    node.children?.forEach(collectShowcaseNodes);
  };
  collectShowcaseNodes(flowData);

  // Handle scroll to detect which showcase node is in view
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      // Mark that user has scrolled
      if (!hasScrolled && scrollContainerRef.current.scrollTop > 0) {
        setHasScrolled(true);
      }

      const containerRect = scrollContainerRef.current.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      let closestNode: string | null = null;
      let closestDistance = Infinity;

      showcaseNodes.forEach(node => {
        const element = nodeRefs.current[node.id];
        if (element) {
          const rect = element.getBoundingClientRect();
          const nodeCenter = rect.top + rect.height / 2;
          const distance = Math.abs(nodeCenter - centerY);

          if (distance < closestDistance && distance < containerRect.height / 2) {
            closestDistance = distance;
            closestNode = node.id;
          }
        }
      });

      setActiveShowcase(closestNode);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasScrolled]);

  const setNodeRef = (id: string, element: HTMLDivElement | null) => {
    nodeRefs.current[id] = element;
  };

  const renderNode = (node: FlowNode, level: number = 0, isLast: boolean = true) => {
    const isActive = activeShowcase === node.id;
    const hasShowcase = !!node.showcaseComponent;

    const getNodeStyle = () => {
      const baseStyles = (() => {
        switch (node.type) {
          case 'start':
            return 'bg-gradient-to-br from-slate-600 to-slate-700 border-slate-500/50 text-white';
          case 'success':
          case 'sticky':
            return `bg-gradient-to-br from-${theme.accent}-600 to-${theme.accent}-700 border-${theme.accent}-500/50 text-white shadow-lg shadow-${theme.accent}-500/20`;
          case 'dropoff':
            return 'bg-gradient-to-br from-rose-500/20 to-rose-600/10 border-rose-400/40 text-rose-300';
          case 'decision':
            return 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-400/40 text-amber-200';
          default:
            return 'bg-white/5 border-white/20 text-slate-200';
        }
      })();

      // Add hero styling if this node is active and has a showcase
      if (isActive && hasShowcase) {
        return `${baseStyles} ring-4 ring-${theme.accent}-400/60 shadow-2xl shadow-${theme.accent}-500/40 scale-105`;
      }

      return baseStyles;
    };

    return (
      <div key={node.id} className="relative">
        <div className="flex items-center gap-2.5">
          {/* Node */}
          <div 
            ref={hasShowcase ? (el) => setNodeRef(node.id, el) : undefined}
            className={`relative px-3 py-2 rounded-lg border backdrop-blur-md ${getNodeStyle()} min-w-[160px] shadow-lg transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <div className="text-xs font-semibold mb-0.5">{node.label}</div>
                {node.percentage !== undefined && (
                  <div className="text-[10px] opacity-80">{node.percentage}%</div>
                )}
              </div>
              
              {/* Metrics Badge */}
              {node.dropoffRate !== undefined && node.dropoffRate > 0 && (
                <div className="flex items-center gap-0.5 bg-rose-500/30 px-1.5 py-0.5 rounded">
                  <TrendingDown className="w-2.5 h-2.5 text-rose-300" />
                  <span className="text-[9px] font-bold text-rose-200">-{node.dropoffRate}%</span>
                </div>
              )}
              
              {node.stickiness !== undefined && node.stickiness > 0 && (
                <div className="flex items-center gap-0.5 bg-emerald-500/30 px-1.5 py-0.5 rounded">
                  <TrendingUp className="w-2.5 h-2.5 text-emerald-300" />
                  <span className="text-[9px] font-bold text-emerald-200">+{node.stickiness}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Arrow to children */}
          {node.children && node.children.length > 0 && (
            <ArrowRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
          )}
        </div>

        {/* Children */}
        {node.children && node.children.length > 0 && (
          <div className="ml-8 mt-2.5 space-y-2.5 relative">
            {/* Vertical connector line for multiple children */}
            {node.children.length > 1 && (
              <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-slate-600 via-slate-500 to-slate-600"></div>
            )}
            
            {node.children.map((child, idx) => (
              <div key={child.id} className="relative">
                {/* Horizontal connector */}
                {node.children && node.children.length > 1 && (
                  <div className="absolute left-0 top-1/2 w-6 h-px bg-slate-500"></div>
                )}
                <div className={node.children && node.children.length > 1 ? 'ml-6' : ''}>
                  {renderNode(child, level + 1, idx === node.children.length - 1)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${theme.glow} via-transparent to-transparent`} />
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] ${theme.glow} via-transparent to-transparent`} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex flex-col px-12 py-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-5xl mb-3 text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-slate-300 mb-4">
              {subtitle}
            </p>
          )}
          
          {/* Legend */}
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-emerald-600 to-emerald-700"></div>
              <span>High engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-400/40"></div>
              <span>Drop-off point</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-rose-400" />
              <span>User loss</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Retention improvement</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex-1 flex gap-8 overflow-hidden">
          {/* Left Side - Scrollable Flow Chart */}
          <div className="relative w-1/2">
            {/* Animated indicator overlay - positioned over scrollbar */}
            {!hasScrolled && (
              <div className="absolute top-0 right-0 w-[16px] h-full pointer-events-none z-50">
                <div className="scrollbar-nudge-indicator"></div>
              </div>
            )}
            
            <div 
              ref={scrollContainerRef}
              className={`w-full h-full overflow-y-scroll relative scroll-hint-container ${!hasScrolled ? 'custom-scrollbar-animated' : 'custom-scrollbar'}`}
            >
              {/* Scroll to explore hint - Top Right */}
              <div className="absolute top-2 right-6 z-30 pointer-events-none">
                <div className="text-xs text-slate-400 opacity-70 flex items-center gap-2">
                  <span>Scroll to explore</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-bounce">
                    <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div className="py-4 pb-[300px]">
                {renderNode(flowData)}
              </div>
            </div>
            
            {/* Bottom Fade Gradient - Fixed position, suggests more content */}
            <div 
              className="fixed bottom-0 left-0 h-32 pointer-events-none z-20"
              style={{
                width: 'calc(50% + 1rem)',
                background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.6) 40%, rgba(15, 23, 42, 0.95) 100%)',
                animation: 'fadeHintPulse 3s ease-in-out infinite'
              }}
            />

            <style>{`
              @keyframes fadeHintPulse {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: 0.6;
                }
              }
            `}</style>
          </div>

          {/* Right Side - Fixed Showcase Area */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              {activeShowcase ? (
                <div className="w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out">
                  {showcaseNodes.find(n => n.id === activeShowcase)?.showcaseComponent}
                </div>
              ) : (
                <div className="text-center text-slate-400">
                  <p className="text-lg">Scroll to explore optimizations</p>
                  <p className="text-sm mt-2">Intervention points will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Scrollbar base */
        .custom-scrollbar::-webkit-scrollbar,
        .custom-scrollbar-animated::-webkit-scrollbar {
          width: 16px;
          background: #1e293b;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track,
        .custom-scrollbar-animated::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, rgba(51, 65, 85, 0.4), rgba(51, 65, 85, 0.8));
          border-radius: 8px;
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }
        
        /* Static scrollbar thumb (after scroll) - using borders to eat space */
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #64748b, #475569);
          background-clip: padding-box;
          border-radius: 8px;
          border-top: 60px solid transparent;
          border-bottom: 60px solid transparent;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #94a3b8, #64748b);
          background-clip: padding-box;
        }
        
        /* Animated state - gradient blue with border spacing */
        .custom-scrollbar-animated::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb);
          background-clip: padding-box;
          border-radius: 8px;
          border-top: 60px solid transparent;
          border-bottom: 60px solid transparent;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          box-shadow: 
            0 0 12px rgba(59, 130, 246, 0.5),
            0 0 24px rgba(59, 130, 246, 0.3),
            inset 0 0 8px rgba(147, 197, 253, 0.4);
        }
        
        /* Animated overlay that sits on top of scrollbar */
        .scrollbar-nudge-indicator {
          position: absolute;
          top: 20px;
          right: 3px;
          width: 10px;
          height: 100px;
          background: linear-gradient(to bottom,
            rgba(96, 165, 250, 0) 0%,
            rgba(96, 165, 250, 0.8) 20%,
            rgba(59, 130, 246, 1) 50%,
            rgba(96, 165, 250, 0.8) 80%,
            rgba(96, 165, 250, 0) 100%
          );
          border-radius: 5px;
          animation: scrollbarNudgeGlow 2s ease-in-out infinite;
          filter: blur(1px);
        }
        
        @keyframes scrollbarNudgeGlow {
          0% {
            opacity: 0.6;
            transform: translateY(0px);
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
          }
          25% {
            transform: translateY(6px);
          }
          50% {
            opacity: 1;
            transform: translateY(0px);
            box-shadow: 
              0 0 20px rgba(59, 130, 246, 0.8),
              0 0 40px rgba(59, 130, 246, 0.4);
          }
          75% {
            transform: translateY(-6px);
          }
          100% {
            opacity: 0.6;
            transform: translateY(0px);
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
          }
        }
      `}</style>
    </div>
  );
}
