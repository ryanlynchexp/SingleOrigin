import { useState } from "react";
import { Calendar, Edit2, Save, Plus, Trash2 } from "lucide-react";
import { acmeProposalData } from "../../data/acmeProposalData";

interface Phase {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string;
  deliverables: string;
}

export function TimelineTabContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...acmeProposalData.timeline,
  });

  // Initialize phases from keyMilestones or default phases
  const [phases, setPhases] = useState<Phase[]>([
    { id: "1", name: "Discovery & Architecture", startDate: "2026-05-01", endDate: "2026-05-29", color: "#255FF5", deliverables: "Requirements gathering, technical architecture design, infrastructure planning" },
    { id: "2", name: "Foundation & Setup", startDate: "2026-06-01", endDate: "2026-07-24", color: "#49F222", deliverables: "Development environment setup, CI/CD pipeline configuration, base infrastructure" },
    { id: "3", name: "Core Migration", startDate: "2026-07-27", endDate: "2026-10-23", color: "#255FF5", deliverables: "Database migration, API development, integration with existing systems" },
    { id: "4", name: "Testing & Security", startDate: "2026-10-26", endDate: "2026-11-20", color: "#49F222", deliverables: "QA testing, security audit, performance optimization" },
    { id: "5", name: "Deployment & Launch", startDate: "2026-11-23", endDate: "2026-12-31", color: "#8B5CF6", deliverables: "Production deployment, user training, documentation, support transition" },
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...acmeProposalData.timeline });
  };

  const handleAddPhase = () => {
    const newPhase: Phase = {
      id: Date.now().toString(),
      name: "New Phase",
      startDate: formData.startDate,
      endDate: formData.startDate,
      color: "#255FF5",
      deliverables: "",
    };
    setPhases([...phases, newPhase]);
  };

  const handleDeletePhase = (id: string) => {
    setPhases(phases.filter(p => p.id !== id));
  };

  const handlePhaseChange = (id: string, field: keyof Phase, value: string) => {
    setPhases(phases.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const startDate = new Date(formData.startDate);
  const deliveryDate = new Date(formData.deliveryDate);
  const durationDays = Math.ceil((deliveryDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const durationMonths = Math.round((durationDays / 30.44) * 10) / 10;

  // Generate month headers
  const months: { month: string; weeks: number }[] = [];
  let currentDate = new Date(startDate);
  let totalWeeks = 0;

  while (currentDate <= deliveryDate) {
    const monthName = currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const weeksInMonth = Math.ceil(daysInMonth / 7);
    
    months.push({ month: monthName, weeks: weeksInMonth });
    totalWeeks += weeksInMonth;
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  }

  const phaseColors = [
    "#255FF5", // Primary blue
    "#49F222", // Neon green
    "#8B5CF6", // Purple
    "#F59E0B", // Amber
    "#06B6D4", // Cyan
    "#EC4899", // Pink
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="glass-strong rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg text-foreground font-medium">Project Timeline & Phases</h2>
            <p className="text-sm text-muted-foreground mt-1">Visual Gantt chart with editable milestones</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-4 py-2 glass-subtle border border-white/10 hover:bg-white/10 text-foreground rounded-lg text-sm transition-all"
            >
              <Edit2 className="w-4 h-4" strokeWidth={1.5} />
              Edit Timeline
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-all glow-primary font-medium"
              >
                <Save className="w-4 h-4" strokeWidth={1.5} />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 glass-subtle border border-white/10 text-foreground rounded-lg text-sm hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Owner */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-medium">
              Timeline Owner
            </label>
            <input
              type="text"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              placeholder="Assign team member"
              disabled={!isEditing}
              className="w-full px-4 py-2.5 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-medium">
              <Calendar className="w-3.5 h-3.5 inline mr-1" strokeWidth={1.5} />
              Project Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-medium">
              <Calendar className="w-3.5 h-3.5 inline mr-1" strokeWidth={1.5} />
              Target Delivery Date
            </label>
            <input
              type="date"
              value={formData.deliveryDate}
              onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Duration Display */}
        <div className="mt-4 p-3 rounded-lg glass-subtle border border-white/10 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Project Duration</span>
          <div className="flex items-center gap-4">
            <span className="text-base font-medium text-foreground">{durationMonths} months</span>
            <span className="text-xs text-muted-foreground">({durationDays} days)</span>
          </div>
        </div>
      </div>

      {/* Gantt Chart Section */}
      <div className="glass-strong rounded-xl p-6 border border-white/10 overflow-x-auto">
        {/* Month Headers */}
        <div className="mb-6 min-w-[800px]">
          <div className="flex border-b border-white/10 pb-3">
            <div className="w-48 flex-shrink-0 text-sm text-muted-foreground font-medium">Phase Name</div>
            <div className="flex-1 flex">
              {months.map((month, index) => (
                <div 
                  key={index}
                  className="text-center text-xs font-medium text-muted-foreground border-r border-white/5 last:border-0 px-2"
                  style={{ width: `${(month.weeks / totalWeeks) * 100}%` }}
                >
                  {month.month}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gantt Bars */}
        <div className="space-y-3 min-w-[800px]">
          {phases.map((phase, index) => {
            const phaseStart = new Date(phase.startDate);
            const phaseEnd = new Date(phase.endDate);
            const totalProjectDuration = deliveryDate.getTime() - startDate.getTime();
            const phaseStartOffset = phaseStart.getTime() - startDate.getTime();
            const phaseDuration = phaseEnd.getTime() - phaseStart.getTime();
            
            const leftOffset = (phaseStartOffset / totalProjectDuration) * 100;
            const width = (phaseDuration / totalProjectDuration) * 100;
            const durationInDays = Math.ceil(phaseDuration / (1000 * 60 * 60 * 24));
            const durationInWeeks = Math.ceil(durationInDays / 7);
            
            // Calculate week numbers from project start
            const startWeek = Math.floor((phaseStart.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
            const endWeek = Math.ceil((phaseEnd.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));

            const adjustPhaseWeek = (phaseId: string, field: 'start' | 'end', direction: number) => {
              const phase = phases.find(p => p.id === phaseId);
              if (!phase) return;
              
              const baseDate = field === 'start' ? new Date(phase.startDate) : new Date(phase.endDate);
              baseDate.setDate(baseDate.getDate() + (direction * 7)); // Move by 1 week
              
              const newDateStr = baseDate.toISOString().split('T')[0];
              handlePhaseChange(phaseId, field === 'start' ? 'startDate' : 'endDate', newDateStr);
            };

            return (
              <div key={phase.id} className="group">
                <div className="flex items-center">
                  <div className="w-48 flex-shrink-0 text-sm text-foreground font-medium pr-4">
                    <div className="flex items-center gap-2">
                      {isEditing && (
                        <button
                          onClick={() => handleDeletePhase(phase.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400" strokeWidth={1.5} />
                        </button>
                      )}
                      <span className="truncate">{phase.name}</span>
                    </div>
                    
                    {/* Week counters in edit mode */}
                    {isEditing && (
                      <div className="flex items-center gap-2 mt-1.5">
                        {/* Start week counter */}
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => adjustPhaseWeek(phase.id, 'start', 1)}
                            className="w-4 h-3 glass-inset border border-white/10 rounded flex items-center justify-center hover:bg-white/10 transition-colors text-[8px] leading-none"
                          >
                            +
                          </button>
                          <button
                            onClick={() => adjustPhaseWeek(phase.id, 'start', -1)}
                            className="w-4 h-3 glass-inset border border-white/10 rounded flex items-center justify-center hover:bg-white/10 transition-colors text-[8px] leading-none"
                          >
                            −
                          </button>
                        </div>
                        
                        <span className="text-muted-foreground text-[9px]">{durationInWeeks}w</span>
                        
                        {/* End week counter */}
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => adjustPhaseWeek(phase.id, 'end', 1)}
                            className="w-4 h-3 glass-inset border border-white/10 rounded flex items-center justify-center hover:bg-white/10 transition-colors text-[8px] leading-none"
                          >
                            +
                          </button>
                          <button
                            onClick={() => adjustPhaseWeek(phase.id, 'end', -1)}
                            className="w-4 h-3 glass-inset border border-white/10 rounded flex items-center justify-center hover:bg-white/10 transition-colors text-[8px] leading-none"
                          >
                            −
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 relative h-10">
                    {/* Background track */}
                    <div className="absolute inset-y-0 left-0 right-0 glass-inset rounded border border-white/5" />
                    {/* Phase bar */}
                    <div 
                      className="absolute inset-y-0 rounded border border-white/20 flex items-center justify-center px-3 text-white text-xs font-medium overflow-hidden shadow-lg transition-all hover:scale-[1.02] cursor-pointer group/bar"
                      style={{ 
                        left: `${Math.max(0, leftOffset)}%`, 
                        width: `${Math.min(100 - Math.max(0, leftOffset), width)}%`,
                        backgroundColor: phase.color,
                        boxShadow: `0 0 20px ${phase.color}40`
                      }}
                    >
                      {/* Shimmer effect */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity"
                        style={{
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 2s infinite'
                        }}
                      />
                      
                      {/* Duration display */}
                      <span className="relative z-10">{durationInWeeks}w</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Phase Button */}
        {isEditing && (
          <button
            onClick={handleAddPhase}
            className="mt-6 w-full py-3 glass-subtle border border-white/10 hover:bg-white/10 text-foreground rounded-lg text-sm transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add New Phase
          </button>
        )}
      </div>

      {/* Phase Summary Cards */}
      <div className="space-y-4">
        <h3 className="text-sm text-muted-foreground font-medium">Phase Milestones</h3>
        <div className="grid grid-cols-1 gap-4">
          {phases.map((phase) => {
            return (
              <div key={phase.id} className="glass-subtle rounded-lg p-4 border border-white/10">
                <div className="flex items-start gap-4">
                  <div 
                    className="w-1 h-full rounded-full self-stretch"
                    style={{ backgroundColor: phase.color, boxShadow: `0 0 10px ${phase.color}60` }}
                  />
                  <div className="flex-1 space-y-2">
                    <h4 className="text-sm font-medium text-foreground">{phase.name}</h4>
                    <textarea
                      value={phase.deliverables}
                      onChange={(e) => handlePhaseChange(phase.id, 'deliverables', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-3 py-2 glass-inset border border-white/10 rounded text-xs text-muted-foreground leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-default"
                      placeholder="No milestones defined for this phase"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Helper Tips */}
      <div className="glass-subtle border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-foreground mb-1 flex items-center gap-2">
          <span className="text-primary">💡</span>
          <span className="font-medium">Pro Tips</span>
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 ml-6 mt-2">
          <li>• Click "Edit Timeline" to modify phases, adjust dates, and change colors</li>
          <li>• Phases are displayed as visual bars showing duration and timing</li>
          <li>• Hover over phase bars to see shimmer effects and duration details</li>
          <li>• Align phases with payment milestones and contract checkpoints</li>
        </ul>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}