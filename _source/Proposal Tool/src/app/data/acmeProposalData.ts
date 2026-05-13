// Pre-populated data for Acme Corporation proposal - Demo/walkthrough tool

export const acmeProposalData = {
  basics: {
    clientName: "ACME Corporation",
    projectName: "Digital Transformation Initiative",
    industries: ["Technology", "Enterprise Software"],
    workTypes: ["Cloud Migration", "System Modernization"],
    questionsDue: "2026-03-25",
    answersPosted: "2026-03-28",
    submissionDeadline: "2026-04-15",
    discoverySession: true,
    rfpSource: "Direct from client",
    owner: "Sarah Chen",
  },
  scopeOfWork: {
    description: `ACME Corporation is seeking a comprehensive digital transformation partner to modernize their legacy infrastructure and migrate to a cloud-native architecture. This initiative will enable ACME to scale operations, reduce operational costs by 40%, and improve system reliability to 99.9% uptime.

The project encompasses a full-stack transformation including infrastructure migration, application modernization, data pipeline optimization, and implementation of modern DevOps practices. The engagement will span 8 months with a dedicated cross-functional team.`,
    deliverables: `• Complete AWS cloud infrastructure setup with multi-region redundancy
• Migration of 50+ legacy applications to containerized microservices
• Custom analytics dashboard with real-time reporting capabilities
• CI/CD pipeline implementation with automated testing
• Comprehensive staff training program (40+ hours)
• Security audit and compliance documentation (SOC 2, ISO 27001)
• 90-day post-launch support and optimization`,
    technicalRequirements: `• AWS cloud platform (EC2, ECS, RDS, S3, CloudFront)
• Container orchestration with Kubernetes
• Infrastructure as Code using Terraform
• Modern frontend framework (React/Next.js)
• Backend microservices (Node.js, Python)
• PostgreSQL and MongoDB databases
• Redis caching layer
• DataDog monitoring and observability
• GitHub Enterprise for version control
• Automated testing suite (Jest, Cypress)`,
    owner: "David Kim",
  },
  team: {
    projectStartDate: "2026-05-01",
    projectEndDate: "2026-12-31",
    serviceType: "project-based",
    region: "west-coast",
    locationType: "onshore",
    teamMembers: [
      {
        id: "tm-1",
        role: "Project Manager",
        allocationPercent: 100,
        startPercent: 0,
        endPercent: 100,
        payRate: "175",
        billRate: "280",
      },
      {
        id: "tm-2",
        role: "Technical Lead",
        allocationPercent: 100,
        startPercent: 0,
        endPercent: 90,
        payRate: "195",
        billRate: "310",
      },
      {
        id: "tm-3",
        role: "Senior Engineer",
        allocationPercent: 100,
        startPercent: 10,
        endPercent: 100,
        payRate: "185",
        billRate: "295",
      },
      {
        id: "tm-4",
        role: "Senior Engineer",
        allocationPercent: 100,
        startPercent: 10,
        endPercent: 100,
        payRate: "185",
        billRate: "295",
      },
      {
        id: "tm-5",
        role: "DevOps Engineer",
        allocationPercent: 75,
        startPercent: 0,
        endPercent: 100,
        payRate: "165",
        billRate: "265",
      },
      {
        id: "tm-6",
        role: "UX Designer",
        allocationPercent: 50,
        startPercent: 0,
        endPercent: 60,
        payRate: "155",
        billRate: "248",
      },
      {
        id: "tm-7",
        role: "QA Engineer",
        allocationPercent: 75,
        startPercent: 30,
        endPercent: 100,
        payRate: "135",
        billRate: "215",
      },
    ],
    owner: "Sarah Chen",
  },
  pricing: {
    additionalExpenses: [
      {
        id: "exp-1",
        category: "Tools & Software",
        description: "AWS Infrastructure costs (estimated monthly)",
        cost: "12000",
      },
      {
        id: "exp-2",
        category: "Tools & Software",
        description: "Development tools licenses (Jira, GitHub, DataDog)",
        cost: "4500",
      },
      {
        id: "exp-3",
        category: "Travel",
        description: "On-site discovery and kickoff meetings",
        cost: "8000",
      },
      {
        id: "exp-4",
        category: "Insurance",
        description: "Professional liability insurance",
        cost: "5000",
      },
      {
        id: "exp-5",
        category: "Training",
        description: "Staff training materials and certification",
        cost: "6000",
      },
    ],
    owner: "Mike Rodriguez",
  },
  credentials: {
    caseStudyIds: [1, 15, 23], // References to case studies from library
    testimonials: [],
    certifications: `• AWS Advanced Consulting Partner
• Microsoft Gold Partner
• ISO 27001:2013 Certified
• SOC 2 Type II Compliant
• CMMI Level 3 Certified`,
    owner: "Emma Thompson",
  },
  timeline: {
    startDate: "2026-05-01",
    deliveryDate: "2026-12-31",
    keyMilestones: `Phase 1: Discovery & Architecture (Weeks 1-4)
• Requirements gathering and documentation
• Technical architecture design
• Infrastructure planning
• Team onboarding

Phase 2: Foundation & Setup (Weeks 5-12)
• AWS environment provisioning
• CI/CD pipeline setup
• Development environment configuration
• Initial application containerization

Phase 3: Migration & Development (Weeks 13-24)
• Application migration (3 releases)
• Custom dashboard development
• API development and integration
• Security implementation

Phase 4: Testing & Optimization (Weeks 25-28)
• Performance testing and optimization
• Security audit and penetration testing
• Load testing and scaling validation
• Documentation finalization

Phase 5: Launch & Support (Weeks 29-32)
• Production deployment
• Staff training sessions
• Knowledge transfer
• 90-day hyper-care support`,
    owner: "Alex Kumar",
  },
  document: {
    files: [
      {
        name: "ACME_Digital_Transformation_RFP.pdf",
        size: "2.4 MB",
        uploadedDate: "2026-03-10",
      }
    ],
  },
  contentBuilder: {
    sections: [
      {
        id: "1",
        title: "Executive Summary",
        content: "ACME Corporation has requested a comprehensive digital transformation partner to modernize legacy infrastructure and migrate to cloud-native architecture. Experis proposes an 8-month engagement delivering cloud migration, application modernization, and DevOps implementation. Our solution will reduce operational costs by 40%, achieve 99.9% uptime, and position ACME for scalable growth. Total investment of $1,131,000 includes dedicated team, infrastructure setup, and 90-day post-launch support.",
      },
      {
        id: "2",
        title: "Understanding the Challenge",
        content: "ACME Corporation currently operates on legacy systems that limit business agility and scalability. The existing infrastructure is reaching capacity constraints, with systems at 85% utilization creating performance bottlenecks. Data silos across departments prevent unified insights and real-time decision-making. Time-to-market for new features averages 30% slower than industry benchmarks. These challenges require a strategic transformation approach that balances modernization with operational continuity.",
      },
      {
        id: "3",
        title: "Our Proposed Solution",
        content: "Experis will deliver a comprehensive cloud transformation built on AWS infrastructure with multi-region redundancy. We'll migrate 50+ legacy applications to containerized microservices using Kubernetes orchestration, implement modern CI/CD pipelines with automated testing, and build custom analytics dashboards for real-time insights. Our approach emphasizes zero-downtime migration, comprehensive security compliance (SOC 2, ISO 27001), and knowledge transfer to ensure long-term success.",
      },
      {
        id: "4",
        title: "Detailed Scope of Work",
        content: "The engagement encompasses five key workstreams: (1) Cloud Infrastructure - Complete AWS setup with EC2, ECS, RDS, S3, and CloudFront; (2) Application Modernization - Container migration and microservices architecture; (3) DevOps Implementation - CI/CD pipelines, automated testing, and infrastructure as code; (4) Data & Analytics - Real-time dashboards and optimized data pipelines; (5) Training & Support - 40+ hours of staff training and 90-day hyper-care support period.",
      },
      {
        id: "5",
        title: "Project Timeline & Milestones",
        content: "The 8-month project begins May 1, 2026 with completion targeted for December 31, 2026. Phase 1 (Weeks 1-4): Discovery and architecture design. Phase 2 (Weeks 5-12): Foundation setup and environment provisioning. Phase 3 (Weeks 13-24): Core migration and development with three major releases. Phase 4 (Weeks 25-28): Comprehensive testing, security audit, and optimization. Phase 5 (Weeks 29-32): Production deployment, training, and support transition. Weekly status reports and bi-weekly stakeholder reviews ensure full transparency.",
      },
      {
        id: "6",
        title: "Investment & Pricing",
        content: "Total project investment: $1,131,000. This includes team costs ($850,000), hardware and infrastructure ($57,000), and other project expenses ($35,500), with a 20% margin applied. Payment structure: 25% upon contract signing, 50% distributed across milestone completions, and 25% upon successful production launch. All pricing includes 90-day warranty period. Optional extended support available at $15,000/month.",
      },
      {
        id: "7",
        title: "Your Dedicated Team",
        content: "Your project will be led by Sarah Chen (Project Manager, 15+ years enterprise transformation experience), supported by a Technical Lead with AWS certifications, two Senior Engineers specializing in cloud architecture, a DevOps Engineer for infrastructure automation, a UX Designer for dashboard development, and a QA Engineer ensuring quality. The team operates from our West Coast office with full onshore delivery. Average team experience exceeds 10 years in enterprise cloud migrations.",
      },
      {
        id: "8",
        title: "Proven Track Record",
        content: "Experis has successfully delivered similar transformations for leading enterprises. Recent engagements include: Enterprise Cloud Migration for Fortune 500 Tech Co ($2.5M value) achieving 60% infrastructure cost reduction; Healthcare System Modernization for Regional Health Network ($3.2M) improving patient data access by 45%; Financial Services Platform for National Bank ($4.1M) processing 2M+ transactions daily. All projects delivered on-time and within budget with client satisfaction scores exceeding 9/10.",
      },
      {
        id: "9",
        title: "Security & Compliance",
        content: "Experis maintains SOC 2 Type II, ISO 27001:2013, and CMMI Level 3 certifications. We're an AWS Advanced Consulting Partner and Microsoft Gold Partner. Our security framework includes end-to-end encryption, regular penetration testing, secure SDLC practices, and comprehensive audit trails. All team members undergo annual security training and background checks. We ensure full compliance with GDPR, CCPA, and industry-specific regulations relevant to your operations.",
      },
      {
        id: "10",
        title: "RFP Requirements Response",
        content: "Methodology: Agile with 2-week sprints and daily standups. Migration Strategy: Phased approach with canary deployments and automated rollback capabilities ensuring zero downtime. Data Security: AES-256 encryption at rest and TLS 1.3 in transit, with comprehensive backup and disaster recovery. Post-Launch Support: 90-day hyper-care with 24/7 incident response, followed by optional managed services. Change Management: Formal change request process with impact assessment and mutual approval requirements.",
      },
      {
        id: "11",
        title: "Next Steps",
        content: "We recommend scheduling a 90-minute alignment call within the next week to review technical details, discuss team composition, and finalize project governance. Following approval, we can begin onboarding activities immediately with a target start date of May 1, 2026. Initial deliverables include detailed project plan, communication protocols, and risk mitigation strategy. Contact Sarah Chen at sarah.chen@experis.com or (555) 123-4567 to move forward. We're excited to partner with ACME Corporation on this transformation journey.",
      },
    ],
  },
};