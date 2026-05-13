import { CaseStudy } from "../components/CaseStudyModal";

// Mock library of ~150 case studies
export const caseStudyLibrary: CaseStudy[] = [
  // Healthcare
  {
    id: "cs-001",
    title: "EHR Platform Modernization",
    client: "Memorial Health System",
    year: 2024,
    industry: "Healthcare",
    workType: "Cloud Engineering",
    segment: "Enterprise",
    thumbnail: "",
    challenge: "Legacy electronic health record system struggling with performance issues, poor user experience, and inability to scale to meet growing patient demand across 15 hospital facilities.",
    solution: "Architected and deployed a cloud-native EHR platform using AWS, implementing microservices architecture with React frontend and Node.js backend. Integrated HL7 FHIR standards for data interoperability.",
    results: [
      "60% reduction in page load times",
      "99.99% system uptime achieved",
      "50,000+ concurrent users supported",
      "Zero downtime during migration",
      "HIPAA and SOC 2 Type II compliance maintained"
    ],
    metrics: [
      { label: "Performance Gain", value: "60%" },
      { label: "Uptime", value: "99.99%" },
      { label: "Users", value: "50K+" },
      { label: "Facilities", value: "15" }
    ],
    teamSize: "12 engineers",
    duration: "8 months",
    technologies: ["AWS", "React", "Node.js", "PostgreSQL", "Kubernetes", "HL7 FHIR"],
    testimonial: {
      quote: "The modernization transformed our ability to deliver patient care. The new system is faster, more reliable, and our staff actually enjoys using it.",
      author: "Dr. Sarah Mitchell",
      title: "Chief Medical Information Officer"
    }
  },
  {
    id: "cs-002",
    title: "Patient Portal Development",
    client: "CareFirst Medical Group",
    year: 2023,
    industry: "Healthcare",
    workType: "SaaS",
    segment: "Mid-Market",
    thumbnail: "",
    challenge: "Patients lacked self-service capabilities for appointment scheduling, medical record access, and communication with care teams, leading to high call center volumes and patient dissatisfaction.",
    solution: "Developed a HIPAA-compliant patient portal with mobile-first design, featuring appointment scheduling, secure messaging, lab results access, and prescription refills.",
    results: [
      "70% reduction in call center volume",
      "4.8/5 patient satisfaction rating",
      "85% mobile adoption rate",
      "2M patient interactions in first year"
    ],
    metrics: [
      { label: "Call Reduction", value: "70%" },
      { label: "Satisfaction", value: "4.8/5" },
      { label: "Mobile Users", value: "85%" },
      { label: "Interactions", value: "2M" }
    ],
    teamSize: "8 engineers",
    duration: "6 months",
    technologies: ["React Native", "Python", "PostgreSQL", "AWS", "HIPAA"],
  },
  {
    id: "cs-003",
    title: "Telehealth Platform Implementation",
    client: "Regional Hospital Network",
    year: 2023,
    industry: "Healthcare",
    workType: "End to End",
    segment: "Enterprise",
    thumbnail: "",
    challenge: "COVID-19 pandemic created urgent need for telehealth capabilities across network of rural hospitals with limited technology infrastructure.",
    solution: "Rapidly deployed secure video conferencing platform integrated with existing EHR, including scheduling, billing integration, and mobile applications for iOS and Android.",
    results: [
      "Deployed in 45 days from kickoff",
      "15,000+ virtual visits in first quarter",
      "95% patient satisfaction score",
      "Enabled care for underserved rural communities"
    ],
    metrics: [
      { label: "Deployment", value: "45 days" },
      { label: "Visits Q1", value: "15K+" },
      { label: "Satisfaction", value: "95%" },
      { label: "Locations", value: "8" }
    ],
    teamSize: "10 engineers",
    duration: "3 months",
    technologies: ["WebRTC", "React", "React Native", "Node.js", "MongoDB"],
  },

  // Financial Services
  {
    id: "cs-004",
    title: "Digital Banking Platform",
    client: "FinanceHub Corp",
    year: 2024,
    industry: "Financial Services",
    workType: "SaaS",
    segment: "Enterprise",
    thumbnail: "",
    challenge: "Legacy core banking system unable to support modern digital features customers expect, losing market share to digital-first competitors.",
    solution: "Built modern digital banking platform with real-time transactions, AI-powered fraud detection, and seamless mobile experience while maintaining integration with legacy core systems.",
    results: [
      "300% increase in mobile banking adoption",
      "99.7% fraud detection accuracy",
      "40% reduction in operational costs",
      "$2.5B in digital transactions processed monthly"
    ],
    metrics: [
      { label: "Mobile Growth", value: "300%" },
      { label: "Fraud Detection", value: "99.7%" },
      { label: "Cost Savings", value: "40%" },
      { label: "Monthly Volume", value: "$2.5B" }
    ],
    teamSize: "15 engineers",
    duration: "12 months",
    technologies: ["React", "Java", "Kafka", "PostgreSQL", "AWS", "Machine Learning"],
    testimonial: {
      quote: "This platform has completely transformed our customer experience. We're now competing effectively with digital-first banks.",
      author: "James Patterson",
      title: "Chief Digital Officer"
    }
  },
  {
    id: "cs-005",
    title: "Payment Processing Modernization",
    client: "SecurePay Solutions",
    year: 2023,
    industry: "Financial Services",
    workType: "Cloud Engineering",
    segment: "Enterprise",
    thumbnail: "",
    challenge: "Payment processing infrastructure couldn't handle peak transaction volumes during holidays, causing downtime and lost revenue.",
    solution: "Migrated to cloud-native architecture with auto-scaling capabilities, implementing event-driven microservices for payment processing.",
    results: [
      "10x improvement in peak capacity",
      "99.995% transaction success rate",
      "Sub-100ms average processing time",
      "PCI DSS Level 1 compliant"
    ],
    metrics: [
      { label: "Capacity", value: "10x" },
      { label: "Success Rate", value: "99.995%" },
      { label: "Speed", value: "<100ms" },
      { label: "Compliance", value: "PCI L1" }
    ],
    teamSize: "14 engineers",
    duration: "9 months",
    technologies: ["AWS", "Kubernetes", "Go", "Redis", "PostgreSQL", "Kafka"],
  },
  {
    id: "cs-006",
    title: "Fraud Detection AI System",
    client: "TrustBank International",
    year: 2024,
    industry: "Financial Services",
    workType: "AI/ML",
    segment: "Enterprise",
    thumbnail: "",
    challenge: "Rising fraud losses from sophisticated attacks, with traditional rule-based systems generating too many false positives.",
    solution: "Implemented machine learning-based fraud detection using real-time transaction analysis, behavioral biometrics, and network graph analysis.",
    results: [
      "92% reduction in fraud losses",
      "75% fewer false positives",
      "Real-time decisioning (<50ms)",
      "$50M+ in prevented fraud annually"
    ],
    metrics: [
      { label: "Fraud Reduction", value: "92%" },
      { label: "False Positives", value: "-75%" },
      { label: "Decision Time", value: "<50ms" },
      { label: "Savings/Year", value: "$50M+" }
    ],
    teamSize: "10 data scientists",
    duration: "10 months",
    technologies: ["Python", "TensorFlow", "AWS SageMaker", "Kafka", "Elasticsearch"],
  },

  // Technology
  {
    id: "cs-007",
    title: "Cloud Migration & Optimization",
    client: "TechVentures Inc",
    year: 2024,
    industry: "Technology",
    workType: "Cloud Engineering",
    segment: "Mid-Market",
    thumbnail: "",
    challenge: "On-premise infrastructure costs spiraling while limiting scalability and global expansion plans.",
    solution: "Executed comprehensive AWS migration using containerization, implemented infrastructure-as-code, and optimized for cost and performance.",
    results: [
      "65% reduction in infrastructure costs",
      "4x improvement in deployment speed",
      "99.99% uptime SLA achieved",
      "Global latency reduced by 70%"
    ],
    metrics: [
      { label: "Cost Savings", value: "65%" },
      { label: "Deploy Speed", value: "4x" },
      { label: "Uptime", value: "99.99%" },
      { label: "Latency", value: "-70%" }
    ],
    teamSize: "9 engineers",
    duration: "7 months",
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Python"],
    testimonial: {
      quote: "The migration exceeded our expectations. We're more agile, more reliable, and spending less on infrastructure.",
      author: "Maria Rodriguez",
      title: "VP of Engineering"
    }
  },
  {
    id: "cs-008",
    title: "SaaS Platform Development",
    client: "DataDrive Analytics",
    year: 2023,
    industry: "Technology",
    workType: "SaaS",
    segment: "Startup",
    thumbnail: "",
    challenge: "First-time SaaS product launch needed robust multi-tenant architecture, billing integration, and enterprise-grade security.",
    solution: "Built scalable SaaS platform with tenant isolation, flexible pricing models, SSO integration, and comprehensive API for third-party integrations.",
    results: [
      "100+ enterprise customers onboarded",
      "99.95% platform availability",
      "SOC 2 Type II certified",
      "$5M ARR achieved in year one"
    ],
    metrics: [
      { label: "Customers", value: "100+" },
      { label: "Availability", value: "99.95%" },
      { label: "Security", value: "SOC 2" },
      { label: "ARR", value: "$5M" }
    ],
    teamSize: "11 engineers",
    duration: "10 months",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "AWS", "Stripe"],
  },
  {
    id: "cs-009",
    title: "DevOps Transformation",
    client: "InnovateLabs",
    year: 2024,
    industry: "Technology",
    workType: "DevOps",
    segment: "Mid-Market",
    thumbnail: "",
    challenge: "Manual deployment processes causing frequent production issues, slow release cycles, and developer frustration.",
    solution: "Implemented CI/CD pipelines, infrastructure-as-code, automated testing, and monitoring with full observability stack.",
    results: [
      "20x increase in deployment frequency",
      "90% reduction in deployment failures",
      "Mean time to recovery reduced to <1 hour",
      "Developer satisfaction score improved 85%"
    ],
    metrics: [
      { label: "Deploy Freq", value: "20x" },
      { label: "Failures", value: "-90%" },
      { label: "MTTR", value: "<1hr" },
      { label: "Dev NPS", value: "+85%" }
    ],
    teamSize: "6 engineers",
    duration: "5 months",
    technologies: ["GitHub Actions", "Terraform", "Kubernetes", "Datadog", "AWS"],
  },

  // Retail
  {
    id: "cs-010",
    title: "E-Commerce Platform Rebuild",
    client: "RetailMax",
    year: 2024,
    industry: "Retail",
    workType: "End to End",
    segment: "Enterprise",
    thumbnail: "",
    challenge: "Aging e-commerce platform couldn't handle Black Friday traffic, resulting in millions in lost sales and damaged brand reputation.",
    solution: "Rebuilt platform using modern headless commerce architecture with CDN optimization, real-time inventory, and AI-powered recommendations.",
    results: [
      "500% traffic capacity increase",
      "Zero downtime during peak season",
      "45% improvement in conversion rate",
      "$200M in online sales (first year)"
    ],
    metrics: [
      { label: "Capacity", value: "5x" },
      { label: "Uptime", value: "100%" },
      { label: "Conversion", value: "+45%" },
      { label: "Revenue", value: "$200M" }
    ],
    teamSize: "18 engineers",
    duration: "14 months",
    technologies: ["Next.js", "Shopify Plus", "AWS", "Algolia", "Stripe"],
    testimonial: {
      quote: "We handled record Black Friday traffic without a single issue. This platform has been transformational for our business.",
      author: "Jennifer Lee",
      title: "Chief eCommerce Officer"
    }
  },

  // Manufacturing
  {
    id: "cs-011",
    title: "IoT Manufacturing Platform",
    client: "Industrial Systems Corp",
    year: 2023,
    industry: "Manufacturing",
    workType: "IoT",
    segment: "Enterprise",
    thumbnail: "",
    challenge: "No visibility into production line performance, leading to unplanned downtime and quality issues.",
    solution: "Deployed IoT sensor network with real-time analytics dashboard, predictive maintenance algorithms, and automated quality control.",
    results: [
      "40% reduction in unplanned downtime",
      "25% improvement in product quality",
      "Predictive maintenance accuracy >90%",
      "$15M annual savings from efficiency gains"
    ],
    metrics: [
      { label: "Downtime", value: "-40%" },
      { label: "Quality", value: "+25%" },
      { label: "Prediction", value: "90%" },
      { label: "Savings", value: "$15M" }
    ],
    teamSize: "13 engineers",
    duration: "11 months",
    technologies: ["AWS IoT", "Python", "TimescaleDB", "React", "Machine Learning"],
  },

  // Government
  {
    id: "cs-012",
    title: "Citizen Services Portal",
    client: "State Department of Services",
    year: 2024,
    industry: "Government",
    workType: "End to End",
    segment: "Public Sector",
    thumbnail: "",
    challenge: "Citizens struggling with complex, fragmented online services across multiple agencies with poor accessibility.",
    solution: "Created unified citizen portal with single sign-on, mobile-responsive design, WCAG 2.1 AA accessibility, and multilingual support.",
    results: [
      "2M citizens registered in first year",
      "75% reduction in call center volume",
      "WCAG 2.1 AA compliant",
      "Available in 7 languages"
    ],
    metrics: [
      { label: "Users", value: "2M" },
      { label: "Call Reduction", value: "75%" },
      { label: "Accessibility", value: "AA" },
      { label: "Languages", value: "7" }
    ],
    teamSize: "16 engineers",
    duration: "13 months",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS GovCloud", "Okta"],
  },

  // Education
  {
    id: "cs-013",
    title: "Learning Management System",
    client: "University Education Network",
    year: 2023,
    industry: "Education",
    workType: "SaaS",
    segment: "Enterprise",
    thumbnail: "",
    challenge: "Remote learning explosion during pandemic revealed limitations of existing LMS, unable to scale or support interactive features.",
    solution: "Built modern LMS with video conferencing integration, real-time collaboration tools, adaptive learning paths, and comprehensive analytics.",
    results: [
      "500K students supported simultaneously",
      "95% student satisfaction rating",
      "60% increase in course completion rates",
      "Deployed across 50 institutions"
    ],
    metrics: [
      { label: "Students", value: "500K" },
      { label: "Satisfaction", value: "95%" },
      { label: "Completion", value: "+60%" },
      { label: "Schools", value: "50" }
    ],
    teamSize: "14 engineers",
    duration: "12 months",
    technologies: ["React", "WebRTC", "Node.js", "MongoDB", "AWS", "Zoom SDK"],
  },

  // More case studies to reach ~150 total
  // (Condensed for brevity - you'd add more following the same pattern)
];

// Helper functions for filtering
export function filterCaseStudies(
  studies: CaseStudy[],
  filters: {
    industries?: string[];
    workTypes?: string[];
    segments?: string[];
    search?: string;
  }
): CaseStudy[] {
  let filtered = [...studies];

  if (filters.industries && filters.industries.length > 0) {
    filtered = filtered.filter(cs => filters.industries!.includes(cs.industry));
  }

  if (filters.workTypes && filters.workTypes.length > 0) {
    filtered = filtered.filter(cs => filters.workTypes!.includes(cs.workType));
  }

  if (filters.segments && filters.segments.length > 0) {
    filtered = filtered.filter(cs => filters.segments!.includes(cs.segment));
  }

  if (filters.search && filters.search.trim()) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(cs =>
      cs.title.toLowerCase().includes(searchLower) ||
      cs.client.toLowerCase().includes(searchLower) ||
      cs.challenge.toLowerCase().includes(searchLower) ||
      cs.solution.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
}

export const availableFilters = {
  industries: Array.from(new Set(caseStudyLibrary.map(cs => cs.industry))).sort(),
  workTypes: Array.from(new Set(caseStudyLibrary.map(cs => cs.workType))).sort(),
  segments: Array.from(new Set(caseStudyLibrary.map(cs => cs.segment))).sort(),
};
