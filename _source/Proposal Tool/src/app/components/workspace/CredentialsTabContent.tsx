import { useState } from "react";
import { Award, CheckCircle2, Edit2, Save } from "lucide-react";
import { acmeProposalData } from "../../data/acmeProposalData";

const mockCaseStudies = [
  { id: 1, title: "Enterprise Cloud Migration", client: "Fortune 500 Tech Co", value: "$2.5M", industry: "Technology" },
  { id: 15, title: "Healthcare System Modernization", client: "Regional Health Network", value: "$3.2M", industry: "Healthcare" },
  { id: 23, title: "Financial Services Platform", client: "National Bank", value: "$4.1M", industry: "Finance" },
];

export function CredentialsTabContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...acmeProposalData.credentials,
  });

  const [selectedCaseStudies, setSelectedCaseStudies] = useState<number[]>(
    formData.caseStudyIds
  );

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...acmeProposalData.credentials });
    setSelectedCaseStudies(acmeProposalData.credentials.caseStudyIds);
  };

  const handleToggleCaseStudy = (id: number) => {
    if (!isEditing) return;
    if (selectedCaseStudies.includes(id)) {
      setSelectedCaseStudies(selectedCaseStudies.filter((cid) => cid !== id));
    } else {
      if (selectedCaseStudies.length < 5) {
        setSelectedCaseStudies([...selectedCaseStudies, id]);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="glass-strong rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg text-foreground font-medium">Credentials & Proof Points</h2>
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
              Credentials Owner
              <span className="text-xs font-normal ml-2">Responsible for case study selection</span>
            </label>
            <input
              type="text"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              placeholder="Assign team member"
              className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground transition-all"
            />
          </div>

          {/* Case Studies */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-foreground font-medium">Selected Case Studies</h3>
              <span className="text-xs text-muted-foreground">
                {selectedCaseStudies.length} / 5 selected
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Select 3-5 relevant case studies that demonstrate similar work and build credibility
            </p>

            <div className="space-y-3">
              {mockCaseStudies.map((study) => {
                const isSelected = selectedCaseStudies.includes(study.id);
                return (
                  <button
                    key={study.id}
                    onClick={() => handleToggleCaseStudy(study.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      isSelected
                        ? "glass-subtle border-primary/30 bg-primary/5"
                        : "glass-inset border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">{study.title}</h4>
                          <span className="px-2 py-0.5 rounded text-xs glass-subtle border border-white/20 text-muted-foreground">
                            {study.industry}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {study.client} • {study.value} value
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-primary border-primary"
                            : "border-white/30"
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Certifications & Credentials */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-accent" strokeWidth={1.5} />
              <h3 className="text-foreground font-medium">Certifications & Accreditations</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              List company certifications, partnerships, and compliance standards
            </p>
            <textarea
              rows={8}
              value={formData.certifications}
              onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
              placeholder="• AWS Advanced Consulting Partner&#10;• ISO 27001:2013 Certified&#10;• SOC 2 Type II Compliant"
              className="w-full px-4 py-3 glass-inset border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none text-foreground leading-relaxed transition-all text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Use bullet points (•) to organize certifications
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
          <li>• Select case studies from similar industries or with comparable scope</li>
          <li>• Highlight measurable outcomes and client testimonials when available</li>
          <li>• Include relevant certifications that align with client requirements</li>
          <li>• Keep certifications current and verify expiration dates</li>
        </ul>
      </div>
    </div>
  );
}