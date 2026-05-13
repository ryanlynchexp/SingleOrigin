import { useState } from "react";
import { Link } from "react-router";
import { Clock, TrendingUp, Users, FileText, ArrowRight, CheckCircle2, Briefcase, Plus, Circle, AlertCircle, CheckSquare } from "lucide-react";
import { NewProposalModal } from "../components/NewProposalModal";

const activeProposals = [
  { id: 1, client: "Acme Corporation", status: "In Progress", progress: 75, deadline: "Mar 26, 2026", team: 4, dueThisWeek: true },
  { id: 2, client: "GlobalTech Industries", status: "Review", progress: 90, deadline: "Mar 12, 2026", team: 5, dueThisWeek: true },
  { id: 3, client: "FutureCo", status: "Draft", progress: 35, deadline: "Mar 20, 2026", team: 3, dueThisWeek: false },
  { id: 4, client: "HealthTech Solutions", status: "In Progress", progress: 60, deadline: "Mar 13, 2026", team: 6, dueThisWeek: true },
  { id: 5, client: "FinanceHub", status: "Draft", progress: 25, deadline: "Mar 14, 2026", team: 3, dueThisWeek: true },
];

const recentActivity = [
  { user: "Sarah Chen", action: "updated pricing for", proposal: "Acme Corporation", time: "2 hours ago" },
  { user: "Mike Rodriguez", action: "added team member to", proposal: "GlobalTech Industries", time: "4 hours ago" },
  { user: "Emma Thompson", action: "uploaded case study to", proposal: "FutureCo", time: "6 hours ago" },
  { user: "Alex Kumar", action: "published preview for", proposal: "Acme Corporation", time: "1 day ago" },
];

const upcomingDeadlines = [
  { client: "GlobalTech Industries", deadline: "Mar 12, 2026", daysLeft: 6, status: "On Track", dueThisWeek: true },
  { client: "HealthTech Solutions", deadline: "Mar 13, 2026", daysLeft: 7, status: "On Track", dueThisWeek: true },
  { client: "FinanceHub", deadline: "Mar 14, 2026", daysLeft: 8, status: "At Risk", dueThisWeek: true },
  { client: "Acme Corporation", deadline: "Mar 26, 2026", daysLeft: 3, status: "On Track", dueThisWeek: true },
  { client: "FutureCo", deadline: "Mar 20, 2026", daysLeft: 14, status: "Early", dueThisWeek: false },
];

interface Task {
  id: string;
  title: string;
  proposal: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "completed";
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Review technical requirements section",
    proposal: "HealthTech EHR Modernization",
    dueDate: "2026-03-13",
    priority: "high",
    status: "todo",
  },
  {
    id: "2",
    title: "Complete pricing model for cloud migration",
    proposal: "Enterprise Cloud Migration",
    dueDate: "2026-03-14",
    priority: "high",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Write case study: Similar healthcare project",
    proposal: "HealthTech EHR Modernization",
    dueDate: "2026-03-15",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: "4",
    title: "Technical architecture diagram review",
    proposal: "Digital Banking Platform",
    dueDate: "2026-03-12",
    priority: "high",
    status: "todo",
  },
  {
    id: "5",
    title: "Finalize SOW deliverables list",
    proposal: "Retail Analytics Platform",
    dueDate: "2026-03-17",
    priority: "medium",
    status: "completed",
  },
];

type FilterType = "all" | "active" | "dueThisWeek" | "teamMembers" | "rfps";

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const handleProposalComplete = (data: any) => {
    console.log("New proposal created:", data);
    // Handle proposal creation logic here
  };

  const toggleTaskStatus = (taskId: string) => {
    // Task toggle logic would go here
    console.log("Toggle task:", taskId);
  };

  // Filter proposals based on active filter
  const filteredProposals = activeFilter === "dueThisWeek" 
    ? activeProposals.filter(p => p.dueThisWeek)
    : activeProposals;

  const filteredDeadlines = activeFilter === "dueThisWeek"
    ? upcomingDeadlines.filter(d => d.dueThisWeek)
    : upcomingDeadlines.slice(0, 3);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-accent";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-4 h-4 text-success" strokeWidth={1.5} />;
      case "in-progress": return <AlertCircle className="w-4 h-4 text-accent" strokeWidth={1.5} />;
      case "todo": return <Circle className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />;
      default: return <Circle className="w-4 h-4" strokeWidth={1.5} />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto layer-base">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl text-foreground mb-2 font-medium">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your proposals.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all glow-primary hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" strokeWidth={1.5} />
          New Proposal
        </button>
      </div>

      <NewProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleProposalComplete}
      />

      {/* Stats Grid - Clickable Filter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <button
          onClick={() => setActiveFilter(activeFilter === "active" ? "all" : "active")}
          className={`glass-strong rounded-xl p-6 hover-lift text-left transition-all ${
            activeFilter === "active" ? "ring-2 ring-primary glow-primary" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-success/10 border border-success/20">
              <TrendingUp className="w-3.5 h-3.5 text-success" strokeWidth={2} />
              <span className="text-xs text-success font-medium">+12%</span>
            </div>
          </div>
          <p className="text-3xl text-foreground mb-1 font-medium">12</p>
          <p className="text-sm text-muted-foreground">Active Proposals</p>
        </button>

        <button
          onClick={() => setActiveFilter(activeFilter === "dueThisWeek" ? "all" : "dueThisWeek")}
          className={`glass-strong rounded-xl p-6 hover-lift text-left transition-all ${
            activeFilter === "dueThisWeek" ? "ring-2 ring-primary glow-primary" : ""
          }`}
        >
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <Clock className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          </div>
          <p className="text-3xl text-foreground mb-1 font-medium">3</p>
          <p className="text-sm text-muted-foreground">Due This Week</p>
        </button>

        <button
          onClick={() => setActiveFilter(activeFilter === "teamMembers" ? "all" : "teamMembers")}
          className={`glass-strong rounded-xl p-6 hover-lift text-left transition-all ${
            activeFilter === "teamMembers" ? "ring-2 ring-primary glow-primary" : ""
          }`}
        >
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <Users className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          </div>
          <p className="text-3xl text-foreground mb-1 font-medium">24</p>
          <p className="text-sm text-muted-foreground">Team Members</p>
        </button>

        <button
          onClick={() => setActiveFilter(activeFilter === "rfps" ? "all" : "rfps")}
          className={`glass-strong rounded-xl p-6 hover-lift text-left transition-all ${
            activeFilter === "rfps" ? "ring-2 ring-primary glow-primary" : ""
          }`}
        >
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <FileText className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          </div>
          <p className="text-3xl text-foreground mb-1 font-medium">48</p>
          <p className="text-sm text-muted-foreground">RFPs in Library</p>
        </button>
      </div>

      {activeFilter !== "all" && (
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtered by:</span>
          <span className="px-3 py-1.5 rounded-lg glass-subtle border border-white/10 text-foreground text-sm flex items-center gap-2">
            {activeFilter === "dueThisWeek" ? "Due This Week" : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1).replace(/([A-Z])/g, ' $1')}
            <button onClick={() => setActiveFilter("all")} className="text-muted-foreground hover:text-foreground">
              ×
            </button>
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Active Proposals */}
        <div className="lg:col-span-2 glass-strong rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-foreground font-medium">Active Proposals</h2>
              <Link to="/active-proposals" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                View All <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
          <div className="p-6 space-y-3">
            {filteredProposals.slice(0, 4).map((proposal) => (
              <Link
                key={proposal.id}
                to={`/proposal/${proposal.id}`}
                className="block p-5 rounded-xl glass-inset hover:bg-white/10 border border-white/10 transition-all hover:border-primary/30 hover-lift group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{proposal.client}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">Due {proposal.deadline}</p>
                  </div>
                  <span className="px-3 py-1 rounded-lg text-xs glass-subtle border border-white/20 text-foreground font-medium">
                    {proposal.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{proposal.progress}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all glow-primary"
                      style={{ width: `${proposal.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" strokeWidth={1.5} />
                  <span>{proposal.team} team members</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="glass-strong rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg text-foreground font-medium">Upcoming Deadlines</h2>
          </div>
          <div className="p-6 space-y-3">
            {filteredDeadlines.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-5 rounded-xl glass-inset border border-white/10 hover-lift">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{item.client}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.deadline}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{item.daysLeft}d</p>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                    item.status === "At Risk" ? "text-destructive" : "text-success"
                  }`}>
                    <CheckCircle2 className="w-3 h-3" strokeWidth={2} /> {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Management */}
        <div className="glass-strong rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-foreground font-medium flex items-center gap-2">
                <CheckSquare className="w-5 h-5" strokeWidth={1.5} />
                My Tasks
              </h2>
              <span className="text-sm text-muted-foreground">{mockTasks.filter(t => t.status !== "completed").length} active</span>
            </div>
          </div>
          <div className="p-6 space-y-3 max-h-[400px] overflow-y-auto">
            {mockTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-4 rounded-xl glass-inset border border-white/10 hover-lift group"
              >
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className="mt-0.5 flex-shrink-0"
                >
                  {getStatusIcon(task.status)}
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-medium ${
                    task.status === "completed" ? "text-muted-foreground line-through" : "text-foreground"
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{task.proposal}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                    <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-strong rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg text-foreground font-medium">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-lg glass-subtle border border-white/20 flex items-center justify-center text-foreground text-xs font-medium flex-shrink-0">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-muted-foreground">{activity.action}</span>{' '}
                      <span className="font-medium">{activity.proposal}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}