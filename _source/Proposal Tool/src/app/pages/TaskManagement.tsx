import { useState } from "react";
import { CheckSquare, Clock, AlertCircle, CheckCircle2, Circle, Filter, Calendar, User, ChevronDown, Briefcase } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  proposal: string;
  assignedBy: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "completed";
  category: "review" | "content" | "pricing" | "technical" | "other";
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Review technical requirements section",
    description: "Review and validate the technical requirements for the HealthTech EHR project",
    proposal: "HealthTech EHR Modernization",
    assignedBy: "Sarah Chen",
    dueDate: "2026-03-13",
    priority: "high",
    status: "todo",
    category: "review"
  },
  {
    id: "2",
    title: "Complete pricing model for cloud migration",
    description: "Finalize T&M vs Fixed price analysis with cost breakdown",
    proposal: "Enterprise Cloud Migration - TechCorp",
    assignedBy: "David Kim",
    dueDate: "2026-03-14",
    priority: "high",
    status: "in-progress",
    category: "pricing"
  },
  {
    id: "3",
    title: "Write case study: Similar healthcare project",
    description: "Draft case study narrative for Memorial Health System EHR integration",
    proposal: "HealthTech EHR Modernization",
    assignedBy: "Emily Watson",
    dueDate: "2026-03-15",
    priority: "medium",
    status: "in-progress",
    category: "content"
  },
  {
    id: "4",
    title: "Review team allocation for Q2 projects",
    description: "Validate resource availability across active proposals",
    proposal: "Multiple Proposals",
    assignedBy: "James Wilson",
    dueDate: "2026-03-16",
    priority: "medium",
    status: "todo",
    category: "other"
  },
  {
    id: "5",
    title: "Technical architecture diagram review",
    description: "Review and approve microservices architecture for banking platform",
    proposal: "Digital Banking Platform - FinanceHub",
    assignedBy: "Tom Anderson",
    dueDate: "2026-03-12",
    priority: "high",
    status: "todo",
    category: "technical"
  },
  {
    id: "6",
    title: "Finalize SOW deliverables list",
    description: "Complete and lock down deliverables section for client approval",
    proposal: "Retail Analytics Platform",
    assignedBy: "Sarah Chen",
    dueDate: "2026-03-17",
    priority: "medium",
    status: "todo",
    category: "content"
  },
  {
    id: "7",
    title: "Update compliance certifications",
    description: "Add latest SOC 2 and HIPAA certification details",
    proposal: "HealthTech EHR Modernization",
    assignedBy: "Michelle Wong",
    dueDate: "2026-03-18",
    priority: "low",
    status: "completed",
    category: "other"
  },
  {
    id: "8",
    title: "Review staffing rates for senior engineers",
    description: "Validate current market rates align with our bill rates",
    proposal: "All Active Proposals",
    assignedBy: "Lisa Thompson",
    dueDate: "2026-03-19",
    priority: "low",
    status: "todo",
    category: "pricing"
  },
  {
    id: "9",
    title: "Final review before submission",
    description: "Complete end-to-end review of proposal before deadline",
    proposal: "Enterprise Cloud Migration - TechCorp",
    assignedBy: "Sarah Chen",
    dueDate: "2026-03-20",
    priority: "high",
    status: "completed",
    category: "review"
  },
];

export function TaskManagement() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("dueDate");

  const filteredTasks = mockTasks
    .filter((task) => {
      if (filterStatus !== "all" && task.status !== filterStatus) return false;
      if (filterPriority !== "all" && task.priority !== filterPriority) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === "priority") {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  const taskStats = {
    total: mockTasks.length,
    todo: mockTasks.filter((t) => t.status === "todo").length,
    inProgress: mockTasks.filter((t) => t.status === "in-progress").length,
    completed: mockTasks.filter((t) => t.status === "completed").length,
    overdue: mockTasks.filter((t) => t.status !== "completed" && new Date(t.dueDate) < new Date()).length,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400 bg-red-500/10 border-red-500/30";
      case "medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
      case "low":
        return "text-muted-foreground bg-white/5 border-white/10";
      default:
        return "text-muted-foreground bg-white/5 border-white/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-success" strokeWidth={1.5} />;
      case "in-progress":
        return <Circle className="w-5 h-5 text-primary" strokeWidth={1.5} fill="currentColor" />;
      case "todo":
        return <Circle className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />;
    }
  };

  const isOverdue = (task: Task) => {
    return task.status !== "completed" && new Date(task.dueDate) < new Date();
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays <= 7) return `In ${diffDays} days`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="glass-strong border-b border-white/10 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl text-foreground font-medium">Task Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Track your assigned tasks and deadlines</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <div className="glass-subtle rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Tasks</p>
                <p className="text-2xl text-foreground font-medium">{taskStats.total}</p>
              </div>
              <CheckSquare className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
            </div>
          </div>

          <div className="glass-subtle rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">To Do</p>
                <p className="text-2xl text-foreground font-medium">{taskStats.todo}</p>
              </div>
              <Circle className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
            </div>
          </div>

          <div className="glass-subtle rounded-lg p-4 border border-primary/30 bg-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-primary mb-1">In Progress</p>
                <p className="text-2xl text-primary font-medium">{taskStats.inProgress}</p>
              </div>
              <Circle className="w-8 h-8 text-primary" strokeWidth={1.5} fill="currentColor" />
            </div>
          </div>

          <div className="glass-subtle rounded-lg p-4 border border-success/30 bg-success/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-success mb-1">Completed</p>
                <p className="text-2xl text-success font-medium">{taskStats.completed}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-success" strokeWidth={1.5} />
            </div>
          </div>

          <div className="glass-subtle rounded-lg p-4 border border-red-500/30 bg-red-500/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-red-400 mb-1">Overdue</p>
                <p className="text-2xl text-red-400 font-medium">{taskStats.overdue}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-400" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-subtle border-b border-white/10 px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-sm text-foreground font-medium">Filters:</span>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 glass-inset border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-1.5 glass-inset border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 glass-inset border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto px-8 py-6 layer-base">
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="glass-strong rounded-lg border border-white/10 p-5 hover:border-white/20 transition-all hover-lift"
            >
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className="mt-1">{getStatusIcon(task.status)}</div>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="text-base text-foreground mb-1 font-medium">{task.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{task.description}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>{task.proposal}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Assigned by {task.assignedBy}</span>
                        </div>
                      </div>
                    </div>

                    {/* Priority & Due Date */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs border font-medium ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>

                      <div
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
                          isOverdue(task)
                            ? "bg-red-500/10 border-red-500/30"
                            : "glass-subtle border-white/10"
                        }`}
                      >
                        <Calendar className={`w-3.5 h-3.5 ${isOverdue(task) ? "text-red-400" : "text-muted-foreground"}`} strokeWidth={1.5} />
                        <span className={`text-xs ${isOverdue(task) ? "text-red-400 font-medium" : "text-muted-foreground"}`}>
                          {formatDueDate(task.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                    {task.status === "todo" && (
                      <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs hover:bg-primary/90 transition-all glow-primary font-medium">
                        Start Task
                      </button>
                    )}
                    {task.status === "in-progress" && (
                      <button className="px-3 py-1.5 bg-success text-white rounded-lg text-xs hover:bg-success/90 transition-all font-medium">
                        Mark Complete
                      </button>
                    )}
                    {task.status === "completed" && (
                      <span className="text-xs text-success flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        Completed
                      </span>
                    )}
                    <button className="px-3 py-1.5 text-foreground glass-subtle border border-white/10 hover:bg-white/10 rounded-lg text-xs transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-muted-foreground">No tasks match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
