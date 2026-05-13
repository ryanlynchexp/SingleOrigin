import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Users, Eye, Share2, CheckCircle2, RefreshCw } from "lucide-react";
import { ContentBuilder } from "./ContentBuilder";
import { BasicsTabContent } from "../components/workspace/BasicsTabContent";
import { ScopeTabContent } from "../components/workspace/ScopeTabContent";
import { DocumentTabContent } from "../components/workspace/DocumentTabContent";
import { TeamTabContent } from "../components/workspace/TeamTabContent";
import { PricingTabContent } from "../components/workspace/PricingTabContent";
import { CredentialsTabContent } from "../components/workspace/CredentialsTabContent";
import { TimelineTabContent } from "../components/workspace/TimelineTabContent";
import { ClientProposal } from "./ClientProposal";

// Tabs match the modal flow: Document, Basics, Scope, Team, Pricing, Proof Points, Timeline + Content Builder & Preview
const tabs = [
  "Documents",
  "Summary",
  "Team",
  "Pricing",
  "Proof Points",
  "Timeline",
  "Content Builder",
  "Preview",
];

export function ProposalWorkspace() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Documents");

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Top Bar with Glassmorphism */}
      <div className="glass-strong border-b border-white/10 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link to="/active-proposals" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <div>
              <h1 className="text-xl text-foreground font-medium">Acme Corporation</h1>
              <p className="text-sm text-muted-foreground">Digital Transformation Initiative</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 border border-success/30 text-success bg-success/10 rounded-lg text-sm flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
              In Progress
            </span>
            
            {/* Team Members */}
            <div className="flex items-center gap-2 px-3 py-1.5 glass-subtle border border-white/10 rounded-lg">
              <Users className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <div className="flex -space-x-2">
                {[["SC", "#255FF5"], ["MR", "#8B5CF6"], ["ET", "#49F222"], ["AK", "#F97316"]].map(([initials, color], i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-lg border-2 border-background glass-subtle flex items-center justify-center text-foreground text-xs font-medium"
                    style={{ borderColor: `${color}40` }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
            </div>

            <Link
              to={`/client/${id}`}
              className="px-4 py-2 glass-subtle border border-white/10 hover:bg-white/10 text-foreground rounded-lg text-sm flex items-center gap-2 transition-all hover-lift"
            >
              <Eye className="w-4 h-4" strokeWidth={1.5} />
              Preview
            </Link>
            
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-all flex items-center gap-2 glow-primary font-medium">
              <Share2 className="w-4 h-4" strokeWidth={1.5} />
              Publish
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded-lg text-sm whitespace-nowrap transition-all font-medium ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground glow-primary shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent hover:border-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className={`flex-1 layer-base ${activeTab === 'Preview' ? 'overflow-hidden' : 'overflow-auto p-8'}`}>
        {activeTab === "Documents" && <DocumentTabContent />}
        {activeTab === "Summary" && <BasicsTabContent />}
        {activeTab === "Team" && <TeamTabContent />}
        {activeTab === "Pricing" && <PricingTabContent />}
        {activeTab === "Proof Points" && <CredentialsTabContent />}
        {activeTab === "Timeline" && <TimelineTabContent />}
        {activeTab === "Content Builder" && <ContentBuilder />}
        {activeTab === "Preview" && <PreviewTab />}
      </div>
    </div>
  );
}

function PreviewTab() {
  const { id } = useParams();
  
  return (
    <div className="h-full w-full flex flex-col relative p-6">
      {/* Floating Action Button */}
      <Link
        to={`/client/${id || '1'}`}
        target="_blank"
        className="absolute top-8 right-8 z-10 inline-flex items-center gap-2 px-4 py-2 glass-strong border border-white/10 hover:bg-white/10 text-foreground rounded-lg text-sm transition-all hover-lift shadow-xl"
      >
        <Eye className="w-4 h-4" strokeWidth={1.5} />
        Open in New Tab
      </Link>
      
      {/* Preview Container with Rounded Corners and Proper Spacing */}
      <div className="flex-1 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-white">
        <div className="h-full overflow-auto">
          <ClientProposal previewMode={true} />
        </div>
      </div>
    </div>
  );
}