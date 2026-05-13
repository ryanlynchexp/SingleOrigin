import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Database, Palette, Code, Activity, Users, ClipboardCheck, FileText, Zap, CheckCircle, Target, Star, Gift, Coffee, Sparkles, MapPin, Clock, TrendingUp, Bell } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { SlideNavigation, type SlideChapter } from '@/app/components/SlideNavigation';
import { getContent } from '@/app/config/slideContent';
import { TitleSlide } from '@/app/components/slides/TitleSlide';
import { TeamStructureSlide } from '@/app/components/slides/TeamStructureSlide';
import { ContentSlide } from '@/app/components/slides/ContentSlide';
import { CaseStudyIndexSlide } from '@/app/components/slides/CaseStudyIndexSlide';
import { ScopeSlide } from '@/app/components/slides/ScopeSlide';
import { FindingsSlide } from '@/app/components/slides/FindingsSlide';
import { DesignShowcaseSlide } from '@/app/components/slides/DesignShowcaseSlide';
import { DesignFeaturesSlide } from '@/app/components/slides/DesignFeaturesSlide';
import { BeforeAfterSlide } from '@/app/components/slides/BeforeAfterSlide';
import { PersonaMappingSlide } from '@/app/components/slides/PersonaMappingSlide';
import { JourneyMapSlide } from '@/app/components/slides/JourneyMapSlide';
import { StatsSlide } from '@/app/components/slides/StatsSlide';
import { TimelineSlide } from '@/app/components/slides/TimelineSlide';
import { QuoteSlide } from '@/app/components/slides/QuoteSlide';
import { FullImageSlide } from '@/app/components/slides/FullImageSlide';
import { AppIntegrationSlide } from '@/app/components/slides/AppIntegrationSlide';
import { PerformanceIntegrationSlide } from '@/app/components/slides/PerformanceIntegrationSlide';
import { MobileDesignShowcaseSlide } from '@/app/components/slides/MobileDesignShowcaseSlide';

import { UserFlowChartSlide } from '@/app/components/slides/UserFlowChartSlide';
import { WalmartDashboardShowcaseSlide } from '@/app/components/slides/WalmartDashboardShowcaseSlide';
import BrandAssetsPage from '@/app/components/BrandAssetsPage';

// Import case study images
import ehrSystemImage from 'figma:asset/0a2b56cc959124355e9e995899ab7b19556d4b27.png';
import parkingAppImage from 'figma:asset/ed0974f305ff68adf89aafe6662f7300719669db.png';
import carRetailerImage from 'figma:asset/4026f0fd9432d90d789384952dc5ae0215315fbf.png';
import coffeeAppImage from 'figma:asset/2aa7ecb0f2bf2ac48f1dee44f9310b8a48b99d5d.png';
import walmartStoreImage from 'figma:asset/e35b36c9b9759142244a84d22e00efbc603236ec.png';
import walmartOutcomeImage from 'figma:asset/bfa9ea52af41e3dde08e2446c1bdb372d19df2cb.png';
import walmartApproachImage from 'figma:asset/f8f162c12afa0ad184b9d70493232cd0d0fd2417.png';
import walmartStakesImage from 'figma:asset/a7346c6f5c2135c8f98f8a145e39c9dc2ae7f123.png';

function ExperisUXcs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBrandAssets, setShowBrandAssets] = useState(false);
  const [activeDeck, setActiveDeck] = useState<'deck1' | 'deck2' | 'lite' | 'liteRedacted'>('deck2');
  const [showSwitcher, setShowSwitcher] = useState(false);
  const switcherTimerRef = useRef<NodeJS.Timeout | null>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const hasShownToast = useRef(false);

  // Deck configurations
  const deckConfig = {
    deck1: {
      title: "UX Case Studies_Dark Mode",
      brandColor: "blue",
      isRedacted: false,
      isLiteMode: false,
    },
    deck2: {
      title: "UX Case Studies_Dark Mode_Redacted",
      brandColor: "emerald",
      isRedacted: true,
      isLiteMode: false,
    },
    lite: {
      title: "UX Case Studies_Lite Mode",
      brandColor: "sky",
      isRedacted: false,
      isLiteMode: true,
    },
    liteRedacted: {
      title: "UX Case Studies_Lite Mode_Redacted",
      brandColor: "sky",
      isRedacted: true,
      isLiteMode: true,
    }
  };

  // Get content based on current deck
  const content = getContent(deckConfig[activeDeck].isRedacted);

  const currentDeckConfig = deckConfig[activeDeck];

  // Define which slides should have the boxed layout (intro/section slides)
  // All other slides will be full-screen
  const boxedLayoutSlides = [
    0,  // Main title slide
    3,  // Healthcare intro (CaseStudyIndexSlide)
    10, // Parking intro
    17, // CarMax intro
    24, // Starbucks intro
    30, // Walmart intro
  ];

  // Check if current slide should use boxed layout
  const useBoxedLayout = boxedLayoutSlides.includes(currentSlide);

  // Define chapter markers for case studies
  const chapters: SlideChapter[] = [
    { index: 0, label: 'Intro', color: 'bg-blue-500' },
    { index: 3, label: deckConfig[activeDeck].isRedacted ? 'Healthcare' : 'Healthcare EHR', color: 'bg-purple-500' },
    { index: 10, label: deckConfig[activeDeck].isRedacted ? 'Parking App' : 'Passport Parking', color: 'bg-emerald-500' },
    { index: 17, label: deckConfig[activeDeck].isRedacted ? 'QA Research' : 'CarMax Research', color: 'bg-amber-500' },
    { index: 24, label: deckConfig[activeDeck].isRedacted ? 'Disaster Tool' : 'Walmart DRT', color: 'bg-blue-600' },
  ];

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (switcherTimerRef.current) {
        clearTimeout(switcherTimerRef.current);
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Press 'B' to toggle brand assets view
      if (e.key === 'b' || e.key === 'B') {
        setShowBrandAssets((prev) => !prev);
        return;
      }
      
      // Press '1' to switch to Dark-R
      if (e.key === '1') {
        handleDeckSwitch('deck2');
        return;
      }
      
      // Press '2' to switch to Dark
      if (e.key === '2') {
        handleDeckSwitch('deck1');
        return;
      }
      
      // Press '3' to switch to Lite-R
      if (e.key === '3') {
        handleDeckSwitch('liteRedacted');
        return;
      }
      
      // Press '4' to switch to Lite
      if (e.key === '4') {
        handleDeckSwitch('lite');
        return;
      }
      
      if (!showBrandAssets) {
        if (e.key === 'ArrowRight') {
          handleNext();
        } else if (e.key === 'ArrowLeft') {
          handlePrevious();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, showBrandAssets]);

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const getCurrentChapter = (slideIndex: number) => {
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (slideIndex >= chapters[i].index) {
        return chapters[i];
      }
    }
    return chapters[0];
  };

  const slides = [
    // =====================================
    // INTRO SECTION (3 slides)
    // =====================================
    <TitleSlide
      key="title"
      category="Experis Digital Services"
      title="Transforming Ideas Into Experiences"
      subtitle="Strategic UX Research, Product Design & Development Excellence"
      backgroundImage="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbXxlbnwxfHx8fDE3Njg4NDE0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    />,

    <TeamStructureSlide
      key="team-overview"
      title="Our Design & UX Practice"
      subtitle="Four integrated pillars driving digital transformation"
      pillars={[
        {
          icon: Database,
          title: 'Data Collection & Benchmarking',
          description: 'Hands-on testing across physical devices, platforms, and environments',
          capabilities: [
            'Physical Device Data Collection',
            'Data Quality & Quality Assurance',
            'Performance & Input Assessment',
            'Product Benchmarking',
            'AI & LLM Training',
          ],
        },
        {
          icon: Search,
          title: 'UX Research',
          description: 'Deep user insights that inform strategic design decisions',
          capabilities: [
            'User interviews & ethnographic studies',
            'Usability testing & journey mapping',
            'Persona development & behavioral analysis',
            'Competitive research & market analysis',
          ],
        },
        {
          icon: Palette,
          title: 'Product Design',
          description: 'Crafting beautiful, functional digital experiences',
          capabilities: [
            'UI/UX design & design systems',
            'Wireframing, prototyping & testing',
            'Visual design & brand alignment',
            'Responsive & accessible design',
          ],
        },
        {
          icon: Code,
          title: 'Development & Engineering',
          description: 'Bringing designs to life with robust technical execution',
          capabilities: [
            'Frontend & backend development',
            'Mobile & web application engineering',
            'Technical architecture & integration',
            'Performance optimization & QA',
          ],
        },
      ]}
    />,

    <CaseStudyIndexSlide
      key="design-process"
      title="Recent Case Studies"
      subtitle="Research-driven methodology for enterprise-level solutions"
      caseStudies={[
        {
          title: `${content.companies.healthcare} EHR Dashboard System`,
          categories: ['UX Research', 'Information Architecture', 'Product Design'],
          slideNumber: 4,
          onNavigate: () => setCurrentSlide(3),
        },
        {
          title: `${content.companies.passport} Parking App Integration`,
          categories: ['Product Design', 'Brand Integration', 'Mobile UX'],
          slideNumber: 11,
          onNavigate: () => setCurrentSlide(10),
        },
        {
          title: `${content.companies.carmax} Agile QA Transformation`,
          categories: ['UX Research', 'Journey Mapping', 'Agile Transformation'],
          slideNumber: 18,
          onNavigate: () => setCurrentSlide(17),
        },
        {
          title: `${content.companies.walmart} Disaster Recovery Tool`,
          categories: ['UX Research', 'System Architecture', 'Enterprise Platform'],
          slideNumber: 25,
          onNavigate: () => setCurrentSlide(24),
        },
      ]}
    />,

    // =====================================
    // CASE STUDY 1: Healthcare EHR (9 slides)
    // =====================================
    <TitleSlide
      key="ehr-title"
      category={['UX Research', 'Information Architecture', 'Product Design']}
      title={`${content.companies.healthcare} EHR Dashboard System`}
      subtitle="Designing enterprise-wide clinical data visualization platform"
      backgroundImage="https://images.unsplash.com/photo-1766299892693-2370a8d47e23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1lZGljYWwlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2ODgzNjUwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
    />,

    <ScopeSlide
      key="ehr-scope"
      title="Project Scope"
      client={content.companies.healthcare}
      industry="Healthcare Technology"
      duration="14 months"
      teamSize="8 designers, 4 researchers"
      overview="A large regional hospital system managing 12 facilities needed to design and migrate to a FHIR-compliant EHR dashboard that would unify patient data, streamline clinical workflows, and improve care coordination across their entire network of 5,000+ staff members."
      deliverables={[
        'Comprehensive UX research study with 60+ clinician interviews',
        'Information architecture for unified patient data model',
        'Complete dashboard design system with 150+ components',
        'Desktop, tablet, and mobile responsive interfaces',
      ]}
    />,

    <TimelineSlide
      key="ehr-timeline"
      title="Project Timeline & Methodology"
      subtitle="14-month phased approach"
      challengePoints={[
        'Fragmented legacy systems created data silos across 12 facilities',
        'Clinicians spent 40% of time searching for patient information',
        'Poor information architecture led to critical data being overlooked',
        'No unified design language—each system had different UX patterns',
      ]}
      approachPoints={[
        'Conducted extensive ethnographic research with clinicians in their environment',
        'Designed comprehensive information architecture based on clinical mental models',
        'Created unified design system prioritizing data hierarchy and scanability',
        'Built interactive prototypes for early validation and iteration',
      ]}
      phases={[
        {
          phase: 'Discovery',
          duration: '3 months',
          activities: [
            'Stakeholder interviews across 12 facilities',
            'Clinician shadowing and workflow analysis',
            'Competitive analysis of EHR systems',
            'Data model audit and requirements gathering',
          ],
        },
        {
          phase: 'Design',
          duration: '5 months',
          activities: [
            'Information architecture development',
            'Design system creation',
            'High-fidelity prototyping',
            'Usability testing with clinicians',
          ],
        },
        {
          phase: 'Implementation',
          duration: '4 months',
          activities: [
            'Phased rollout strategy',
            'Developer collaboration and handoff',
            'Training material creation',
            'Change management support',
          ],
        },
        {
          phase: 'Optimization',
          duration: '2 months',
          activities: [
            'Post-launch user feedback collection',
            'Analytics review and optimization',
            'Design system refinement',
            'Documentation and best practices',
          ],
        },
      ]}
    />,

    <FindingsSlide
      key="ehr-findings"
      title="Key Research Findings"
      subtitle="Insights that shaped the design direction"
      heroImage="https://images.unsplash.com/photo-1758691462860-b1b9532c7394?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwZG9jdG9yJTIwbWVkaWNhbCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY4ODYyODY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      stats={[
        { value: '23%', label: 'Critical alerts missed', icon: 'alert' },
        { value: '8x', label: 'System switches per visit', icon: 'trending' },
        { value: '40%', label: 'Time spent searching', icon: 'clock' },
        { value: '12 min', label: 'Average time per patient', icon: 'clock' },
      ]}
      findings={[
        {
          title: 'Cognitive Overload',
          description: 'Clinicians reported information overload with current systems showing all data equally, making it difficult to identify critical patient information quickly.',
          recommendation: 'Design intelligent data prioritization based on patient acuity and clinical context',
        },
        {
          title: 'Workflow Interruption',
          description: 'Average of 8 system switches per patient encounter disrupted clinical thinking and created significant friction in daily workflows.',
          recommendation: 'Create unified dashboard that surfaces all critical data in context',
        },
      ]}
    />,

    <DesignFeaturesSlide
      key="ehr-design2"
      title="Key Design Features"
      subtitle="Intelligent dashboard solutions for clinical workflows"
      isLiteMode={currentDeckConfig.isLiteMode}
      features={[
        {
          title: 'Smart Alert System',
          description: 'Color-coded priority indicators surface critical patient alerts based on acuity level',
          position: { x: 72, y: 22 },
          alignment: 'right',
        },
        {
          title: 'Unified Patient View',
          description: 'All patient data consolidated in one interface, eliminating system switching',
          position: { x: 18, y: 35 },
          alignment: 'left',
        },
        {
          title: 'Contextual Data Cards',
          description: 'Information organized by clinical relevance with visual hierarchy and quick scan',
          position: { x: 25, y: 68 },
          alignment: 'left',
        },
        {
          title: 'Real-Time Trends',
          description: 'Visual analytics show patient progress at a glance for faster decision making',
          position: { x: 75, y: 70 },
          alignment: 'right',
        },
      ]}
    />,

    <PerformanceIntegrationSlide
      key="ehr-results"
      title="Design Impact"
      subtitle="Measured outcomes 6 months post-launch"
      stats={[
        { value: '91%', label: 'User Satisfaction', icon: Users, gradient: 'from-blue-500 to-cyan-500' },
        { value: '2.1M', label: 'Patient Records', icon: Database, gradient: 'from-violet-500 to-purple-500' },
        { value: '47%', label: 'Fewer Clicks', icon: Target, gradient: 'from-emerald-500 to-teal-500' },
      ]}
      performanceItems={[
        {
          label: 'Data Access Time',
          before: '8.2s',
          after: '3.4s',
          improvement: '58% faster',
        },
        {
          label: 'User Satisfaction (NPS)',
          before: '57/100',
          after: '91/100',
          improvement: '+34 points',
        },
        {
          label: 'Workflow Efficiency',
          before: '18 clicks',
          after: '9.5 clicks',
          improvement: '47% reduction',
        },
        {
          label: 'Task Completion Rate',
          before: '71%',
          after: '94%',
          improvement: '+23 pts',
        },
        {
          label: 'Error Rate',
          before: '8.3%',
          after: '2.6%',
          improvement: '69% reduction',
        },
      ]}
    />,

    <QuoteSlide
      key="ehr-quote"
      quote="The UX research uncovered workflow patterns we didn't even realize existed. The new dashboard design feels like it was made specifically for how we actually work, not how someone thought we should work."
      title="Chief Medical Information Officer"
      company={content.companies.healthcare}
    />,

    // <FullImageSlide
    //   key="ehr-hero"
    //   image={ehrSystemImage}
    //   title="Healthcare EHR Success"
    //   subtitle="58% faster data access, 91% user satisfaction"
    //   overlayPosition="bottom"
    // />,

    // =====================================
    // CASE STUDY 2: Passport Parking (9 slides)
    // =====================================
    <TitleSlide
      key="parking-title"
      category={['Product Design', 'Brand Integration', 'Mobile UX']}
      title={`${content.companies.passport} Parking App Integration`}
      subtitle={`Unifying acquired parking application into ${content.companies.passport} ecosystem`}
      backgroundImage="https://images.unsplash.com/photo-1654515989563-0a3bf0f6b616?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJraW5nJTIwdHJhbnNwb3J0YXRpb24lMjBjaXR5fGVufDF8fHx8MTc2ODg0OTExOHww&ixlib=rb-4.1.0&q=80&w=1080"
    />,

    <ScopeSlide
      key="parking-scope"
      title="Project Scope"
      client={content.companies.passport}
      industry="Transportation & Mobile Payments"
      duration="9 months"
      teamSize="6 designers, 3 developers"
      overview={`${content.companies.passport} acquired a competing parking permit application serving 250K+ active users. We needed to integrate this app into ${content.companies.passport}'s ecosystem while maintaining service continuity, aligning brand DNA, and improving the user experience based on insights from both user bases.`}
      deliverables={[
        'Brand DNA alignment strategy and visual language guidelines',
        'Complete app redesign maintaining feature parity',
        'User research study comparing both platforms',
        `Unified design system for ${content.companies.passport} product family`,
      ]}
    />,

    <TimelineSlide
      key="parking-timeline"
      title="Project Timeline & Methodology"
      subtitle="9-month integration strategy"
      challengePoints={[
        'Two competing apps with different UX patterns and visual languages',
        'Users loyal to acquired app feared losing familiar features',
        'Technical debt in acquired codebase requiring significant refactoring',
        `Need to establish ${content.companies.passport} brand while respecting existing user base`,
      ]}
      approachPoints={[
        'Conducted comparative UX analysis of both platforms to identify best patterns',
        'Developed brand integration framework balancing familiarity with innovation',
        'Designed hybrid feature set combining strengths of both applications',
        'Built comprehensive design system ensuring consistency across products',
      ]}
      phases={[
        {
          phase: 'Research',
          duration: '2 months',
          activities: [
            'Comparative UX analysis of both platforms',
            'User interviews with both customer bases',
            'Brand DNA workshop with stakeholders',
            'Technical architecture assessment',
          ],
        },
        {
          phase: 'Design',
          duration: '3 months',
          activities: [
            'Unified design system development',
            'Feature parity analysis and enhancement',
            'High-fidelity prototyping',
            'User testing with both audiences',
          ],
        },
        {
          phase: 'Migration',
          duration: '3 months',
          activities: [
            'Phased user migration strategy',
            'Communication campaign planning',
            'Developer collaboration',
            'Beta testing program',
          ],
        },
        {
          phase: 'Launch',
          duration: '1 month',
          activities: [
            'Coordinated app store deployment',
            'User support and onboarding',
            'Performance monitoring',
            'Rapid iteration based on feedback',
          ],
        },
      ]}
    />,

    <FindingsSlide
      key="parking-findings"
      title="Key Research Findings"
      subtitle="Understanding both user bases"
      heroImage="https://images.unsplash.com/photo-1740439615440-ca2d2b796589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJraW5nJTIwbW9iaWxlJTIwYXBwJTIwY2l0eXxlbnwxfHx8fDE3Njg4NjI5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      stats={[
        { value: '250K+', label: `Users migrated to ${content.companies.passport}`, icon: 'users' },
        { value: '47', label: 'Features unified across platforms', icon: 'trending' },
        { value: '156', label: 'Brand touchpoints harmonized', icon: 'alert' },
        { value: '2.1 min', label: 'Average permit purchase time', icon: 'clock' },
      ]}
      findings={[
        {
          title: 'Feature Anxiety',
          description: `Users of the acquired app worried about losing familiar features they relied on during the transition to ${content.companies.passport} branding.`,
          impact: '68% of users expressed concern about the transition during interviews, creating potential retention risk.',
          recommendation: 'Maintain all critical features while improving UX and visual design',
        },
        {
          title: 'Brand Perception',
          description: `${content.companies.passport} brand seen as more premium, but acquired app had better task efficiency and familiar workflows.`,
          impact: 'Opportunity to combine premium aesthetics with functional excellence without disrupting user habits.',
          recommendation: 'Create design that elevates brand while preserving superior workflows',
        },
      ]}
    />,

    <AppIntegrationSlide
      key="parking-design-features"
      title="App Integration & Design Evolution"
      subtitle={`Merging two ecosystems into a unified ${content.companies.passport} experience`}
      callouts={[
        {
          title: 'Unified Brand Language',
          description: `Merged ${content.companies.passport}'s premium aesthetics with acquired app's functional excellence`,
          position: { x: 23, y: 20 },
          alignment: 'left',
          color: 'emerald',
          offsetX: 50,
          offsetY: 0,
        },
        {
          title: 'Feature Consolidation',
          description: 'Combined 47 features from both platforms without losing core functionality',
          position: { x: 23, y: 70 },
          alignment: 'left',
          color: 'blue',
          offsetX: 100,
          offsetY: 0,
        },
        {
          title: 'Real-Time Map Integration',
          description: 'Live parking availability with zone visualization and location tracking',
          position: { x: 77, y: 20 },
          alignment: 'right',
          color: 'purple',
          offsetX: 50,
          offsetY: -65,
        },
        {
          title: 'Smart Progress Tracking',
          description: 'Visual parking session status with time remaining and seamless extensions',
          position: { x: 77, y: 55 },
          alignment: 'right',
          color: 'amber',
          offsetX: 100,
          offsetY: 35,
        },
      ]}
    />,

    <PerformanceIntegrationSlide
      key="parking-results"
      title="Performance & Integration Success"
      subtitle="Results 3 months post-migration"
      stats={[
        { value: '96%', label: 'User Retention', icon: Users, gradient: 'from-blue-500 to-cyan-500' },
        { value: '38%', label: 'More Transactions', icon: Activity, gradient: 'from-violet-500 to-purple-500' },
        { value: '$2.4M', label: 'Annual Savings', icon: Database, gradient: 'from-emerald-500 to-teal-500' },
      ]}
      performanceItems={[
        {
          label: 'App Response Time',
          before: '3.8s',
          after: '0.9s',
          improvement: '76% faster',
        },
        {
          label: 'Task Completion Rate',
          before: '68%',
          after: '94%',
          improvement: '+26 pts',
        },
        {
          label: 'Customer Satisfaction',
          before: '3.2/5',
          after: '4.6/5',
          improvement: '+44%',
        },
        {
          label: 'Error Rate',
          before: '12.4%',
          after: '2.1%',
          improvement: '83% reduction',
        },
        {
          label: 'Daily Active Users',
          before: '18.5K',
          after: '32.7K',
          improvement: '+77%',
        },
      ]}
    />,

    <QuoteSlide
      key="parking-quote"
      quote="We were nervous about the transition, but the new app kept everything we loved while making it faster and more beautiful. It actually feels like an upgrade, not just a rebrand."
      title="Product Manager"
      company={content.companies.passport}
    />,

    // =====================================
    // CASE STUDY 3: CarMax Research (9 slides)
    // =====================================
    <TitleSlide
      key="carmax-title"
      category={['UX Research', 'Journey Mapping', 'Agile Transformation']}
      title={`${content.companies.carmax} Agile QA Transformation`}
      subtitle="Research-driven assessment of quality assurance evolution"
      backgroundImage="https://images.unsplash.com/photo-1651275265408-9a4d8c820b87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkZWFsZXJzaGlwJTIwYXV0b21vdGl2ZXxlbnwxfHx8fDE3Njg4NDkxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    />,

    <ScopeSlide
      key="carmax-scope"
      title="Project Scope"
      client={content.companies.carmax}
      industry="Automotive Retail & E-commerce"
      duration="5 months"
      teamSize="4 UX researchers, 2 designers"
      overview={`${content.companies.carmax} was transforming their software development lifecycle from Waterfall to Agile methodologies. They needed an independent UX research assessment to understand how their QA processes would support this shift, identify gaps in current vs. future state workflows, and develop a research-informed roadmap.`}
      deliverables={[
        'Comprehensive stakeholder research across 32 participants',
        'Current state and future state journey maps',
        'Persona development for QA team members and stakeholders',
        'Actionable roadmap with prioritized recommendations',
      ]}
    />,

    <TimelineSlide
      key="carmax-timeline"
      title="Project Timeline & Methodology"
      subtitle="5-month research engagement"
      challengePoints={[
        'Organization shifting from Waterfall to Agile without clear QA strategy',
        'Initial perception that QA team was not adapting to Agile practices',
        'Multiple stakeholders with conflicting views on QA readiness',
        'Need to balance current operations with future transformation',
      ]}
      approachPoints={[
        'Designed comprehensive research study combining qualitative methods',
        'Mapped current state and ideal future state user journeys for QA workflows',
        'Developed personas representing different stakeholder perspectives',
        'Created prioritized roadmap based on impact vs. effort analysis',
      ]}
      phases={[
        {
          phase: 'Planning',
          duration: '3 weeks',
          activities: [
            'Research protocol development',
            'Stakeholder identification',
            'Interview guide creation',
            'Research tool setup',
          ],
        },
        {
          phase: 'Research',
          duration: '8 weeks',
          activities: [
            '32 stakeholder interviews',
            'QA team observations',
            'Process documentation review',
            'Competitive benchmarking',
          ],
        },
        {
          phase: 'Analysis',
          duration: '6 weeks',
          activities: [
            'Data synthesis and theming',
            'Persona development',
            'Journey map creation',
            'Gap analysis',
          ],
        },
        {
          phase: 'Roadmap',
          duration: '3 weeks',
          activities: [
            'Prioritization workshops',
            'Roadmap development',
            'Executive presentation',
            'Implementation planning',
          ],
        },
      ]}
    />,

    <PersonaMappingSlide
      key="carmax-personas"
      title="QA Team Personas"
      subtitle="Understanding diverse perspectives across the organization"
      personas={[
        {
          name: 'Sarah',
          age: '32',
          role: 'QA Engineer',
          avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTE0NzEzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
          traits: [
            { label: 'Technical Expertise', value: 85 },
            { label: 'Adaptability', value: 75 },
            { label: 'Team Collaboration', value: 90 },
          ],
          insight: 'I want to be involved earlier in the process, not just at the end when it\'s too late to fix things',
          goals: [
            'Automate repetitive tests',
            'Learn Agile best practices',
            'Collaborate earlier in dev cycle',
          ],
          painPoints: [
            'Unclear expectations in Agile',
            'Tools not optimized for sprints',
            'Limited automation resources',
          ],
          color: 'blue',
        },
        {
          name: 'Marcus',
          age: '45',
          role: 'QA Manager',
          avatar: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjkxMTcyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
          traits: [
            { label: 'Strategic Thinking', value: 95 },
            { label: 'Change Management', value: 70 },
            { label: 'Stakeholder Communication', value: 88 },
          ],
          insight: 'We need a roadmap that respects our expertise while helping us evolve with the company',
          goals: [
            'Transform team to Agile model',
            'Maintain quality standards',
            'Communicate value to leadership',
          ],
          painPoints: [
            'Resistance from Waterfall veterans',
            'Metrics not aligned with Agile',
            'Budget constraints for tools',
          ],
          color: 'purple',
        },
        {
          name: 'Jennifer',
          age: '38',
          role: 'Product Owner',
          avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY5MTczMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          traits: [
            { label: 'Customer Focus', value: 92 },
            { label: 'Sprint Planning', value: 80 },
            { label: 'Cross-functional Leadership', value: 85 },
          ],
          insight: 'Quality can\'t be an afterthought—we need QA embedded in our sprint planning from day one',
          goals: [
            'Faster release cycles',
            'Fewer production defects',
            'Better QA collaboration',
          ],
          painPoints: [
            'QA bottlenecks in sprints',
            'Late discovery of issues',
            'Unclear QA capacity',
          ],
          color: 'emerald',
        },
      ]}
    />,

    <JourneyMapSlide
      key="carmax-journey"
      title="QA Workflow Journey Map"
      persona="Sarah Chen, QA Engineer"
      subtitle="Identifying pain points in existing Waterfall-based process"
      scenario={`Testing a critical feature update for ${content.companies.carmax}'s inventory system. Requirements finalized late, development started before QA review, and release deadline is non-negotiable.`}
      goal="Ensure high-quality release while meeting aggressive deadline"
      touchPoints={[
        { label: 'Receive requirements', position: 5, quote: 'The specification came in incomplete. I immediately see gaps that will cause issues downstream.' },
        { label: 'Request clarifications', position: 16, quote: 'I need answers but dev already started building. Now I\'m playing catch-up from day one.' },
        { label: 'Test planning', position: 28 },
        { label: 'Attend standup', position: 40, quote: 'So many unknowns still. Everyone assumes QA will catch everything at the end.' },
        { label: 'Update test cases', position: 52, quote: 'Requirements changed again. Half my test cases are already outdated and we haven\'t even started testing.' },
        { label: 'Execute tests', position: 64, quote: 'Finding major integration issues that could have been caught earlier with better collaboration.' },
        { label: 'Log defects', position: 76 },
        { label: 'Final validation', position: 88, quote: 'We\'re behind schedule and there\'s pressure to cut testing short. This is when critical bugs slip through.' },
        { label: 'Production release', position: 96, quote: 'Signing off but honestly hoping everything holds together. We didn\'t have enough time to test properly.' },
      ]}
      emotionalPath={[30, 22, 55, 32, 58, 28, 48, 24, 35]}
      effortPath={[30, 50, 65, 68, 70, 68, 62, 40, 42]}
      approaches={[
        { label: 'Requirements review', start: 5, end: 28 },
        { label: 'Dev team check-ins', start: 35, end: 56 },
        { label: 'Manual testing & defect tracking', start: 62, end: 92 },
      ]}
      phases={[
        {
          name: 'Explore',
          color: '#E8996F',
          description: 'Review requirements and identify specification gaps',
          steps: ['Read requirements', 'Identify ambiguities'],
          recommendations: ['Involve QA in requirements review', 'Create clear acceptance criteria'],
        },
        {
          name: 'Define',
          color: '#D97E54',
          description: 'Create test strategy despite incomplete information',
          steps: ['Draft test plan', 'Estimate effort'],
          recommendations: ['Establish test strategy early', 'Define coverage targets'],
        },
        {
          name: 'Align',
          color: '#C26644',
          description: 'Sync with development team on scope and edge cases',
          steps: ['Attend standups', 'Review stories'],
          recommendations: ['Daily QA-Dev syncs', 'Shared definition of done'],
        },
        {
          name: 'Prepare',
          color: '#9B4A36',
          description: 'Write test cases and prepare environments',
          steps: ['Write test cases', 'Set up test data'],
          recommendations: ['Automate regression tests', 'Prepare environments early'],
        },
        {
          name: 'Execute',
          color: '#7D3A2A',
          description: 'Run test suite and identify defects',
          steps: ['Run smoke tests', 'Execute full suite'],
          recommendations: ['Shift testing left', 'Test in parallel with dev'],
        },
        {
          name: 'Validate',
          color: '#652E21',
          description: 'Final validation and production release sign-off',
          steps: ['Final regression', 'Production sign-off'],
          recommendations: ['Automated monitoring', 'Clear rollback procedures'],
        },
      ]}
    />,

    <PerformanceIntegrationSlide
      key="carmax-results"
      title="Transformation Results"
      subtitle="Measured 6 months after roadmap implementation"
      stats={[
        { value: '88%', label: 'Team Confidence', icon: Users, gradient: 'from-blue-500 to-cyan-500' },
        { value: '63%', label: 'Faster Releases', icon: Zap, gradient: 'from-violet-500 to-purple-500' },
        { value: '91%', label: 'Test Automation', icon: CheckCircle, gradient: 'from-emerald-500 to-teal-500' },
      ]}
      performanceItems={[
        {
          label: 'Release Cycle Time',
          before: '2 weeks',
          after: '4 days',
          improvement: '63% faster',
        },
        {
          label: 'Test Automation Coverage',
          before: '47%',
          after: '91%',
          improvement: '+44 pts',
        },
        {
          label: 'Production Defects',
          before: '18.2/sprint',
          after: '8.4/sprint',
          improvement: '54% reduction',
        },
        {
          label: 'Time to First Test',
          before: '5 days',
          after: '< 1 day',
          improvement: '80% faster',
        },
        {
          label: 'QA-Dev Collaboration Score',
          before: '5.8/10',
          after: '9.1/10',
          improvement: '+57%',
        },
      ]}
    />,

    <QuoteSlide
      key="carmax-quote"
      quote="The research revealed that our QA team was actually ahead of the curve in many ways. The roadmap gave us confidence to accelerate our Agile transformation."
      title="Director of Software Quality"
      company={content.companies.carmax}
    />,

    

    // =====================================
    // CASE STUDY 5: Walmart DRT (9 slides)
    // =====================================
    <TitleSlide
      key="walmart-title"
      category={['UX Research', 'System Architecture', 'Enterprise Platform']}
      title={`${content.companies.walmart} Disaster Recovery Tool`}
      subtitle="Transforming crisis response into coordinated operational resilience"
      backgroundImage="https://images.unsplash.com/photo-1760463921642-eef64776c3bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBncm9jZXJ5JTIwc3RvcmUlMjBpbnRlcmlvciUyMGNsZWFufGVufDF8fHx8MTc2OTYzODQyOXww&ixlib=rb-4.1.0&q=80&w=1080"
    />,

    <ScopeSlide
      key="walmart-scope"
      title="Project Scope"
      client={content.companies.walmart}
      industry="Retail Operations & Disaster Response"
      duration="4 months"
      teamSize="1 researcher, 2 designers, 4 developers"
      overview={`${content.companies.walmart}'s Disaster Resilience Team coordinates preparedness and response across 5,000+ stores, distribution centers, vendors, and utilities. The existing DRT tool had become a system of record rather than an operational coordination platform, forcing teams to rely on manual workarounds, Excel exports, and parallel systems during high-stakes incidents.`}
      deliverables={[
        'Comprehensive UX research with 5 distinct persona types',
        'Strategic transformation roadmap with phased implementation plan',
        'Information architecture design for command and operational views',
        'Integration planning for automated data flow from external systems',
      ]}
    />,

    <TimelineSlide
      key="walmart-timeline"
      title="Project Timeline & Methodology"
      subtitle="4-month strategic UX research and planning engagement"
      challengePoints={[
        'User success relies on human workarounds—manual notes, Excel exports, and parallel systems',
        'Critical coordination data lives outside the system during high-stakes incidents',
        'High cognitive load and rework due to rigid workflows and missing field validation',
        'Training depends on tribal knowledge rather than product-supported learning',
      ]}
      approachPoints={[
        'Conducted extensive contextual inquiry across 5 distinct user personas',
        'Analyzed workflows during active disaster scenarios and incident response',
        'Designed comprehensive system architecture for operational coordination',
        'Created strategic transformation roadmap with phased implementation plan',
      ]}
      phases={[
        {
          phase: 'Discovery',
          duration: '4 weeks',
          activities: [
            'Stakeholder alignment workshops',
            'Persona interviews and shadowing',
            'System audit and workflow mapping',
            'Competitive analysis of crisis platforms',
          ],
        },
        {
          phase: 'Research & Analysis',
          duration: '6 weeks',
          activities: [
            'Contextual inquiry during incidents',
            'User journey mapping for each persona',
            'Pain point and opportunity synthesis',
            'Technical constraints assessment',
          ],
        },
        {
          phase: 'Strategy & Planning',
          duration: '4 weeks',
          activities: [
            'Information architecture design',
            'Integration and data flow planning',
            'Feature prioritization matrix',
            'Phased roadmap development',
          ],
        },
        {
          phase: 'Validation & Handoff',
          duration: '2 weeks',
          activities: [
            'Stakeholder design reviews',
            'Technical feasibility validation',
            'Documentation and specifications',
            'Implementation roadmap delivery',
          ],
        },
      ]}
    />,

    <FindingsSlide
      key="walmart-findings"
      title="Key Research Findings"
      subtitle="Critical insights from disaster response operations"
      heroImage="https://images.unsplash.com/photo-1768796372362-05c256e61d8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxsJTIwY2VudGVyJTIwaW50ZXJpb3IlMjBwZW9wbGUlMjBoZWFkc2V0cyUyMHdvcmtpbmd8ZW58MXx8fHwxNzY5NjM5MDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      stats={[
        { value: '5,000+', label: 'Locations to coordinate', icon: 'target' },
        { value: '40%', label: 'Time on manual workarounds', icon: 'clock' },
        { value: '6 systems', label: 'Users switch between', icon: 'trending' },
        { value: '3 weeks', label: 'New agent onboarding time', icon: 'alert' },
      ]}
      findings={[
        {
          title: 'Lack of Shared Situational Awareness',
          description: 'Teams rely on Excel exports, personal dashboards, and manual notes. Critical coordination data lives outside the system, creating dangerous information gaps during time-sensitive incidents.',
          recommendation: 'Design unified command and operational views with real-time data synchronization',
        },
        {
          title: 'High Rework Due to Missing Fields',
          description: 'Rigid workflows force agents to manually enter data that could be pre-populated from existing systems. This leads to errors, delays, and duplicated effort across incident lifecycle.',
          recommendation: 'Implement guided workflows with validation checks and automated data integration',
        },
        {
          title: 'Training Relies on Tribal Knowledge',
          description: 'New team members depend on shadowing experienced agents and institutional knowledge rather than product-supported learning, creating significant onboarding bottlenecks.',
          recommendation: 'Create training sandbox environments and contextual help systems',
        },
      ]}
    />,

    <PersonaMappingSlide
      key="walmart-personas"
      title="Updated Persona Framework"
      subtitle="5 distinct roles in disaster response coordination"
      personas={[
        {
          name: 'Frontline Agent',
          role: 'First Responder',
          description: 'Creates and manages incident tickets, coordinates immediate response actions, and communicates status updates during active events.',
          needs: ['Quick ticket creation', 'Clear next actions', 'Real-time status visibility', 'Mobile accessibility'],
          painPoints: ['Too many required fields', 'Unclear escalation paths', 'Manual data entry', 'System too slow during crises'],
        },
        {
          name: 'Team Lead',
          role: 'Coordination & Training',
          description: 'Oversees team workload distribution, provides training for new agents, and ensures quality of incident documentation.',
          needs: ['Team workload dashboard', 'Training resources', 'Quality control tools', 'Performance metrics'],
          painPoints: ['No visibility into team capacity', 'Training is manual shadowing', 'Inconsistent documentation', 'Can\'t track skill gaps'],
        },
        {
          name: 'Supervisor',
          role: 'Operations Manager',
          description: 'Monitors all active incidents, makes resource allocation decisions, and reports status to executive leadership.',
          needs: ['Command center view', 'Priority indicators', 'Resource allocation tools', 'Executive reporting'],
          painPoints: ['Must build personal dashboard in Excel', 'No real-time overview', 'Manual status compilation', 'Missing trend analysis'],
        },
        {
          name: 'Retail Planner',
          role: 'Strategic Coordination',
          description: 'Coordinates cross-functional response plans, manages vendor relationships, and ensures business continuity.',
          needs: ['Planning tools', 'Vendor coordination', 'Timeline tracking', 'Impact assessment'],
          painPoints: ['Vendor data in separate systems', 'No predictive planning support', 'Manual coordination tasks', 'Limited historical data'],
        },
        {
          name: 'Vendor Coordinator',
          role: 'External Partner Liaison',
          description: 'Manages utility and service provider communications, tracks vendor response times, and coordinates external resources.',
          needs: ['Vendor contact management', 'Response time tracking', 'Communication logs', 'SLA monitoring'],
          painPoints: ['Vendor info scattered across systems', 'No automated notifications', 'Manual follow-ups', 'Missing accountability'],
        },
      ]}
    />,

    <WalmartDashboardShowcaseSlide
      key="walmart-dashboard"
      title="Key Design Features"
      subtitle="From system of record to operational coordination platform"
    />,

    // Design System & Platform Improvements
    <div
      key="walmart-opportunities"
      className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative h-full flex items-start justify-center px-12 py-12 overflow-y-auto">
        <div className="w-full max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl mb-2 text-white tracking-tight">Design System & Platform Improvements</h2>
            <p className="text-sm text-slate-400 uppercase tracking-wider">Visual refinements and technical enhancements</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-4 auto-rows-fr">
            {/* Command & Operational Views */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-opacity duration-500" />
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl h-full">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 shadow-lg">
                  <Activity className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-tight">Command & Operational Views</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Real-time dashboards showing active incidents, resource allocation, and critical metrics for all roles.
                </p>
              </div>
            </div>

            {/* Structured Handoffs */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-opacity duration-500" />
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl h-full">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3 shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-tight">Structured Handoffs</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Clear next actions and accountability tracking ensure smooth transitions during extended incidents.
                </p>
              </div>
            </div>

            {/* Data Integration */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-opacity duration-500" />
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl h-full">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-3 shadow-lg">
                  <Database className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-tight">Data Integration</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Automated pre-population from store and vendor systems eliminates manual entry and reduces errors.
                </p>
              </div>
            </div>

            {/* Guided Workflows */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-opacity duration-500" />
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl h-full">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-3 shadow-lg">
                  <Zap className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-tight">Guided Workflows</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Validation checks and smart defaults reduce cognitive load and guide users through complex processes.
                </p>
              </div>
            </div>

            {/* Visual Design System */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-rose-600 opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-opacity duration-500" />
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl h-full">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mb-3 shadow-lg">
                  <Palette className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-tight">Visual Design System</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Glassmorphic UI components and refined color palette create a modern, scalable platform experience.
                </p>
              </div>
            </div>

            {/* Training Sandbox */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-opacity duration-500" />
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl h-full">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg">
                  <Users className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-tight">Training Sandbox</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Safe practice environment with realistic scenarios reduces onboarding time from 3 weeks to days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    <QuoteSlide
      key="walmart-quote"
      quote="This research transformed how we think about DRT. We went from seeing it as a ticketing system to understanding it needs to be a coordination platform. The persona work and strategic roadmap give us a clear path forward."
      title="Program Leadership"
      company={`${content.companies.walmart} Disaster Resilience Team`}
    />,

    // Closing slide
    <FullImageSlide
      key="closing"
      image="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbXxlbnwxfHx8fDE3Njg4NDE0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      title="Let's Create Something Extraordinary"
      subtitle="Partner with us for research-driven design that delivers measurable impact"
      overlayPosition="center"
    />,
  ];

  const currentChapter = getCurrentChapter(currentSlide);

  // Show brand assets page when toggled
  if (showBrandAssets) {
    return (
      <div className="relative w-full min-h-screen">
        <BrandAssetsPage />
        <div className="fixed bottom-8 right-8 bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-full px-6 py-3 shadow-xl">
          <p className="text-white text-sm">Press <kbd className="px-2 py-1 bg-slate-700 rounded text-xs font-mono">B</kbd> to return to deck</p>
        </div>
      </div>
    );
  }

  const handleDeckSwitch = (deck: 'deck1' | 'deck2' | 'lite' | 'liteRedacted') => {
    setActiveDeck(deck);
    setCurrentSlide(0); // Reset to first slide when switching decks
    hasShownToast.current = false; // Reset toast flag when switching decks
    
    // Show switcher and start hide timer
    setShowSwitcher(true);
    
    // Clear existing timer
    if (switcherTimerRef.current) {
      clearTimeout(switcherTimerRef.current);
    }
    
    // Hide after 3 seconds
    switcherTimerRef.current = setTimeout(() => {
      setShowSwitcher(false);
    }, 3000);
  };

  // Detect overflow and show toast
  useEffect(() => {
    const checkOverflow = () => {
      const container = slideContainerRef.current;
      if (!container) return;

      const isOverflowing = container.scrollHeight > container.clientHeight || 
                           container.scrollWidth > container.clientWidth;

      if (isOverflowing && !hasShownToast.current) {
        hasShownToast.current = true;
        toast.info('This presentation is optimized for full-screen desktop viewing', {
          duration: 5000,
          position: 'bottom-center',
        });
      }
    };

    // Check on mount and when slide changes
    const timer = setTimeout(checkOverflow, 500);
    
    // Also check on resize
    window.addEventListener('resize', checkOverflow);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [currentSlide]);

  return (
    <div className={`relative w-full h-screen overflow-hidden flex items-center justify-center ${deckConfig[activeDeck].isLiteMode ? 'lite-mode' : 'bg-slate-900'}`}>
      <Toaster richColors theme="dark" />
      {/* Minimal Deck Switcher - Bottom Left Corner */}
      <div 
        className="fixed bottom-3 left-3 z-[100] group"
        onMouseEnter={() => {
          setShowSwitcher(true);
          if (switcherTimerRef.current) {
            clearTimeout(switcherTimerRef.current);
          }
        }}
        onMouseLeave={() => {
          switcherTimerRef.current = setTimeout(() => {
            setShowSwitcher(false);
          }, 500);
        }}
      >
        {/* Nearly invisible trigger dot */}
        <div className="w-3 h-3 rounded-full bg-slate-500/10 hover:bg-slate-500/30 transition-all duration-200 cursor-pointer" />
        
        {/* Switcher panel that appears on hover */}
        <div 
          className={`absolute bottom-0 left-0 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-lg px-2 py-2 shadow-xl flex flex-col gap-1.5 transition-all duration-300 ${
            showSwitcher ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={() => handleDeckSwitch('deck2')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all whitespace-nowrap ${
              activeDeck === 'deck2'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Dark-R
          </button>
          <button
            onClick={() => handleDeckSwitch('deck1')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all whitespace-nowrap ${
              activeDeck === 'deck1'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => handleDeckSwitch('liteRedacted')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all whitespace-nowrap ${
              activeDeck === 'liteRedacted'
                ? 'bg-sky-600 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Lite-R
          </button>
          <button
            onClick={() => handleDeckSwitch('lite')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all whitespace-nowrap ${
              activeDeck === 'lite'
                ? 'bg-sky-500 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Lite
          </button>
        </div>
      </div>

      {/* Old Deck Switcher - Top Center - Auto-hide */}
      <div 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-full px-2 py-2 shadow-xl flex gap-2 transition-all duration-500 ${
          showSwitcher ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={() => handleDeckSwitch('deck2')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeDeck === 'deck2'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          Dark Redacted
        </button>
        <button
          onClick={() => handleDeckSwitch('deck1')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeDeck === 'deck1'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          Dark Mode
        </button>
        <button
          onClick={() => handleDeckSwitch('liteRedacted')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeDeck === 'liteRedacted'
              ? 'bg-sky-600 text-white shadow-lg'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          Lite Redacted
        </button>
        <button
          onClick={() => handleDeckSwitch('lite')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeDeck === 'lite'
              ? 'bg-sky-500 text-white shadow-lg'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          Lite Mode
        </button>
      </div>

      {/* Deck Title Badge - Top Left - Auto-hide */}
      <div 
        className={`fixed top-6 left-6 z-50 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-full px-5 py-2.5 shadow-lg transition-all duration-500 ${
          showSwitcher ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
      >
        <p className="text-slate-300 text-sm font-medium">{currentDeckConfig.title}</p>
      </div>

      <div className={`relative w-full h-full overflow-hidden ${
        useBoxedLayout 
          ? `${deckConfig[activeDeck].isLiteMode ? 'slide-background' : 'bg-slate-900'} md:max-w-[177.78vh] md:max-h-[56.25vw]`
          : ''
      }`}>
        <AnimatePresence mode="wait">
          <motion.div
            ref={slideContainerRef}
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full h-full pb-16 sm:pb-14 overflow-y-auto overflow-x-hidden"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>

        <SlideNavigation
          currentSlide={currentSlide}
          totalSlides={slides.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
          chapters={chapters}
          onSlideChange={setCurrentSlide}
          isLiteMode={currentDeckConfig.isLiteMode}
        />
      </div>
    </div>
  );
}

export default ExperisUXcs;