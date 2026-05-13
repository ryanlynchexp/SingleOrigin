export default function SocialShareImage() {
  return (
    <div className="w-[1200px] h-[630px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex items-center justify-center">
      {/* Vibrant background blur elements for glass morphism */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-purple-500/35 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/30 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Content container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-24">
        {/* Logo/Brand mark - Abstract design symbol */}
        <div className="mb-8 relative">
          <div className="w-20 h-20 relative">
            {/* Geometric design symbol */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-emerald-400 rounded-2xl rotate-45 opacity-90" 
                 style={{ backdropFilter: 'blur(32px)' }} />
            <div className="absolute inset-2 bg-slate-950/40 rounded-xl rotate-45" 
                 style={{ backdropFilter: 'blur(16px)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full" />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-7xl font-bold text-white mb-6 text-center tracking-tight">
          Enterprise Design
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Case Studies
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-2xl text-slate-300 mb-12 text-center font-medium max-w-3xl">
          UX Research • Product Design • App Development • Digital Transformation
        </p>

        {/* Feature pills */}
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
            <span className="text-sm font-semibold text-white">Healthcare</span>
          </div>
          <div className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
            <span className="text-sm font-semibold text-white">Retail</span>
          </div>
          <div className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
            <span className="text-sm font-semibold text-white">Mobility</span>
          </div>
          <div className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
            <span className="text-sm font-semibold text-white">Enterprise</span>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>

      {/* Corner accent elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-full" />
    </div>
  );
}
