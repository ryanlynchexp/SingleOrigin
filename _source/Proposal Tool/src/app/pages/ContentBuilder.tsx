import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Building2,
  Globe,
  Award,
  Users,
  TrendingUp,
  FileText,
  Calendar,
  DollarSign,
  Target,
  CheckCircle2,
  GripVertical,
  Trash2,
  X,
  Rocket,
} from "lucide-react";

interface Section {
  id: string;
  title: string;
  type: "template" | "proposal";
  icon: React.ReactNode;
  description: string;
}

const templateSections: Section[] = [
  {
    id: "company-overview",
    title: "Company Overview",
    type: "template",
    icon: <Building2 className="w-5 h-5 text-primary" strokeWidth={1.5} />,
    description: "Introduction to your organization",
  },
  {
    id: "global-footprint",
    title: "Global Footprint",
    type: "template",
    icon: <Globe className="w-5 h-5 text-primary" strokeWidth={1.5} />,
    description: "Worldwide presence and locations",
  },
  {
    id: "awards-recognition",
    title: "Awards & Recognition",
    type: "template",
    icon: <Award className="w-5 h-5 text-primary" strokeWidth={1.5} />,
    description: "Industry awards and achievements",
  },
  {
    id: "leadership-team",
    title: "Leadership Team",
    type: "template",
    icon: <Users className="w-5 h-5 text-primary" strokeWidth={1.5} />,
    description: "Executive leadership profiles",
  },
  {
    id: "market-position",
    title: "Market Position",
    type: "template",
    icon: <TrendingUp className="w-5 h-5 text-primary" strokeWidth={1.5} />,
    description: "Industry standing and differentiators",
  },
  {
    id: "methodology",
    title: "Our Methodology",
    type: "template",
    icon: <FileText className="w-5 h-5 text-primary" strokeWidth={1.5} />,
    description: "Delivery approach and frameworks",
  },
];

const proposalSections: Section[] = [
  {
    id: "project-timeline",
    title: "Project Timeline",
    type: "proposal",
    icon: <Calendar className="w-5 h-5 text-success" strokeWidth={1.5} />,
    description: "Visual timeline with phases",
  },
  {
    id: "team-composition",
    title: "Team Composition",
    type: "proposal",
    icon: <Users className="w-5 h-5 text-success" strokeWidth={1.5} />,
    description: "Proposed team members and roles",
  },
  {
    id: "pricing-investment",
    title: "Pricing & Investment",
    type: "proposal",
    icon: <DollarSign className="w-5 h-5 text-success" strokeWidth={1.5} />,
    description: "Cost breakdown and payment terms",
  },
  {
    id: "scope-deliverables",
    title: "Scope & Deliverables",
    type: "proposal",
    icon: <Target className="w-5 h-5 text-success" strokeWidth={1.5} />,
    description: "Project objectives and outcomes",
  },
  {
    id: "case-studies",
    title: "Case Studies",
    type: "proposal",
    icon: <CheckCircle2 className="w-5 h-5 text-success" strokeWidth={1.5} />,
    description: "Relevant proof points",
  },
];

interface ActiveSection extends Section {
  position: number;
}

export function ContentBuilder() {
  const [activeSections, setActiveSections] = useState<ActiveSection[]>([
    { ...proposalSections[3], position: 0 },
    { ...proposalSections[0], position: 1 },
    { ...proposalSections[1], position: 2 },
  ]);

  const addSection = (section: Section) => {
    // Check if section already exists
    if (activeSections.find((s) => s.id === section.id)) return;

    const newSection: ActiveSection = {
      ...section,
      position: activeSections.length,
    };
    setActiveSections([...activeSections, newSection]);
  };

  const removeSection = (id: string) => {
    const filtered = activeSections.filter((s) => s.id !== id);
    // Reindex positions
    const reindexed = filtered.map((s, i) => ({ ...s, position: i }));
    setActiveSections(reindexed);
  };

  const moveSection = (fromIndex: number, toIndex: number) => {
    const items = [...activeSections];
    const [removed] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, removed);
    // Reindex positions
    const reindexed = items.map((s, i) => ({ ...s, position: i }));
    setActiveSections(reindexed);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-foreground mb-2 font-medium">
              Website Content Builder
            </h2>
            <p className="text-muted-foreground">
              Drag sections from the libraries below to build your client-facing proposal microsite
            </p>
          </div>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 glow-primary font-medium">
            <Rocket className="w-5 h-5" strokeWidth={1.5} />
            Publish Website
          </button>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Template Sections Library */}
          <div className="space-y-4">
            <div className="glass-strong rounded-xl p-4 border border-white/10">
              <h3 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" strokeWidth={1.5} />
                Template Sections
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Standard company content
              </p>
              <div className="space-y-2">
                {templateSections.map((section) => (
                  <LibrarySection
                    key={section.id}
                    section={section}
                    onAdd={addSection}
                    isActive={activeSections.some((s) => s.id === section.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Proposal Sections Library */}
          <div className="space-y-4">
            <div className="glass-strong rounded-xl p-4 border border-white/10">
              <h3 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" strokeWidth={1.5} />
                Proposal Sections
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Generated from this proposal
              </p>
              <div className="space-y-2">
                {proposalSections.map((section) => (
                  <LibrarySection
                    key={section.id}
                    section={section}
                    onAdd={addSection}
                    isActive={activeSections.some((s) => s.id === section.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* On This Website */}
          <div className="space-y-4">
            <div className="glass-strong rounded-xl p-4 border border-primary/30">
              <h3 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                <Rocket className="w-4 h-4 text-accent" strokeWidth={1.5} />
                On This Website
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                {activeSections.length} section{activeSections.length !== 1 ? "s" : ""} • Drag to reorder
              </p>
              <div className="space-y-2 min-h-[400px]">
                {activeSections.length === 0 ? (
                  <div className="glass-inset rounded-lg p-8 border border-dashed border-white/20 text-center">
                    <p className="text-sm text-muted-foreground">
                      Drag sections here to add them to your website
                    </p>
                  </div>
                ) : (
                  activeSections.map((section, index) => (
                    <ActiveSectionCard
                      key={section.id}
                      section={section}
                      index={index}
                      onRemove={removeSection}
                      onMove={moveSection}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 glass-subtle border border-primary/20 rounded-lg p-4">
          <p className="text-sm text-foreground mb-1 flex items-center gap-2">
            <span className="text-primary">💡</span>
            <span className="font-medium">Pro Tips</span>
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-6 mt-2">
            <li>• Click sections in the libraries to add them to your website</li>
            <li>• Drag sections in the "On This Website" column to reorder them</li>
            <li>• The order here determines the order on your published microsite</li>
            <li>• Click "Publish Website" when ready to make changes live</li>
          </ul>
        </div>
      </div>
    </DndProvider>
  );
}

interface LibrarySectionProps {
  section: Section;
  onAdd: (section: Section) => void;
  isActive: boolean;
}

function LibrarySection({ section, onAdd, isActive }: LibrarySectionProps) {
  return (
    <button
      onClick={() => !isActive && onAdd(section)}
      disabled={isActive}
      className={`w-full text-left p-3 rounded-lg border transition-all ${
        isActive
          ? "glass-inset border-white/5 opacity-40 cursor-not-allowed"
          : "glass-subtle border-white/10 hover:border-primary/30 hover:bg-white/5 cursor-pointer"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 ${
            section.type === "template" ? "text-primary" : "text-accent"
          }`}
        >
          {section.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground mb-0.5">
            {section.title}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {section.description}
          </p>
        </div>
        {isActive && (
          <CheckCircle2
            className="w-4 h-4 text-accent flex-shrink-0"
            strokeWidth={1.5}
          />
        )}
      </div>
    </button>
  );
}

interface ActiveSectionCardProps {
  section: ActiveSection;
  index: number;
  onRemove: (id: string) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

const DND_ITEM_TYPE = "section";

function ActiveSectionCard({
  section,
  index,
  onRemove,
  onMove,
}: ActiveSectionCardProps) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: DND_ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        onMove(item.index, index);
        item.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(node) => preview(drop(node))}
      className={`glass-subtle rounded-lg border border-white/10 transition-all ${
        isDragging ? "opacity-50" : ""
      } ${isOver ? "border-primary/50" : ""}`}
    >
      <div className="p-3">
        <div className="flex items-start gap-3">
          {/* Drag Handle */}
          <button
            ref={drag}
            className="cursor-move text-muted-foreground hover:text-foreground mt-0.5 flex-shrink-0 transition-colors"
          >
            <GripVertical className="w-4 h-4" strokeWidth={1.5} />
          </button>

          {/* Order Badge */}
          <div className="w-6 h-6 border border-primary/50 text-primary rounded flex items-center justify-center text-xs font-medium flex-shrink-0">
            {index + 1}
          </div>

          {/* Icon */}
          <div
            className={`flex-shrink-0 ${
              section.type === "template" ? "text-primary" : "text-accent"
            }`}
          >
            {section.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-foreground mb-0.5">
              {section.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {section.description}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(section.id)}
            className="flex-shrink-0 p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-all"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}