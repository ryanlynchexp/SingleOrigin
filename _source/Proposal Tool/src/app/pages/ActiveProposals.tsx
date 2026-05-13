import { Link } from "react-router";
import { Search, Plus, Filter, Clock, Users, TrendingUp } from "lucide-react";

const proposals = [
  { id: 1, client: "Acme Corporation", title: "Digital Transformation Initiative", status: "In Progress", progress: 75, deadline: "Mar 15, 2026", team: 4, value: "$450K", lastUpdate: "2 hours ago" },
  { id: 2, client: "GlobalTech Industries", title: "Cloud Migration & Modernization", status: "Review", progress: 90, deadline: "Mar 12, 2026", team: 5, value: "$680K", lastUpdate: "4 hours ago" },
  { id: 3, client: "FutureCo", title: "Healthcare Platform Development", status: "Draft", progress: 35, deadline: "Mar 20, 2026", team: 3, value: "$520K", lastUpdate: "1 day ago" },
  { id: 4, client: "TechVision", title: "Enterprise Software Implementation", status: "In Progress", progress: 60, deadline: "Mar 18, 2026", team: 6, value: "$720K", lastUpdate: "5 hours ago" },
  { id: 5, client: "DataFirst", title: "Data Analytics Platform", status: "Planning", progress: 20, deadline: "Mar 25, 2026", team: 4, value: "$390K", lastUpdate: "2 days ago" },
  { id: 6, client: "InnovateCorp", title: "AI & ML Solution Design", status: "In Progress", progress: 55, deadline: "Mar 22, 2026", team: 5, value: "$850K", lastUpdate: "1 day ago" },
];

const statusColors = {
  "In Progress": "bg-primary/10 border-primary/30 text-primary",
  "Review": "bg-success/10 border-success/30 text-success",
  "Draft": "bg-white/10 border-white/20 text-muted-foreground",
  "Planning": "bg-white/10 border-white/20 text-muted-foreground",
};

export function ActiveProposals() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl text-foreground mb-2">Active Proposals</h1>
            <p className="text-muted-foreground">Manage and track all your ongoing proposal projects</p>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
            <Plus className="w-5 h-5" strokeWidth={1.5} />
            New Proposal
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search proposals..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
          <button className="px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-foreground rounded-md text-sm flex items-center gap-2 transition-colors">
            <Filter className="w-4 h-4" strokeWidth={1.5} />
            Filters
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Active</p>
            <TrendingUp className="w-4 h-4 text-success" strokeWidth={1.5} />
          </div>
          <p className="text-3xl text-foreground">6</p>
        </div>
        <div className="glass rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">In Progress</p>
          <p className="text-3xl text-foreground">3</p>
        </div>
        <div className="glass rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Under Review</p>
          <p className="text-3xl text-foreground">1</p>
        </div>
        <div className="glass rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Value</p>
          <p className="text-3xl text-foreground">$3.6M</p>
        </div>
      </div>

      {/* Proposals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {proposals.map((proposal) => (
          <Link
            key={proposal.id}
            to={`/proposal/${proposal.id}`}
            className="group glass rounded-lg hover:bg-white/10 transition-all p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg text-foreground mb-1">
                  {proposal.title}
                </h3>
                <p className="text-sm text-muted-foreground">{proposal.client}</p>
              </div>
              <span className={`px-3 py-1 rounded-md text-xs border ${statusColors[proposal.status as keyof typeof statusColors]}`}>
                {proposal.status}
              </span>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground">{proposal.progress}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all shadow-lg shadow-primary/30"
                  style={{ width: `${proposal.progress}%` }}
                />
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="w-4 h-4" strokeWidth={1.5} />
                  <span>Deadline</span>
                </div>
                <p className="text-sm text-foreground">{proposal.deadline}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Users className="w-4 h-4" strokeWidth={1.5} />
                  <span>Team</span>
                </div>
                <p className="text-sm text-foreground">{proposal.team} members</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
              <span className="text-lg text-foreground">{proposal.value}</span>
              <span className="text-xs text-muted-foreground">Updated {proposal.lastUpdate}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}