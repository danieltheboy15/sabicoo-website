import insightBottlenecksImg from '../assets/images/insight_bottlenecks_1795714618250.jpg';
import insightStructureImg from '../assets/images/insight_business_structure_1795714618389.jpg';
import insightCashImg from '../assets/images/insight_cash_forecasts_1795714619678.jpg';
import insightDelegationImg from '../assets/images/insight_delegation_systems_1795714619665.jpg';
import insightSopImg from '../assets/images/insight_sop_execution_1795714620546.jpg';
import insightScorecardsImg from '../assets/images/insight_scorecards_metrics_1795714620589.jpg';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  audience: string;
  description: string;
  deliverables: string[];
  typicalDuration: string;
  highlightMetric: string;
  iconUrl: string;
}

export interface CaseStudyItem {
  id: string;
  tag: string;
  title: string;
  clientType: string;
  summary: string;
  challenge: string;
  intervention: string;
  results: { label: string; value: string }[];
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  tag: string;
  bio: string;
  image: string;
  linkedin: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  signatureSvg: string;
  metric: string;
  metricLabel: string;
}

export interface InsightSectionBlock {
  heading: string;
  paragraphs: string[];
}

export interface BlogItem {
  id: string;
  tag: string;
  title: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  authorRole: string;
  pullQuote: string;
  keyTakeaways: string[];
  sections: InsightSectionBlock[];
}

export type InsightItem = BlogItem;

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface ScreenerOption {
  label: string;
  points: {
    founder: number;
    ops: number;
    cash: number;
    people: number;
  };
  strengths?: {
    founder: number;
    ops: number;
    cash: number;
    people: number;
  };
  tone?: 'positive' | 'balanced' | 'challenge';
}

export interface ScreenerQuestion {
  id: number;
  question: string;
  category: string;
  options: ScreenerOption[];
}

export const BRAND_ASSETS = {
  logo: "https://res.cloudinary.com/dpsvazol5/image/upload/v1792270703/Sabi_Coo.-bpng-removebg-preview_baebtj.png",
  icon: "https://res.cloudinary.com/dpsvazol5/image/upload/v1792319441/Image_18-10-2026_at_11.28_AM-removebg-preview_nmchoa.png",
  star: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69dfe435aa2deacdaa3b0bce_star.svg",
  heroGalleryMain: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ea62947d12bb957b259552_hero%20gallary.webp",
  heroHeartIcon: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ea6366a93fe30d2f2e64f1_hero%20icon%20(4).svg",
  heroBadgeIcon1: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ea6366fa9f402da000f4e6_hero%20icon%20(3).svg",
  heroBadgeIcon2: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ea63661d55c06727a7af8d_hero%20icon%20(2).svg",
  heroBadgeIcon3: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ea63663b43bdef1df6d55e_hero%20icon%20(5).svg",
  heroBadgeIcon4: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ea6366278e96b9395a6155_hero%20icon%20(6).svg",
  heroFeatureIcon: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ea6366637bfc8cf0198477_hero%20icon%20(1).svg",
  circlePattern: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69df3041a35f452a3b7992c0_circle.webp",
  faq3dToys: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69dcd6033c23fe9a7181768f_two-3d-toys-sitting-with-happy-and-joy--it-signs-w%201%20(1).png",
  cardProfile: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ec9770281865cf2d934a3e_card%20profile.webp",
  contentCard1: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ebcd350532a1b1ae50f3ef_contentncard%20(1).webp",
  contentCard2: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ebcd3589ff8578edf2249d_contentncard%20(2).webp",
  contentCard3: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ebcd35ab5200a9522e2b07_contentncard%20(3).webp",
  checkIconGreen: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69e9ba23619ef9debe59f9dd_check%20(1).svg",
  checkIconDark: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69e9bc8a3316db6aef4347ae_check%20(2).svg",
  arrowCircle: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69e9b6ddcac592fd97721841_arrow-left%20(5).svg",
  navImg: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ddff8f6266c346f344fee8_Nav%20Img.webp"
};

export const PARTNER_LOGOS = [
  { name: "Kora Logistics", icon: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69dfe6ffb22b3422ff221dc5_partner%20logo%20(40).svg" },
  { name: "VentureScale Africa", icon: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69dfe6fe34a6b87223368ac0_partner%20logo%20(44).svg" },
  { name: "Apex Commercial", icon: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69dfe6fe3fa19c7a9b2f05d3_partner%20logo%20(43).svg" },
  { name: "Moneta Labs", icon: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69dfe6fe979b5271f50bb634_partner%20logo%20(42).svg" },
  { name: "Eden Retail Group", icon: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69dfe6ff26a68a5599de8e65_partner%20logo%20(41).svg" }
];

export const STATS_DATA = [
  {
    value: "₦0 - ₦100M",
    label: "Target Revenue Window",
    subtext: "Where operational friction threatens momentum",
    highlight: "Stage"
  },
  {
    value: "6 - 12 Wks",
    label: "Milestone Transformation",
    subtext: "From forensic audit to autonomous team handoff",
    highlight: "Speed"
  },
  {
    value: "100%",
    label: "Senior Operator-Led",
    subtext: "Zero junior analysts, zero 80-page slide deck fluff",
    highlight: "Execution"
  }
];

export const COMPARISON_OPTIONS = [
  {
    number: "OPTION 01",
    type: "TRADITIONAL CONSULTING",
    title: "Tier-1 Corporate Advisory",
    priceTag: "₦30M - ₦60M",
    description: "They send junior analysts who have never run a warehouse or closed payroll in Nigeria. They deliver an 80-page PowerPoint slide deck and leave the founder to figure out actual execution alone.",
    result: "RESULT: Expensive slides, zero operational change.",
    isPrimary: false
  },
  {
    number: "OPTION 02",
    type: "DIRECT FULL-TIME HIRE",
    title: "Hiring Full-Time Senior COO",
    priceTag: "₦2.5M - ₦3.5M / mo + Equity",
    description: "A business doing ₦30m-₦60m cannot support that ongoing payroll overhead. Hiring a junior ops manager simply adds another employee the exhausted founder has to micromanage daily.",
    result: "RESULT: Heavy burn, mismatched capabilities.",
    isPrimary: false
  },
  {
    number: "THE SABI COO MODEL",
    type: "SURGICAL OPERATOR PARTNERSHIP",
    title: "Surgical, Milestone Execution",
    priceTag: "Fixed Scope Deliverables",
    description: "We diagnose problems forensically. We don't deliver slide decks; we physically write the SOPs, configure software, install dashboards, and train your staff.",
    result: "RESULT: Autonomous machinery built in 6-12 weeks.",
    isPrimary: true
  }
];

export const ENGAGEMENT_TRACKS = {
  tier1: {
    id: "tier-1",
    tag: "TRACK 01 // PRIMARY REVENUE PRODUCT",
    badge: "FIXED-FEE ENGAGEMENT",
    title: "Tier 1 — Fixed-Fee Engagement",
    subtitle: "A structured engagement for businesses that need operational and organisational build. Delivered over 3, 6, 9, or 12 months. Priced at a fixed fee with a % paid upfront and the remainder invoiced at the midpoint or on agreed milestones. This is SabiCOO's primary revenue product.",
    targetRevenue: "Established businesses with active operations",
    profile: "Businesses and leadership teams that require a comprehensive operational and organisational build. Designed for companies ready for a structured 3, 6, 9, or 12-month build to transition from ad-hoc management to autonomous systems.",
    duration: "Delivered over 3, 6, 9, or 12 Months",
    deliverables: [
      "A complete audit of what is slowing your business down, with a clear step-by-step fix",
      "Simple, step-by-step operating guides (SOPs) so daily work gets done smoothly",
      "Easy-to-read scorecards and live dashboards to track your key numbers at a glance",
      "Clear team structure, job roles, and delegation rules so everyone knows who does what",
      "Hands-on training for your managers and staff so the business runs without you"
    ],
    pricingModel: "Priced at a fixed fee with a % paid upfront and remainder invoiced at the midpoint or on agreed milestones",
    disqualifier: "Early-stage concepts, unvalidated ideas, or ventures seeking equity-only / co-building arrangements (explore Tier 2 Partner Track). Not for companies looking for passive slide decks or hourly staffing."
  },
  tier2: {
    id: "tier-2",
    tag: "TRACK 02 // PARTNER TRACK",
    badge: "PARTNER TRACK",
    title: "Tier 2 — Partner Track",
    subtitle: "Reserved for pre-revenue or very early-stage businesses where cash is constrained but the opportunity is strong. SabiCo takes equity or a revenue share arrangement in exchange for equivalent engagement depth as Tier 1.",
    targetRevenue: "Pre-revenue or very early-stage businesses",
    profile: "Reserved for pre-revenue or very early-stage businesses where cash is constrained but the opportunity is strong.",
    duration: "Selective Cohort",
    deliverables: [
      "A complete audit of what is slowing your business down, with a clear step-by-step fix",
      "Simple, step-by-step operating guides (SOPs) so daily work gets done smoothly",
      "Easy-to-read scorecards and live dashboards to track your key numbers at a glance",
      "Clear team structure, job roles, and delegation rules so everyone knows who does what",
      "Hands-on training for your managers and staff so the business runs without you"
    ],
    pricingModel: "Equity or a revenue share arrangement",
    disqualifier: ""
  }
};

export const SERVICES_MANDATES: ServiceItem[] = [
  {
    id: "consulting-projects",
    number: "01",
    title: "Consulting Projects",
    subtitle: "Standalone advisory or operational diagnostic work",
    audience: "CEOs, Managing Directors, Leadership Teams",
    description: "A business brings us in for a specific strategic question, operational breakdown, or inflection challenge that demands a rigorous, structured answer. We conduct data gathering, root-cause modeling, and deliver actionable execution architecture.",
    deliverables: [
      "Targeted operational diagnostic report",
      "Root-cause and bottleneck analysis",
      "Prioritized remediation roadmap with milestone owners"
    ],
    typicalDuration: "4 to 8 Weeks",
    highlightMetric: "Defined Problem → Rigorous Solution",
    iconUrl: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69e74ab2df2fdb370e3cb431_icon%20(68).svg"
  },
  {
    id: "benchmarking-studies",
    number: "02",
    title: "Benchmarking Studies",
    subtitle: "Empirical compensation, operational, or market data",
    audience: "HR Leaders, Remuneration Committees, Business Owners",
    description: "Compensation, operational efficiency, or market benchmarking with full primary research, local market data, and comprehensive report output. Built specifically for leaders who need defensible data, not subjective opinion.",
    deliverables: [
      "Comprehensive market salary & benefits dataset",
      "Operational headcount & productivity metrics",
      "Defensible board-ready benchmark publication"
    ],
    typicalDuration: "3 to 6 Weeks",
    highlightMetric: "Hard Market Data, Zero Speculation",
    iconUrl: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ec9563573e8ad5871fa4e8_ICon%20(80).svg"
  },
  {
    id: "bpo-management",
    number: "03",
    title: "Business Process Outsourcing",
    subtitle: "Full operational management of business functions",
    audience: "CFOs, HR Directors, Rapidly Scaling Enterprises",
    description: "Sabi COO assumes end-to-end operational management of a defined business function on an ongoing basis. We eliminate internal management overhead while enforcing institutional accuracy and compliance.",
    deliverables: [
      "Payroll administration & statutory compliance",
      "Full-cycle HR operations and onboarding management",
      "Monthly regulatory reporting, audits, and reconciliation"
    ],
    typicalDuration: "Ongoing SLA Contract",
    highlightMetric: "Zero Overhead, Institutional Compliance",
    iconUrl: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ec95637c7bf286da21cbf8_ICon%20(79).svg"
  },
  {
    id: "strategic-advisory",
    number: "04",
    title: "Strategic Advisory",
    subtitle: "Senior executive presence in board & leadership forums",
    audience: "Boards of Directors, Advisory Panels, Venture Partners",
    description: "A named senior Sabi COO advisor attends quarterly board sessions, partner meetings, and executive growth reviews on a retainer or per-session basis to provide objective operational governance and strategic steering.",
    deliverables: [
      "Board meeting preparation and operational audit review",
      "Active participation in executive strategy sessions",
      "Quarterly operational risk & growth assessments"
    ],
    typicalDuration: "Per Session or Annual Retainer",
    highlightMetric: "Independent Executive Stewardship",
    iconUrl: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ec9563bebfc9ed2233bdea_ICon%20(78).svg"
  },
  {
    id: "organisational-reviews",
    number: "05",
    title: "Organisational Reviews",
    subtitle: "Structured assessment of team structure & role clarity",
    audience: "Heads of People, Founders, Managing Partners",
    description: "A structured assessment of team structure, pay architecture, role clarity, or operational design. Delivered with formal written findings, proposed org reorganizations, and governance safeguards.",
    deliverables: [
      "Organizational hierarchy & reporting lines audit",
      "Compensation bands and pay equity architecture",
      "RACI clarity framework and written reorganization plan"
    ],
    typicalDuration: "4 to 6 Weeks",
    highlightMetric: "Role Clarity & Zero Structural Waste",
    iconUrl: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ec9563f083a386698cba95_ICon%20(77).svg"
  },
  {
    id: "special-projects",
    number: "06",
    title: "Special Projects",
    subtitle: "Custom, high-stakes deliverables outside standard categories",
    audience: "Enterprise Executives, Institutional Task Forces",
    description: "Any well-scoped, critical operational deliverable that does not fit neatly into conventional advisory categories. If the deliverable is clear, the problem is real, and the outcome is measurable, our senior team will evaluate and execute.",
    deliverables: [
      "Custom scoping document with strict acceptance criteria",
      "Dedicated project governance team",
      "Executive handover upon milestone completion"
    ],
    typicalDuration: "Determined by Scope",
    highlightMetric: "Senior Execution on Complex Mandates",
    iconUrl: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ec9563999454cd5a260cd5_ICon%20(76).svg"
  }
];

export const METHODOLOGY_STEPS = [
  {
    number: "01",
    name: "Business Intake & Discovery",
    summary: "Getting to know your business",
    details: "We start by understanding how your business operates, what it offers, and what you’re looking to achieve."
  },
  {
    number: "02",
    name: "Business Diagnostic & Mapping",
    summary: "Understanding how your business really works",
    details: "We examine daily operations, team workflows, and root causes to identify bottlenecks and build a prioritised action plan."
  },
  {
    number: "03",
    name: "Build",
    summary: "Deploying playbooks, software & dashboards",
    details: "We physically draft SOPs, build live 13-week cash models, configure workflow tools, and run staff drills."
  },
  {
    number: "04",
    name: "Handover",
    summary: "Leadership independence & governance sign-off",
    details: "Your company runs on defined systems rather than founder adrenaline."
  }
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "operational-chaos-structure",
    tag: "Logistics & Distribution",
    title: "From Operational Chaos to Scalable Structure",
    clientType: "₦75M ARR Distribution Company",
    summary: "Eliminated a 48-hour founder bottleneck by standardizing inventory fulfillment into autonomous frontline SOPs.",
    challenge: "The founder spent 70% of every day answering WhatsApp escalations regarding misplaced stock, late truck dispatches, and manual invoice corrections.",
    intervention: "Sabi COO embedded for 8 weeks: engineered barcode-linked SOPs, re-trained warehouse dispatchers, and automated discrepancy alerts.",
    results: [
      { label: "Founder Triage Time", value: "-85%" },
      { label: "On-Time Dispatch SLA", value: "99.4%" },
      { label: "Weekly Hours Saved", value: "32 hrs" }
    ],
    image: "https://cdn.prod.website-files.com/69e85301666fcbb8eabb712b/69e8530e8a0851de6e7200e3_frame_40.webp"
  },
  {
    id: "cash-flow-margin-recovery",
    tag: "B2B Tech & Services",
    title: "Strengthening Cash Flow, Reducing Payroll Bleed",
    clientType: "₦120M Multi-Market Agency",
    summary: "Restructured broken invoicing cadences and installed a rolling 13-week cash flow engine that recovered ₦18.4M in trapped capital.",
    challenge: "Profitable on paper, yet every end-of-month payroll caused panic. Receivables sat past 75 days while subcontractor costs drained liquidity.",
    intervention: "Installed a rigorous milestone billing trigger, deployed automated receivable reminders, and tied project margins to PM compensation.",
    results: [
      { label: "Trapped Cash Recovered", value: "₦18.4M" },
      { label: "DSO Reduced By", value: "41 Days" },
      { label: "Gross Margin Lift", value: "+18%" }
    ],
    image: "https://cdn.prod.website-files.com/69e85301666fcbb8eabb712b/69e85a9a66f7944f334b716b_frame_40%20(1).webp"
  },
  {
    id: "strategic-realignment-scale",
    tag: "Multi-Unit Retail",
    title: "Unlocking Growth Via Strategic Realignment",
    clientType: "5-Store FMCG Retail Brand",
    summary: "Rebuilt store manager accountability matrices and unit-level procurement, enabling a 6th flagship store opening without founder presence.",
    challenge: "Founder could not open more branches because store managers lacked authority, causing stock shrinkage and inconsistent customer experiences.",
    intervention: "Engineered branch operational manuals, daily opening/closing check registers, and weekly store-level P&L reviews with store leads.",
    results: [
      { label: "Inventory Shrinkage", value: "-92%" },
      { label: "New Store Launch Time", value: "3 Wks" },
      { label: "Management Autonomy", value: "100%" }
    ],
    image: "https://cdn.prod.website-files.com/69e85301666fcbb8eabb712b/69e85ae566e6624f7f5247be_frame_40%20(2).webp"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Jaylon Culhane",
    role: "Lead Operations Architect",
    tag: "Systems & Scaling",
    bio: "Former Head of Operations across two high-growth West African ventures. Specializes in dissecting complex workflow bottlenecks and architecting autonomous SOPs.",
    image: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ec83b9f71e0e1c69234748_ellipse_3.webp",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Brandon Bergson",
    role: "Financial & Cash Flow Engineer",
    tag: "Treasury & Forecasting",
    bio: "Ex-CFO advisor with deep expertise in 13-week rolling cash forecasts, unit economics modeling, and debt-free working capital optimization for SMEs.",
    image: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ec83b9a080de8aa309b63a_ellipse_4.webp",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Sarah Alabi",
    role: "People Ops & Governance Lead",
    tag: "Org Structure & RACI",
    bio: "Senior People Operations partner. Designed compensation architectures and role clarity matrices for teams scaling from 10 to 150 employees.",
    image: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ec83b95047ad2e64fea8bc_ellipse_5.webp",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Ahmad George",
    role: "Workflow & Tech Stack Automation",
    tag: "Software & Integrations",
    bio: "Full-stack business systems engineer who transforms disconnected spreadsheets into streamlined, automated operational dashboards and CRM workflows.",
    image: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69ec83b957818795fe1c65d7_ellipse_6.webp",
    linkedin: "https://linkedin.com"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "Sabi COO brought clinical clarity to our entire business machinery. What felt like an overwhelming daily emergency before became a clean, repeatable machine.",
    author: "Tunde Balogun",
    role: "Co-Founder & CEO",
    company: "OmniLogistics Hub",
    avatar: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69eca375a5582f6a7dc6cf51_testimonial%20(2).webp",
    signatureSvg: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69eca37541e967840e0763a2_testimonial%20(11).svg",
    metric: "32 hrs/wk",
    metricLabel: "Founder Hours Reclaimed"
  },
  {
    quote: "They don't hand you an 80-page slide deck and leave. They sat in our warehouse, rewrote the SOPs with our dispatchers, and fixed our invoicing lag in 6 weeks flat.",
    author: "Amina Adeleke",
    role: "Managing Director",
    company: "Vanguard Retail Group",
    avatar: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69eca3752097305c9ed7db33_testimonial%20(3).webp",
    signatureSvg: "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69eca4a6281865cf2d9410c0_testimonial%20(12).svg",
    metric: "₦18.4M",
    metricLabel: "Cash Flow Recovered"
  }
];

export const INSIGHTS_ARTICLES: InsightItem[] = [
  {
    id: "operational-bottlenecks-limit-growth",
    tag: "Operator Playbook",
    title: "Operational Bottlenecks That Quietly Limit Growth",
    readTime: "5 min read",
    date: "October 18, 2026",
    excerpt: "Most growing companies do not stall because of weak demand—they stall because the founder has unknowingly become the only approval desk in the building.",
    image: insightBottlenecksImg,
    author: "Sabi COO Editorial",
    authorRole: "Operations & Systems Practice",
    pullQuote: "Growth rarely breaks a product first. It breaks the informal habits that used to hold a five-person team together.",
    keyTakeaways: [
      "Identify every recurring decision that pauses when the founder is offline for 48 hours.",
      "Separate routine daily approvals from high-risk strategic calls using clear financial thresholds.",
      "Replace WhatsApp firefighting with documented handoffs so frontline managers own delivery."
    ],
    sections: [
      {
        heading: "Why Demand Alone Stops Working After Year One",
        paragraphs: [
          "In the early days of a business, founder involvement is a superpower. You close the biggest deals, fix supplier delays by phone, and personally check every deliverable before it reaches a client. Speed comes directly from your personal stamina.",
          "As order volume doubles or triples, that exact habit turns into a ceiling. Every invoice, refund, discount request, and staff escalation lands on one desk. Team members stop making judgment calls because waiting for your approval feels safer than getting it wrong."
        ]
      },
      {
        heading: "Spotting the Hidden Friction Points",
        paragraphs: [
          "The clearest sign of an operational bottleneck is rework. When customer orders go out late, stock counts fail to match the ledger, or two staff members repeat the same follow-up call, the company is paying twice for the same revenue.",
          "Instead of hiring more people into an unorganized process—which simply multiplies confusion—start by mapping the last ten customer complaints from first contact to final payment. Almost every breakdown traces back to an unclear handoff."
        ]
      },
      {
        heading: "Building Systems That Run Without Heroics",
        paragraphs: [
          "Breaking out of daily firefighting does not require complex enterprise software. It starts with simple, agreed decision rules: what a supervisor can approve immediately, how an issue gets escalated within two hours, and which five numbers leadership reviews every Monday morning.",
          "Once those guardrails are written down and practiced with the team, founders regain dozens of hours each week to focus on partnerships, capital, and market expansion."
        ]
      }
    ]
  },
  {
    id: "choosing-right-business-structure",
    tag: "Governance & Scale",
    title: "Choosing the Right Business Structure: What Founders Need",
    readTime: "6 min read",
    date: "October 12, 2026",
    excerpt: "Why hiring senior executives too early drains working capital, and how clear role architecture protects cash runway while building real accountability.",
    image: insightStructureImg,
    author: "Tobi Adeyemi",
    authorRole: "Managing Partner, Sabi COO",
    pullQuote: "A senior title cannot fix an undefined seat. Build the operating structure first, then place the right leader inside it.",
    keyTakeaways: [
      "Avoid hiring expensive full-time executives before core workflows and metrics exist.",
      "Give every role three clear outcomes and one primary owner—never shared accountability.",
      "Match your leadership structure to your current revenue stage rather than an idealized org chart."
    ],
    sections: [
      {
        heading: "The Cost of Premature Executive Hiring",
        paragraphs: [
          "When daily operations start feeling overwhelming, many founders look for a silver bullet: hiring a full-time Operations Director or Chief Operating Officer. On paper, handing off the stress sounds ideal.",
          "In practice, dropping a high-salary executive into a company with no written procedures, fragmented bookkeeping, and unclear reporting lines creates frustration on both sides. The new hire spends months asking basic questions while payroll rises sharply."
        ]
      },
      {
        heading: "Designing Roles Around Outcomes, Not Titles",
        paragraphs: [
          "An effective organizational chart is a map of responsibility, not a status ladder. Before creating or filling any management role, write down the exact three outcomes that seat owns every week—such as on-time dispatch rate, days-to-collect invoices, or client onboarding speed.",
          "When two people share responsibility for the same target, accountability disappears. Single ownership forces clarity around tools, authority, and weekly review."
        ]
      },
      {
        heading: "Structuring for Your Current Growth Stage",
        paragraphs: [
          "Early-stage and mid-sized companies benefit most from milestone-driven operational builds: getting the playbook, dashboards, and manager habits right first, then promoting or hiring into a clean system that runs reliably from day one."
        ]
      }
    ]
  },
  {
    id: "from-13-week-cash-forecasts-to-autonomous-teams",
    tag: "Cash & Capital",
    title: "From 13-Week Cash Forecasts to Autonomous Teams",
    readTime: "6 min read",
    date: "September 29, 2026",
    excerpt: "A practical guide to escaping end-of-month payroll anxiety and putting forward cash visibility at the center of daily operational decisions.",
    image: insightCashImg,
    author: "Chidi Nwosu",
    authorRole: "Lead Financial & Operations Architect",
    pullQuote: "Revenue is a vanity milestone if cash arrives forty days after payroll and suppliers are due.",
    keyTakeaways: [
      "Track weekly expected inflows and committed outflows 13 weeks ahead in one simple view.",
      "Tie milestone invoicing directly to delivery checkpoints so receivables never drift.",
      "Review cash gaps alongside operational delays—billing lags are almost always operational."
    ],
    sections: [
      {
        heading: "Why Profitable Companies Still Run Out of Cash",
        paragraphs: [
          "It is surprisingly common for a growing business to post strong monthly sales yet face intense stress in the final week of the month. The culprit is rarely sales volume—it is timing.",
          "When invoices are issued late after project completion, customer credit terms go unmonitored, and supplier prepayments are approved informally, working capital gets trapped inside unfinished workflows."
        ]
      },
      {
        heading: "How a Rolling 13-Week Cash View Changes Behavior",
        paragraphs: [
          "Looking only at today's bank app tells you where you stood yesterday. A rolling 13-week cash forecast projects every confirmed receivable, recurring fixed cost, tax obligation, and inventory commitment across the next quarter.",
          "With a three-month radar in front of leadership every week, hiring decisions, vendor negotiations, and collection follow-ups become calm and deliberate instead of reactive."
        ]
      },
      {
        heading: "Linking Cash Discipline to Daily Operations",
        paragraphs: [
          "Billing speed is an operational habit. When account managers know an invoice triggers automatically at milestone sign-off—and collections follow a polite, scheduled cadence—cash flow stabilizes without awkward founder calls."
        ]
      }
    ]
  },
  {
    id: "step-out-of-firefighting-without-losing-control",
    tag: "Leadership",
    title: "How Founders Step Out of Firefighting Without Losing Control",
    readTime: "5 min read",
    date: "September 14, 2026",
    excerpt: "Stepping back does not mean stepping blindly. Discover how simple operating rhythms let founders maintain full visibility while empowering managers.",
    image: insightDelegationImg,
    author: "Amaka Okafor",
    authorRole: "Senior Operator & People Lead",
    pullQuote: "Delegation fails when founders hand over tasks without handing over clear standards and a weekly feedback loop.",
    keyTakeaways: [
      "Delegate complete workflows with clear 'done' criteria rather than piecemeal errands.",
      "Replace random status interruptions with one structured 30-minute weekly leadership check-in.",
      "Use exception-based reporting so you hear about risks early instead of after a client complains."
    ],
    sections: [
      {
        heading: "Why 'Letting Go' Usually Backfires First",
        paragraphs: [
          "Many founders try delegating once, watch a mistake happen with a key customer, and immediately pull all the work back onto their own plate. The conclusion feels obvious: 'Nobody does it like I do.'",
          "In reality, the failure happened because the staff member received the task without the context, quality checklist, or authority needed to finish it well."
        ]
      },
      {
        heading: "Visibility Without Micromanagement",
        paragraphs: [
          "True operational control comes from cadence, not constant interruptions. When every team lead reports their core numbers and red flags in a crisp weekly summary, founders see problems days earlier while spending far less time in group chats.",
          "Your role shifts from solving every problem yourself to coaching your managers on how to resolve issues within agreed boundaries."
        ]
      }
    ]
  },
  {
    id: "why-sops-fail-and-how-to-make-them-stick",
    tag: "Systems & SOPs",
    title: "Why SOPs Fail in Most Companies (And How to Make Them Stick)",
    readTime: "4 min read",
    date: "August 28, 2026",
    excerpt: "Thick binders and forgotten cloud folders never improve execution. Here is how to build simple, practical operating guides your team actually uses.",
    image: insightSopImg,
    author: "Sabi COO Editorial",
    authorRole: "Operations & Systems Practice",
    pullQuote: "If an operating guide takes twenty minutes to read during a busy shift, your staff will ignore it within a week.",
    keyTakeaways: [
      "Write checklists alongside the frontline staff who actually perform the work every day.",
      "Keep every critical procedure to one clear page or a short 2-minute walkthrough.",
      "Embed checklists inside daily tools and review compliance during onboarding and handoffs."
    ],
    sections: [
      {
        heading: "The Graveyard of Unused Documents",
        paragraphs: [
          "Almost every scaling company has tried writing Standard Operating Procedures at least once. Someone spends two weekends typing long paragraphs into a shared drive, sends out an announcement, and within a month nobody opens the folder again.",
          "Documents written from the top down often miss the real edge cases frontline staff face—broken supplier links, missing client details, or last-minute dispatch changes."
        ]
      },
      {
        heading: "Designing Guides Built for Real Workdays",
        paragraphs: [
          "Working SOPs read like pre-flight checklists: short, numbered steps written in plain language directly at the point of execution. Whether it is onboarding a new client, closing daily warehouse stock, or reconciling payments, clarity beats length every time.",
          "When staff help refine the checklist during live training, adoption happens naturally—and new hires get up to speed in days rather than months."
        ]
      }
    ]
  },
  {
    id: "five-weekly-numbers-every-owner-needs",
    tag: "Cash & Capital",
    title: "The 5 Weekly Numbers Every Business Owner Needs on Monday",
    readTime: "5 min read",
    date: "August 11, 2026",
    excerpt: "Waiting for quarterly accounting statements leaves you driving in the rearview mirror. Track these five operational metrics every Monday morning.",
    image: insightScorecardsImg,
    author: "Chidi Nwosu",
    authorRole: "Lead Financial & Operations Architect",
    pullQuote: "You do not need forty charts on a screen. Five honest weekly numbers tell you whether your business is healthy or drifting.",
    keyTakeaways: [
      "Pair lagging financial totals with leading operational indicators like pipeline and fulfillment SLA.",
      "Track net cash collected alongside revenue booked so collections never quietly fall behind.",
      "Assign one named owner to update and explain each number before Monday's leadership review."
    ],
    sections: [
      {
        heading: "Why Monthly Accounting Arrives Too Late",
        paragraphs: [
          "Traditional financial statements are essential for tax and governance, yet they often land three weeks after a month closes. By the time a margin dip appears on a profit-and-loss sheet, six weeks of operational leakage may have already passed.",
          "Operators need a concise weekly scorecard—five numbers that take ten minutes to review and give an honest pulse check on sales, delivery, cash, and team capacity."
        ]
      },
      {
        heading: "The Monday Morning Five",
        paragraphs: [
          "Every company varies slightly, yet five categories consistently keep founders grounded: (1) Qualified new pipeline added, (2) Cash collected vs. invoiced, (3) On-time delivery or fulfillment rate, (4) Open customer escalations or rework count, and (5) Projected cash balance over the next four weeks.",
          "When those five figures live in one tidy scorecard owned by your department leads, surprises shrink dramatically and strategic planning becomes effortless."
        ]
      }
    ]
  }
];

export const BLOG_POSTS: BlogItem[] = INSIGHTS_ARTICLES;

export const FAQS: FaqItem[] = [
  {
    category: "Commercials",
    question: "How does Sabi COO price Tier 1 engagements?",
    answer: "Tier 1 is priced strictly per milestone scope deliverable agreed during the initial discovery and diagnostic intake."
  },
  {
    category: "Eligibility",
    question: "What if our business has fewer than 5 employees?",
    answer: "If you have proven paying customers but a compact team, Tier 1 will focus heavily on workflow automation, role clarity, and contract staffing frameworks so you do not make expensive full-time hiring mistakes as you expand."
  },
  {
    category: "Engagements",
    question: "Can we switch from Tier 1 to an ongoing advisory arrangement later?",
    answer: "Yes. Many founders who complete a Tier 1 surgical sprint transition into a quarterly Strategic Advisory mandate (under Extraordinary Engagements) to have our senior partners join quarterly board reviews and monitor governance metrics."
  },
  {
    category: "Execution",
    question: "How is Sabi COO different from hiring a full-time Chief Operating Officer?",
    answer: "A veteran COO commands ₦2.5M-₦3.5M per month plus significant equity—a commitment that crushes margins for companies below ₦100M revenue. Sabi COO delivers senior operational firepower on a surgical, milestone basis at a fraction of the cost, without equity dilution."
  },
  {
    category: "Deliverables",
    question: "Do you just give us documents, or do you help implement them?",
    answer: "We don't deliver passive slide decks; we physically write the SOPs, configure your operational software, build real-time financial dashboards, and conduct live training drills with your staff until execution is autonomous."
  }
];

export const SCREENER_QUESTIONS: ScreenerQuestion[] = [
  {
    id: 1,
    question: "When you step away from the business for a few days, how do daily operations hold up?",
    category: "founder",
    options: [
      {
        label: "Operations run smoothly. Team leads handle approvals, client delivery, and routine decisions independently.",
        points: { founder: 0, ops: 0, cash: 0, people: 0 },
        strengths: { founder: 4, ops: 3, cash: 1, people: 3 },
        tone: "positive"
      },
      {
        label: "Day-to-day delivery continues well, though a few key approvals and client escalations still wait for me.",
        points: { founder: 2, ops: 0, cash: 0, people: 0 },
        strengths: { founder: 2, ops: 3, cash: 1, people: 2 },
        tone: "balanced"
      },
      {
        label: "Work keeps moving, though delivery quality and speed dip because key steps are not documented.",
        points: { founder: 1, ops: 3, cash: 0, people: 1 },
        strengths: { founder: 1, ops: 0, cash: 1, people: 2 },
        tone: "challenge"
      },
      {
        label: "Approvals, invoicing, and urgent decisions mostly stall until I step back in directly.",
        points: { founder: 3, ops: 1, cash: 1, people: 0 },
        strengths: { founder: 0, ops: 1, cash: 0, people: 1 },
        tone: "challenge"
      }
    ]
  },
  {
    id: 2,
    question: "How are workflows, playbooks, and team responsibilities structured across your company?",
    category: "ops",
    options: [
      {
        label: "Our team works well together and core roles are clear, though our guides need updating as we grow.",
        points: { founder: 0, ops: 1, cash: 0, people: 1 },
        strengths: { founder: 2, ops: 2, cash: 1, people: 3 },
        tone: "balanced"
      },
      {
        label: "We have clear, documented SOPs and defined role scorecards that the team follows consistently.",
        points: { founder: 0, ops: 0, cash: 0, people: 0 },
        strengths: { founder: 2, ops: 4, cash: 1, people: 4 },
        tone: "positive"
      },
      {
        label: "We have hardworking people, but overlapping duties sometimes cause confusion over who owns what.",
        points: { founder: 0, ops: 1, cash: 0, people: 3 },
        strengths: { founder: 1, ops: 1, cash: 1, people: 1 },
        tone: "challenge"
      },
      {
        label: "Most coordination happens informally in chats and calls rather than repeatable workflows.",
        points: { founder: 1, ops: 3, cash: 0, people: 1 },
        strengths: { founder: 0, ops: 0, cash: 1, people: 1 },
        tone: "challenge"
      }
    ]
  },
  {
    id: 3,
    question: "How would you describe your cash flow visibility, billing, and financial rhythm?",
    category: "cash",
    options: [
      {
        label: "Healthy and predictable. Invoices go out on schedule, collections stay tight, and we forecast ahead.",
        points: { founder: 0, ops: 0, cash: 0, people: 0 },
        strengths: { founder: 1, ops: 2, cash: 4, people: 1 },
        tone: "positive"
      },
      {
        label: "Sales and cash inflow are steady, though we want sharper forecasting to protect margins as costs rise.",
        points: { founder: 0, ops: 1, cash: 1, people: 0 },
        strengths: { founder: 2, ops: 2, cash: 3, people: 1 },
        tone: "balanced"
      },
      {
        label: "Demand is strong, but delayed invoicing or slow receivables sometimes squeeze our monthly cash buffer.",
        points: { founder: 0, ops: 1, cash: 3, people: 0 },
        strengths: { founder: 1, ops: 1, cash: 1, people: 1 },
        tone: "challenge"
      },
      {
        label: "Cash tracking is mostly reactive—checking bank balances week-to-week without a structured forecast.",
        points: { founder: 1, ops: 0, cash: 3, people: 0 },
        strengths: { founder: 0, ops: 1, cash: 0, people: 1 },
        tone: "challenge"
      }
    ]
  },
  {
    id: 4,
    question: "How is your weekly time as a founder currently balanced between strategy and daily execution?",
    category: "founder",
    options: [
      {
        label: "Mostly spent troubleshooting daily issues, chasing payments, or stepping in for operational gaps.",
        points: { founder: 3, ops: 1, cash: 1, people: 0 },
        strengths: { founder: 0, ops: 0, cash: 0, people: 1 },
        tone: "challenge"
      },
      {
        label: "Mostly dedicated to strategy, partnerships, and growth while department leads run daily work.",
        points: { founder: 0, ops: 0, cash: 0, people: 0 },
        strengths: { founder: 4, ops: 2, cash: 2, people: 3 },
        tone: "positive"
      },
      {
        label: "A healthy split overall, though routine operational check-ins still take more time than I'd like.",
        points: { founder: 1, ops: 1, cash: 0, people: 0 },
        strengths: { founder: 2, ops: 2, cash: 1, people: 2 },
        tone: "balanced"
      },
      {
        label: "I enjoy building with the team, though I still handle key delivery while we build senior capacity.",
        points: { founder: 1, ops: 0, cash: 0, people: 3 },
        strengths: { founder: 1, ops: 1, cash: 1, people: 1 },
        tone: "challenge"
      }
    ]
  }
];
