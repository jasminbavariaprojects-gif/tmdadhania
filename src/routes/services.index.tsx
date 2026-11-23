import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { services } from "@/lib/site";

export const Route = createFileRoute("/services/")({
  head: () => ({ meta: [
    { title: "CA Services in Mumbai — Income Tax, GST, Audit, ROC | TM Dadhania & Co" },
    { name: "description", content: "Income tax, GST, tax planning, auditing, accounting, company registration, ROC compliance, TDS and business consultancy." },
    { property: "og:title", content: "Our Services | TM Dadhania & Co" },
    { property: "og:description", content: "Tax, audit, accounting and compliance services." },
  ] }),
  component: () => (
    <>
      <PageHero eyebrow="Services" title="What we do" text="Nine practice areas covering your tax, audit, accounting and company-law needs." />
      <section className="container-site grid gap-6 py-20 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group rounded-xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-gold hover:shadow-card">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-gold"><s.icon className="h-6 w-6" /></span>
            <h2 className="mt-5 text-2xl font-bold text-primary">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold group-hover:text-gold">Details <ArrowRight className="h-4 w-4" /></span>
          </Link>
        ))}
      </section>
    </>
  ),
});
