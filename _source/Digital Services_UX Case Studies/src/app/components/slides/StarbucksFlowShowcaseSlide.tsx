import { SlideLayout } from '@/app/components/SlideLayout';
import { Star, Gift, Coffee, Sparkles, MapPin, Clock, CheckCircle, Bell, Zap, Home, Search, QrCode, User } from 'lucide-react';

interface PopoutComponent {
  title: string;
  description: string;
  color?: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose';
  component: React.ReactNode;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
}

interface StarbucksFlowShowcaseSlideProps {
  title: string;
  subtitle?: string;
  accentColor?: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose';
  popoutComponents?: PopoutComponent[];
}

export function StarbucksFlowShowcaseSlide({ 
  title, 
  subtitle, 
  accentColor = 'emerald',
  popoutComponents = []
}: StarbucksFlowShowcaseSlideProps) {
  const colorMap = {
    emerald: {
      gradient: 'from-emerald-600 to-teal-700',
      glow: 'from-emerald-900/20',
    },
    blue: {
      gradient: 'from-blue-600 to-indigo-700',
      glow: 'from-blue-900/20',
    },
    purple: {
      gradient: 'from-purple-600 to-violet-700',
      glow: 'from-purple-900/20',
    },
    amber: {
      gradient: 'from-amber-500 to-orange-600',
      glow: 'from-amber-900/20',
    },
    rose: {
      gradient: 'from-rose-600 to-pink-700',
      glow: 'from-rose-900/20',
    },
  };

  const theme = colorMap[accentColor];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${theme.glow} via-transparent to-transparent`} />
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] ${theme.glow} via-transparent to-transparent`} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex px-16 py-12 gap-12">
        {/* Left Side - Text Content Block */}
        <div className="w-[42%] flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-5xl mb-4 text-white tracking-tight leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-slate-300 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Key Metrics - Minimal Horizontal Row */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">82%</div>
                <div className="text-xs text-slate-400">Completion</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">4.2m</div>
                <div className="text-xs text-slate-400">Session</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">67%</div>
                <div className="text-xs text-slate-400">Redemption</div>
              </div>
            </div>
          </div>

          {/* Key Design Insights */}
          <div className="space-y-5 pt-4 border-t border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/15 to-emerald-600/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Star className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white mb-1">Visual Gamification</div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Star-based gamification system with clear visual indicators showing exactly how close users are to their next reward. The progress bar and star visualization creates positive reinforcement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/15 to-blue-600/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white mb-1">AI Personalization</div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  AI-driven recommendations based on purchase history, time of day, and location data. Increases offer redemption rates by 240% compared to generic promotions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - App Demo Interface */}
        <div className="flex-1 relative flex items-center justify-center">
          {/* Vibrant background elements to enable backdrop-filter */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/80 rounded-full blur-3xl" />
            <div className="absolute top-20 right-0 w-[450px] h-[450px] bg-blue-500/70 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-20 w-[400px] h-[400px] bg-purple-500/75 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-[420px] h-[420px] bg-rose-500/65 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-amber-500/60 rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-cyan-500/70 rounded-full blur-3xl" />
          </div>

          {/* Mobile Phone Frame - Center Stage */}
          <div className="relative z-10 scale-[0.7] py-[100px]">
            {/* Phone mockup */}
            <div className="w-[380px] h-[760px] bg-gradient-to-br from-slate-950 to-slate-900 rounded-[3.5rem] border-[10px] border-slate-800 shadow-2xl overflow-hidden relative">
              {/* Status bar */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/50 to-transparent z-50 flex items-center justify-between px-10 pt-3">
                <span className="text-white text-sm font-semibold">9:41</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-4 border border-white rounded-sm"></div>
                  <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                </div>
              </div>

              {/* App Header */}
              <div className="absolute top-12 left-0 right-0 bg-emerald-700 px-6 py-5 z-40">
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <div className="text-sm opacity-90">Good morning, Sarah ☕</div>
                    <div className="text-2xl font-bold mt-0.5">125★ Rewards</div>
                  </div>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* App Content - Scrollable Area */}
              <div className="absolute top-36 left-0 right-0 bottom-20 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-4">
                {/* Quick Actions Row - Interactive icons */}
                <div className="mb-5">
                  <div className="text-xs font-semibold text-slate-600 mb-3 uppercase tracking-wide">Quick Actions</div>
                  <div className="grid grid-cols-4 gap-3">
                    {/* Rewards Icon */}
                    <div className="flex flex-col items-center gap-2 relative group cursor-pointer">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                        <Star className="w-7 h-7 text-white fill-white" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700">Rewards</span>
                    </div>

                    {/* Offers Icon */}
                    <div className="flex flex-col items-center gap-2 cursor-pointer group">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                        <Gift className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700">Offers</span>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">2</div>
                    </div>

                    {/* Order Icon */}
                    <div className="flex flex-col items-center gap-2 cursor-pointer group">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                        <Coffee className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700">Order</span>
                    </div>

                    {/* Stores Icon */}
                    <div className="flex flex-col items-center gap-2 cursor-pointer group">
                      <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700">Stores</span>
                    </div>
                  </div>
                </div>

                {/* For You Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">For You</div>
                    <div className="text-xs text-emerald-600 font-semibold">See All →</div>
                  </div>
                  
                  {/* Placeholder cards that look like they're in the feed - with content swaps */}
                  <div className="space-y-3">
                    {/* Card 1 - Swaps at 3s */}
                    <div 
                      className="bg-white rounded-2xl p-4 shadow-md border border-slate-200/50"
                      style={{
                        animation: 'contentFadeSwap1 18s ease-in-out 0s infinite'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-slate-200 rounded w-3/4 mb-2"></div>
                          <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>

                    {/* Card 2 - Swaps at 7s */}
                    <div 
                      className="bg-white rounded-2xl p-4 shadow-md border border-slate-200/50"
                      style={{
                        animation: 'contentFadeSwap2 18s ease-in-out 0s infinite'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-slate-200 rounded w-2/3 mb-2"></div>
                          <div className="h-2 bg-slate-100 rounded w-1/3"></div>
                        </div>
                      </div>
                    </div>

                    {/* Card 3 - Slides in at 11s */}
                    <div 
                      className="bg-white rounded-2xl p-4 shadow-md border border-slate-200/50"
                      style={{
                        animation: 'slideInNewCard 18s ease-in-out 0s infinite'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-slate-200 rounded w-3/5 mb-2"></div>
                          <div className="h-2 bg-slate-100 rounded w-2/5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-200 flex items-center justify-around px-6 z-40">
                <div className="flex flex-col items-center gap-1">
                  <Home className="w-6 h-6 text-emerald-600" />
                  <span className="text-[9px] font-semibold text-emerald-600">Home</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-50">
                  <Search className="w-6 h-6 text-slate-600" />
                  <span className="text-[9px] font-medium text-slate-600">Order</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-50">
                  <QrCode className="w-6 h-6 text-slate-600" />
                  <span className="text-[9px] font-medium text-slate-600">Scan</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-50">
                  <Gift className="w-6 h-6 text-slate-600" />
                  <span className="text-[9px] font-medium text-slate-600">Rewards</span>
                </div>
              </div>
            </div>

            {/* Popup Cards - Timed Choreography: Emerge from phone, display, then return - INFINITE LOOP */}
            
            {/* Card 1 - Rewards Progress (emerges from Rewards icon: 0s-5s, loops every 18s) */}
            <div 
              className="absolute top-[15%] left-[-45%] w-[280px] z-50"
              style={{ 
                animation: 'card1Sequence 18s ease-in-out 0s infinite',
                opacity: 0,
                transformOrigin: 'right center'
              }}
            >
              <div className="relative">
                <svg className="absolute top-8 left-full w-32 h-2" style={{ zIndex: -1 }}>
                  <line x1="0" y1="1" x2="128" y2="1" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="4,4" />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>{popoutComponents[0]?.component}</div>
              </div>
            </div>

            {/* Card 2 - Personalized Offers (emerges from Offers icon: 1.5s-6s) */}
            <div 
              className="absolute top-[8%] right-[-42%] w-[260px] z-50"
              style={{ 
                animation: 'card2Sequence 18s ease-in-out 0s infinite',
                opacity: 0,
                transformOrigin: 'left center'
              }}
            >
              <div className="relative">
                <svg className="absolute top-12 right-full w-32 h-2" style={{ zIndex: -1 }}>
                  <line x1="0" y1="1" x2="128" y2="1" stroke="url(#gradient2)" strokeWidth="2" strokeDasharray="4,4" />
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>{popoutComponents[1]?.component}</div>
              </div>
            </div>

            {/* Card 3 - Reorder Usual (emerges from Order icon: 5s-8.5s) */}
            <div 
              className="absolute top-[40%] left-[-38%] w-[240px] z-45"
              style={{ 
                animation: 'card3Sequence 18s ease-in-out 0s infinite',
                opacity: 0,
                transformOrigin: 'right center'
              }}
            >
              <div className="relative">
                <svg className="absolute top-4 left-full w-24 h-2" style={{ zIndex: -1 }}>
                  <line x1="0" y1="1" x2="96" y2="1" stroke="url(#gradient3)" strokeWidth="2" strokeDasharray="4,4" />
                  <defs>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>{popoutComponents[2]?.component}</div>
              </div>
            </div>

            {/* Card 4 - Order Tracking (emerges from Order icon: 6.5s-10.5s) */}
            <div 
              className="absolute top-[35%] right-[-45%] w-[290px] z-45"
              style={{ 
                animation: 'card4Sequence 18s ease-in-out 0s infinite',
                opacity: 0,
                transformOrigin: 'left center'
              }}
            >
              <div className="relative">
                <svg className="absolute top-8 right-full w-28 h-2" style={{ zIndex: -1 }}>
                  <line x1="0" y1="1" x2="112" y2="1" stroke="url(#gradient4)" strokeWidth="2" strokeDasharray="4,4" />
                  <defs>
                    <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>{popoutComponents[4]?.component}</div>
              </div>
            </div>

            {/* Card 5 - Store Finder (emerges from Stores icon: 9s-12.5s) */}
            <div 
              className="absolute bottom-[18%] left-[-42%] w-[280px] z-45"
              style={{ 
                animation: 'card5Sequence 18s ease-in-out 0s infinite',
                opacity: 0,
                transformOrigin: 'right bottom'
              }}
            >
              <div className="relative">
                <svg className="absolute top-6 left-full w-28 h-2" style={{ zIndex: -1 }}>
                  <line x1="0" y1="1" x2="112" y2="1" stroke="url(#gradient5)" strokeWidth="2" strokeDasharray="4,4" />
                  <defs>
                    <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>{popoutComponents[5]?.component}</div>
              </div>
            </div>

            {/* Snackbar Notification Stack - Staggered alerts (11s-17.5s) */}
            <div className="absolute bottom-[22%] right-[-38%] w-[240px] z-60">
              {/* Alert 1 - Reward Expiring */}
              <div 
                style={{ 
                  animation: 'snackbar1Sequence 18s ease-in-out 0s infinite',
                  opacity: 0,
                  position: 'absolute',
                  width: '100%',
                  top: 0
                }}
              >
                {popoutComponents[3]?.component}
              </div>

              {/* Alert 2 - New Seasonal */}
              <div 
                style={{ 
                  animation: 'snackbar2Sequence 18s ease-in-out 0s infinite',
                  opacity: 0,
                  position: 'absolute',
                  width: '100%',
                  top: 0
                }}
              >
                {popoutComponents[6]?.component}
              </div>

              {/* Alert 3 - Order Ready */}
              <div 
                style={{ 
                  animation: 'snackbar3Sequence 18s ease-in-out 0s infinite',
                  opacity: 0,
                  position: 'absolute',
                  width: '100%',
                  top: 0
                }}
              >
                {popoutComponents[7]?.component}
              </div>

              {/* Alert 4 - Double Stars */}
              <div 
                style={{ 
                  animation: 'snackbar4Sequence 18s ease-in-out 0s infinite',
                  opacity: 0,
                  position: 'absolute',
                  width: '100%',
                  top: 0
                }}
              >
                {popoutComponents[8]?.component}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        /* === CARD SEQUENCE ANIMATIONS (18s loop) === */
        
        /* Card 1: 0s-5s (0%-27.8%) */
        @keyframes card1Sequence {
          0% {
            opacity: 0;
            transform: translate(320px, 0px) scale(0) rotate(-15deg);
          }
          4.4% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          23.9% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          27.8% {
            opacity: 0;
            transform: translate(320px, 0px) scale(0) rotate(-15deg);
          }
          100% {
            opacity: 0;
            transform: translate(320px, 0px) scale(0) rotate(-15deg);
          }
        }

        /* Card 2: 1.5s-6s (8.3%-33.3%) */
        @keyframes card2Sequence {
          0%, 8.3% {
            opacity: 0;
            transform: translate(-280px, -50px) scale(0) rotate(12deg);
          }
          12.8% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          29.4% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          33.3% {
            opacity: 0;
            transform: translate(-280px, -50px) scale(0) rotate(12deg);
          }
          100% {
            opacity: 0;
            transform: translate(-280px, -50px) scale(0) rotate(12deg);
          }
        }

        /* Card 3: 5s-8.5s (27.8%-47.2%) */
        @keyframes card3Sequence {
          0%, 27.8% {
            opacity: 0;
            transform: translate(250px, -80px) scale(0) rotate(-8deg);
          }
          31.7% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          45.6% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          47.2% {
            opacity: 0;
            transform: translate(250px, -80px) scale(0) rotate(-8deg);
          }
          100% {
            opacity: 0;
            transform: translate(250px, -80px) scale(0) rotate(-8deg);
          }
        }

        /* Card 4: 6.5s-10.5s (36.1%-58.3%) */
        @keyframes card4Sequence {
          0%, 36.1% {
            opacity: 0;
            transform: translate(-320px, -80px) scale(0) rotate(10deg);
          }
          40.6% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          57.2% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          58.3% {
            opacity: 0;
            transform: translate(-320px, -80px) scale(0) rotate(10deg);
          }
          100% {
            opacity: 0;
            transform: translate(-320px, -80px) scale(0) rotate(10deg);
          }
        }

        /* Card 5: 9s-12.5s (50%-69.4%) */
        @keyframes card5Sequence {
          0%, 50% {
            opacity: 0;
            transform: translate(300px, -180px) scale(0) rotate(-12deg);
          }
          54.4% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          68.3% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          69.4% {
            opacity: 0;
            transform: translate(300px, -180px) scale(0) rotate(-12deg);
          }
          100% {
            opacity: 0;
            transform: translate(300px, -180px) scale(0) rotate(-12deg);
          }
        }

        /* === SNACKBAR NOTIFICATION STACK (11s-17.5s) === */
        
        /* Snackbar 1: Slides in at 11s (61.1%), shifts up as others arrive, exits at 16s (88.9%) */
        @keyframes snackbar1Sequence {
          0%, 61.1% {
            opacity: 0;
            transform: translateX(-180px) translateY(0) scale(0.5);
          }
          63.3% {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
          66.7% {
            transform: translateX(0) translateY(0) scale(1);
          }
          68.3% {
            transform: translateX(0) translateY(-56px) scale(1);
          }
          88.9% {
            opacity: 1;
            transform: translateX(0) translateY(-56px) scale(1);
          }
          91.1% {
            opacity: 0;
            transform: translateX(180px) translateY(-56px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translateX(180px) translateY(-56px) scale(0.5);
          }
        }

        /* Snackbar 2: Slides in at 12s (66.7%), shifts up with new arrivals, exits at 16.5s (91.7%) */
        @keyframes snackbar2Sequence {
          0%, 66.7% {
            opacity: 0;
            transform: translateX(-180px) translateY(0) scale(0.5);
          }
          68.3% {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
          71.7% {
            transform: translateX(0) translateY(0) scale(1);
          }
          73.3% {
            transform: translateX(0) translateY(-56px) scale(1);
          }
          76.7% {
            transform: translateX(0) translateY(-56px) scale(1);
          }
          78.3% {
            transform: translateX(0) translateY(-112px) scale(1);
          }
          91.7% {
            opacity: 1;
            transform: translateX(0) translateY(-112px) scale(1);
          }
          93.9% {
            opacity: 0;
            transform: translateX(180px) translateY(-112px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translateX(180px) translateY(-112px) scale(0.5);
          }
        }

        /* Snackbar 3: Slides in at 13s (72.2%), shifts up with last arrival, exits at 17s (94.4%) */
        @keyframes snackbar3Sequence {
          0%, 72.2% {
            opacity: 0;
            transform: translateX(-180px) translateY(0) scale(0.5);
          }
          73.3% {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
          76.7% {
            transform: translateX(0) translateY(0) scale(1);
          }
          78.3% {
            transform: translateX(0) translateY(-56px) scale(1);
          }
          94.4% {
            opacity: 1;
            transform: translateX(0) translateY(-56px) scale(1);
          }
          96.7% {
            opacity: 0;
            transform: translateX(180px) translateY(-56px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translateX(180px) translateY(-56px) scale(0.5);
          }
        }

        /* Snackbar 4: Slides in at 14s (77.8%), stays at bottom, exits at 17.5s (97.2%) */
        @keyframes snackbar4Sequence {
          0%, 77.8% {
            opacity: 0;
            transform: translateX(-180px) translateY(0) scale(0.5);
          }
          78.3% {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
          97.2% {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
          99.4% {
            opacity: 0;
            transform: translateX(180px) translateY(0) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translateX(180px) translateY(0) scale(0.5);
          }
        }

        /* === PHONE CONTENT SWAP ANIMATIONS === */
        
        /* Card 1 content swap at 3s */
        @keyframes contentFadeSwap1 {
          0%, 16.7% {
            opacity: 1;
          }
          17.8%, 18.9% {
            opacity: 0.3;
          }
          20%, 100% {
            opacity: 1;
          }
        }

        /* Card 2 content swap at 7s */
        @keyframes contentFadeSwap2 {
          0%, 38.9% {
            opacity: 0.6;
          }
          40%, 41.1% {
            opacity: 0.2;
          }
          42.2%, 100% {
            opacity: 0.6;
          }
        }

        /* Card 3 slides in at 11s */
        @keyframes slideInNewCard {
          0%, 61.1% {
            opacity: 0;
            transform: translateY(20px);
          }
          62.8%, 100% {
            opacity: 0.4;
            transform: translateY(0);
          }
        }

        /* === BASE KEYFRAMES === */
        @keyframes emergeFromRewards {
          0% {
            opacity: 0;
            transform: translate(320px, 0px) scale(0) rotate(-15deg);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
        }
        @keyframes returnToRewards {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(320px, 0px) scale(0) rotate(-15deg);
          }
        }

        @keyframes emergeFromOffers {
          0% {
            opacity: 0;
            transform: translate(-280px, -50px) scale(0) rotate(12deg);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
        }
        @keyframes returnToOffers {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(-280px, -50px) scale(0) rotate(12deg);
          }
        }

        @keyframes emergeFromOrder {
          0% {
            opacity: 0;
            transform: translate(250px, -80px) scale(0) rotate(-8deg);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
        }
        @keyframes returnToOrder {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(250px, -80px) scale(0) rotate(-8deg);
          }
        }

        @keyframes emergeFromOrderRight {
          0% {
            opacity: 0;
            transform: translate(-320px, -80px) scale(0) rotate(10deg);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
        }
        @keyframes returnToOrderRight {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(-320px, -80px) scale(0) rotate(10deg);
          }
        }

        @keyframes emergeFromStores {
          0% {
            opacity: 0;
            transform: translate(300px, -180px) scale(0) rotate(-12deg);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
        }
        @keyframes returnToStores {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(300px, -180px) scale(0) rotate(-12deg);
          }
        }

        @keyframes holdPosition {
          0%, 100% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}