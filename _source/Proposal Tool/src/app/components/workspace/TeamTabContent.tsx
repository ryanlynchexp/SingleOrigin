import { useState } from "react";
import { Plus, Trash2, Calendar, MapPin, Edit2, Save } from "lucide-react";
import { acmeProposalData } from "../../data/acmeProposalData";

interface TeamMember {
  id: string;
  role: string;
  allocationPercent: number;
  startPercent: number;
  endPercent: number;
  payRate: string;
  billRate: string;
}

export function TeamTabContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...acmeProposalData.team,
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...acmeProposalData.team });
  };

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: any) => {
    if (!isEditing) return;
    const newTeamMembers = [...formData.teamMembers];
    newTeamMembers[index] = {
      ...newTeamMembers[index],
      [field]: value,
    };
    setFormData({ ...formData, teamMembers: newTeamMembers });
  };

  const handleAddTeamMember = () => {
    if (!isEditing) return;
    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      role: "New Role",
      allocationPercent: 100,
      startPercent: 0,
      endPercent: 100,
      payRate: "150",
      billRate: "240",
    };
    setFormData({
      ...formData,
      teamMembers: [...formData.teamMembers, newMember],
    });
  };

  const handleRemoveTeamMember = (index: number) => {
    if (!isEditing) return;
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter((_, i) => i !== index),
    });
  };

  // Calculate project duration in months
  const startDate = new Date(formData.projectStartDate);
  const endDate = new Date(formData.projectEndDate);
  const monthsDuration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
  const projectDurationMonths = Math.round(monthsDuration * 10) / 10;

  // Calculate cost per team member
  const calculateMemberCost = (member: TeamMember) => {
    const hoursPerMonth = 160;
    const billRate = parseFloat(member.billRate) || 0;
    const allocation = member.allocationPercent / 100;
    const timeOnProject = (member.endPercent - member.startPercent) / 100;
    
    return billRate * hoursPerMonth * projectDurationMonths * allocation * timeOnProject;
  };

  const totalTeamCost = formData.teamMembers.reduce(
    (sum, member) => sum + calculateMemberCost(member),
    0
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="glass-strong rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg text-foreground font-medium">Team Configuration</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-4 py-2 glass-subtle border border-white/10 hover:bg-white/10 text-foreground rounded-lg text-sm transition-all"
            >
              <Edit2 className="w-4 h-4" strokeWidth={1.5} />
              Edit
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

        {/* Project Settings */}
        <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-white/10">
          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-medium">
              Team Owner
              <span className="text-xs font-normal ml-2">Responsible for staffing</span>
            </label>
            <input
              type="text"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              placeholder="Assign team member"
              className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-medium">Service Type</label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all"
            >
              <option value="project-based">Project-Based (Fixed Duration)</option>
              <option value="time-materials">Time & Materials (Ongoing)</option>
              <option value="retainer">Retainer (Monthly)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-medium">
              <Calendar className="w-4 h-4 inline mr-1" strokeWidth={1.5} />
              Project Start Date
            </label>
            <input
              type="date"
              value={formData.projectStartDate}
              onChange={(e) => setFormData({ ...formData, projectStartDate: e.target.value })}
              className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-medium">
              <Calendar className="w-4 h-4 inline mr-1" strokeWidth={1.5} />
              Project End Date
            </label>
            <input
              type="date"
              value={formData.projectEndDate}
              onChange={(e) => setFormData({ ...formData, projectEndDate: e.target.value })}
              className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-medium">
              <MapPin className="w-4 h-4 inline mr-1" strokeWidth={1.5} />
              Region
            </label>
            <select
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all"
            >
              <option value="west-coast">West Coast (US)</option>
              <option value="east-coast">East Coast (US)</option>
              <option value="midwest">Midwest (US)</option>
              <option value="south">South (US)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-medium">Location Type</label>
            <select
              value={formData.locationType}
              onChange={(e) => setFormData({ ...formData, locationType: e.target.value })}
              className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all"
            >
              <option value="onshore">Onshore</option>
              <option value="nearshore">Nearshore</option>
              <option value="offshore">Offshore</option>
            </select>
          </div>
        </div>

        {/* Duration Summary */}
        <div className="mb-6 p-4 rounded-lg glass-subtle border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Project Duration</span>
            <span className="text-lg font-medium text-foreground">{projectDurationMonths} months</span>
          </div>
        </div>

        {/* Team Members Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="glass-subtle border-b border-white/10">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Allocation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Pay Rate/hr
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Bill Rate/hr
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total Cost
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {formData.teamMembers.map((member, index) => {
                const memberCost = calculateMemberCost(member);
                const timeOnProject = member.endPercent - member.startPercent;
                
                // Calculate actual start and end dates based on percentages
                const projectStart = new Date(formData.projectStartDate);
                const projectEnd = new Date(formData.projectEndDate);
                const totalDuration = projectEnd.getTime() - projectStart.getTime();
                
                const memberStartDate = new Date(projectStart.getTime() + (member.startPercent / 100) * totalDuration);
                const memberEndDate = new Date(projectStart.getTime() + (member.endPercent / 100) * totalDuration);
                
                const formatDate = (date: Date) => {
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                };
                
                return (
                  <tr key={member.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4 align-middle">
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => handleTeamMemberChange(index, "role", e.target.value)}
                        className="w-full px-2 py-1 glass-inset border border-white/10 rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={member.allocationPercent}
                          onChange={(e) =>
                            handleTeamMemberChange(index, "allocationPercent", parseInt(e.target.value) || 0)
                          }
                          className="w-16 px-2 py-1 glass-inset border border-white/10 rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle relative">
                      <div className="flex items-center gap-2 group relative">
                        {isEditing ? (
                          <>
                            <div className="flex items-center glass-inset border border-white/10 rounded overflow-hidden">
                              <button
                                type="button"
                                onClick={() => handleTeamMemberChange(index, "startPercent", Math.max(0, member.startPercent - 5))}
                                className="px-2 py-1 hover:bg-white/10 text-muted-foreground transition-colors text-xs"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={member.startPercent}
                                onChange={(e) =>
                                  handleTeamMemberChange(index, "startPercent", parseInt(e.target.value) || 0)
                                }
                                className="w-12 px-1 py-1 bg-transparent border-0 text-xs text-foreground text-center focus:outline-none focus:ring-0"
                              />
                              <button
                                type="button"
                                onClick={() => handleTeamMemberChange(index, "startPercent", Math.min(100, member.startPercent + 5))}
                                className="px-2 py-1 hover:bg-white/10 text-muted-foreground transition-colors text-xs"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-xs text-muted-foreground">-</span>
                            <div className="flex items-center glass-inset border border-white/10 rounded overflow-hidden">
                              <button
                                type="button"
                                onClick={() => handleTeamMemberChange(index, "endPercent", Math.max(0, member.endPercent - 5))}
                                className="px-2 py-1 hover:bg-white/10 text-muted-foreground transition-colors text-xs"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={member.endPercent}
                                onChange={(e) =>
                                  handleTeamMemberChange(index, "endPercent", parseInt(e.target.value) || 0)
                                }
                                className="w-12 px-1 py-1 bg-transparent border-0 text-xs text-foreground text-center focus:outline-none focus:ring-0"
                              />
                              <button
                                type="button"
                                onClick={() => handleTeamMemberChange(index, "endPercent", Math.min(100, member.endPercent + 5))}
                                className="px-2 py-1 hover:bg-white/10 text-muted-foreground transition-colors text-xs"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-xs text-muted-foreground">%</span>
                          </>
                        ) : (
                          <>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={member.startPercent}
                              disabled
                              className="w-12 px-2 py-1 glass-inset border border-white/10 rounded text-xs text-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                            <span className="text-xs text-muted-foreground">-</span>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={member.endPercent}
                              disabled
                              className="w-12 px-2 py-1 glass-inset border border-white/10 rounded text-xs text-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                            <span className="text-xs text-muted-foreground">%</span>
                          </>
                        )}
                        {/* Tooltip */}
                        <div className="absolute left-0 -top-8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                          <div className="glass-strong border border-white/20 rounded px-3 py-1.5 text-xs text-foreground shadow-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-muted-foreground">Start:</span>
                              <span className="font-medium">{formatDate(memberStartDate)}</span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">End:</span>
                              <span className="font-medium">{formatDate(memberEndDate)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">$</span>
                        <input
                          type="number"
                          value={member.payRate}
                          onChange={(e) => handleTeamMemberChange(index, "payRate", e.target.value)}
                          className="w-20 px-2 py-1 glass-inset border border-white/10 rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">$</span>
                        <input
                          type="number"
                          value={member.billRate}
                          onChange={(e) => handleTeamMemberChange(index, "billRate", e.target.value)}
                          className="w-20 px-2 py-1 glass-inset border border-white/10 rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right align-middle">
                      <span className="text-sm font-medium text-foreground">
                        ${memberCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right align-middle">
                      <button
                        onClick={() => handleRemoveTeamMember(index)}
                        className="p-2 glass-subtle border border-white/10 hover:bg-destructive/10 hover:border-destructive/30 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add Team Member Button */}
        {isEditing && (
          <div className="mt-4">
            <button
              onClick={handleAddTeamMember}
              className="inline-flex items-center gap-2 px-4 py-2 glass-subtle border border-white/10 hover:bg-white/10 text-foreground rounded-lg text-sm transition-all"
            >
              <Plus className="w-4 h-4" strokeWidth={1.5} />
              Add Team Member
            </button>
          </div>
        )}

        {/* Team Cost Summary */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-muted-foreground">Total Team Cost</span>
            <span className="text-2xl font-medium text-foreground">
              ${totalTeamCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Based on {formData.teamMembers.length} team members over {projectDurationMonths} months
          </p>
        </div>
      </div>
    </div>
  );
}