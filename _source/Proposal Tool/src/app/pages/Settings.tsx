import { useState } from "react";
import { DollarSign, Users, Calendar, FileEdit, Image, Plus, Trash2, Edit2, Upload, Wrench, Plane } from "lucide-react";

type SettingsTab = "pricing" | "staffing" | "timeline" | "content" | "assets";

const tabs = [
  { id: "pricing" as SettingsTab, label: "Pricing Modeler", icon: DollarSign },
  { id: "staffing" as SettingsTab, label: "Staffing Planner", icon: Users },
  { id: "timeline" as SettingsTab, label: "Timeline Templates", icon: Calendar },
  { id: "content" as SettingsTab, label: "Content Builder", icon: FileEdit },
  { id: "assets" as SettingsTab, label: "Case Studies", icon: Image },
];

// Mock data
const peopleRoles = [
  { id: 1, title: "Senior Software Engineer", westCoast: 185, eastCoast: 175, midwest: 165, south: 155, nearshore: 120, offshore: 95, category: "Engineering" },
  { id: 2, title: "Project Manager", westCoast: 175, eastCoast: 165, midwest: 155, south: 145, nearshore: 110, offshore: 85, category: "Management" },
  { id: 3, title: "DevOps Engineer", westCoast: 165, eastCoast: 155, midwest: 145, south: 135, nearshore: 105, offshore: 80, category: "Engineering" },
  { id: 4, title: "UI/UX Designer", westCoast: 155, eastCoast: 145, midwest: 135, south: 125, nearshore: 95, offshore: 70, category: "Design" },
  { id: 5, title: "Business Analyst", westCoast: 145, eastCoast: 135, midwest: 125, south: 115, nearshore: 85, offshore: 65, category: "Analysis" },
  { id: 6, title: "Technical Lead", westCoast: 195, eastCoast: 185, midwest: 175, south: 165, nearshore: 130, offshore: 100, category: "Engineering" },
  { id: 7, title: "QA Engineer", westCoast: 135, eastCoast: 125, midwest: 115, south: 105, nearshore: 80, offshore: 60, category: "Engineering" },
];

const toolsAndSoftware = [
  { id: 1, name: "Jira + Confluence", costPerUser: 15, billingCycle: "monthly", category: "Project Management" },
  { id: 2, name: "GitHub Enterprise", costPerUser: 21, billingCycle: "monthly", category: "Development" },
  { id: 3, name: "Figma Professional", costPerUser: 15, billingCycle: "monthly", category: "Design" },
  { id: 4, name: "AWS/Cloud Infrastructure", costPerUser: 500, billingCycle: "monthly", category: "Infrastructure" },
  { id: 5, name: "Slack Business+", costPerUser: 12, billingCycle: "monthly", category: "Communication" },
];

const otherExpenses = [
  { id: 1, name: "Travel & Accommodation", estimatedCost: 2500, unit: "per trip", category: "Travel" },
  { id: 2, name: "Professional Liability Insurance", estimatedCost: 5000, unit: "per project", category: "Insurance" },
  { id: 3, name: "Training & Certifications", estimatedCost: 1500, unit: "per person", category: "Professional Development" },
  { id: 4, name: "Client Entertainment", estimatedCost: 500, unit: "monthly", category: "Business Development" },
  { id: 5, name: "Equipment & Hardware", estimatedCost: 3000, unit: "per person", category: "Equipment" },
];

const jobRoles = [
  { id: 1, title: "Senior Software Engineer", rate: 175, billRate: 245, level: "Senior", category: "Engineering" },
  { id: 2, title: "Project Manager", rate: 165, billRate: 231, level: "Senior", category: "Management" },
  { id: 3, title: "DevOps Engineer", rate: 155, billRate: 217, level: "Mid", category: "Engineering" },
  { id: 4, title: "UI/UX Designer", rate: 145, billRate: 203, level: "Mid", category: "Design" },
  { id: 5, title: "Business Analyst", rate: 135, billRate: 189, level: "Mid", category: "Analysis" },
];

const staffingTemplates = [
  { id: 1, name: "Standard Development Team", headcount: 8, roles: ["PM", "Tech Lead", "4x Engineers", "Designer", "QA"] },
  { id: 2, name: "Enterprise Implementation", headcount: 12, roles: ["PM", "2x Architects", "6x Engineers", "2x QA", "BA"] },
  { id: 3, name: "Agile Squad", headcount: 6, roles: ["PM", "Tech Lead", "3x Engineers", "Designer"] },
];

const timelineTemplates = [
  { id: 1, name: "6-Month Transformation", duration: "6 months", phases: 4, milestones: 12 },
  { id: 2, name: "3-Month MVP", duration: "3 months", phases: 3, milestones: 8 },
  { id: 3, name: "12-Month Enterprise Rollout", duration: "12 months", phases: 5, milestones: 20 },
];

const contentBlocks = [
  { id: 1, name: "Company Overview", category: "Introduction", lastUpdated: "Mar 1, 2026" },
  { id: 2, name: "Security & Compliance Statement", category: "Legal", lastUpdated: "Feb 28, 2026" },
  { id: 3, name: "Agile Methodology Overview", category: "Process", lastUpdated: "Feb 25, 2026" },
  { id: 4, name: "Cloud Migration Approach", category: "Technical", lastUpdated: "Feb 20, 2026" },
];

const assetItems = [
  { id: 1, name: "Fortune 500 Digital Transformation", type: "Case Study", category: "Enterprise", date: "Feb 2026" },
  { id: 2, name: "Healthcare System Modernization", type: "Case Study", category: "Healthcare", date: "Jan 2026" },
  { id: 3, name: "Company Logo Package", type: "Brand Assets", category: "Branding", date: "Dec 2025" },
  { id: 4, name: "Technology Stack Diagram", type: "Diagram", category: "Technical", date: "Feb 2026" },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("pricing");

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="glass-strong border-b border-white/10 px-8 py-6">
        <h1 className="text-2xl text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure defaults, templates, and assets for proposal creation</p>
      </div>

      {/* Tabs */}
      <div className="glass-subtle border-b border-white/10 px-8">
        <div className="flex gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all text-sm ${
                  activeTab === tab.id
                    ? "border-primary text-primary shadow-lg shadow-primary/10"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === "pricing" && <PricingModelerTab />}
          {activeTab === "staffing" && <StaffingPlannerTab />}
          {activeTab === "timeline" && <TimelineTemplatesTab />}
          {activeTab === "content" && <ContentBuilderTab />}
          {activeTab === "assets" && <AssetsLibraryTab />}
        </div>
      </div>
    </div>
  );
}

function PricingModelerTab() {
  return (
    <div className="space-y-8">
      {/* SECTION 1: PEOPLE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg text-foreground mb-1 flex items-center gap-2">
              <Users className="w-5 h-5" strokeWidth={1.5} />
              People - Regional Rates
            </h2>
            <p className="text-sm text-muted-foreground">Pay rates by job role and geographic region (per hour)</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Role
          </button>
        </div>

        <div className="glass rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-muted-foreground sticky left-0 bg-white/5">Job Title</th>
                  <th className="text-left px-6 py-3 text-xs text-muted-foreground">Category</th>
                  <th className="text-right px-6 py-3 text-xs text-muted-foreground whitespace-nowrap">West Coast</th>
                  <th className="text-right px-6 py-3 text-xs text-muted-foreground whitespace-nowrap">East Coast</th>
                  <th className="text-right px-6 py-3 text-xs text-muted-foreground">Midwest</th>
                  <th className="text-right px-6 py-3 text-xs text-muted-foreground">South</th>
                  <th className="text-right px-6 py-3 text-xs text-muted-foreground">Nearshore</th>
                  <th className="text-right px-6 py-3 text-xs text-muted-foreground">Offshore</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {peopleRoles.map((role) => (
                  <tr key={role.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground font-medium sticky left-0 bg-background">{role.title}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{role.category}</td>
                    <td className="px-6 py-4 text-sm text-foreground text-right">${role.westCoast}</td>
                    <td className="px-6 py-4 text-sm text-foreground text-right">${role.eastCoast}</td>
                    <td className="px-6 py-4 text-sm text-foreground text-right">${role.midwest}</td>
                    <td className="px-6 py-4 text-sm text-foreground text-right">${role.south}</td>
                    <td className="px-6 py-4 text-sm text-success text-right">${role.nearshore}</td>
                    <td className="px-6 py-4 text-sm text-success text-right">${role.offshore}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                          <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION 2: TOOLS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg text-foreground mb-1 flex items-center gap-2">
              <Wrench className="w-5 h-5" strokeWidth={1.5} />
              Tools & Software
            </h2>
            <p className="text-sm text-muted-foreground">Standard tooling costs for project teams</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Tool
          </button>
        </div>

        <div className="glass rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left px-6 py-3 text-xs text-muted-foreground">Tool/Software</th>
                <th className="text-left px-6 py-3 text-xs text-muted-foreground">Category</th>
                <th className="text-right px-6 py-3 text-xs text-muted-foreground">Cost Per User</th>
                <th className="text-left px-6 py-3 text-xs text-muted-foreground">Billing Cycle</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {toolsAndSoftware.map((tool) => (
                <tr key={tool.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{tool.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{tool.category}</td>
                  <td className="px-6 py-4 text-sm text-foreground text-right">${tool.costPerUser}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground capitalize">{tool.billingCycle}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                        <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: OTHER */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg text-foreground mb-1 flex items-center gap-2">
              <Plane className="w-5 h-5" strokeWidth={1.5} />
              Other Expenses
            </h2>
            <p className="text-sm text-muted-foreground">Travel, insurance, and miscellaneous project costs</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Expense
          </button>
        </div>

        <div className="glass rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left px-6 py-3 text-xs text-muted-foreground">Expense Item</th>
                <th className="text-left px-6 py-3 text-xs text-muted-foreground">Category</th>
                <th className="text-right px-6 py-3 text-xs text-muted-foreground">Estimated Cost</th>
                <th className="text-left px-6 py-3 text-xs text-muted-foreground">Unit</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {otherExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{expense.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{expense.category}</td>
                  <td className="px-6 py-4 text-sm text-foreground text-right">${expense.estimatedCost.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{expense.unit}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                        <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-subtle border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-foreground mb-1 flex items-center gap-2">
          <span className="text-primary">💡</span>
          <span className="font-medium">Pro Tip</span>
        </p>
        <p className="text-sm text-muted-foreground">
          These rates and costs will be used as defaults when building proposals. You can override them on a per-proposal basis to account for special circumstances or client-specific pricing.
        </p>
      </div>
    </div>
  );
}

function StaffingPlannerTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg text-foreground mb-1">Quick Start Teams</h2>
          <p className="text-sm text-muted-foreground">Pre-configured team structures for common project types</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {staffingTemplates.map((template) => (
          <div key={template.id} className="glass rounded-lg p-6 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base text-foreground mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.headcount} team members</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground mb-2">Roles included:</p>
              <div className="flex flex-wrap gap-2">
                {template.roles.map((role, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 glass-subtle text-foreground rounded-full text-xs border border-white/10"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineTemplatesTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg text-foreground mb-1">Timeline Templates</h2>
          <p className="text-sm text-muted-foreground">Reusable project timeline structures with phases and milestones</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          New Template
        </button>
      </div>

      <div className="space-y-4">
        {timelineTemplates.map((template) => (
          <div key={template.id} className="glass rounded-lg border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-base text-foreground mb-2">{template.name}</h3>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span>Duration: <span className="text-foreground">{template.duration}</span></span>
                  <span>Phases: <span className="text-foreground">{template.phases}</span></span>
                  <span>Milestones: <span className="text-foreground">{template.milestones}</span></span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm text-foreground glass-subtle border border-white/10 rounded hover:bg-white/10 transition-colors">
                  Preview
                </button>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentBuilderTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg text-foreground mb-1">Content Blocks</h2>
          <p className="text-sm text-muted-foreground">Reusable narrative sections and boilerplate content</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          Create Block
        </button>
      </div>

      <div className="glass rounded-lg border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="text-left px-6 py-3 text-xs text-muted-foreground">Content Name</th>
              <th className="text-left px-6 py-3 text-xs text-muted-foreground">Category</th>
              <th className="text-left px-6 py-3 text-xs text-muted-foreground">Last Updated</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {contentBlocks.map((block) => (
              <tr key={block.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-foreground">{block.name}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 glass-subtle text-foreground rounded-full text-xs border border-white/10">
                    {block.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{block.lastUpdated}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="px-3 py-1.5 text-sm text-foreground glass-subtle border border-white/10 rounded hover:bg-white/10 transition-colors">
                      Edit
                    </button>
                    <button className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AssetsLibraryTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg text-foreground mb-1">Case Studies</h2>
          <p className="text-sm text-muted-foreground">Success stories and project examples for proposals</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Upload className="w-4 h-4" strokeWidth={1.5} />
          Upload Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assetItems.map((asset) => (
          <div key={asset.id} className="glass rounded-lg border border-white/10 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 glass-subtle rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10">
                <Image className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm text-foreground mb-1 truncate">{asset.name}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="px-2 py-1 glass-subtle rounded border border-white/10">{asset.type}</span>
                  <span>{asset.date}</span>
                </div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs border border-primary/20">
                  {asset.category}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}