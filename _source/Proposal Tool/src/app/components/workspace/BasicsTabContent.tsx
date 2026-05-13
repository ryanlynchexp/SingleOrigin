import { useState } from "react";
import { X, Edit2, Save, Plus } from "lucide-react";
import { acmeProposalData } from "../../data/acmeProposalData";

// Predefined options for industries and work types
const INDUSTRY_OPTIONS = [
  "Financial Services",
  "Healthcare",
  "Technology",
  "Manufacturing",
  "Retail",
  "Energy & Utilities",
  "Telecommunications",
  "Government",
  "Education",
  "Transportation",
  "Real Estate",
  "Media & Entertainment",
  "Hospitality",
  "Insurance",
  "Pharmaceuticals",
  "Automotive",
  "Aerospace & Defense",
  "Consumer Goods",
  "Professional Services",
  "Non-Profit"
];

const WORK_TYPE_OPTIONS = [
  "Staff Augmentation",
  "Project-Based",
  "Managed Services",
  "Consulting",
  "Application Development",
  "Infrastructure & Cloud",
  "Data & Analytics",
  "Cybersecurity",
  "Digital Transformation",
  "DevOps",
  "QA & Testing",
  "UX/UI Design",
  "Business Analysis",
  "Program Management",
  "System Integration",
  "Migration Services",
  "Support & Maintenance",
  "Training & Enablement"
];

export function BasicsTabContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...acmeProposalData.basics,
    ...acmeProposalData.scopeOfWork,
  });
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedWorkType, setSelectedWorkType] = useState("");

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ 
      ...acmeProposalData.basics,
      ...acmeProposalData.scopeOfWork,
    });
    setSelectedIndustry("");
    setSelectedWorkType("");
  };

  const addIndustry = () => {
    if (selectedIndustry.trim() && !formData.industries.includes(selectedIndustry.trim())) {
      setFormData({
        ...formData,
        industries: [...formData.industries, selectedIndustry.trim()]
      });
      setSelectedIndustry("");
    }
  };

  const removeIndustry = (index: number) => {
    setFormData({
      ...formData,
      industries: formData.industries.filter((_, i) => i !== index)
    });
  };

  const addWorkType = () => {
    if (selectedWorkType.trim() && !formData.workTypes.includes(selectedWorkType.trim())) {
      setFormData({
        ...formData,
        workTypes: [...formData.workTypes, selectedWorkType.trim()]
      });
      setSelectedWorkType("");
    }
  };

  const removeWorkType = (index: number) => {
    setFormData({
      ...formData,
      workTypes: formData.workTypes.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Proposal Basics Section */}
      <div className="glass-strong rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg text-foreground font-medium">Proposal Summary</h2>
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

        <div className="space-y-6">
          {/* Proposal Owner */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-medium">
              Proposal Owner
              <span className="text-xs font-normal ml-2">Who will lead this proposal?</span>
            </label>
            <input
              type="text"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              placeholder="Search team members"
              disabled={!isEditing}
              className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Client & Project Info */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-sm font-medium text-foreground mb-4">Project Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 font-medium">Client Name</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Enter client name"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 font-medium">Project Name</label>
                  <input
                    type="text"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    placeholder="Brief project title"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Industries */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-medium">Industries</label>
                {formData.industries.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.industries.map((industry, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                      >
                        {industry}
                        {isEditing && (
                          <button
                            onClick={() => removeIndustry(index)}
                            className="hover:text-primary/70 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                )}
                {isEditing && (
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="flex-1 px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all"
                    >
                      <option value="">Select industry</option>
                      {INDUSTRY_OPTIONS.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={addIndustry}
                      disabled={!selectedIndustry.trim()}
                      className="px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-all glow-primary font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                )}
              </div>

              {/* Work Types */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-medium">Work Types</label>
                {formData.workTypes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.workTypes.map((workType, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success rounded-full text-sm border border-success/20"
                      >
                        {workType}
                        {isEditing && (
                          <button
                            onClick={() => removeWorkType(index)}
                            className="hover:text-success/70 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                )}
                {isEditing && (
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedWorkType}
                      onChange={(e) => setSelectedWorkType(e.target.value)}
                      className="flex-1 px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all"
                    >
                      <option value="">Select work type</option>
                      {WORK_TYPE_OPTIONS.map((workType) => (
                        <option key={workType} value={workType}>
                          {workType}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={addWorkType}
                      disabled={!selectedWorkType.trim()}
                      className="px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-all glow-primary font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                )}
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 font-medium">Questions Due</label>
                  <input
                    type="date"
                    value={formData.questionsDue}
                    onChange={(e) => setFormData({ ...formData, questionsDue: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 font-medium">Answers Posted</label>
                  <input
                    type="date"
                    value={formData.answersPosted}
                    onChange={(e) => setFormData({ ...formData, answersPosted: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 font-medium">Submission Deadline</label>
                  <input
                    type="date"
                    value={formData.submissionDeadline}
                    onChange={(e) => setFormData({ ...formData, submissionDeadline: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 font-medium">Discovery Session</label>
                  <div className="flex items-center gap-3 h-[46px]">
                    <label
                      className={`flex items-center gap-2 ${
                        !isEditing ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.discoverySession}
                        onChange={(e) =>
                          setFormData({ ...formData, discoverySession: e.target.checked })
                        }
                        disabled={!isEditing}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                      <span className="text-sm text-foreground">Schedule discovery call</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* RFP Source */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-medium">RFP Source</label>
                <select
                  value={formData.rfpSource}
                  onChange={(e) => setFormData({ ...formData, rfpSource: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <option value="">Select source</option>
                  <option value="Direct from client">Direct from client</option>
                  <option value="GovWin">GovWin</option>
                  <option value="SAM.gov">SAM.gov</option>
                  <option value="Partner referral">Partner referral</option>
                  <option value="Email">Email</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scope of Work Section */}
      <div className="glass-strong rounded-xl p-6 border border-white/10">
        <h2 className="text-lg text-foreground font-medium mb-6">Scope of Work</h2>

        <div className="space-y-6">
          {/* Project Description */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-medium">
              Project Description
              <span className="text-xs font-normal ml-2">Comprehensive overview of the project goals and context</span>
            </label>
            <textarea
              rows={8}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the project, business objectives, expected outcomes, and strategic impact..."
              disabled={!isEditing}
              className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all resize-none leading-relaxed disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              {formData.description?.length || 0} characters
            </p>
          </div>

          {/* Key Deliverables */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-medium">
              Key Deliverables
              <span className="text-xs font-normal ml-2">List specific outputs and milestones</span>
            </label>
            <textarea
              rows={10}
              value={formData.deliverables}
              onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
              placeholder="• Deliverable 1\n• Deliverable 2\n• Deliverable 3"
              disabled={!isEditing}
              className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none text-foreground leading-relaxed transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Use bullet points (•) to organize deliverables
            </p>
          </div>

          {/* Technical Requirements */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-medium">
              Technical Requirements & Stack
              <span className="text-xs font-normal ml-2">Technologies, platforms, and tools required</span>
            </label>
            <textarea
              rows={12}
              value={formData.technicalRequirements}
              onChange={(e) => setFormData({ ...formData, technicalRequirements: e.target.value })}
              placeholder="• Technology 1\n• Platform 2\n• Tool 3"
              disabled={!isEditing}
              className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none text-foreground leading-relaxed transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Include cloud platforms, frameworks, databases, and development tools
            </p>
          </div>
        </div>
      </div>

      {/* Helper Tips */}
      <div className="glass-subtle border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-foreground mb-1 flex items-center gap-2">
          <span className="text-primary">💡</span>
          <span className="font-medium">Pro Tips</span>
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 ml-6 mt-2">
          <li>• Be specific about measurable outcomes and success criteria</li>
          <li>• Include assumptions, constraints, and dependencies</li>
          <li>• Reference any out-of-scope items to set clear boundaries</li>
          <li>• Align deliverables with project phases in the timeline</li>
        </ul>
      </div>
    </div>
  );
}