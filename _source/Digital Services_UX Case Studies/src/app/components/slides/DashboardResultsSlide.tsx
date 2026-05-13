import { Users, TrendingUp, Zap, Star } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, ResponsiveContainer, Cell, LineChart, Line, PieChart, Pie } from 'recharts';

interface DashboardResultsSlideProps {
  title: string;
  subtitle?: string;
}

export function DashboardResultsSlide({ title, subtitle }: DashboardResultsSlideProps) {
  // Bubble chart data - representing different success metrics
  const bubbleData = [
    { x: 45, y: 70, z: 850, name: 'User Retention', value: '96%', category: 'users' },
    { x: 75, y: 55, z: 650, name: 'Transaction Volume', value: '+38%', category: 'transactions' },
    { x: 30, y: 35, z: 550, name: 'App Performance', value: '76% faster', category: 'performance' },
    { x: 62, y: 85, z: 450, name: 'Feature Adoption', value: '89%', category: 'features' },
    { x: 20, y: 60, z: 380, name: 'Customer Satisfaction', value: '4.6/5', category: 'satisfaction' },
    { x: 85, y: 30, z: 320, name: 'Cost Savings', value: '$2.4M', category: 'savings' },
    { x: 55, y: 45, z: 280, name: 'Support Tickets', value: '-62%', category: 'support' },
  ];

  // Circular progress data
  const progressMetrics = [
    { label: 'Integration Success', value: 96, color1: '#10b981', color2: '#06b6d4' },
    { label: 'User Adoption', value: 89, color1: '#8b5cf6', color2: '#ec4899' },
    { label: 'Performance Target', value: 94, color1: '#f59e0b', color2: '#ef4444' },
  ];

  // Trend sparkline data
  const trendData = {
    retention: [68, 72, 78, 85, 91, 96],
    transactions: [42, 48, 55, 63, 71, 82],
    performance: [35, 52, 67, 78, 88, 94],
  };

  // Color mapping for bubbles
  const getBubbleColor = (category: string) => {
    const colors: { [key: string]: string } = {
      users: '#3b82f6',
      transactions: '#8b5cf6',
      performance: '#ec4899',
      features: '#06b6d4',
      satisfaction: '#10b981',
      savings: '#f59e0b',
      support: '#ef4444',
    };
    return colors[category] || '#64748b';
  };

  // Circular progress component
  const CircularProgress = ({ value, color1, color2, label }: { value: number; color1: string; color2: string; label: string }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28">
          <svg className="transform -rotate-90 w-28 h-28">
            <defs>
              <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color1} />
                <stop offset="100%" stopColor={color2} />
              </linearGradient>
            </defs>
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="#1e293b"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke={`url(#gradient-${label})`}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000"
              style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{value}%</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 text-center uppercase tracking-wider">{label}</p>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex flex-col px-12 py-12">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-4xl mb-2 text-white tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-slate-400 uppercase tracking-wider">{subtitle}</p>}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-6">
          {/* Left Column - Circular Progress Metrics */}
          <div className="w-[280px] space-y-4">
            {/* Progress Indicators */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-6">Key Metrics</h3>
              <div className="space-y-6">
                {progressMetrics.map((metric, index) => (
                  <CircularProgress
                    key={index}
                    value={metric.value}
                    color1={metric.color1}
                    color2={metric.color2}
                    label={metric.label}
                  />
                ))}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-4">Total Impact</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Total Users Migrated</div>
                  <div className="text-3xl font-bold text-white">65,540</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Active Features</div>
                  <div className="text-3xl font-bold text-white">28</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Uptime</div>
                  <div className="text-3xl font-bold text-white">99.8%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Bubble Chart */}
          <div className="flex-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs uppercase tracking-wider text-slate-400">Success Distribution</h3>
              <div className="text-xs text-slate-500">Bubble size = impact magnitude</div>
            </div>
            
            <ResponsiveContainer width="100%" height="85%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  domain={[0, 100]} 
                  hide 
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  domain={[0, 100]} 
                  hide 
                />
                <ZAxis 
                  type="number" 
                  dataKey="z" 
                  range={[1000, 8000]} 
                />
                <Scatter data={bubbleData}>
                  {bubbleData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getBubbleColor(entry.category)}
                      fillOpacity={0.7}
                      stroke={getBubbleColor(entry.category)}
                      strokeWidth={2}
                      style={{ 
                        filter: `drop-shadow(0 0 20px ${getBubbleColor(entry.category)}80)`,
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>

            {/* Bubble Labels Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {bubbleData.map((item, index) => {
                const size = Math.sqrt(item.z) / 3;
                return (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
                    style={{
                      left: `${20 + (item.x * 0.6)}%`,
                      top: `${25 + (item.y * 0.5)}%`,
                    }}
                  >
                    <div className="text-white font-semibold text-xs mb-0.5" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                      {item.value}
                    </div>
                    <div className="text-[10px] text-slate-300" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Trend Lines */}
          <div className="w-[320px] space-y-4">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-6">6-Month Trends</h3>
              
              {/* User Retention Trend */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-300">User Retention</span>
                  </div>
                  <span className="text-xl font-bold text-white">96%</span>
                </div>
                <ResponsiveContainer width="100%" height={60}>
                  <LineChart data={trendData.retention.map((v, i) => ({ value: v }))}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={false}
                      style={{ filter: 'drop-shadow(0 0 8px #3b82f680)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-emerald-400 mt-2">+41% from start</p>
              </div>

              {/* Transaction Volume Trend */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-slate-300">Transaction Volume</span>
                  </div>
                  <span className="text-xl font-bold text-white">+82%</span>
                </div>
                <ResponsiveContainer width="100%" height={60}>
                  <LineChart data={trendData.transactions.map((v, i) => ({ value: v }))}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      dot={false}
                      style={{ filter: 'drop-shadow(0 0 8px #8b5cf680)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-emerald-400 mt-2">+95% growth rate</p>
              </div>

              {/* Performance Score Trend */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-slate-300">Performance Score</span>
                  </div>
                  <span className="text-xl font-bold text-white">94%</span>
                </div>
                <ResponsiveContainer width="100%" height={60}>
                  <LineChart data={trendData.performance.map((v, i) => ({ value: v }))}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#f59e0b" 
                      strokeWidth={3}
                      dot={false}
                      style={{ filter: 'drop-shadow(0 0 8px #f59e0b80)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-emerald-400 mt-2">+169% improvement</p>
              </div>
            </div>

            {/* Bottom stat card */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-5 h-5 text-emerald-400" />
                <span className="text-xs uppercase tracking-wider text-emerald-300">Overall Rating</span>
              </div>
              <div className="text-4xl font-bold text-white mb-1">4.6<span className="text-xl text-slate-400">/5</span></div>
              <p className="text-xs text-slate-400">Up from 3.2 pre-migration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
