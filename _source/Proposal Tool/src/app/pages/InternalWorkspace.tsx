import { Outlet, NavLink } from "react-router";
import { LayoutDashboard, Briefcase, Settings, BarChart3 } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/active-proposals", label: "Active Proposals", icon: Briefcase },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function InternalWorkspace() {
  return (
    <div className="flex h-screen bg-background relative overflow-hidden">
      {/* Sidebar with enhanced glassmorphism */}
      <aside className="w-64 glass-strong border-r border-white/10 flex flex-col relative z-10 shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-medium text-foreground tracking-tight">
            Experis
          </h1>
          <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase font-medium">Proposal Studio</p>
        </div>
        
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground glow-primary shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5 hover:border-white/10 border border-transparent"
                  }`
                }
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg glass-subtle border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 flex items-center justify-center text-foreground text-sm font-medium flex-shrink-0">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@experis.com</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto relative z-0">
        <Outlet />
      </main>
    </div>
  );
}