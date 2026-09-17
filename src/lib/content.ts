/**
 * Placeholder content for programs, insights and focus areas.
 * Replace with real curriculum / editorial content before launch —
 * nothing here is a fabricated claim (no stats, partners or outcomes),
 * it is structural placeholder copy only.
 */

export type Course = {
  slug: string;
  name: string;
  level: "Foundation" | "Intermediate" | "Advanced";
  duration: string;
  domain: string;
  summary: string;
  outline: string[];
};

export const featuredCourse: Course = {
  slug: "digital-payments-foundations",
  name: "Digital Payments Foundations",
  level: "Foundation",
  duration: "6 weeks",
  domain: "Payments & Digital Finance",
  summary:
    "How UPI, wallets and card rails actually move money — and how to reason about risk, cost and reliability in a payment system.",
  outline: [
    "Payment rails and settlement in the Indian context",
    "UPI architecture and interoperability",
    "Fraud, risk and reconciliation basics",
    "Applied project: mapping a real payment flow",
  ],
};

export const courses: Course[] = [
  {
    slug: "financial-literacy-foundations",
    name: "Financial Literacy Foundations",
    level: "Foundation",
    duration: "4 weeks",
    domain: "Financial Inclusion",
    summary:
      "Core personal finance and digital-money concepts for first-time learners.",
    outline: [
      "Savings, credit and digital banking basics",
      "Reading a bank and UPI statement",
      "Recognising fraud and scams",
      "Building a personal financial plan",
    ],
  },
  {
    slug: "open-banking-and-apis",
    name: "Open Banking & APIs",
    level: "Intermediate",
    duration: "8 weeks",
    domain: "Open Finance",
    summary:
      "Account Aggregator, consent architecture and the API layer connecting India's financial system.",
    outline: [
      "Consent-based data sharing models",
      "Account Aggregator ecosystem",
      "API security fundamentals",
      "Applied project: a consent-flow prototype",
    ],
  },
  {
    slug: "regtech-and-compliance",
    name: "RegTech & Compliance",
    level: "Intermediate",
    duration: "6 weeks",
    domain: "Regulation & Risk",
    summary:
      "How compliance, KYC and reporting are increasingly automated across financial institutions.",
    outline: [
      "KYC/AML fundamentals",
      "Regulatory reporting automation",
      "Compliance-by-design principles",
      "Case study: a RegTech implementation",
    ],
  },
  {
    slug: "digital-lending-analytics",
    name: "Digital Lending & Credit Analytics",
    level: "Advanced",
    duration: "8 weeks",
    domain: "Lending & Credit",
    summary:
      "Alternate credit scoring, underwriting models and the mechanics of digital lending platforms.",
    outline: [
      "Alternate data and credit scoring",
      "Underwriting model fundamentals",
      "Portfolio risk and collections",
      "Applied project: a scoring model walkthrough",
    ],
  },
  {
    slug: "cybersecurity-in-finance",
    name: "Cybersecurity in Finance",
    level: "Advanced",
    duration: "6 weeks",
    domain: "Security & Trust",
    summary:
      "Threat models specific to financial systems, and the controls that keep digital finance trustworthy.",
    outline: [
      "Threat modelling for financial platforms",
      "Authentication and fraud controls",
      "Incident response fundamentals",
      "Case study: a real-world breach, dissected",
    ],
  },
];

export const focusAreas = [
  {
    key: "payments",
    title: "Digital Payments",
    description:
      "UPI, wallets, card networks and the settlement systems moving India's money.",
  },
  {
    key: "inclusion",
    title: "Financial Inclusion",
    description:
      "Literacy and access programs that bring underserved communities into the formal financial system.",
  },
  {
    key: "open-finance",
    title: "Open Banking",
    description:
      "Consent-based data sharing, Account Aggregator and the API layer of modern finance.",
  },
  {
    key: "lending",
    title: "Digital Lending",
    description:
      "Alternate credit data, underwriting and the platforms reshaping access to credit.",
  },
  {
    key: "regtech",
    title: "RegTech",
    description:
      "Compliance, KYC and regulatory reporting, increasingly automated at scale.",
  },
  {
    key: "security",
    title: "Security & Trust",
    description:
      "The controls, standards and habits that keep digital finance safe to use.",
  },
];

export const learningStages = [
  {
    step: "01",
    title: "Discover",
    description: "Understand the system before the tool — how digital finance actually works.",
  },
  {
    step: "02",
    title: "Build",
    description: "Work through applied exercises modelled on real financial workflows.",
  },
  {
    step: "03",
    title: "Apply",
    description: "Complete a project using real data and real constraints.",
  },
  {
    step: "04",
    title: "Lead",
    description: "Carry the capability into your workplace or community.",
  },
];

export const learningExperience = [
  {
    title: "Practitioner-led sessions",
    description: "Taught by people who work in payments, banking and financial technology.",
  },
  {
    title: "Applied projects",
    description: "Every course ends with something built, not just watched.",
  },
  {
    title: "India-specific context",
    description: "UPI, Aadhaar, Account Aggregator — the rails learners will actually use.",
  },
  {
    title: "Case-based learning",
    description: "Real systems and real failures, examined in detail.",
  },
];

export type Insight = {
  slug: string;
  title: string;
  category: "FinTech" | "Financial Inclusion" | "Policy" | "Technology";
  date: string;
  excerpt: string;
};

export const insights: Insight[] = [
  {
    slug: "upi-decade",
    title: "What a decade of UPI teaches about designing for scale",
    category: "FinTech",
    date: "2026-08-14",
    excerpt:
      "Interoperability, not novelty, is what made India's payment rail work at population scale.",
  },
  {
    slug: "account-aggregator-explained",
    title: "The Account Aggregator framework, explained without the jargon",
    category: "Policy",
    date: "2026-07-02",
    excerpt:
      "A plain-language walkthrough of how consent-based data sharing actually moves between institutions.",
  },
  {
    slug: "credit-for-the-new-to-credit",
    title: "Building credit models for people with no credit history",
    category: "Financial Inclusion",
    date: "2026-06-19",
    excerpt:
      "Alternate data sources are only useful if the model built on them is honest about its limits.",
  },
  {
    slug: "securing-the-last-mile",
    title: "Securing the last mile of digital payments",
    category: "Technology",
    date: "2026-05-08",
    excerpt:
      "Most fraud in digital finance happens at the edges of the system, not the core.",
  },
];
