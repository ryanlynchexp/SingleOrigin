import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { ChevronDown, ChevronRight, Calendar, Users, Shield, CheckCircle2, Mail, Phone, FileText, Target, Lightbulb, BarChart3, ArrowLeft, Linkedin, ArrowUp, ArrowDown, DollarSign, Download } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Main sections with sub-sections
const mainSections = [
  {
    id: "overview",
    label: "Overview",
    icon: FileText,
    subsections: ["Executive Summary"],
  },
  {
    id: "approach",
    label: "Approach",
    icon: Target,
    subsections: ["The Challenge", "Our Solution", "Scope of Work"],
  },
  {
    id: "execution",
    label: "Execution",
    icon: BarChart3,
    subsections: ["Timeline", "Team"],
  },
  {
    id: "investment",
    label: "Investment",
    icon: DollarSign,
    subsections: ["Pricing Breakdown", "Payment Terms"],
  },
  {
    id: "credentials",
    label: "Credentials",
    icon: Lightbulb,
    subsections: ["Case Studies", "Security & Compliance", "RFP Responses"],
  },
  {
    id: "next-steps",
    label: "Next Steps",
    icon: CheckCircle2,
    subsections: ["Contact & Timeline"],
  },
];

export function ClientProposal({ previewMode = false }: { previewMode?: boolean }) {
  const { proposalId } = useParams();
  const [activeMainSection, setActiveMainSection] = useState(0);
  const [expandedSubsection, setExpandedSubsection] = useState<string | null>(null);
  const [navExpanded, setNavExpanded] = useState(false);
  const [collapseTimer, setCollapseTimer] = useState<NodeJS.Timeout | null>(null);
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // Auto-expand when section changes
  useEffect(() => {
    setNavExpanded(true);
    
    // Clear existing timer
    if (collapseTimer) {
      clearTimeout(collapseTimer);
    }
    
    // Set new timer to collapse after 3 seconds
    const timer = setTimeout(() => {
      setNavExpanded(false);
    }, 3000);
    
    setCollapseTimer(timer);
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [activeMainSection]);

  useEffect(() => {
    const handleScroll = () => {
      const positions = mainSections.map((section, index) => {
        const el = document.getElementById(section.id);
        if (!el) return { index, position: Infinity };
        const rect = el.getBoundingClientRect();
        return { index, position: Math.abs(rect.top - 200) };
      });
      
      const closest = positions.reduce((prev, curr) => 
        curr.position < prev.position ? curr : prev
      );
      
      setActiveMainSection(closest.index);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNext = () => {
    if (activeMainSection < mainSections.length - 1) {
      scrollToSection(mainSections[activeMainSection + 1].id);
    }
  };

  const handlePrevious = () => {
    if (activeMainSection > 0) {
      scrollToSection(mainSections[activeMainSection - 1].id);
    }
  };

  const handleNavMouseEnter = () => {
    if (collapseTimer) {
      clearTimeout(collapseTimer);
    }
    setNavExpanded(true);
  };

  const handleNavMouseLeave = () => {
    const timer = setTimeout(() => {
      setNavExpanded(false);
    }, 500);
    setCollapseTimer(timer);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0F62FE 1px, transparent 1px),
              linear-gradient(to bottom, #0F62FE 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        
        {/* Large animated gradient wash 1 - moves diagonally */}
        <motion.div
          className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%]"
          style={{
            background: "linear-gradient(135deg, rgba(15, 98, 254, 0.12) 0%, transparent 50%, rgba(36, 161, 72, 0.08) 100%)",
          }}
          animate={{
            x: ["0%", "5%", "0%"],
            y: ["0%", "8%", "0%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Pulsing radial gradient */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px]"
          style={{
            background: "radial-gradient(circle at center, rgba(15, 98, 254, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Gradient Orb 1 - Blue */}
        <motion.div
          className="absolute w-[900px] h-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(15, 98, 254, 0.15) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{
            x: ["-30%", "100%"],
            y: ["20%", "60%", "20%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Gradient Orb 2 - Green */}
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(36, 161, 72, 0.12) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{
            x: ["100%", "-30%"],
            y: ["60%", "20%", "60%"],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Top Navigation Bar - Hidden in preview mode */}
      {!previewMode && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-[#0F62FE] rounded relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-[#0F62FE]"
                      initial={{ y: "100%" }}
                      animate={{ y: "-100%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-900">Experis</span>
                </div>
                
                <Link 
                  to={`/proposal/${proposalId}`}
                  className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                  Return to Workspace
                </Link>
              </div>

              <div className="flex items-center gap-3">
              {/* Download Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded text-sm hover:bg-slate-50 transition-all flex items-center gap-2 hover:shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${downloadDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {downloadDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setDownloadDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden">
                      <button
                        onClick={() => {
                          alert('Downloading as PDF...');
                          setDownloadDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                      >
                        <FileText className="w-4 h-4 text-slate-500" />
                        <div>
                          <div className="font-medium">PDF</div>
                          <div className="text-xs text-slate-500">Polished presentation</div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          alert('Downloading as PowerPoint...');
                          setDownloadDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                      >
                        <BarChart3 className="w-4 h-4 text-slate-500" />
                        <div>
                          <div className="font-medium">PowerPoint</div>
                          <div className="text-xs text-slate-500">One slide per section</div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          alert('Downloading as Word Document...');
                          setDownloadDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                      >
                        <FileText className="w-4 h-4 text-slate-500" />
                        <div>
                          <div className="font-medium">Word Document</div>
                          <div className="text-xs text-slate-500">Simple editable format</div>
                        </div>
                      </button>
                    </div>
                  </>
                )}
              </div>

              <button className="px-4 py-2 bg-[#0F62FE] text-white rounded text-sm hover:bg-[#0353E9] transition-all hover:shadow-lg hover:shadow-[#0F62FE]/20">
                Schedule Call
              </button>
            </div>
          </div>
        </div>

          {/* Progress Bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#0F62FE] to-[#24A148]"
            style={{ 
              width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
              boxShadow: "0 0 8px rgba(15, 98, 254, 0.5)",
            }}
          />
        </nav>
      )}

      {/* Vertical Section Navigator - Top Left - Hidden in preview mode */}
      {!previewMode && (
        <motion.div
          className="fixed left-8 top-24 z-40"
          onMouseEnter={handleNavMouseEnter}
          onMouseLeave={handleNavMouseLeave}
        >
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-lg shadow-lg overflow-hidden">
          <div className="space-y-0">
            {mainSections.map((section, index) => {
              const Icon = section.icon;
              const isActive = activeMainSection === index;
              const isPast = activeMainSection > index;
              
              return (
                <div key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center transition-all py-3 px-3 ${
                      isActive
                        ? "bg-[#0F62FE] text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isActive
                          ? "bg-white/20"
                          : isPast
                          ? "bg-[#EDF5FF] text-[#0F62FE]"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>

                    {/* Label - expands/collapses horizontally only */}
                    <motion.span
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                      initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                      animate={{
                        width: navExpanded ? "auto" : 0,
                        opacity: navExpanded ? 1 : 0,
                        marginLeft: navExpanded ? "0.75rem" : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {section.label}
                    </motion.span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        </motion.div>
      )}

      {/* Navigation Buttons - Hidden in preview mode */}
      {!previewMode && (
        <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-2">
        <button
          onClick={handlePrevious}
          disabled={activeMainSection === 0}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            activeMainSection === 0
              ? "bg-slate-100 text-slate-300 cursor-not-allowed"
              : "bg-white/80 backdrop-blur-xl border border-slate-200/50 text-slate-700 hover:bg-[#0F62FE] hover:text-white hover:shadow-lg hover:shadow-[#0F62FE]/20"
          }`}
        >
          <ArrowUp className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <button
          onClick={handleNext}
          disabled={activeMainSection === mainSections.length - 1}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            activeMainSection === mainSections.length - 1
              ? "bg-slate-100 text-slate-300 cursor-not-allowed"
              : "bg-white/80 backdrop-blur-xl border border-slate-200/50 text-slate-700 hover:bg-[#0F62FE] hover:text-white hover:shadow-lg hover:shadow-[#0F62FE]/20"
          }`}
        >
          <ArrowDown className="w-5 h-5" strokeWidth={1.5} />
        </button>
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 ${!previewMode ? 'pt-20' : ''}`}>
        <HeroSection />
        
        <section id="approach" className="scroll-mt-20">
          <ChallengeSection />
          <SolutionSection expandedSubsection={expandedSubsection} setExpandedSubsection={setExpandedSubsection} />
          <ScopeSection expandedSubsection={expandedSubsection} setExpandedSubsection={setExpandedSubsection} />
        </section>

        <section id="execution" className="scroll-mt-20">
          <TimelineSection />
          <TeamSection />
        </section>

        <section id="investment" className="scroll-mt-20">
          <PricingSection />
        </section>

        <section id="credentials" className="scroll-mt-20">
          <ProofOfWorkSection />
          <SecuritySection />
          <RFPResponsesSection expandedSubsection={expandedSubsection} setExpandedSubsection={setExpandedSubsection} />
        </section>

        <section id="next-steps" className="scroll-mt-20">
          <NextStepsSection />
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-50/80 backdrop-blur-xl border-t border-slate-200/50 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm">© 2026 Experis. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function HeroSection() {
  return (
    <section id="overview" className="min-h-screen flex items-center justify-center px-6 py-20 scroll-mt-20 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated Logo */}
          <motion.div
            className="w-20 h-20 border-2 border-[#0F62FE] rounded-lg mx-auto mb-8 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#0F62FE]/20 to-transparent"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-6xl text-slate-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Digital Transformation
            <br />
            <span className="bg-gradient-to-r from-[#0F62FE] to-[#0353E9] bg-clip-text text-transparent">
              for Acme Corporation
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A comprehensive proposal for modernizing operations, implementing cloud infrastructure, 
            and establishing data-driven decision making.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {[
              { label: "Total Investment", value: "$450K" },
              { label: "Timeline", value: "6 Months" },
              { label: "Dedicated Team", value: "8 Experts" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F62FE]/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative border border-slate-200 rounded-lg p-6 bg-white/50 backdrop-blur-sm">
                  <p className="text-3xl text-slate-900 mb-2">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            onClick={() => document.getElementById("approach")?.scrollIntoView({ behavior: "smooth" })}
            className="relative px-6 py-3 bg-[#0F62FE] text-white rounded overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="relative z-10">Explore Proposal</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#0353E9] to-[#0F62FE]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-2 h-2 bg-[#0F62FE] rounded-full opacity-20"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-3 h-3 bg-[#24A148] rounded-full opacity-20"
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  );
}

function ChallengeSection() {
  const challenges = [
    {
      title: "Legacy Systems",
      description: "Outdated infrastructure limiting business agility and innovation",
      impact: "30% slower time-to-market",
    },
    {
      title: "Data Silos",
      description: "Disconnected systems preventing unified insights",
      impact: "Limited operational visibility",
    },
    {
      title: "Scalability Constraints",
      description: "Current architecture unable to support growth",
      impact: "Infrastructure at 85% capacity",
    },
  ];

  return (
    <div className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-slate-900 mb-4">The Challenge</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Critical obstacles hindering growth and competitive advantage
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0F62FE]/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/80 backdrop-blur-sm rounded-lg p-8 border border-slate-200/50 h-full">
                <h3 className="text-lg text-slate-900 mb-3">{challenge.title}</h3>
                <p className="text-slate-600 mb-4">{challenge.description}</p>
                <div className="px-3 py-2 bg-[#EDF5FF] text-[#0353E9] rounded text-sm inline-block">
                  {challenge.impact}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SolutionSection({ expandedSubsection, setExpandedSubsection }: { expandedSubsection: string | null; setExpandedSubsection: (s: string | null) => void }) {
  const pillars = [
    {
      title: "Strategy & Consulting",
      summary: "Comprehensive roadmap and business alignment",
      details: [
        "Current state assessment and gap analysis",
        "Future-state architecture design",
        "Change management framework",
        "Risk mitigation strategies",
      ],
    },
    {
      title: "UX & Product Design",
      summary: "User-centered design for all touchpoints",
      details: [
        "User research and persona development",
        "Journey mapping and wireframing",
        "High-fidelity UI design system",
        "Prototyping and usability testing",
      ],
    },
    {
      title: "Engineering",
      summary: "Modern, scalable technical implementation",
      details: [
        "Cloud-native architecture on AWS/Azure",
        "Microservices and API development",
        "Data migration and integration",
        "DevOps and CI/CD pipelines",
      ],
    },
    {
      title: "Accessibility & Compliance",
      summary: "Enterprise-grade security and compliance",
      details: [
        "WCAG 2.1 AA accessibility standards",
        "SOC 2 Type II compliance",
        "GDPR and data privacy controls",
        "Security testing and audits",
      ],
    },
  ];

  return (
    <div className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-slate-900 mb-4">Our Solution</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            A comprehensive approach across four strategic pillars
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/50 overflow-hidden"
              animate={{ 
                y: expandedSubsection === pillar.title ? -2 : 0,
              }}
            >
              <button
                onClick={() => setExpandedSubsection(expandedSubsection === pillar.title ? null : pillar.title)}
                className="w-full p-6 text-left transition-colors relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F62FE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <h3 className="text-lg text-slate-900 mb-2">{pillar.title}</h3>
                    <p className="text-slate-600">{pillar.summary}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSubsection === pillar.title ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {expandedSubsection === pillar.title ? (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" strokeWidth={1.5} />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" strokeWidth={1.5} />
                    )}
                  </motion.div>
                </div>
              </button>

              {expandedSubsection === pillar.title && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 pb-6"
                >
                  <ul className="space-y-3 pt-4 border-t border-slate-200">
                    {pillar.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#24A148] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-slate-700">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScopeSection({ expandedSubsection, setExpandedSubsection }: { expandedSubsection: string | null; setExpandedSubsection: (s: string | null) => void }) {
  const phases = [
    {
      name: "Discovery",
      duration: "4 weeks",
      deliverables: [
        "Current state assessment report",
        "Technical architecture documentation",
        "User research findings",
        "Project roadmap and timeline",
      ],
    },
    {
      name: "Design",
      duration: "6 weeks",
      deliverables: [
        "Information architecture and sitemaps",
        "Wireframes and user flows",
        "Visual design system",
        "Interactive prototypes",
      ],
    },
    {
      name: "Development",
      duration: "12 weeks",
      deliverables: [
        "Cloud infrastructure setup",
        "Frontend and backend development",
        "API integrations",
        "Database migration",
      ],
    },
    {
      name: "Testing",
      duration: "4 weeks",
      deliverables: [
        "Comprehensive QA testing",
        "Performance and security audits",
        "Accessibility compliance testing",
        "User acceptance testing",
      ],
    },
    {
      name: "Launch",
      duration: "2 weeks",
      deliverables: [
        "Production deployment",
        "Training and documentation",
        "Go-live support",
        "Post-launch monitoring",
      ],
    },
  ];

  return (
    <div className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50" />
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-slate-900 mb-4">Scope of Work</h2>
          <p className="text-lg text-slate-600">
            Five distinct phases delivering measurable outcomes
          </p>
        </motion.div>

        <div className="space-y-4">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/50 overflow-hidden group"
              whileHover={{ x: 4 }}
            >
              <button
                onClick={() => setExpandedSubsection(expandedSubsection === phase.name ? null : phase.name)}
                className="w-full p-6 text-left transition-colors relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F62FE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-8 h-8 border-2 border-[#0F62FE] text-[#0F62FE] rounded flex items-center justify-center text-sm font-medium"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {index + 1}
                    </motion.div>
                    <div>
                      <h3 className="text-lg text-slate-900">{phase.name}</h3>
                      <p className="text-sm text-slate-600">{phase.duration}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSubsection === phase.name ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {expandedSubsection === phase.name ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" strokeWidth={1.5} />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" strokeWidth={1.5} />
                    )}
                  </motion.div>
                </div>
              </button>

              {expandedSubsection === phase.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-6 pb-6"
                >
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm font-medium text-slate-700 mb-3">Key Deliverables:</p>
                    <ul className="space-y-2">
                      {phase.deliverables.map((deliverable, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#24A148] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                          <span className="text-slate-700">{deliverable}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineSection() {
  // Project starts March 10, 2026 and runs for 28 weeks
  const startDate = new Date('2026-03-10');
  const totalWeeks = 28;
  
  // Generate month headers
  const months: { month: string; weeks: number; offset: number }[] = [];
  let currentDate = new Date(startDate);
  let weekCounter = 0;
  
  while (weekCounter < totalWeeks) {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // Calculate weeks in this month within our project
    const weeksInMonth = Math.min(
      Math.ceil((monthEnd.getTime() - currentDate.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1,
      totalWeeks - weekCounter
    );
    
    months.push({
      month: currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      weeks: weeksInMonth,
      offset: weekCounter
    });
    
    weekCounter += weeksInMonth;
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  }

  const timeline = [
    { phase: "Discovery", startWeek: 0, duration: 4, color: "#0F62FE" },
    { phase: "Design", startWeek: 4, duration: 6, color: "#0353E9" },
    { phase: "Development", startWeek: 10, duration: 12, color: "#0F62FE" },
    { phase: "Testing", startWeek: 22, duration: 4, color: "#24A148" },
    { phase: "Launch", startWeek: 26, duration: 2, color: "#0353E9" },
  ];

  return (
    <div className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-slate-900 mb-4">Project Timeline</h2>
          <p className="text-lg text-slate-600">28-week implementation roadmap with phased delivery</p>
        </motion.div>

        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/50 p-8 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Month Headers */}
          <div className="mb-6">
            <div className="flex border-b border-slate-200 pb-3">
              <div className="w-32 flex-shrink-0" />
              <div className="flex-1 flex">
                {months.map((month, index) => (
                  <div 
                    key={index}
                    className="text-center text-sm font-medium text-slate-900 border-r border-slate-200 last:border-0 px-2"
                    style={{ width: `${(month.weeks / totalWeeks) * 100}%` }}
                  >
                    {month.month}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gantt Chart */}
          <div className="space-y-4">
            {timeline.map((item, index) => {
              const leftOffset = (item.startWeek / totalWeeks) * 100;
              const width = (item.duration / totalWeeks) * 100;
              
              return (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex items-center group"
                >
                  <div className="w-32 text-sm text-slate-900 font-medium flex-shrink-0">
                    {item.phase}
                  </div>
                  <div className="flex-1 relative h-10">
                    <div className="absolute inset-y-0 left-0 right-0 bg-slate-100 rounded" />
                    <motion.div 
                      className="absolute inset-y-0 rounded shadow-sm flex items-center px-4 text-white text-sm font-medium overflow-hidden"
                      style={{ 
                        left: `${leftOffset}%`, 
                        width: `${width}%`,
                        backgroundColor: item.color
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                        animate={{
                          x: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <span className="relative z-10">{item.duration}w</span>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Week Scale */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex">
              <div className="w-32 flex-shrink-0" />
              <div className="flex-1 flex justify-between text-xs text-slate-500">
                {[0, 7, 14, 21, 28].map((week) => (
                  <span key={week}>Week {week}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium">Start Date:</span>
              <span>March 10, 2026</span>
              <span className="mx-2">•</span>
              <span className="font-medium">Completion:</span>
              <span>September 30, 2026</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PricingSection() {
  const pricing = [
    { phase: "Discovery & Planning", amount: "$75,000", description: "Research, planning, and architecture" },
    { phase: "Design & UX", amount: "$120,000", description: "User experience and visual design" },
    { phase: "Development & Integration", amount: "$180,000", description: "Engineering and implementation" },
    { phase: "Testing & Launch", amount: "$75,000", description: "QA, deployment, and support" },
  ];

  return (
    <div className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent" />
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-slate-900 mb-4">Investment Breakdown</h2>
          <p className="text-lg text-slate-600">Transparent pricing by project phase</p>
        </motion.div>

        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 border-b border-slate-200 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#EDF5FF] to-[#EDF5FF]/50"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <div className="relative text-center">
              <p className="text-sm text-slate-600 mb-2">Total Investment</p>
              <motion.p
                className="text-5xl text-slate-900"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                $450,000
              </motion.p>
              <p className="text-sm text-slate-600 mt-4">Fixed-price engagement with phased payments</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {pricing.map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="flex items-center justify-between pb-6 border-b border-slate-100 last:border-0 last:pb-0 group"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900 mb-1 group-hover:text-[#0F62FE] transition-colors">{item.phase}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
                <div className="text-2xl text-slate-900 font-medium">{item.amount}</div>
              </motion.div>
            ))}
          </div>

          <div className="p-8 bg-slate-50/50 backdrop-blur-sm border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { label: "Payment Terms", value: "Net 30" },
                { label: "Engagement Model", value: "Fixed Price" },
                { label: "Warranty Period", value: "90 Days" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <p className="text-sm text-slate-600 mb-1">{item.label}</p>
                  <p className="font-medium text-slate-900">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function TeamSection() {
  const team = [
    {
      name: "Sarah Chen",
      role: "Project Director",
      bio: "15+ years leading enterprise transformations",
      linkedin: "https://linkedin.com/in/sarahchen",
      image: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMHdvbWFuJTIwYnVzaW5lc3MlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI4MzE4NjB8MA&ixlib=rb-4.1.0&q=80&w=400",
    },
    {
      name: "Michael Rodriguez",
      role: "Principal Architect",
      bio: "Cloud architecture expert, AWS certified",
      linkedin: "https://linkedin.com/in/michaelrodriguez",
      image: "https://images.unsplash.com/photo-1680540692052-79fde1108370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoaXNwYW5pYyUyMG1hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyODM0OTcxfDA&ixlib=rb-4.1.0&q=80&w=400",
    },
    {
      name: "Emma Thompson",
      role: "UX Design Lead",
      bio: "Award-winning product designer",
      linkedin: "https://linkedin.com/in/emmathompson",
      image: "https://images.unsplash.com/photo-1770058428154-9eee8a6a1fbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjYXVjYXNpYW4lMjB3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyODM0OTcxfDA&ixlib=rb-4.1.0&q=80&w=400",
    },
    {
      name: "Alex Kumar",
      role: "Engineering Lead",
      bio: "Full-stack expert, 12 years experience",
      linkedin: "https://linkedin.com/in/alexkumar",
      image: "https://images.unsplash.com/photo-1659355894117-0ae6f8f28d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbmRpYW4lMjBtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjgzNDk3Mnww&ixlib=rb-4.1.0&q=80&w=400",
    },
  ];

  return (
    <div className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-slate-900 mb-4">Your Team</h2>
          <p className="text-lg text-slate-600">
            Experienced professionals dedicated to your success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/50 p-6 text-center group relative overflow-hidden"
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#0F62FE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="relative">
                <div className="relative mb-4 inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-slate-200"
                    />
                  </motion.div>
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-0 right-1/2 translate-x-12 w-8 h-8 bg-[#0F62FE] rounded-full flex items-center justify-center text-white shadow-lg"
                    whileHover={{ scale: 1.1, backgroundColor: "#0353E9" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Linkedin className="w-4 h-4" strokeWidth={1.5} />
                  </motion.a>
                </div>
                <h3 className="text-lg text-slate-900 mb-1">{member.name}</h3>
                <p className="text-sm text-[#0F62FE] mb-3">{member.role}</p>
                <p className="text-sm text-slate-600">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProofOfWorkSection() {
  const caseStudies = [
    {
      client: "TechCorp Global",
      title: "Enterprise Cloud Migration",
      outcome: "60% cost reduction, 3x faster deployment",
      industry: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkYXNoYm9hcmQlMjBVSSUyMGRlc2lnbiUyMGNvbXBvbmVudHN8ZW58MXx8fHwxNzczMDc4MDkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      client: "HealthFirst",
      title: "App and Software Redesign",
      outcome: "45% increase in user satisfaction",
      industry: "Healthcare",
      imageUrl: "https://images.unsplash.com/photo-1627757818592-ce2649563a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBwcm90b3R5cGUlMjBzY3JlZW5zfGVufDF8fHx8MTc3MzA3ODA5NHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      client: "FinanceHub",
      title: "Digital Banking Platform",
      outcome: "2M+ users onboarded in 6 months",
      industry: "Finance",
      imageUrl: "https://images.unsplash.com/photo-1591381287254-b3349c60bf9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBwcm90b3R5cGUlMjBhbmltYXRpb24lMjBpbnRlcmFjdGlvbnxlbnwxfHx8fDE3NzMwNzg3MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <div className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-slate-900 mb-4">Case Studies</h2>
          <p className="text-lg text-slate-600">Recent client success stories</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/50 overflow-hidden group cursor-pointer"
              whileHover={{ y: -4 }}
            >
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center border-b border-slate-200 relative overflow-hidden">
                <ImageWithFallback
                  src={study.imageUrl}
                  alt={`${study.title} - ${study.client}`}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 border border-slate-200 text-slate-700 rounded text-xs">
                    {study.industry}
                  </span>
                </div>
                <h3 className="text-lg text-slate-900 mb-2 group-hover:text-[#0F62FE] transition-colors">
                  {study.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4">{study.client}</p>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-[#24A148] font-medium">{study.outcome}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecuritySection() {
  const certifications = [
    { name: "SOC 2 Type II" },
    { name: "ISO 27001" },
    { name: "WCAG 2.1 AA" },
    { name: "GDPR Compliant" },
  ];

  return (
    <div className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-slate-900 mb-4">Security & Compliance</h2>
          <p className="text-lg text-slate-600">
            Enterprise-grade security and industry certifications
          </p>
        </motion.div>

        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/50 p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="w-16 h-16 border-2 border-[#24A148] rounded-lg flex items-center justify-center mx-auto mb-3 relative overflow-hidden"
                  whileHover={{ borderColor: "#1e8038" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-[#24A148]/5"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <Shield className="w-8 h-8 text-[#24A148] relative z-10" strokeWidth={1.5} />
                </motion.div>
                <p className="font-medium text-slate-900">{cert.name}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-200">
            {[
              { title: "Data Protection", description: "End-to-end encryption and secure data handling" },
              { title: "Accessibility", description: "WCAG 2.1 AA compliant, inclusive design" },
              { title: "Compliance", description: "Industry standards and regulatory adherence" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <h4 className="font-medium text-slate-900 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function RFPResponsesSection({ expandedSubsection, setExpandedSubsection }: { expandedSubsection: string | null; setExpandedSubsection: (s: string | null) => void }) {
  const questions = [
    {
      q: "What is your approach to project management and stakeholder communication?",
      a: "We utilize Agile methodologies with bi-weekly sprints, daily standups, and comprehensive stakeholder reporting. You'll have a dedicated project director and access to our project management platform for real-time visibility.",
    },
    {
      q: "How do you ensure data security during migration?",
      a: "Our migration process includes end-to-end encryption, zero-downtime deployment strategies, and comprehensive backup procedures. All data transfers are monitored and logged with strict access controls.",
    },
    {
      q: "What post-launch support do you provide?",
      a: "We offer 90 days of comprehensive warranty support, including bug fixes, performance optimization, and user training. Extended support packages are available for ongoing maintenance and enhancements.",
    },
    {
      q: "How do you handle scope changes during the project?",
      a: "We have a formal change request process that evaluates impact on timeline, budget, and resources. All changes are documented and require mutual approval before implementation.",
    },
  ];

  return (
    <div className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent" />
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-slate-900 mb-4">RFP Responses</h2>
          <p className="text-lg text-slate-600">
            Detailed answers to your key questions
          </p>
        </motion.div>

        <div className="space-y-4">
          {questions.map((item, index) => {
            const key = `rfp-${index}`;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/50 overflow-hidden"
                whileHover={{ x: 4 }}
              >
                <button
                  onClick={() => setExpandedSubsection(expandedSubsection === key ? null : key)}
                  className="w-full p-6 text-left transition-colors relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0F62FE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start justify-between gap-4">
                    <h3 className="font-medium text-slate-900 flex-1">{item.q}</h3>
                    <motion.div
                      animate={{ rotate: expandedSubsection === key ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {expandedSubsection === key ? (
                        <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" strokeWidth={1.5} />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" strokeWidth={1.5} />
                      )}
                    </motion.div>
                  </div>
                </button>

                {expandedSubsection === key && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-6 pb-6"
                  >
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-slate-700 leading-relaxed">{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NextStepsSection() {
  return (
    <div className="py-24 px-6 bg-slate-900 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: "radial-gradient(circle at 20% 50%, #0F62FE 0%, transparent 50%), radial-gradient(circle at 80% 50%, #24A148 0%, transparent 50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-white mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">
            Let's schedule an alignment call to discuss your vision and finalize the engagement details
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <motion.button
              className="px-6 py-3 bg-[#0F62FE] text-white rounded flex items-center gap-2 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-5 h-5 relative z-10" strokeWidth={1.5} />
              <span className="relative z-10">Schedule Alignment Call</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#0353E9] to-[#0F62FE]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            <motion.button
              className="px-6 py-3 border border-white text-white rounded relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Download Proposal</span>
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-lg text-white mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                { icon: Mail, label: "Email", value: "proposals@experis.com" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                { icon: Users, label: "Project Director", value: "Sarah Chen" },
                { icon: Calendar, label: "Proposed Start", value: "March 10, 2026" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Icon className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm text-slate-400 mb-1">{item.label}</p>
                      <p className="text-white">{item.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
