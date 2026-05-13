import { useState, useRef, useEffect } from "react";
import { X, ChevronRight, ChevronLeft, Check, User, Users, Briefcase, DollarSign, Calendar, Target, Award, FileText, Plus, Trash2, Upload, Loader2, Sparkles, Pencil, Search, Filter as FilterIcon } from "lucide-react";
import { caseStudyLibrary, filterCaseStudies, availableFilters } from "../data/caseStudyLibrary";
import type { CaseStudy } from "./CaseStudyModal";

interface NewProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: ProposalData) => void;
}

interface ProposalData {
  document: {
    files: File[];
  };
  basics: {
    clientName: string;
    projectName: string;
    industries: string[];
    workTypes: string[];
    questionsDue: string;
    answersPosted: string;
    submissionDeadline: string;
    discoverySession: boolean;
    rfpSource: string;
    owner: string;
  };
  scopeOfWork: {
    description: string;
    deliverables: string;
    technicalRequirements: string;
    owner: string;
  };
  team: {
    projectStartDate: string;
    projectEndDate: string;
    serviceType: "managed-service" | "staff-augmentation" | "project-based" | "";
    region?: string;
    locationType?: string;
    teamMembers: Array<{
      id: string;
      role: string;
      allocationPercent: number;
      startPercent: number;
      endPercent: number;
      payRate: string;
      billRate: string;
    }>;
    owner: string;
  };
  pricing: {
    additionalExpenses: Array<{
      id: string;
      category: string;
      description: string;
      cost: string;
    }>;
    owner: string;
  };
  credentials: {
    caseStudyIds: string[];
    testimonials: string[];
    certifications: string;
    owner: string;
  };
  timeline: {
    startDate: string;
    keyMilestones: string;
    deliveryDate: string;
    owner: string;
  };
}

// Mock team members - expanded list
const teamMembers = [
  { id: "1", name: "Sarah Chen", role: "Proposal Manager", avatar: "SC", lastUsed: "2026-03-08" },
  { id: "2", name: "Mike Rodriguez", role: "Lead Engineer", avatar: "MR", lastUsed: "2026-03-09" },
  { id: "3", name: "Emily Watson", role: "Sales Lead", avatar: "EW", lastUsed: "2026-03-07" },
  { id: "4", name: "David Kim", role: "Pricing Analyst", avatar: "DK", lastUsed: "2026-03-06" },
  { id: "5", name: "Lisa Thompson", role: "HR Manager", avatar: "LT", lastUsed: "2026-03-05" },
  { id: "6", name: "James Wilson", role: "Project Manager", avatar: "JW", lastUsed: "2026-03-09" },
  { id: "7", name: "Maria Garcia", role: "Technical Writer", avatar: "MG", lastUsed: "2026-03-04" },
  { id: "8", name: "Tom Anderson", role: "Solutions Architect", avatar: "TA", lastUsed: "2026-03-08" },
  { id: "9", name: "Jennifer Lee", role: "Senior Engineer", avatar: "JL", lastUsed: "2026-03-03" },
  { id: "10", name: "Robert Chen", role: "DevOps Engineer", avatar: "RC", lastUsed: "2026-03-07" },
  { id: "11", name: "Amanda Foster", role: "UX Designer", avatar: "AF", lastUsed: "2026-03-02" },
  { id: "12", name: "Chris Martin", role: "Business Analyst", avatar: "CM", lastUsed: "2026-03-06" },
  { id: "13", name: "Nina Patel", role: "Account Manager", avatar: "NP", lastUsed: "2026-03-09" },
  { id: "14", name: "Kevin O'Brien", role: "Technical Lead", avatar: "KO", lastUsed: "2026-03-05" },
  { id: "15", name: "Rachel Green", role: "Quality Engineer", avatar: "RG", lastUsed: "2026-03-04" },
  { id: "16", name: "Daniel Park", role: "Data Engineer", avatar: "DP", lastUsed: "2026-03-08" },
  { id: "17", name: "Sophia Martinez", role: "Product Manager", avatar: "SM", lastUsed: "2026-03-07" },
  { id: "18", name: "Alex Turner", role: "Security Specialist", avatar: "AT", lastUsed: "2026-03-03" },
  { id: "19", name: "Michelle Wong", role: "Compliance Officer", avatar: "MW", lastUsed: "2026-03-06" },
  { id: "20", name: "Brian Smith", role: "Finance Manager", avatar: "BS", lastUsed: "2026-03-09" },
];

// Available industries
const availableIndustries = [
  "Healthcare",
  "Financial Services",
  "Technology",
  "Retail",
  "Manufacturing",
  "Education",
  "Government",
  "Telecommunications",
  "Energy & Utilities",
  "Transportation & Logistics",
  "Media & Entertainment",
  "Real Estate",
  "Insurance",
  "Pharmaceutical",
  "Automotive",
  "Aerospace & Defense",
  "Agriculture",
  "Hospitality",
  "Non-Profit"
];

// Available work types
const availableWorkTypes = [
  "SaaS",
  "IT",
  "Cloud Engineering",
  "UX Research",
  "UX Design",
  "End to End",
  "Staff Augmentation",
  "Managed Services",
  "Digital Transformation",
  "Data Analytics",
  "Cybersecurity",
  "Mobile Development",
  "Web Development",
  "DevOps",
  "AI/ML",
  "IoT",
  "Blockchain",
  "Infrastructure",
  "Migration",
  "Integration"
];

// Pre-canned job titles for staffing
const jobTitles = [
  "Project Manager",
  "Technical Lead",
  "Senior Engineer",
  "Mid-Level Engineer",
  "Junior Engineer",
  "Solutions Architect",
  "DevOps Engineer",
  "QA Engineer",
  "UX Designer",
  "UI Designer",
  "Business Analyst",
  "Data Engineer",
  "Security Specialist",
  "Product Manager",
  "Scrum Master",
  "Technical Writer",
];

// Quick start team templates
const teamTemplates = {
  "small": {
    label: "Small Discovery Team",
    members: [
      { role: "Project Manager", payRate: "95", billRate: "150" },
      { role: "Senior Engineer", payRate: "85", billRate: "135" },
      { role: "Mid-Level Engineer", payRate: "65", billRate: "105" },
    ]
  },
  "medium": {
    label: "Medium End-to-End PD Team",
    members: [
      { role: "Project Manager", payRate: "95", billRate: "150" },
      { role: "Technical Lead", payRate: "105", billRate: "165" },
      { role: "Senior Engineer", payRate: "85", billRate: "135" },
      { role: "Mid-Level Engineer", payRate: "65", billRate: "105" },
      { role: "UX Designer", payRate: "75", billRate: "120" },
      { role: "QA Engineer", payRate: "60", billRate: "95" },
    ]
  },
  "large": {
    label: "Large Development Team",
    members: [
      { role: "Project Manager", payRate: "95", billRate: "150" },
      { role: "Technical Lead", payRate: "105", billRate: "165" },
      { role: "Solutions Architect", payRate: "115", billRate: "180" },
      { role: "Senior Engineer", payRate: "85", billRate: "135" },
      { role: "Senior Engineer", payRate: "85", billRate: "135" },
      { role: "Mid-Level Engineer", payRate: "65", billRate: "105" },
      { role: "Mid-Level Engineer", payRate: "65", billRate: "105" },
      { role: "UX Designer", payRate: "75", billRate: "120" },
      { role: "QA Engineer", payRate: "60", billRate: "95" },
      { role: "DevOps Engineer", payRate: "80", billRate: "130" },
    ]
  },
  "enterprise": {
    label: "Enterprise Team",
    members: [
      { role: "Project Manager", payRate: "95", billRate: "150" },
      { role: "Product Manager", payRate: "100", billRate: "160" },
      { role: "Technical Lead", payRate: "105", billRate: "165" },
      { role: "Solutions Architect", payRate: "115", billRate: "180" },
      { role: "Senior Engineer", payRate: "85", billRate: "135" },
      { role: "Senior Engineer", payRate: "85", billRate: "135" },
      { role: "Senior Engineer", payRate: "85", billRate: "135" },
      { role: "Mid-Level Engineer", payRate: "65", billRate: "105" },
      { role: "Mid-Level Engineer", payRate: "65", billRate: "105" },
      { role: "Junior Engineer", payRate: "45", billRate: "75" },
      { role: "UX Designer", payRate: "75", billRate: "120" },
      { role: "UI Designer", payRate: "70", billRate: "110" },
      { role: "QA Engineer", payRate: "60", billRate: "95" },
      { role: "DevOps Engineer", payRate: "80", billRate: "130" },
      { role: "Business Analyst", payRate: "70", billRate: "110" },
    ]
  }
};

// Role-based default rates mapping
const roleRates: Record<string, { payRate: string; billRate: string }> = {
  "Project Manager": { payRate: "95", billRate: "150" },
  "Product Manager": { payRate: "100", billRate: "160" },
  "Technical Lead": { payRate: "105", billRate: "165" },
  "Solutions Architect": { payRate: "115", billRate: "180" },
  "Senior Engineer": { payRate: "85", billRate: "135" },
  "Mid-Level Engineer": { payRate: "65", billRate: "105" },
  "Junior Engineer": { payRate: "45", billRate: "75" },
  "DevOps Engineer": { payRate: "80", billRate: "130" },
  "QA Engineer": { payRate: "60", billRate: "95" },
  "UX Designer": { payRate: "75", billRate: "120" },
  "UI Designer": { payRate: "70", billRate: "110" },
  "Business Analyst": { payRate: "70", billRate: "110" },
  "Data Engineer": { payRate: "90", billRate: "145" },
  "Security Specialist": { payRate: "95", billRate: "155" },
  "Scrum Master": { payRate: "85", billRate: "135" },
  "Technical Writer": { payRate: "55", billRate: "90" },
};

// Mock recent clients
const recentClients = [
  "Acme Corporation",
  "GlobalTech Industries",
  "FutureCo",
  "TechStart Inc",
  "Innovation Labs",
  "Digital Dynamics",
  "CloudScale Systems",
  "DataCore Solutions",
];

// Get suggested team members by role type
const getSuggestedMembers = (type: string) => {
  const roleFilters: { [key: string]: string[] } = {
    proposal: ["Proposal", "Manager", "Account"],
    scope: ["Engineer", "Architect", "Technical", "DevOps"],
    pricing: ["Pricing", "Finance", "Business", "Manager"],
    team: ["HR", "Manager", "Project"],
    credentials: ["Sales", "Account", "Manager", "Proposal"],
    timeline: ["Project", "Manager", "Product"],
  };

  const filters = roleFilters[type] || [];
  return teamMembers
    .filter((member) => filters.some((filter) => member.role.includes(filter)))
    .sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
    .slice(0, 5);
};

const steps = [
  { id: 1, label: "Upload", icon: Upload, description: "RFP & SOW documents" },
  { id: 2, label: "Program", icon: FileText, description: "Client & project details" },
  { id: 3, label: "Timeline", icon: Calendar, description: "Schedule & milestones" },
  { id: 4, label: "Scope", icon: Target, description: "Work requirements" },
  { id: 5, label: "Team", icon: Users, description: "Staffing needs" },
  { id: 6, label: "Pricing", icon: DollarSign, description: "Budget & costs" },
  { id: 7, label: "Credentials", icon: Award, description: "Case studies & credibility" },
];

export function NewProposalModal({ isOpen, onClose, onComplete }: NewProposalModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [proposalData, setProposalData] = useState<ProposalData>({
    document: { files: [] },
    basics: { clientName: "", projectName: "", industries: [], workTypes: [], questionsDue: "", answersPosted: "", submissionDeadline: "", discoverySession: false, rfpSource: "", owner: "" },
    scopeOfWork: { description: "", deliverables: "", technicalRequirements: "", owner: "" },
    team: { projectStartDate: "", projectEndDate: "", serviceType: "", region: "midwest", locationType: "onshore", teamMembers: [], owner: "" },
    pricing: { additionalExpenses: [], owner: "" },
    credentials: { caseStudyIds: [], testimonials: [], certifications: "", owner: "" },
    timeline: { startDate: "", keyMilestones: "", deliveryDate: "", owner: "" },
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(proposalData);
    onClose();
  };

  const isStepValid = () => {
    // All fields are optional, always allow navigation
    return true;
  };

  // Simulated AI processing
  const simulateAIProcessing = async () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Auto-populate data based on "AI analysis"
    const today = new Date();
    const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    const threeWeeksLater = new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000);
    const fourWeeksLater = new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000);
    const sixMonthsLater = new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000);
    
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    
    setProposalData({
      ...proposalData,
      basics: {
        clientName: "ACME Corporation",
        projectName: "Electronic Health Records Platform Modernization",
        industries: ["Healthcare", "Technology"],
        workTypes: ["Cloud Engineering", "SaaS", "End to End"],
        questionsDue: formatDate(twoWeeksLater),
        answersPosted: formatDate(threeWeeksLater),
        submissionDeadline: formatDate(fourWeeksLater),
        discoverySession: true,
        rfpSource: "direct",
        owner: "Sarah Chen"
      },
      scopeOfWork: {
        description: "Modernize legacy EHR system to cloud-native architecture with improved data interoperability, enhanced security compliance (HIPAA), and mobile-first user experience. System must support 50,000+ concurrent users across multiple healthcare facilities.",
        deliverables: "• Cloud-native EHR platform (AWS/Azure)\n• Mobile applications (iOS/Android)\n• API gateway for third-party integrations\n• Data migration toolkit\n• Admin dashboard\n• Technical documentation\n• Training materials",
        technicalRequirements: "• HIPAA/HITECH compliance\n• HL7 FHIR integration\n• React/React Native frontend\n• Node.js/Python microservices\n• PostgreSQL/MongoDB databases\n• Kubernetes orchestration\n• SOC 2 Type II certification",
        owner: "Tom Anderson"
      },
      team: {
        projectStartDate: formatDate(fourWeeksLater),
        projectEndDate: formatDate(sixMonthsLater),
        serviceType: "project-based",
        teamMembers: [
          { id: "1", role: "Project Manager", allocationPercent: 100, startPercent: 0, endPercent: 100, payRate: "95", billRate: "150" },
          { id: "2", role: "Solutions Architect", allocationPercent: 100, startPercent: 0, endPercent: 50, payRate: "115", billRate: "180" },
          { id: "3", role: "Technical Lead", allocationPercent: 100, startPercent: 0, endPercent: 100, payRate: "105", billRate: "165" },
          { id: "4", role: "Senior Engineer", allocationPercent: 100, startPercent: 10, endPercent: 100, payRate: "85", billRate: "135" },
          { id: "5", role: "Senior Engineer", allocationPercent: 100, startPercent: 10, endPercent: 100, payRate: "85", billRate: "135" },
          { id: "6", role: "Mid-Level Engineer", allocationPercent: 100, startPercent: 20, endPercent: 100, payRate: "65", billRate: "105" },
          { id: "7", role: "UX Designer", allocationPercent: 100, startPercent: 0, endPercent: 60, payRate: "75", billRate: "120" },
          { id: "8", role: "QA Engineer", allocationPercent: 100, startPercent: 30, endPercent: 100, payRate: "60", billRate: "95" },
          { id: "9", role: "DevOps Engineer", allocationPercent: 100, startPercent: 15, endPercent: 95, payRate: "80", billRate: "130" },
          { id: "10", role: "Security Specialist", allocationPercent: 50, startPercent: 10, endPercent: 90, payRate: "110", billRate: "175" },
        ],
        owner: "James Wilson"
      },
      pricing: {
        additionalExpenses: [
          { id: "1", category: "hardware", description: "Development workstations (10 units)", cost: "25000" },
          { id: "2", category: "software", description: "Enterprise licenses (Jira, Confluence, etc.)", cost: "15000" },
          { id: "3", category: "travel", description: "On-site discovery and training sessions", cost: "12000" },
        ],
        owner: "David Kim"
      },
      credentials: {
        caseStudyIds: ["cs-001", "cs-002", "cs-003"],
        testimonials: [
          "\"Experis delivered exceptional results on our EHR integration. Their technical expertise and attention to compliance was outstanding.\" - Dr. Sarah Chen, CTO, Memorial Health System",
          "\"The team's professionalism and ability to meet tight deadlines while maintaining quality was impressive.\" - Michael Torres, VP Engineering, CareFirst Medical",
          "\"Working with Experis felt like having an extension of our own team. They understood our challenges and delivered solutions that exceeded expectations.\" - Jennifer Adams, Director of IT, Regional Hospital Network"
        ],
        certifications: "ISO 9001, SOC 2 Type II, HIPAA Compliance, HITRUST CSF, AWS Healthcare Competency",
        owner: "Emily Watson"
      },
      timeline: {
        startDate: formatDate(fourWeeksLater),
        keyMilestones: "• Discovery & Requirements (Weeks 1-3)\n• Architecture & Design (Weeks 4-6)\n• Development Sprint 1-4 (Weeks 7-14)\n• Security Audit & Compliance (Weeks 15-16)\n• UAT & Testing (Weeks 17-20)\n• Data Migration (Weeks 21-22)\n• Production Launch (Week 24)",
        deliveryDate: formatDate(sixMonthsLater),
        owner: "James Wilson"
      }
    });
    
    setIsProcessing(false);
    handleNext();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
          <div>
            <h2 className="text-xl text-foreground">Create New Proposal</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].label}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-8 py-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = completedSteps.includes(step.id);
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? "bg-success text-white shadow-lg shadow-success/30"
                          : isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : "bg-white/10 text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" strokeWidth={2} />
                      ) : (
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      )}
                    </button>
                    <span className={`text-xs mt-2 ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-[2px] flex-1 -mx-1 ${
                      isCompleted ? "bg-success" : "bg-white/20"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {currentStep === 1 && (
            <DocumentUploadStep 
              data={proposalData.document}
              onChange={(data) => setProposalData({ ...proposalData, document: data })}
              onProcess={simulateAIProcessing}
              isProcessing={isProcessing}
            />
          )}
          {currentStep === 2 && (
            <BasicsStep 
              data={proposalData.basics}
              onChange={(data) => setProposalData({ ...proposalData, basics: data })}
              teamMembers={teamMembers}
            />
          )}
          {currentStep === 3 && (
            <TimelineStep
              data={proposalData.timeline}
              onChange={(data) => setProposalData({ ...proposalData, timeline: data })}
              teamMembers={teamMembers}
            />
          )}
          {currentStep === 4 && (
            <ScopeStep
              data={proposalData.scopeOfWork}
              onChange={(data) => setProposalData({ ...proposalData, scopeOfWork: data })}
              teamMembers={teamMembers}
            />
          )}
          {currentStep === 5 && (
            <TeamStep
              data={proposalData.team}
              onChange={(data) => setProposalData({ ...proposalData, team: data })}
              teamMembers={teamMembers}
              jobTitles={jobTitles}
              teamTemplates={teamTemplates}
            />
          )}
          {currentStep === 6 && (
            <PricingStep
              data={proposalData.pricing}
              teamData={proposalData.team}
              onChange={(data) => setProposalData({ ...proposalData, pricing: data })}
              teamMembers={teamMembers}
            />
          )}
          {currentStep === 7 && (
            <CredentialsStep
              data={proposalData.credentials}
              onChange={(data) => setProposalData({ ...proposalData, credentials: data })}
              teamMembers={teamMembers}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-6 border-t border-white/10 bg-white/5">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-white/10 border border-white/20 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            Back
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            
            {currentStep === steps.length ? (
              <button
                onClick={handleComplete}
                disabled={!isStepValid()}
                className="flex items-center gap-2 px-6 py-2 bg-success text-white rounded-md text-sm hover:bg-success/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-success/30"
              >
                <Check className="w-4 h-4" strokeWidth={2} />
                Create Proposal
              </button>
            ) : currentStep === 1 ? null : (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/30"
              >
                Next
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Components
function DocumentUploadStep({ data, onChange, onProcess, isProcessing }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      onChange({ files: [...data.files, ...fileArray] });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = data.files.filter((_: any, i: number) => i !== index);
    onChange({ files: newFiles });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg text-foreground mb-2">Upload RFP & SOW Documents</h3>
        <p className="text-sm text-muted-foreground">
          Our AI will analyze your documents to automatically extract key information and populate the proposal details.
        </p>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer ${
          isDragging 
            ? "border-primary bg-primary/10" 
            : "border-white/20 hover:border-white/30 hover:bg-white/5"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm text-foreground mb-1">
              <span className="font-medium text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">PDF, DOCX, or TXT files (up to 10MB each)</p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.txt"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Uploaded Files List */}
      {data.files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Uploaded Documents ({data.files.length})</h4>
          <div className="space-y-2">
            {data.files.map((file: File, index: number) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Processing Button */}
      <div className="pt-4 border-t border-white/10">
        <button
          onClick={onProcess}
          disabled={data.files.length === 0 || isProcessing}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-[#0353E9] text-white rounded-md text-sm hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2} />
              Analyzing documents with AI...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" strokeWidth={2} />
              Process Documents & Auto-Fill
            </>
          )}
        </button>
        <p className="text-xs text-muted-foreground text-center mt-2">
          This will extract project details, dates, requirements, and suggest team composition
        </p>
      </div>
    </div>
  );
}

function BasicsStep({ data, onChange, teamMembers }: any) {
  const [showOwnerSuggestions, setShowOwnerSuggestions] = useState(false);
  const [ownerSearch, setOwnerSearch] = useState(data.owner || "");
  const [showClientSuggestions, setShowClientSuggestions] = useState(false);
  const [clientSearch, setClientSearch] = useState(data.clientName || "");
  
  // Industries state
  const [industrySearch, setIndustrySearch] = useState("");
  const [showIndustrySuggestions, setShowIndustrySuggestions] = useState(false);
  
  // Work types state
  const [workTypeSearch, setWorkTypeSearch] = useState("");
  const [showWorkTypeSuggestions, setShowWorkTypeSuggestions] = useState(false);

  const suggestedOwners = getSuggestedMembers("proposal");
  const filteredOwners = ownerSearch
    ? teamMembers.filter((member: any) =>
        member.name.toLowerCase().includes(ownerSearch.toLowerCase()) ||
        member.role.toLowerCase().includes(ownerSearch.toLowerCase())
      )
    : suggestedOwners;

  const filteredClients = clientSearch
    ? recentClients.filter((client) =>
        client.toLowerCase().includes(clientSearch.toLowerCase())
      )
    : recentClients;
    
  const filteredIndustries = industrySearch
    ? availableIndustries.filter((industry) =>
        industry.toLowerCase().includes(industrySearch.toLowerCase()) &&
        !data.industries.includes(industry)
      )
    : availableIndustries.filter((industry) => !data.industries.includes(industry));
    
  const filteredWorkTypes = workTypeSearch
    ? availableWorkTypes.filter((workType) =>
        workType.toLowerCase().includes(workTypeSearch.toLowerCase()) &&
        !data.workTypes.includes(workType)
      )
    : availableWorkTypes.filter((workType) => !data.workTypes.includes(workType));

  const handleOwnerSelect = (member: any) => {
    setOwnerSearch(member.name);
    onChange({ ...data, owner: member.name });
    setShowOwnerSuggestions(false);
  };

  const handleClientSelect = (client: string) => {
    setClientSearch(client);
    onChange({ ...data, clientName: client });
    setShowClientSuggestions(false);
  };
  
  const handleAddIndustry = (industry: string) => {
    onChange({ ...data, industries: [...data.industries, industry] });
    setIndustrySearch("");
    setShowIndustrySuggestions(false);
  };
  
  const handleRemoveIndustry = (industry: string) => {
    onChange({ ...data, industries: data.industries.filter((i: string) => i !== industry) });
  };
  
  const handleAddWorkType = (workType: string) => {
    onChange({ ...data, workTypes: [...data.workTypes, workType] });
    setWorkTypeSearch("");
    setShowWorkTypeSuggestions(false);
  };
  
  const handleRemoveWorkType = (workType: string) => {
    onChange({ ...data, workTypes: data.workTypes.filter((w: string) => w !== workType) });
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Proposal Owner
          <span className="text-xs text-muted-foreground font-normal ml-2">Who will lead this proposal?</span>
        </label>
        <input
          type="text"
          value={ownerSearch}
          onChange={(e) => {
            setOwnerSearch(e.target.value);
            onChange({ ...data, owner: e.target.value });
            setShowOwnerSuggestions(true);
          }}
          onFocus={() => setShowOwnerSuggestions(true)}
          onBlur={() => setTimeout(() => setShowOwnerSuggestions(false), 200)}
          placeholder="Search team members"
          className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
        
        {showOwnerSuggestions && filteredOwners.length > 0 && (
          <div className="absolute z-10 w-full mt-1 glass-strong border border-white/10 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {!ownerSearch && (
              <div className="px-3 py-2 text-xs text-muted-foreground border-b border-white/10">
                Suggested
              </div>
            )}
            {filteredOwners.slice(0, 5).map((member: any) => (
              <button
                key={member.id}
                onClick={() => handleOwnerSelect(member)}
                className="w-full flex items-center gap-3 p-3 hover:bg-white/10 transition-colors text-left border-b border-white/10 last:border-b-0"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-muted-foreground">
                  {member.avatar}
                </div>
                <div>
                  <p className="text-sm text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-white/10">
        <h3 className="text-sm font-medium text-foreground mb-4">Project Information</h3>
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm text-muted-foreground mb-1.5">Client Name</label>
            <input
              type="text"
              value={clientSearch}
              onChange={(e) => {
                setClientSearch(e.target.value);
                onChange({ ...data, clientName: e.target.value });
                setShowClientSuggestions(true);
              }}
              onFocus={() => setShowClientSuggestions(true)}
              onBlur={() => setTimeout(() => setShowClientSuggestions(false), 200)}
              placeholder="Enter or select client"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            
            {showClientSuggestions && filteredClients.length > 0 && (
              <div className="absolute z-10 w-full mt-1 glass-strong border border-white/10 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {!clientSearch && (
                  <div className="px-3 py-2 text-xs text-muted-foreground border-b border-white/10">
                    Recent Clients
                  </div>
                )}
                {filteredClients.map((client, index) => (
                  <button
                    key={index}
                    onClick={() => handleClientSelect(client)}
                    className="w-full px-4 py-2.5 hover:bg-white/10 transition-colors text-left text-sm text-foreground border-b border-white/10 last:border-b-0"
                  >
                    {client}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Project Name</label>
            <input
              type="text"
              value={data.projectName}
              onChange={(e) => onChange({ ...data, projectName: e.target.value })}
              placeholder="Brief project title"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Industries with chips */}
          <div className="relative">
            <label className="block text-sm text-muted-foreground mb-1.5">Industries</label>
            <input
              type="text"
              value={industrySearch}
              onChange={(e) => {
                setIndustrySearch(e.target.value);
                setShowIndustrySuggestions(true);
              }}
              onFocus={() => setShowIndustrySuggestions(true)}
              onBlur={() => setTimeout(() => setShowIndustrySuggestions(false), 200)}
              placeholder="Search and select industries"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            
            {showIndustrySuggestions && filteredIndustries.length > 0 && (
              <div className="absolute z-10 w-full mt-1 glass-strong border border-white/10 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredIndustries.map((industry, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddIndustry(industry)}
                    className="w-full px-4 py-2.5 hover:bg-white/10 transition-colors text-left text-sm text-foreground border-b border-white/10 last:border-b-0"
                  >
                    {industry}
                  </button>
                ))}
              </div>
            )}
            
            {data.industries.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {data.industries.map((industry: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0F62FE]/10 text-[#0F62FE] rounded-full text-xs border border-[#0F62FE]/20"
                  >
                    {industry}
                    <button
                      onClick={() => handleRemoveIndustry(industry)}
                      className="hover:bg-[#0F62FE]/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" strokeWidth={2} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Work Types with chips */}
          <div className="relative">
            <label className="block text-sm text-muted-foreground mb-1.5">Work Types</label>
            <input
              type="text"
              value={workTypeSearch}
              onChange={(e) => {
                setWorkTypeSearch(e.target.value);
                setShowWorkTypeSuggestions(true);
              }}
              onFocus={() => setShowWorkTypeSuggestions(true)}
              onBlur={() => setTimeout(() => setShowWorkTypeSuggestions(false), 200)}
              placeholder="Search and select work types"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            
            {showWorkTypeSuggestions && filteredWorkTypes.length > 0 && (
              <div className="absolute z-10 w-full mt-1 glass-strong border border-white/10 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredWorkTypes.map((workType, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddWorkType(workType)}
                    className="w-full px-4 py-2.5 hover:bg-white/10 transition-colors text-left text-sm text-foreground border-b border-white/10 last:border-b-0"
                  >
                    {workType}
                  </button>
                ))}
              </div>
            )}
            
            {data.workTypes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {data.workTypes.map((workType: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#24A148]/10 text-[#24A148] rounded-full text-xs border border-[#24A148]/20"
                  >
                    {workType}
                    <button
                      onClick={() => handleRemoveWorkType(workType)}
                      className="hover:bg-[#24A148]/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" strokeWidth={2} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Questions Due</label>
              <input
                type="date"
                value={data.questionsDue}
                onChange={(e) => onChange({ ...data, questionsDue: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Answers Posted</label>
              <input
                type="date"
                value={data.answersPosted}
                onChange={(e) => onChange({ ...data, answersPosted: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Submission Deadline</label>
              <input
                type="date"
                value={data.submissionDeadline}
                onChange={(e) => onChange({ ...data, submissionDeadline: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">RFP Source</label>
              <select
                value={data.rfpSource}
                onChange={(e) => onChange({ ...data, rfpSource: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="">Select source</option>
                <option value="direct">Direct Client</option>
                <option value="referral">Referral</option>
                <option value="website">Website</option>
                <option value="platform">Bidding Platform</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 glass-subtle rounded border border-white/10">
            <input
              type="checkbox"
              id="discoverySession"
              checked={data.discoverySession}
              onChange={(e) => onChange({ ...data, discoverySession: e.target.checked })}
              className="w-4 h-4 text-[#0F62FE] rounded focus:ring-2 focus:ring-[#0F62FE]/20"
            />
            <label htmlFor="discoverySession" className="text-sm text-muted-foreground">
              Discovery sessions required
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScopeStep({ data, onChange, teamMembers }: any) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState(data.owner || "");

  const filteredMembers = teamMembers.filter((member: any) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (member: any) => {
    setSearchTerm(member.name);
    onChange({ ...data, owner: member.name });
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Scope Owner
          <span className="text-xs text-muted-foreground font-normal ml-2">Technical lead for this work</span>
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onChange({ ...data, owner: e.target.value });
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Search for a team member"
          className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
        
        {showSuggestions && filteredMembers.length > 0 && (
          <div className="absolute z-10 w-full mt-1 glass-strong border border-white/10 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredMembers.map((member: any) => (
              <button
                key={member.id}
                onClick={() => handleSelect(member)}
                className="w-full flex items-center gap-3 p-3 hover:bg-white/10 transition-colors text-left border-b border-white/10 last:border-b-0"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-muted-foreground">
                  {member.avatar}
                </div>
                <div>
                  <p className="text-sm text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-white/10">
        <h3 className="text-sm font-medium text-foreground mb-4">Scope of Work</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Project Description</label>
            <textarea
              value={data.description}
              onChange={(e) => onChange({ ...data, description: e.target.value })}
              placeholder="High-level overview of what needs to be delivered"
              rows={4}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Key Deliverables</label>
            <textarea
              value={data.deliverables}
              onChange={(e) => onChange({ ...data, deliverables: e.target.value })}
              placeholder="List main deliverables or outcomes"
              rows={4}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Technical Requirements</label>
            <textarea
              value={data.technicalRequirements}
              onChange={(e) => onChange({ ...data, technicalRequirements: e.target.value })}
              placeholder="Technologies, platforms, or specific technical needs"
              rows={4}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingStep({ data, teamData, onChange, teamMembers }: any) {
  const handleAddExpense = () => {
    const newExpenses = [...data.additionalExpenses, {
      id: `${Date.now()}`,
      category: "",
      description: "",
      cost: "",
    }];
    onChange({ ...data, additionalExpenses: newExpenses });
  };

  const handleUpdateExpense = (index: number, field: string, value: string) => {
    const newExpenses = [...data.additionalExpenses];
    newExpenses[index] = { ...newExpenses[index], [field]: value };
    onChange({ ...data, additionalExpenses: newExpenses });
  };

  const handleRemoveExpense = (index: number) => {
    const newExpenses = data.additionalExpenses.filter((_: any, i: number) => i !== index);
    onChange({ ...data, additionalExpenses: newExpenses });
  };

  // Calculate team-based costs
  const getProjectDuration = () => {
    if (!teamData.projectStartDate || !teamData.projectEndDate) return 0;
    const start = new Date(teamData.projectStartDate);
    const end = new Date(teamData.projectEndDate);
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  };

  const projectDurationMonths = getProjectDuration() / 30;

  const laborCost = teamData.teamMembers.reduce((sum: number, m: any) => {
    return sum + ((parseFloat(m.payRate) || 0) * 160 * (m.allocationPercent / 100) * projectDurationMonths);
  }, 0);

  const laborRevenue = teamData.teamMembers.reduce((sum: number, m: any) => {
    return sum + ((parseFloat(m.billRate) || 0) * 160 * (m.allocationPercent / 100) * projectDurationMonths);
  }, 0);

  const additionalExpensesTotal = data.additionalExpenses.reduce((sum: number, e: any) => {
    return sum + (parseFloat(e.cost) || 0);
  }, 0);

  const totalCost = laborCost + additionalExpensesTotal;
  const totalRevenue = laborRevenue + additionalExpensesTotal;
  const margin = totalRevenue - totalCost;
  const marginPercent = totalRevenue > 0 ? (margin / totalRevenue) * 100 : 0;

  // Service type margins
  const getTargetMargin = () => {
    switch (teamData.serviceType) {
      case "managed-service":
        return { min: 35, target: 45, label: "Managed Service (35-45%)" };
      case "staff-augmentation":
        return { min: 25, target: 35, label: "Staff Augmentation (25-35%)" };
      case "project-based":
        return { min: 30, target: 40, label: "Project-Based (30-40%)" };
      default:
        return { min: 30, target: 40, label: "Not Set" };
    }
  };

  const targetMargin = getTargetMargin();
  const isMarginHealthy = marginPercent >= targetMargin.min && marginPercent <= (targetMargin.target + 10);
  const isMarginLow = marginPercent < targetMargin.min;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Pricing Owner
          <span className="text-xs text-muted-foreground font-normal ml-2">Who will prepare the budget?</span>
        </label>
        <input
          type="text"
          value={data.owner}
          onChange={(e) => onChange({ ...data, owner: e.target.value })}
          placeholder="Enter name"
          className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/20 transition-all"
        />
      </div>

      {/* Team-Based Cost Summary */}
      <div className="pt-4 border-t border-white/10">
        <h3 className="text-sm font-medium text-foreground mb-3">Team Labor Summary</h3>
        <div className="glass-subtle rounded-lg p-4 border border-white/10">
          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
            <div>
              <span className="text-muted-foreground">Project Duration:</span>
              <span className="ml-2 text-foreground font-medium">{projectDurationMonths.toFixed(1)} months</span>
            </div>
            <div>
              <span className="text-muted-foreground">Team Members:</span>
              <span className="ml-2 text-foreground font-medium">{teamData.teamMembers.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Total Labor Cost:</span>
              <span className="ml-2 text-foreground font-medium">${laborCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Total Labor Revenue:</span>
              <span className="ml-2 text-foreground font-medium">${laborRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Expenses */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">Additional Expenses</h3>
          <button
            onClick={handleAddExpense}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-[#0F62FE] hover:bg-[#0F62FE]/5 border border-[#0F62FE] rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
            Add Expense
          </button>
        </div>

        {data.additionalExpenses.length > 0 && (
          <div className="space-y-2">
            {data.additionalExpenses.map((expense: any, index: number) => (
              <div key={expense.id} className="p-3 glass-subtle rounded-lg border border-white/10">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-3">
                    <select
                      value={expense.category}
                      onChange={(e) => handleUpdateExpense(index, "category", e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE]/20"
                    >
                      <option value="">Category</option>
                      <option value="hardware">Hardware</option>
                      <option value="software">Software Licenses</option>
                      <option value="travel">Travel & Expenses</option>
                      <option value="cloud">Cloud Infrastructure</option>
                      <option value="training">Training</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-span-6">
                    <input
                      type="text"
                      value={expense.description}
                      onChange={(e) => handleUpdateExpense(index, "description", e.target.value)}
                      placeholder="Description"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE]/20"
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <input
                        type="number"
                        value={expense.cost}
                        onChange={(e) => handleUpdateExpense(index, "cost", e.target.value)}
                        placeholder="0"
                        className="w-full pl-5 pr-2 py-1.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE]/20"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <button
                      onClick={() => handleRemoveExpense(index)}
                      className="p-1 hover:bg-slate-200 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {data.additionalExpenses.length === 0 && (
          <div className="text-center py-6 glass-subtle rounded-lg border border-white/10">
            <p className="text-sm text-muted-foreground">No additional expenses added</p>
          </div>
        )}
      </div>

      {/* Total Project Pricing */}
      <div className="pt-4 border-t border-white/10">
        <h3 className="text-sm font-medium text-foreground mb-3">Total Project Pricing</h3>
        <div className={`rounded-lg p-4 border-2 ${
          isMarginHealthy ? "bg-green-500/10 border-green-500/20" : 
          isMarginLow ? "bg-red-500/10 border-red-500/20" : 
          "glass-subtle border-white/10"
        }`}>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Cost (Labor + Expenses):</span>
              <span className="font-medium text-foreground">${totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Revenue (Bill Rate + Expenses):</span>
              <span className="font-medium text-foreground">${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="pt-2 border-t border-white/10">
              <div className="flex justify-between text-base">
                <span className="font-medium text-foreground">Total Margin:</span>
                <span className={`font-semibold ${
                  isMarginHealthy ? "text-[#24A148]" : 
                  isMarginLow ? "text-red-600" : 
                  "text-foreground"
                }`}>
                  ${margin.toLocaleString(undefined, { maximumFractionDigits: 0 })} ({marginPercent.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-white/10">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Service Type Target:</span>
                <span className="text-muted-foreground">{targetMargin.label}</span>
              </div>
              {isMarginLow && (
                <p className="text-xs text-red-600 mt-2">
                  ⚠ Margin is below target for {teamData.serviceType.replace("-", " ")}
                </p>
              )}
              {isMarginHealthy && (
                <p className="text-xs text-[#24A148] mt-2">
                  ✓ Margin is within target range
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions for rate adjustments
function getRegionMultiplier(region: string): number {
  const multipliers: Record<string, number> = {
    "west-coast": 1.15,
    "east-coast": 1.10,
    "midwest": 1.0,
    "south": 0.95,
  };
  return multipliers[region] || 1.0;
}

function getLocationMultiplier(locationType: string): number {
  const multipliers: Record<string, number> = {
    "onshore": 1.0,
    "nearshore": 0.75,
    "offshore": 0.6,
  };
  return multipliers[locationType] || 1.0;
}

function TeamStep({ data, onChange, teamMembers, jobTitles, teamTemplates }: any) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState(data.owner || "");
  const [collapsedMembers, setCollapsedMembers] = useState<Set<string>>(new Set());
  const [prevRegion, setPrevRegion] = useState(data.region);
  const [prevLocationType, setPrevLocationType] = useState(data.locationType);

  // Recalculate all rates when region or location type changes
  useEffect(() => {
    if ((prevRegion !== data.region || prevLocationType !== data.locationType) && data.teamMembers.length > 0) {
      const regionMultiplier = getRegionMultiplier(data.region);
      const locationMultiplier = getLocationMultiplier(data.locationType);
      const prevRegionMultiplier = getRegionMultiplier(prevRegion);
      const prevLocationMultiplier = getLocationMultiplier(prevLocationType);
      
      const adjustmentRatio = (regionMultiplier * locationMultiplier) / (prevRegionMultiplier * prevLocationMultiplier);
      
      const updatedMembers = data.teamMembers.map((member: any) => {
        if (member.payRate && member.billRate) {
          return {
            ...member,
            payRate: Math.round(parseFloat(member.payRate) * adjustmentRatio).toString(),
            billRate: Math.round(parseFloat(member.billRate) * adjustmentRatio).toString(),
          };
        }
        return member;
      });
      
      onChange({ ...data, teamMembers: updatedMembers });
      setPrevRegion(data.region);
      setPrevLocationType(data.locationType);
    }
  }, [data.region, data.locationType]);

  const filteredMembers = teamMembers.filter((member: any) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (member: any) => {
    setSearchTerm(member.name);
    onChange({ ...data, owner: member.name });
    setShowSuggestions(false);
  };

  const handleAddTemplate = (templateKey: string) => {
    const template = teamTemplates[templateKey];
    const newMembers = template.members.map((member: any, idx: number) => ({
      id: `${Date.now()}-${idx}`,
      role: member.role,
      allocationPercent: 100,
      startPercent: 0,
      endPercent: 100,
      payRate: member.payRate,
      billRate: member.billRate,
    }));
    onChange({ ...data, teamMembers: newMembers });
  };

  const handleAddMember = () => {
    const newMembers = [...data.teamMembers, {
      id: `${Date.now()}`,
      role: "",
      allocationPercent: 100,
      startPercent: 0,
      endPercent: 100,
      payRate: "",
      billRate: "",
    }];
    onChange({ ...data, teamMembers: newMembers });
  };

  const handleUpdateMember = (index: number, field: string, value: any) => {
    const newMembers = [...data.teamMembers];
    const member = newMembers[index];
    
    // Enforce minimum 15% gap (roughly 1 month in a 6-month project)
    const minimumGap = 15;
    
    if (field === "startPercent") {
      const newStart = Math.min(value, member.endPercent - minimumGap);
      newMembers[index] = { ...member, startPercent: newStart };
    } else if (field === "endPercent") {
      const newEnd = Math.max(value, member.startPercent + minimumGap);
      newMembers[index] = { ...member, endPercent: newEnd };
    } else if (field === "role") {
      // Auto-populate rates when role changes
      const rates = roleRates[value];
      if (rates) {
        // Apply region and location adjustments
        const regionMultiplier = getRegionMultiplier(data.region);
        const locationMultiplier = getLocationMultiplier(data.locationType);
        const adjustedPayRate = Math.round(parseFloat(rates.payRate) * regionMultiplier * locationMultiplier);
        const adjustedBillRate = Math.round(parseFloat(rates.billRate) * regionMultiplier * locationMultiplier);
        
        newMembers[index] = { 
          ...member, 
          role: value,
          payRate: adjustedPayRate.toString(),
          billRate: adjustedBillRate.toString()
        };
      } else {
        newMembers[index] = { ...member, [field]: value };
      }
    } else {
      newMembers[index] = { ...member, [field]: value };
    }
    
    onChange({ ...data, teamMembers: newMembers });
  };

  const toggleCollapse = (memberId: string) => {
    const newCollapsed = new Set(collapsedMembers);
    if (newCollapsed.has(memberId)) {
      newCollapsed.delete(memberId);
    } else {
      newCollapsed.add(memberId);
    }
    setCollapsedMembers(newCollapsed);
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = data.teamMembers.filter((_: any, i: number) => i !== index);
    onChange({ ...data, teamMembers: newMembers });
  };

  // Calculate project duration in days
  const getProjectDuration = () => {
    if (!data.projectStartDate || !data.projectEndDate) return 0;
    const start = new Date(data.projectStartDate);
    const end = new Date(data.projectEndDate);
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  };

  const projectDuration = getProjectDuration();

  return (
    <div className="space-y-6">
      <div className="relative">
        <label className="block text-sm font-medium text-foreground mb-1.5">Team Owner<span className="text-xs text-muted-foreground font-normal ml-2">Who will handle resource planning?</span></label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onChange({ ...data, owner: e.target.value });
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Search for a team member"
          className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/20 transition-all"
        />
        
        {showSuggestions && filteredMembers.length > 0 && (
          <div className="absolute z-10 w-full mt-1 glass-strong border border-white/10 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredMembers.map((member: any) => (
              <button
                key={member.id}
                onClick={() => handleSelect(member)}
                className="w-full flex items-center gap-3 p-3 hover:bg-white/10 transition-colors text-left border-b border-white/10 last:border-b-0"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-muted-foreground">
                  {member.avatar}
                </div>
                <div>
                  <p className="text-sm text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Project Timeline & Service Type */}
      <div className="pt-4 border-t border-white/10">
        <h3 className="text-sm font-medium text-foreground mb-4">Project Details</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Project Start Date</label>
              <input
                type="date"
                value={data.projectStartDate}
                onChange={(e) => onChange({ ...data, projectStartDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Project End Date</label>
              <input
                type="date"
                value={data.projectEndDate}
                onChange={(e) => onChange({ ...data, projectEndDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/20 transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Service Type</label>
            <select
              value={data.serviceType}
              onChange={(e) => onChange({ ...data, serviceType: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/20 transition-all"
            >
              <option value="">Select service type</option>
              <option value="managed-service">Managed Service (Target Margin: 35-45%)</option>
              <option value="staff-augmentation">Staff Augmentation (Target Margin: 25-35%)</option>
              <option value="project-based">Project-Based (Target Margin: 30-40%)</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Service type determines the expected margin for this engagement
            </p>
          </div>

          {/* Region and Location Selectors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Region</label>
              <select
                value={data.region || "west-coast"}
                onChange={(e) => onChange({ ...data, region: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/20 transition-all"
              >
                <option value="west-coast">West Coast (+15%)</option>
                <option value="east-coast">East Coast (+10%)</option>
                <option value="midwest">Midwest (Base)</option>
                <option value="south">South (-5%)</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Regional cost adjustment
              </p>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Location Type</label>
              <select
                value={data.locationType || "onshore"}
                onChange={(e) => onChange({ ...data, locationType: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/20 transition-all"
              >
                <option value="onshore">Onshore (Base)</option>
                <option value="nearshore">Nearshore (-25%)</option>
                <option value="offshore">Offshore (-40%)</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Location cost adjustment
              </p>
            </div>
          </div>
          
          {projectDuration > 0 && (
            <p className="text-xs text-muted-foreground p-2 glass-subtle rounded">
              Project duration: {projectDuration} days ({(projectDuration / 30).toFixed(1)} months)
            </p>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">Team Composition</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Quick Start:</span>
            {Object.keys(teamTemplates).map((key) => (
              <button
                key={key}
                onClick={() => handleAddTemplate(key)}
                className="px-3 py-1 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 border border-white/10 rounded transition-colors"
              >
                {teamTemplates[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {data.teamMembers.map((member: any, index: number) => (
            <div 
              key={member.id} 
              className="p-3 glass-subtle rounded-lg border border-white/10 space-y-2.5"
            >
              {collapsedMembers.has(member.id) ? (
                // Collapsed State - Minimal View
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-foreground font-medium">{member.role || "Unassigned Role"}</span>
                      <span className="text-xs text-muted-foreground">
                        ${member.payRate || "0"}/hr → ${member.billRate || "0"}/hr
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {member.allocationPercent}% • {member.startPercent}%-{member.endPercent}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCollapse(member.id)}
                      className="p-1.5 hover:bg-white/10 rounded transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => handleRemoveMember(index)}
                      className="p-1.5 hover:bg-red-500/10 rounded transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ) : (
                // Expanded State - Full Edit Mode
                <>
                  {/* Role and Rates Row */}
                  <div className="grid grid-cols-7 gap-2.5">
                    <div className="col-span-3">
                      <label className="block text-xs text-muted-foreground mb-1">Role</label>
                      <select
                        value={member.role}
                        onChange={(e) => handleUpdateMember(index, "role", e.target.value)}
                        className="w-full px-3 py-1.5 bg-white/5 border border-white/20 rounded text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      >
                        <option value="">Select role</option>
                        {jobTitles.map((title: string) => (
                          <option key={title} value={title}>{title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-muted-foreground mb-1">Pay Rate/hr</label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                        <input
                          type="number"
                          value={member.payRate}
                          onChange={(e) => handleUpdateMember(index, "payRate", e.target.value)}
                          placeholder="0"
                          className="w-full pl-5 pr-2.5 py-1.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-muted-foreground mb-1">Bill Rate/hr</label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                        <input
                          type="number"
                          value={member.billRate}
                          onChange={(e) => handleUpdateMember(index, "billRate", e.target.value)}
                          placeholder="0"
                          className="w-full pl-5 pr-2.5 py-1.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Allocation Percentage */}
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">
                      Allocation: {member.allocationPercent}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={member.allocationPercent}
                      onChange={(e) => handleUpdateMember(index, "allocationPercent", parseInt(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Timeline Slider */}
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">
                      Project Timeline: {member.startPercent}% - {member.endPercent}%
                      {projectDuration > 0 && (
                        <span className="ml-2 text-muted-foreground">
                          (Day {Math.round((member.startPercent / 100) * projectDuration)} - Day {Math.round((member.endPercent / 100) * projectDuration)})
                        </span>
                      )}
                    </label>
                    <div className="relative h-6">
                      <div className="h-6 bg-white/10 rounded relative">
                        {/* Active Range Display */}
                        <div 
                          className="absolute h-full bg-primary/30 rounded"
                          style={{
                            left: `${member.startPercent}%`,
                            right: `${100 - member.endPercent}%`
                          }}
                        />
                        
                        {/* Start Handle - Left Side Priority */}
                        <input
                          type="range"
                          min="0"
                          max={Math.max(0, member.endPercent - 5)}
                          step="1"
                          value={member.startPercent}
                          onChange={(e) => handleUpdateMember(index, "startPercent", parseInt(e.target.value))}
                          className="absolute top-0 left-0 h-full opacity-0 cursor-ew-resize"
                          style={{ 
                            width: `${Math.max(50, (member.startPercent + member.endPercent) / 2)}%`,
                            zIndex: 12 
                          }}
                        />
                        
                        {/* End Handle - Right Side Priority */}
                        <input
                          type="range"
                          min={Math.min(100, member.startPercent + 5)}
                          max="100"
                          step="1"
                          value={member.endPercent}
                          onChange={(e) => handleUpdateMember(index, "endPercent", parseInt(e.target.value))}
                          className="absolute top-0 h-full opacity-0 cursor-ew-resize"
                          style={{ 
                            left: `${Math.min(50, (member.startPercent + member.endPercent) / 2)}%`,
                            width: `${100 - Math.min(50, (member.startPercent + member.endPercent) / 2)}%`,
                            zIndex: 12 
                          }}
                        />
                        
                        {/* Visual Handles */}
                        <div 
                          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-primary rounded-full border-2 border-white shadow-lg pointer-events-none"
                          style={{ left: `calc(${member.startPercent}% - 7px)`, zIndex: 20 }}
                        />
                        <div 
                          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-primary rounded-full border-2 border-white shadow-lg pointer-events-none"
                          style={{ left: `calc(${member.endPercent}% - 7px)`, zIndex: 20 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
                        <span>Start</span>
                        <span>End</span>
                      </div>
                    </div>
                  </div>

                  {/* Collapse and Remove Buttons */}
                  <div className="flex justify-between pt-1.5 border-t border-white/10">
                    <button
                      onClick={() => toggleCollapse(member.id)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs text-muted-foreground hover:bg-white/10 rounded transition-colors"
                    >
                      <Check className="w-3 h-3" strokeWidth={1.5} />
                      Done
                    </button>
                    <button
                      onClick={() => handleRemoveMember(index)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs text-red-400 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <Trash2 className="w-3 h-3" strokeWidth={1.5} />
                      Remove
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          <button
            onClick={handleAddMember}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-white/10 border border-white/10 rounded transition-colors w-full justify-center"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Team Member
          </button>

          {data.teamMembers.length > 0 && (
            <div className="mt-4 p-4 glass-subtle rounded border border-white/10">
              {data.serviceType && (
                <div className="mb-3 pb-3 border-b border-white/10">
                  <span className="text-xs font-medium text-muted-foreground">Service Type: </span>
                  <span className="text-xs text-primary font-medium">
                    {data.serviceType === "managed-service" && "Managed Service"}
                    {data.serviceType === "staff-augmentation" && "Staff Augmentation"}
                    {data.serviceType === "project-based" && "Project-Based"}
                  </span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Team Members:</span>
                  <span className="ml-2 text-foreground font-medium">{data.teamMembers.length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Avg. Allocation:</span>
                  <span className="ml-2 text-foreground font-medium">
                    {(data.teamMembers.reduce((sum: number, m: any) => sum + (m.allocationPercent || 0), 0) / data.teamMembers.length).toFixed(0)}%
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Est. Monthly Cost:</span>
                  <span className="ml-2 text-foreground font-medium">
                    ${data.teamMembers.reduce((sum: number, m: any) => sum + ((parseFloat(m.payRate) || 0) * 160 * (m.allocationPercent / 100)), 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Est. Monthly Revenue:</span>
                  <span className="ml-2 text-foreground font-medium">
                    ${data.teamMembers.reduce((sum: number, m: any) => sum + ((parseFloat(m.billRate) || 0) * 160 * (m.allocationPercent / 100)), 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Est. Monthly Margin:</span>
                  <span className="ml-2 text-[#24A148] font-medium">
                    ${(
                      data.teamMembers.reduce((sum: number, m: any) => sum + ((parseFloat(m.billRate) || 0) * 160 * (m.allocationPercent / 100)), 0) - 
                      data.teamMembers.reduce((sum: number, m: any) => sum + ((parseFloat(m.payRate) || 0) * 160 * (m.allocationPercent / 100)), 0)
                    ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CredentialsStep({ data, onChange, teamMembers }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([]);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

  const filteredCaseStudies = filterCaseStudies(caseStudyLibrary, {
    industries: selectedIndustries,
    workTypes: selectedWorkTypes,
    segments: selectedSegments,
    search: searchQuery,
  });

  const selectedCaseStudyIds = data.caseStudyIds || [];
  const selectedCaseStudies = caseStudyLibrary.filter(cs => selectedCaseStudyIds.includes(cs.id));

  const toggleCaseStudy = (caseStudyId: string) => {
    const isSelected = selectedCaseStudyIds.includes(caseStudyId);
    const newIds = isSelected
      ? selectedCaseStudyIds.filter((id: string) => id !== caseStudyId)
      : [...selectedCaseStudyIds, caseStudyId];
    onChange({ ...data, caseStudyIds: newIds });
  };

  const toggleFilter = (category: 'industries' | 'workTypes' | 'segments', value: string) => {
    const setters = {
      industries: setSelectedIndustries,
      workTypes: setSelectedWorkTypes,
      segments: setSelectedSegments,
    };
    const currentValues = {
      industries: selectedIndustries,
      workTypes: selectedWorkTypes,
      segments: selectedSegments,
    };

    const current = currentValues[category];
    const setter = setters[category];
    
    if (current.includes(value)) {
      setter(current.filter(v => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedIndustries([]);
    setSelectedWorkTypes([]);
    setSelectedSegments([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Credentials Owner
          <span className="text-xs text-muted-foreground font-normal ml-2">Who will gather case studies and credibility materials?</span>
        </label>
        <input
          type="text"
          value={data.owner}
          onChange={(e) => onChange({ ...data, owner: e.target.value })}
          placeholder="Enter name"
          className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Case Studies Selection */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-foreground">Case Studies</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Select 3-5 relevant case studies ({selectedCaseStudyIds.length} selected)
            </p>
          </div>
        </div>

        {/* Selected Case Studies */}
        {selectedCaseStudies.length > 0 && (
          <div className="mb-4 p-4 glass-subtle rounded-lg border border-success/30">
            <p className="text-xs font-medium text-success mb-2">Selected Case Studies:</p>
            <div className="space-y-2">
              {selectedCaseStudies.map(cs => (
                <div key={cs.id} className="flex items-center justify-between text-xs">
                  <span className="text-foreground">{cs.title} - {cs.client}</span>
                  <button
                    onClick={() => toggleCaseStudy(cs.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search case studies by title, client, or keywords..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Filter Chips */}
        <div className="space-y-3 mb-4">
          {/* Industry Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FilterIcon className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">Industry:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableFilters.industries.map(industry => (
                <button
                  key={industry}
                  onClick={() => toggleFilter('industries', industry)}
                  className={`px-3 py-1 rounded-full text-xs border transition-all ${
                    selectedIndustries.includes(industry)
                      ? 'bg-primary/20 text-primary border-primary/30 font-medium'
                      : 'bg-white/5 text-muted-foreground border-white/10 hover:border-white/20'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          {/* Work Type Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FilterIcon className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">Work Type:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableFilters.workTypes.map(workType => (
                <button
                  key={workType}
                  onClick={() => toggleFilter('workTypes', workType)}
                  className={`px-3 py-1 rounded-full text-xs border transition-all ${
                    selectedWorkTypes.includes(workType)
                      ? 'bg-primary/20 text-primary border-primary/30 font-medium'
                      : 'bg-white/5 text-muted-foreground border-white/10 hover:border-white/20'
                  }`}
                >
                  {workType}
                </button>
              ))}
            </div>
          </div>

          {/* Segment Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FilterIcon className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">Segment:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableFilters.segments.map(segment => (
                <button
                  key={segment}
                  onClick={() => toggleFilter('segments', segment)}
                  className={`px-3 py-1 rounded-full text-xs border transition-all ${
                    selectedSegments.includes(segment)
                      ? 'bg-primary/20 text-primary border-primary/30 font-medium'
                      : 'bg-white/5 text-muted-foreground border-white/10 hover:border-white/20'
                  }`}
                >
                  {segment}
                </button>
              ))}
            </div>
          </div>

          {(selectedIndustries.length > 0 || selectedWorkTypes.length > 0 || selectedSegments.length > 0 || searchQuery) && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Case Studies List */}
        <div className="border border-white/10 rounded-lg max-h-96 overflow-y-auto">
          {filteredCaseStudies.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No case studies match your filters. Try adjusting your search criteria.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filteredCaseStudies.map(caseStudy => {
                const isSelected = selectedCaseStudyIds.includes(caseStudy.id);
                return (
                  <div
                    key={caseStudy.id}
                    onClick={() => toggleCaseStudy(caseStudy.id)}
                    className={`p-4 cursor-pointer transition-all hover:bg-white/5 ${
                      isSelected ? 'bg-primary/10 border-l-2 border-l-primary' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm font-medium text-foreground">{caseStudy.title}</h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{caseStudy.year}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{caseStudy.client}</p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded text-xs">
                            {caseStudy.industry}
                          </span>
                          <span className="px-2 py-0.5 bg-white/5 text-muted-foreground border border-white/10 rounded text-xs">
                            {caseStudy.workType}
                          </span>
                          <span className="px-2 py-0.5 bg-white/5 text-muted-foreground border border-white/10 rounded text-xs">
                            {caseStudy.segment}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{caseStudy.challenge}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Testimonials and Certifications */}
      <div className="pt-4 border-t border-white/10 space-y-5">
        {/* Testimonials Section */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Testimonials
            <span className="text-xs text-muted-foreground font-normal ml-2">Client quotes and recommendations</span>
          </label>
          <textarea
            value={Array.isArray(data.testimonials) ? data.testimonials.join('\n\n') : data.testimonials}
            onChange={(e) => onChange({ ...data, testimonials: e.target.value.split('\n\n').filter((s: string) => s.trim()) })}
            placeholder={"Add client testimonials with attribution (separate with blank line)\n\nExample:\n\"Quote from client about your work and results.\" - Name, Title, Company"}
            rows={6}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          />
        </div>
        
        {/* Certifications Section */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Certifications
            <span className="text-xs text-muted-foreground font-normal ml-2">Relevant certifications and compliance standards</span>
          </label>
          <input
            type="text"
            value={data.certifications}
            onChange={(e) => onChange({ ...data, certifications: e.target.value })}
            placeholder="e.g., ISO 9001, SOC 2 Type II, HIPAA, AWS Certified, etc."
            className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>
    </div>
  );
}

function TimelineStep({ data, onChange, teamMembers }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Timeline Owner
          <span className="text-xs text-muted-foreground font-normal ml-2">Who will manage the schedule?</span>
        </label>
        <input
          type="text"
          value={data.owner}
          onChange={(e) => onChange({ ...data, owner: e.target.value })}
          placeholder="Enter name"
          className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/20 transition-all"
        />
      </div>

      <div className="pt-4 border-t border-white/10">
        <h3 className="text-sm font-medium text-foreground mb-4">Project Timeline</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Start Date</label>
              <input
                type="date"
                value={data.startDate}
                onChange={(e) => onChange({ ...data, startDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/20 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Delivery Date</label>
              <input
                type="date"
                value={data.deliveryDate}
                onChange={(e) => onChange({ ...data, deliveryDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/20 transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Key Milestones</label>
            <textarea
              value={data.keyMilestones}
              onChange={(e) => onChange({ ...data, keyMilestones: e.target.value })}
              placeholder="List major project milestones and phases"
              rows={6}
              className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0F62FE] focus:ring-2 focus:ring-[#0F62FE]/20 transition-all resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
