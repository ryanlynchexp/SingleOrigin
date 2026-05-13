import { useState } from "react";
import { Edit2, Save } from "lucide-react";
import { acmeProposalData } from "../../data/acmeProposalData";

export function ScopeTabContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...acmeProposalData.scopeOfWork,
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...acmeProposalData.scopeOfWork });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="glass-strong rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg text-foreground font-medium">Scope of Work</h2>
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
          {/* Owner */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-medium">
              Scope Owner
              <span className="text-xs font-normal ml-2">Responsible for scope definition</span>
            </label>
            <input
              type="text"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              placeholder="Assign team member"
              disabled={!isEditing}
              className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

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
              {formData.description.length} characters
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
              placeholder="• Deliverable 1&#10;• Deliverable 2&#10;• Deliverable 3"
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
              placeholder="• Technology 1&#10;• Platform 2&#10;• Tool 3"
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