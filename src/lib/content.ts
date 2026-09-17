/**
 * Site content. Programme names, descriptions and learning levels come from
 * the Foundation's own copy. Nothing here asserts statistics, partnerships,
 * endorsements or outcomes that have not been supplied.
 */

export const EXTERNAL = {
  catalogue: "https://intellimindz.in/Products",
  courses: "https://intellimindz.in/courses",
};

/* --- What the Foundation does --------------------------------- */

export const pillars = [
  {
    title: "FinTech Education",
    description:
      "Industry-relevant learning across digital payments, AI, data, cybersecurity and regulation.",
  },
  {
    title: "Financial Inclusion",
    description:
      "Digital financial literacy that lets learners and communities participate confidently in finance.",
  },
  {
    title: "Future-ready Skills",
    description:
      "Job-ready capability for students, professionals, educators, entrepreneurs and public-sector teams.",
  },
  {
    title: "Nation Building",
    description:
      "An innovative, inclusive and self-reliant digital economy, built through knowledge and partnerships.",
  },
];

/* --- National alignment ---------------------------------------- */

/**
 * `logo` points at a mark in /public/images. These are third-party and
 * government marks shown to indicate thematic alignment only — see
 * ALIGNMENT_DISCLAIMER, which must stay rendered alongside them.
 */
export const initiatives = [
  {
    name: "Digital India",
    logo: "/images/digital-india.png",
    description:
      "Digital empowerment, accessible knowledge and participation in the digital economy.",
  },
  {
    name: "Digital Finance",
    logo: "/images/digital-finance.png",
    description: "Understanding of digital payments, financial technology, trust and inclusion.",
  },
  {
    name: "Skill India",
    logo: "/images/skill-india.png",
    description:
      "Practical, future-ready capability for employability, professional growth and lifelong learning.",
  },
  {
    name: "Startup India",
    logo: "/images/startup-india.png",
    description:
      "Innovation, entrepreneurship and a stronger pipeline of FinTech talent and problem-solvers.",
  },
  {
    name: "Atmanirbhar Bharat",
    logo: "/images/atmanirbhar-bharat.png",
    description:
      "Domestic capability, digital resilience and self-reliance through education and innovation.",
  },
];

export const alignmentPoints = [
  "Bridging the digital divide through accessible education",
  "Collaborating with academia, industry and ecosystem partners",
  "Driving measurable learning and community impact",
  "Building a financially aware, inclusive and empowered India",
];

export const ALIGNMENT_DISCLAIMER =
  "References to national initiatives indicate thematic alignment with their publicly stated objectives and do not imply Government endorsement, accreditation or formal partnership.";

/* --- Learning domains ------------------------------------------ */

export type Domain = {
  slug: string;
  name: string;
  short: string;
  description: string;
  topics: string[];
};

export const domains: Domain[] = [
  {
    slug: "fintech-core",
    name: "FinTech Core",
    short: "Foundations",
    description: "Digital finance, open banking, neo-banking and FinTech business models.",
    topics: ["Digital finance models", "Open banking", "Neo-banking", "Business models"],
  },
  {
    slug: "digital-payments",
    name: "Digital Payments",
    short: "Payments",
    description: "UPI, India Stack, CBDCs, account aggregators and payment infrastructure.",
    topics: ["UPI & India Stack", "CBDC", "Account Aggregator", "Payment infrastructure"],
  },
  {
    slug: "ai-in-finance",
    name: "AI in Finance",
    short: "AI",
    description: "AI, ML and GenAI for credit, risk, fraud detection and decision-making.",
    topics: ["Credit scoring", "Risk modelling", "Fraud detection", "GenAI applications"],
  },
  {
    slug: "data-science-in-finance",
    name: "Data Science in Finance",
    short: "Data",
    description: "Financial analytics, predictive modelling and decision intelligence.",
    topics: ["Financial analytics", "Predictive models", "Decision intelligence", "Visualisation"],
  },
  {
    slug: "cybersecurity-in-finance",
    name: "Cybersecurity in Finance",
    short: "Security",
    description: "Digital trust, identity security, fraud prevention and secure systems.",
    topics: ["Digital trust", "Identity security", "Fraud prevention", "Secure architecture"],
  },
  {
    slug: "regtech-suptech",
    name: "RegTech / SupTech",
    short: "Regulation",
    description: "Compliance automation, KYC, monitoring and governance systems.",
    topics: ["Compliance automation", "KYC & AML", "Monitoring", "Governance"],
  },
  {
    slug: "blockchain-dlt",
    name: "Blockchain & DLT",
    short: "Blockchain",
    description: "Blockchain, smart contracts, tokenisation, CBDCs and enterprise DLT.",
    topics: ["Smart contracts", "Tokenisation", "CBDC rails", "Enterprise DLT"],
  },
  {
    slug: "sustainable-finance",
    name: "Sustainable Finance",
    short: "Sustainability",
    description: "Climate finance, green FinTech, ESG and financial inclusion.",
    topics: ["Climate finance", "Green FinTech", "ESG reporting", "Inclusive finance"],
  },
  {
    slug: "insurtech",
    name: "InsurTech",
    short: "Insurance",
    description: "Digital insurance distribution, underwriting technology and claims automation.",
    topics: ["Digital distribution", "Underwriting tech", "Claims automation", "Embedded cover"],
  },
  {
    slug: "wealthtech",
    name: "WealthTech",
    short: "Wealth",
    description: "Digital investing, advisory platforms and retail participation in markets.",
    topics: ["Digital investing", "Advisory platforms", "Portfolio tools", "Retail markets"],
  },
];

/* --- Learning ladder -------------------------------------------- */

export const levels = [
  {
    step: "01",
    name: "Discovery",
    hours: "1–5 hours",
    outcome: "Awareness and quick exposure",
    audience: "Curious starters",
  },
  {
    step: "02",
    name: "Fluency",
    hours: "3–10 hours",
    outcome: "Conceptual vocabulary and confidence",
    audience: "Cross-functional learners",
  },
  {
    step: "03",
    name: "Beginner",
    hours: "8–20 hours",
    outcome: "Foundational skill development",
    audience: "Students and early professionals",
  },
  {
    step: "04",
    name: "Intermediate",
    hours: "15–40 hours",
    outcome: "Applied tools and role readiness",
    audience: "Working professionals",
  },
  {
    step: "05",
    name: "Advanced",
    hours: "30+ hours",
    outcome: "Deep specialisation and leadership",
    audience: "Specialists and decision-makers",
  },
];

export const catalogueHighlights = [
  "8 FinTech domains",
  "Discovery to Advanced levels",
  "Free & Paid programmes",
  "Self-paced, Live & Hybrid",
];

/* --- Support --------------------------------------------------- */

export const supportPoints = [
  "Section 80G eligible",
  "Transparent fund allocation",
  "Secure contribution process",
];

export const DONATION_DISCLAIMER =
  "Donations are eligible for tax exemption under Section 80G, subject to applicable provisions.";

/* --- Who learns with us ---------------------------------------- */

export const audiences = [
  "Students",
  "Working professionals",
  "Educators",
  "Entrepreneurs",
  "Public-sector stakeholders",
  "Community learners",
];

export const formats = [
  {
    name: "Self-paced",
    description: "Learn on your own schedule, with lifetime access to the material.",
  },
  {
    name: "Live",
    description: "Scheduled sessions with practitioners, questions answered in the room.",
  },
  {
    name: "Hybrid",
    description: "Self-paced foundations paired with live applied workshops.",
  },
];

/* --- Insights (placeholder editorial — replace before launch) --- */

export type Insight = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
};

export const insights: Insight[] = [
  {
    slug: "upi-at-scale",
    title: "What UPI teaches about building for a billion people",
    category: "Digital Payments",
    date: "2026-08-14",
    excerpt:
      "Interoperability, not novelty, is what made India's payment rail work at population scale.",
  },
  {
    slug: "account-aggregator-explained",
    title: "The Account Aggregator framework, without the jargon",
    category: "Open Finance",
    date: "2026-07-02",
    excerpt:
      "A plain-language walkthrough of how consent-based data sharing moves between institutions.",
  },
  {
    slug: "ai-credit-decisions",
    title: "When a model decides who gets credit",
    category: "AI in Finance",
    date: "2026-06-19",
    excerpt: "Alternate data is only useful if the model built on it is honest about its limits.",
  },
];
