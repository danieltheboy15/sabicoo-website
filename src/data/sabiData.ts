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

export interface BlogItem {
  id: string;
  tag: string;
  title: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
}

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
    description: "Sabi COO walks directly into the trenches. We diagnose problems forensically. We don't deliver slide decks; we physically write the SOPs, configure software, install dashboards, and train your staff.",
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
      "Forensic operational constraint diagnostic and organisational design report",
      "Company-wide Standard Operating Procedures (SOPs) and workflow architecture",
      "Custom operational KPI dashboards, leadership scorecards, and live analytics",
      "Organisational charts, role clarity, delegation protocols, and accountability matrices",
      "Hands-on frontline and management personnel training with autonomous handover"
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
      "Forensic operational constraint diagnostic and organisational design report",
      "Company-wide Standard Operating Procedures (SOPs) and workflow architecture",
      "Custom operational KPI dashboards, leadership scorecards, and live analytics",
      "Organisational charts, role clarity, delegation protocols, and accountability matrices",
      "Hands-on frontline and management personnel training with autonomous handover"
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
    subtitle: "Full operational management of defined business functions",
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
    name: "Intake",
    summary: "Confidential scoping & symptom isolation",
    details: "We ingest your financial records, org chart, communications cadences, and key pain points."
  },
  {
    number: "02",
    name: "Diagnostic",
    summary: "Root-cause modeling & operational audit",
    details: "We map the hidden failure points between sales, fulfilment, invoicing, and management oversight."
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

export const BLOG_POSTS: BlogItem[] = [
  {
    id: "operational-bottlenecks-limit-growth",
    tag: "Operator Playbook",
    title: "Operational Bottlenecks That Quietly Limit Growth",
    readTime: "5 min read",
    date: "October 18, 2026",
    excerpt: "Most small companies stall not because they lack market demand, but because the founder has unwittingly become the company's biggest structural constraint.",
    image: "https://cdn.prod.website-files.com/69e85301666fcbb8eabb712b/69e96e8a5238d7b67cbbd82b_Blog%20Image%20(31).webp",
    author: "Sabi COO Editorial"
  },
  {
    id: "choosing-right-business-structure",
    tag: "Governance & Scale",
    title: "Choosing the Right Business Structure: What Founders Need",
    readTime: "7 min read",
    date: "October 12, 2026",
    excerpt: "Why premature executive hiring drains early working capital, and how fractional milestone engagements protect cash runway while enforcing accountability.",
    image: "https://cdn.prod.website-files.com/69e85301666fcbb8eabb712b/69e96ebc52eac39fdd395250_Blog%20Image%20(30).webp",
    author: "Jaylon Culhane"
  },
  {
    id: "how-strategic-advisors-scale-faster",
    tag: "Cash & Capital",
    title: "From 13-Week Cash Forecasts to Autonomous Teams",
    readTime: "6 min read",
    date: "September 29, 2026",
    excerpt: "A tactical guide to escaping end-of-month payroll anxiety and designing financial governance that board members and bank lenders respect.",
    image: "https://cdn.prod.website-files.com/69e85301666fcbb8eabb712b/69e96ee090768b6046cf2335_Blog%20Image%20(29).webp",
    author: "Brandon Bergson"
  }
];

export const FAQS: FaqItem[] = [
  {
    category: "Commercials",
    question: "How does Sabi COO price Tier 1 engagements?",
    answer: "Tier 1 is priced strictly per milestone scope deliverable agreed during the initial discovery and diagnostic intake. There are zero surprise hourly billing charges or endless retainers. You know the exact timeline and exact cost upfront before we begin."
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
    answer: "We walk directly into the trenches. We don't deliver passive slide decks; we physically write the SOPs, configure your operational software, build real-time financial dashboards, and conduct live training drills with your staff until execution is autonomous."
  }
];

export const SCREENER_QUESTIONS: ScreenerQuestion[] = [
  {
    id: 1,
    question: "When you step away from the business completely offline for 5 days, what happens?",
    category: "founder",
    options: [
      {
        label: "Total standstill. Nothing gets approved, billed, or resolved without my direct input.",
        points: { founder: 4, ops: 2, cash: 1, people: 1 }
      },
      {
        label: "Client deliveries get delayed, output quality drops, and several mistakes occur.",
        points: { founder: 1, ops: 4, cash: 1, people: 2 }
      },
      {
        label: "Revenue generation stops; invoices do not get issued and receivables pile up.",
        points: { founder: 2, ops: 1, cash: 4, people: 1 }
      },
      {
        label: "Employees argue or get confused about who owns which customer issue or escalation.",
        points: { founder: 1, ops: 2, cash: 1, people: 4 }
      }
    ]
  },
  {
    id: 2,
    question: "How are operational workflows and team responsibilities managed day-to-day?",
    category: "ops",
    options: [
      {
        label: "Primarily through WhatsApp groups, informal chats, and whatever emergency arises that morning.",
        points: { founder: 2, ops: 4, cash: 1, people: 2 }
      },
      {
        label: "People wait for me to assign daily tasks; nobody takes initiative without direct instruction.",
        points: { founder: 4, ops: 1, cash: 1, people: 3 }
      },
      {
        label: "We have Google Docs or Notion, but nobody actually reads or adheres to them in practice.",
        points: { founder: 1, ops: 4, cash: 1, people: 1 }
      },
      {
        label: "Roles overlap heavily; two people do the same task while critical things fall through the cracks.",
        points: { founder: 1, ops: 2, cash: 1, people: 4 }
      }
    ]
  },
  {
    id: 3,
    question: "What does your cash flow management and billing rhythm look like?",
    category: "cash",
    options: [
      {
        label: "Unpredictable. We have revenue on paper, but end-of-month payroll is always a tense scramble.",
        points: { founder: 1, ops: 2, cash: 4, people: 1 }
      },
      {
        label: "Invoices go out with delays, and customer receivables routinely sit unpaid past 60-90 days.",
        points: { founder: 2, ops: 2, cash: 4, people: 0 }
      },
      {
        label: "I manage the bank balance in my head or check the app; we do not run a 13-week cash forecast.",
        points: { founder: 3, ops: 1, cash: 4, people: 0 }
      },
      {
        label: "Cash is generally positive, but margins are deteriorating as headcount increases.",
        points: { founder: 0, ops: 3, cash: 3, people: 2 }
      }
    ]
  },
  {
    id: 4,
    question: "Where does the majority of the founder’s personal weekly hours go?",
    category: "founder",
    options: [
      {
        label: "70%+ spent fighting tactical emergencies, calming clients, or correcting team mistakes.",
        points: { founder: 4, ops: 3, cash: 1, people: 2 }
      },
      {
        label: "Doing the core delivery work because we lack senior specialists to execute independently.",
        points: { founder: 3, ops: 2, cash: 1, people: 4 }
      },
      {
        label: "Chasing payments, negotiating supplier credit, or balancing cash shortfalls.",
        points: { founder: 2, ops: 1, cash: 4, people: 1 }
      },
      {
        label: "Constantly interviewing and re-hiring replacements for roles that churned.",
        points: { founder: 2, ops: 1, cash: 1, people: 4 }
      }
    ]
  }
];
