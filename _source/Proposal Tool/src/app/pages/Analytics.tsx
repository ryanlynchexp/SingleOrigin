import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Target, Calendar, Award, XCircle, CheckCircle2, BarChart3, PieChart as PieChartIcon, Download } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for 50+ proposals with 40% win rate
const proposalData = generateProposalData();

// Aggregate data for visualizations
const winLossData = {
  won: proposalData.filter(p => p.status === "Won").length,
  lost: proposalData.filter(p => p.status === "Lost").length,
  inProgress: proposalData.filter(p => p.status === "In Progress").length,
};

const monthlyData = [
  { id: "month-sep", month: "Sep", sent: 4, won: 2, lost: 2 },
  { id: "month-oct", month: "Oct", sent: 6, won: 2, lost: 4 },
  { id: "month-nov", month: "Nov", sent: 8, won: 3, lost: 5 },
  { id: "month-dec", month: "Dec", sent: 7, won: 3, lost: 4 },
  { id: "month-jan", month: "Jan", sent: 9, won: 4, lost: 5 },
  { id: "month-feb", month: "Feb", sent: 10, won: 5, lost: 5 },
  { id: "month-mar", month: "Mar", sent: 8, won: 3, lost: 2 }, // Current month (partial)
];

const industryData = [
  { id: "ind-tech", industry: "Technology", proposals: 12, won: 6, winRate: 50 },
  { id: "ind-health", industry: "Healthcare", proposals: 10, won: 4, winRate: 40 },
  { id: "ind-finance", industry: "Finance", proposals: 8, won: 3, winRate: 37.5 },
  { id: "ind-mfg", industry: "Manufacturing", proposals: 7, won: 3, winRate: 42.9 },
  { id: "ind-retail", industry: "Retail", proposals: 6, won: 2, winRate: 33.3 },
  { id: "ind-gov", industry: "Government", proposals: 5, won: 2, winRate: 40 },
  { id: "ind-edu", industry: "Education", proposals: 4, won: 2, winRate: 50 },
];

const projectScopeData = [
  { id: "cloud", scope: "Cloud Migration", count: 12, won: 5 },
  { id: "digital", scope: "Digital Transformation", count: 10, won: 5 },
  { id: "appdev", scope: "Application Development", count: 9, won: 3 },
  { id: "data", scope: "Data Analytics", count: 7, won: 3 },
  { id: "infra", scope: "Infrastructure", count: 6, won: 2 },
  { id: "security", scope: "Security", count: 4, won: 2 },
  { id: "consulting", scope: "Consulting", count: 4, won: 2 },
];

const bidValueData = [
  { id: "0-100k", range: "$0-100K", count: 8, won: 5, winRate: 62.5 },
  { id: "100-250k", range: "$100K-250K", count: 12, won: 6, winRate: 50 },
  { id: "250-500k", range: "$250K-500K", count: 15, won: 6, winRate: 40 },
  { id: "500k-1m", range: "$500K-1M", count: 10, won: 3, winRate: 30 },
  { id: "1m+", range: "$1M+", count: 7, won: 2, winRate: 28.6 },
];

const lossReasons = [
  { id: "loss-1", reason: "Price too high", count: 12 },
  { id: "loss-2", reason: "Lost to competitor", count: 9 },
  { id: "loss-3", reason: "Timeline constraints", count: 6 },
  { id: "loss-4", reason: "Resource availability", count: 5 },
  { id: "loss-5", reason: "Scope mismatch", count: 4 },
  { id: "loss-6", reason: "Budget cuts", count: 3 },
];

const winReasons = [
  { id: "win-1", reason: "Best value proposition", count: 8 },
  { id: "win-2", reason: "Technical expertise", count: 7 },
  { id: "win-3", reason: "Prior relationship", count: 6 },
  { id: "win-4", reason: "Competitive pricing", count: 5 },
  { id: "win-5", reason: "Fast timeline", count: 4 },
  { id: "win-6", reason: "Strong case studies", count: 4 },
];

const COLORS = {
  won: "#49F222",
  lost: "#DC2626",
  inProgress: "#F59E0B",
  primary: "#255FF5",
  secondary: "#8B5CF6",
  tertiary: "#F97316",
};

export function Analytics() {
  const [dateRange, setDateRange] = useState("6-months");
  const [statusFilter, setStatusFilter] = useState<"total" | "won" | "lost">("total");

  const totalProposals = proposalData.length;
  const wonProposals = winLossData.won;
  const winRate = Math.round((wonProposals / (wonProposals + winLossData.lost)) * 100);
  const totalValue = proposalData.reduce((sum, p) => sum + p.value, 0);
  const wonValue = proposalData.filter(p => p.status === "Won").reduce((sum, p) => sum + p.value, 0);
  const avgProposalValue = Math.round(totalValue / totalProposals);

  // Filter data based on status filter
  const filteredProposals = statusFilter === "total" 
    ? proposalData 
    : statusFilter === "won"
    ? proposalData.filter(p => p.status === "Won")
    : proposalData.filter(p => p.status === "Lost");

  // Recalculate metrics based on filtered data
  const filteredMonthlyData = monthlyData.map(month => {
    if (statusFilter === "won") {
      return { ...month, sent: month.won, lost: 0 };
    } else if (statusFilter === "lost") {
      return { ...month, sent: month.lost, won: 0 };
    }
    return month;
  });

  const filteredIndustryData = industryData.map(ind => {
    if (statusFilter === "won") {
      return { ...ind, proposals: ind.won };
    } else if (statusFilter === "lost") {
      return { ...ind, proposals: ind.proposals - ind.won, won: 0 };
    }
    return ind;
  });

  const handleExportReport = () => {
    const reportDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const reportContent = `
EXPERIS PROPOSAL STUDIO - EXECUTIVE SUMMARY REPORT
Generated: ${reportDate}
Reporting Period: ${dateRange}

═══════════════════════════════════════════════════════════════

KEY PERFORMANCE METRICS

Total Proposals Submitted: ${totalProposals}
Proposals Won: ${wonProposals}
Proposals Lost: ${winLossData.lost}
In Progress: ${winLossData.inProgress}

Win Rate: ${winRate}%
Total Value (All Proposals): $${(totalValue / 1000000).toFixed(2)}M
Won Value: $${(wonValue / 1000000).toFixed(2)}M
Average Proposal Value: $${(avgProposalValue / 1000).toFixed(0)}K

═══════════════════════════════════════════════════════════════

MONTHLY PERFORMANCE

${monthlyData.map(m => `${m.month}: ${m.sent} sent | ${m.won} won | ${m.lost} lost`).join('\n')}

══════════════════════════════════════════════════════════════

INDUSTRY BREAKDOWN

${industryData.map(i => `${i.industry}: ${i.proposals} proposals | ${i.won} won | ${i.winRate}% win rate`).join('\n')}

═══════════════════════════════════════════════════════════════

PROJECT SCOPE ANALYSIS

${projectScopeData.map(p => `${p.scope}: ${p.count} proposals | ${p.won} won`).join('\n')}

═══════════════════════════════════════════════════════════════

BID VALUE DISTRIBUTION

${bidValueData.map(b => `${b.range}: ${b.count} proposals | ${b.won} won | ${b.winRate}% win rate`).join('\n')}

═══════════════════════════════════════════════════════════════

INSIGHTS & RECOMMENDATIONS

• Win rate is ${winRate}%, ${winRate >= 40 ? 'meeting or exceeding' : 'below'} the 40% target
• Highest performing industry: ${industryData.reduce((max, i) => i.winRate > max.winRate ? i : max).industry}
• Sweet spot bid range: ${bidValueData.reduce((max, b) => b.winRate > max.winRate ? b : max).range}
• Total pipeline value at risk: $${((totalValue - wonValue) / 1000000).toFixed(2)}M

═══════════════════════════════════════════════════════════════

This report is generated for internal use by the Proposal Management team.
For questions or detailed analysis, contact your Analytics team.
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Proposal_Analytics_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto layer-base">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl text-foreground mb-2 font-medium">Analytics & Insights</h1>
          <p className="text-muted-foreground">Performance metrics and trends across all proposals</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportReport}
            className="px-4 py-2.5 glass-subtle border border-white/10 rounded-lg text-sm text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center gap-2 group"
          >
            <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
            <span>Export Report</span>
          </button>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2.5 glass-subtle border border-white/10 rounded-lg text-sm text-foreground hover:border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="3-months">Last 3 Months</option>
            <option value="6-months">Last 6 Months</option>
            <option value="12-months">Last 12 Months</option>
            <option value="all-time">All Time</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "total" | "won" | "lost")}
            className="px-4 py-2.5 glass-subtle border border-white/10 rounded-lg text-sm text-foreground hover:border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="total">Total</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <button
          onClick={() => setStatusFilter("total")}
          className={`glass rounded-lg p-6 text-left transition-all ${
            statusFilter === "total" 
              ? "ring-2 ring-primary shadow-lg shadow-primary/20" 
              : "hover:border-primary/30 cursor-pointer"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <Target className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-xs text-success flex items-center gap-1">
              <TrendingUp className="w-3 h-3" strokeWidth={2} />
              {winRate}%
            </span>
          </div>
          <p className="text-2xl text-foreground mb-1">{totalProposals}</p>
          <p className="text-sm text-muted-foreground">Total Proposals</p>
        </button>

        <button
          onClick={() => setStatusFilter("won")}
          className={`glass rounded-lg p-6 text-left transition-all ${
            statusFilter === "won" 
              ? "ring-2 ring-success shadow-lg shadow-success/20" 
              : "hover:border-success/30 cursor-pointer"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 className="w-5 h-5 text-success" strokeWidth={1.5} />
            <span className="text-xs text-success">{winRate}%</span>
          </div>
          <p className="text-2xl text-foreground mb-1">{wonProposals}</p>
          <p className="text-sm text-muted-foreground">Won</p>
        </button>

        <button
          onClick={() => setStatusFilter("lost")}
          className={`glass rounded-lg p-6 text-left transition-all ${
            statusFilter === "lost" 
              ? "ring-2 ring-destructive shadow-lg shadow-destructive/20" 
              : "hover:border-destructive/30 cursor-pointer"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <XCircle className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-xs text-muted-foreground">{100 - winRate}%</span>
          </div>
          <p className="text-2xl text-foreground mb-1">{winLossData.lost}</p>
          <p className="text-sm text-muted-foreground">Lost</p>
        </button>

        <div className="glass rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            <Award className="w-4 h-4 text-success" strokeWidth={1.5} />
          </div>
          <p className="text-2xl text-foreground mb-1">${(wonValue / 1000000).toFixed(1)}M</p>
          <p className="text-sm text-muted-foreground">Won Value</p>
        </div>

        <div className="glass rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <p className="text-2xl text-foreground mb-1">${(avgProposalValue / 1000).toFixed(0)}K</p>
          <p className="text-sm text-muted-foreground">Avg. Value</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Trends */}
        <div className="glass rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg text-foreground mb-1">Monthly Trends</h2>
              <p className="text-sm text-muted-foreground">Proposals sent, won, and lost over time</p>
            </div>
            <BarChart3 className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={filteredMonthlyData}>
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#255FF5" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#255FF5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(33, 33, 33, 0.95)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#FFFFFF'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area key="area-sent" type="monotone" dataKey="sent" stroke="#255FF5" strokeWidth={2} fillOpacity={1} fill="url(#colorSent)" name="Sent" />
              <Line key="line-won" type="monotone" dataKey="won" stroke="#49F222" strokeWidth={2} name="Won" dot={{ fill: '#49F222', r: 4 }} />
              <Line key="line-lost" type="monotone" dataKey="lost" stroke="#DC2626" strokeWidth={2} name="Lost" dot={{ fill: '#DC2626', r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Win/Loss Distribution */}
        <div className="glass rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg text-foreground mb-1">Proposal Status</h2>
              <p className="text-sm text-muted-foreground">Current distribution of all proposals</p>
            </div>
            <PieChartIcon className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { id: "won", name: "Won", value: winLossData.won },
                    { id: "lost", name: "Lost", value: winLossData.lost },
                    { id: "inprogress", name: "In Progress", value: winLossData.inProgress },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {[
                    { id: "won", fill: COLORS.won },
                    { id: "lost", fill: COLORS.lost },
                    { id: "inprogress", fill: COLORS.inProgress },
                  ].map((entry) => (
                    <Cell key={`cell-${entry.id}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(33, 33, 33, 0.95)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#FFFFFF'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Industry Performance */}
        <div className="glass rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg text-foreground mb-1">Win Rate by Industry</h2>
            <p className="text-sm text-muted-foreground">Performance across different sectors</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={filteredIndustryData} 
              layout="vertical" 
              barCategoryGap="20%" 
              barGap={2}
              margin={{ left: 0, right: 10, top: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis type="number" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis dataKey="industry" type="category" width={100} stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(33, 33, 33, 0.95)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#FFFFFF'
                }} 
              />
              <Bar 
                key="bar-proposals"
                dataKey="proposals" 
                fill="rgba(255, 255, 255, 0.08)" 
                name="Total" 
                radius={[0, 4, 4, 0]}
                maxBarSize={20}
              />
              <Bar 
                key="bar-won"
                dataKey="won" 
                fill="#49F222" 
                name="Won" 
                radius={[0, 4, 4, 0]}
                maxBarSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bid Value Performance */}
        <div className="glass rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg text-foreground mb-1">Win Rate by Bid Size</h2>
            <p className="text-sm text-muted-foreground">Success rate across different value ranges</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bidValueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="range" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(33, 33, 33, 0.95)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#FFFFFF'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="winRate" stroke="#255FF5" strokeWidth={3} name="Win Rate %" dot={{ fill: '#255FF5', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Project Scope Distribution */}
        <div className="glass rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg text-foreground mb-1">Project Scope</h2>
            <p className="text-sm text-muted-foreground">Distribution by category</p>
          </div>
          <div className="space-y-3">
            {projectScopeData.slice(0, 6).map((scope) => {
              const winRate = Math.round((scope.won / scope.count) * 100);
              return (
                <div key={scope.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-foreground">{scope.scope}</span>
                    <span className="text-xs text-muted-foreground">{scope.count} proposals</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all shadow-lg shadow-primary/30"
                      style={{ width: `${winRate}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{winRate}% win rate</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Loss Reasons */}
        <div className="glass rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg text-foreground mb-1">Loss Reasons</h2>
            <p className="text-sm text-muted-foreground">Why we didn't win</p>
          </div>
          <div className="space-y-3">
            {lossReasons.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-muted-foreground text-xs">
                    {index + 1}
                  </span>
                  <span className="text-sm text-foreground">{item.reason}</span>
                </div>
                <span className="text-sm text-foreground font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Win Reasons */}
        <div className="glass rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg text-foreground mb-1">Win Reasons</h2>
            <p className="text-sm text-muted-foreground">Why we succeeded</p>
          </div>
          <div className="space-y-3">
            {winReasons.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-success/20 text-success text-xs">
                    {index + 1}
                  </span>
                  <span className="text-sm text-foreground">{item.reason}</span>
                </div>
                <span className="text-sm text-foreground font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Closures */}
      <div className="glass rounded-lg">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg text-foreground mb-1">Recent Closures</h2>
          <p className="text-sm text-muted-foreground">Latest proposal outcomes and closure reasons</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left px-6 py-3 text-xs text-muted-foreground">Client</th>
                <th className="text-left px-6 py-3 text-xs text-muted-foreground">Industry</th>
                <th className="text-left px-6 py-3 text-xs text-muted-foreground">Scope</th>
                <th className="text-right px-6 py-3 text-xs text-muted-foreground">Value</th>
                <th className="text-left px-6 py-3 text-xs text-muted-foreground">Status</th>
                <th className="text-left px-6 py-3 text-xs text-muted-foreground">Closure Reason</th>
                <th className="text-left px-6 py-3 text-xs text-muted-foreground">Closed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProposals.filter(p => p.status !== "In Progress").slice(0, 10).map((proposal) => (
                <tr key={proposal.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground">{proposal.client}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{proposal.industry}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{proposal.scope}</td>
                  <td className="px-6 py-4 text-sm text-foreground text-right">${(proposal.value / 1000).toFixed(0)}K</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs ${
                      proposal.status === "Won"
                        ? "bg-success/10 text-success border border-success/30"
                        : "bg-destructive/10 text-destructive border border-destructive/30"
                    }`}>
                      {proposal.status === "Won" ? (
                        <CheckCircle2 className="w-3 h-3" strokeWidth={2} />
                      ) : (
                        <XCircle className="w-3 h-3" strokeWidth={2} />
                      )}
                      {proposal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{proposal.closureReason}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{proposal.closedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Generate realistic proposal data
function generateProposalData() {
  const industries = ["Technology", "Healthcare", "Finance", "Manufacturing", "Retail", "Government", "Education"];
  const scopes = ["Cloud Migration", "Digital Transformation", "Application Development", "Data Analytics", "Infrastructure", "Security", "Consulting"];
  const clients = [
    "Acme Corp", "GlobalTech Inc", "FutureCo", "InnovateLabs", "TechVentures", "Digital Dynamics",
    "CloudFirst", "DataDrive", "SecureNet", "SmartSystems", "NextGen Solutions", "PrimeTech",
    "Quantum Corp", "Velocity Inc", "Zenith Group", "Atlas Enterprise", "Beacon Systems",
    "Catalyst Corp", "Delta Solutions", "Echo Technologies", "Frontier Group", "Genesis Inc",
    "Horizon Systems", "Insight Corp", "Keystone Inc", "Lighthouse Tech", "Meridian Group",
    "Nexus Solutions", "Orbit Technologies", "Pinnacle Corp", "Quest Systems", "Radiant Inc",
    "Summit Group", "Titan Technologies", "Unity Solutions", "Vanguard Inc", "Waypoint Corp",
    "Apex Systems", "Bright Future Inc", "Core Solutions", "Dynamic Group", "Elite Technologies",
    "Fusion Corp", "Gateway Systems", "Helix Inc", "Impact Solutions", "Junction Tech",
    "Kinetic Group", "Legacy Systems", "Matrix Corp", "Noble Technologies", "Optic Inc"
  ];

  const winReasonsList = ["Best value proposition", "Technical expertise", "Prior relationship", "Competitive pricing", "Fast timeline", "Strong case studies"];
  const lossReasonsList = ["Price too high", "Lost to competitor", "Timeline constraints", "Resource availability", "Scope mismatch", "Budget cuts"];

  const proposals = [];
  
  // Generate 52 proposals (40% win rate = 21 won, 31 lost/in progress)
  for (let i = 0; i < 52; i++) {
    const isWon = i < 21; // First 21 are won (40%)
    const isInProgress = !isWon && i < 26; // Next 5 are in progress
    const status = isWon ? "Won" : isInProgress ? "In Progress" : "Lost";
    
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const scope = scopes[Math.floor(Math.random() * scopes.length)];
    const value = Math.floor(Math.random() * 1200000) + 50000; // $50K to $1.25M
    
    proposals.push({
      id: i + 1,
      client: clients[i],
      industry,
      scope,
      value,
      status,
      closureReason: status === "In Progress" ? "-" : 
        isWon ? winReasonsList[Math.floor(Math.random() * winReasonsList.length)] :
        lossReasonsList[Math.floor(Math.random() * lossReasonsList.length)],
      closedDate: status === "In Progress" ? "-" : generateDate(),
    });
  }
  
  return proposals;
}

function generateDate() {
  const months = ["Jan", "Feb", "Mar"];
  const days = [1, 5, 8, 12, 15, 18, 22, 25, 28];
  return `${months[Math.floor(Math.random() * months.length)]} ${days[Math.floor(Math.random() * days.length)]}, 2026`;
}