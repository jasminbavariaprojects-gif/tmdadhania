import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock, FileSearch, Lock, Phone, Scale, MessageCircle } from "lucide-react";
import { firm, services, whatsappLink } from "@/lib/site";
import { SectionTitle } from "@/components/site/PageHero";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chartered Accountants in Mumbai | TM Dadhania & Co" },
      { name: "description", content: "Income tax, GST, audit, accounting, company registration and ROC compliance services by a Chartered Accountant firm in Mumbai." },
      { property: "og:title", content: "TM Dadhania & Co — Chartered Accountants" },
      { property: "og:description", content: "Tax, audit, accounting and compliance services for individuals and businesses." },
    ],
  }),
  component: Home,
});

const why = [
  { icon: Scale, title: "Ethics first", text: "We work within ICAI's Code of Ethics and applicable professional standards." },
  { icon: Clock, title: "Timely compliance", text: "Due-date calendars and reminders so filings are not missed." },
  { icon: FileSearch, title: "Clear documentation", text: "Every engagement comes with a written scope and transparent fee terms." },
  { icon: Lock, title: "Confidentiality", text: "Client information is handled with strict professional confidentiality." },
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero text-primary-foreground">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-gold/30" />
        <div className="pointer-events-none absolute -right-8 top-20 h-72 w-72 rounded-full border border-gold/20" />
        <div className="container-site relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="animate-rise">
            <p className="eyebrow">Chartered Accountants · {firm.city}</p>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] md:text-6xl">Tax, audit and compliance, <span className="text-gold">handled with care.</span></h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/75">We help individuals, startups and businesses meet their income tax, GST, audit and company law obligations — accurately and on time.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-gold">Book a Consultation <ArrowRight className="h-4 w-4" /></Link>
              <a href={firm.phoneHref} className="btn-ghost-light"><Phone className="h-4 w-4" />Call Now</a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost-light"><MessageCircle className="h-4 w-4" />WhatsApp</a>
            </div>
          </div>
          <div className="animate-rise rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur [animation-delay:150ms]">
            <p className="font-display text-2xl font-bold">How we work</p>
            <ol className="mt-5 space-y-4">
              {["Understand your requirement in an initial discussion", "Share a written engagement scope and fee", "Collect documents securely", "File, review and keep you updated"].map((s, i) => (
                <li key={s} className="flex gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold font-bold text-navy-deep">{i + 1}</span><span className="pt-1 text-sm text-primary-foreground/85">{s}</span></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-site grid gap-10 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">About the firm</p>
          <h2 className="mt-2 text-4xl font-bold text-primary">A practice built on accuracy and trust</h2>
          <p className="mt-4 text-muted-foreground">{firm.name} is a firm of Chartered Accountants registered with the Institute of Chartered Accountants of India (ICAI). We serve salaried professionals, family businesses, startups and companies across tax, assurance and advisory.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {["Direct & indirect tax", "Statutory & internal audit", "Company law compliance", "Accounting & payroll"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="h-5 w-5 text-gold" />{t}</li>
            ))}
          </ul>
          <Link to="/about" className="btn-navy mt-8">Know more about us <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {services.slice(0, 4).map((s) => (
            <div key={s.slug} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <s.icon className="h-8 w-8 text-gold" />
              <p className="mt-4 font-display text-xl font-bold text-primary">{s.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container-site">
          <SectionTitle eyebrow="Our services" title="Comprehensive financial & compliance services" text="Practical support across the full compliance calendar." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group rounded-xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-gold hover:shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-gold"><s.icon className="h-6 w-6" /></span>
                <h3 className="mt-5 text-2xl font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-gold">Learn more <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-20">
        <SectionTitle eyebrow="Why work with us" title="Our commitments to every client" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w) => (
            <div key={w.title} className="rounded-xl border-t-4 border-gold bg-card p-6 shadow-card">
              <w.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-xl font-bold text-primary">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-hero py-20 text-primary-foreground">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-2 text-4xl font-bold">Schedule a consultation</h2>
            <p className="mt-4 text-primary-foreground/75">Share a few details and we will reach out to understand your requirement. Prefer to talk? Call or message us directly.</p>
            <div className="mt-6 space-y-3 text-sm">
              <a href={firm.phoneHref} className="flex items-center gap-3"><Phone className="h-5 w-5 text-gold" />{firm.phone}</a>
              <p className="flex items-center gap-3"><Clock className="h-5 w-5 text-gold" />{firm.hours}</p>
            </div>
          </div>
          <div className="rounded-xl bg-card p-6 text-card-foreground shadow-card md:p-8"><EnquiryForm booking /></div>
        </div>
      </section>
    </>
  );
}
