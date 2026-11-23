import { Calculator, Receipt, LineChart, ShieldCheck, BookOpen, Building2, FileCheck2, Percent, Briefcase, Rocket, Store, Factory, Landmark, Users } from "lucide-react";

export const firm = {
  name: "TM Dadhania & Co",
  short: "TM Dadhania & Co",
  tagline: "Chartered Accountants",
  city: "Mumbai",
  address: "[Office address], Mumbai, Maharashtra",
  phone: "+91 98200 98200",
  phoneHref: "tel:+919820098200",
  whatsapp: "919820098200",
  email: "info@example-cafirm.in",
  hours: "Mon–Sat, 10:00 am – 7:00 pm",
  mapQuery: "Mumbai",
};

export const whatsappLink = (msg = "Hello, I would like to discuss a query with your firm.") =>
  `https://wa.me/${firm.whatsapp}?text=${encodeURIComponent(msg)}`;

export const services = [
  { slug: "income-tax", title: "Income Tax", icon: Receipt, short: "Return filing, notices, assessments and appeals for individuals, HUFs, firms and companies.", points: ["ITR filing for all assessee types", "Responses to notices under the Income-tax Act", "Assessment and appeal representation", "Advance tax computation"] },
  { slug: "gst", title: "GST", icon: Percent, short: "GST registration, periodic returns, reconciliations, annual returns and advisory.", points: ["GST registration and amendments", "GSTR-1, GSTR-3B and annual returns", "Input tax credit reconciliation", "Departmental notices and audits"] },
  { slug: "tax-planning", title: "Tax Planning", icon: LineChart, short: "Lawful, documented tax planning aligned with your personal and business goals.", points: ["Regime comparison (old vs new)", "Salary structuring guidance", "Capital gains planning", "Business tax structuring"] },
  { slug: "auditing", title: "Auditing", icon: ShieldCheck, short: "Statutory, tax, internal and stock audits carried out under applicable Standards on Auditing.", points: ["Statutory audit under Companies Act", "Tax audit under section 44AB", "Internal and process audits", "Stock and bank audits"] },
  { slug: "accounting", title: "Accounting", icon: BookOpen, short: "Bookkeeping, MIS reports and finalisation of accounts on Tally, Zoho and other platforms.", points: ["Monthly bookkeeping", "MIS and management reports", "Payroll processing", "Finalisation of accounts"] },
  { slug: "company-registration", title: "Company Registration", icon: Building2, short: "Incorporation of private limited companies, LLPs, OPCs and partnership firms.", points: ["Private limited and OPC incorporation", "LLP registration", "Partnership deed and registration", "PAN, TAN and bank documentation"] },
  { slug: "roc-compliance", title: "ROC Compliance", icon: FileCheck2, short: "Annual filings and event-based compliances with the Registrar of Companies.", points: ["AOC-4 and MGT-7 filings", "Director KYC (DIR-3 KYC)", "Changes in directors and capital", "Board and AGM documentation"] },
  { slug: "tds", title: "TDS", icon: Calculator, short: "TDS deduction guidance, quarterly returns, Form 16/16A and default resolution.", points: ["Quarterly TDS/TCS returns", "Form 16 and 16A generation", "Lower deduction certificates", "TRACES default corrections"] },
  { slug: "business-consultancy", title: "Business Consultancy", icon: Briefcase, short: "Financial structuring, project reports, budgeting and advisory for growing businesses.", points: ["Project reports and CMA data", "Budgeting and forecasting", "Business structuring advice", "Virtual CFO support"] },
];

export const industries = [
  { slug: "startups", title: "Startups", icon: Rocket, text: "Incorporation, DPIIT recognition support, founder agreements guidance, ESOP accounting and investor-ready books." },
  { slug: "smes", title: "SMEs", icon: Store, text: "End-to-end accounting, GST and TDS compliance, MSME registration and banking documentation." },
  { slug: "manufacturing", title: "Manufacturing", icon: Factory, text: "Cost records, inventory valuation, stock audits, GST on job work and input credit optimisation." },
  { slug: "retail", title: "Retail", icon: Users, text: "Multi-outlet bookkeeping, POS reconciliation, GST compliance and margin analysis." },
  { slug: "corporate", title: "Corporate", icon: Landmark, text: "Statutory and internal audit, ROC compliance, transfer pricing documentation support and board reporting." },
];

export const posts = [
  { slug: "new-vs-old-tax-regime-guide", category: "Tax Updates", title: "New vs old tax regime: how to compare for your situation", date: "2026-11-10", excerpt: "A step-by-step method to compare both regimes using your actual deductions and income mix.", body: ["Choosing between the old and new tax regimes depends on the deductions and exemptions you can actually claim. Start by listing your gross salary, house rent allowance, home-loan interest and investments under Chapter VI-A.", "Compute tax under both regimes using the current year's slabs. The new regime offers lower rates but removes most deductions; the old regime may still suit those with significant HRA and home-loan claims.", "Salaried individuals can generally change regimes each year, while those with business income have restrictions. Please verify your eligibility with a qualified professional before filing."] },
  { slug: "gst-input-tax-credit-reconciliation", category: "GST News", title: "Why monthly ITC reconciliation matters", date: "2026-10-28", excerpt: "Matching your purchase register with GSTR-2B every month reduces mismatches and notices.", body: ["Input tax credit can only be claimed when it appears in GSTR-2B and other conditions are met. Mismatches are a frequent trigger for departmental queries.", "A monthly reconciliation lets you follow up with suppliers early, before return deadlines pass.", "Keep invoices, payment proof and goods receipt records organised so you can respond quickly if a notice is received."] },
  { slug: "tds-due-dates-checklist", category: "Financial Articles", title: "A practical TDS compliance checklist for small businesses", date: "2026-10-12", excerpt: "Deduction, deposit, return filing and certificate issue — the four steps to stay compliant.", body: ["TDS compliance has four steps: deduct at the correct rate, deposit by the due date, file the quarterly return and issue certificates to deductees.", "Late deposit attracts interest and late filing attracts fees, so a calendar of due dates is essential.", "Verify PAN of every deductee — missing or invalid PAN can lead to higher deduction rates."] },
];
