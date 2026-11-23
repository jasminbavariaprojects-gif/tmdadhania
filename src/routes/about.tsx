import { createFileRoute } from "@tanstack/react-router";
import { Eye, Target, UserRound } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/site/PageHero";
import { firm } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Us | TM Dadhania & Co, Chartered Accountants" },
    { name: "description", content: "Firm profile, mission, vision and team of TM Dadhania & Co, Chartered Accountants in Mumbai." },
    { property: "og:title", content: "About TM Dadhania & Co" },
    { property: "og:description", content: "Our firm profile, mission, vision and team." },
  ] }),
  component: About,
});

const team = [
  { name: "CA [Partner Name]", role: "Partner", area: "Direct tax & advisory" },
  { name: "CA [Partner Name]", role: "Partner", area: "Audit & assurance" },
  { name: "CA [Associate Name]", role: "Associate", area: "GST & indirect tax" },
];

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Firm profile" text={`${firm.name} is a Chartered Accountancy firm based in ${firm.city}, offering tax, audit, accounting and compliance services.`} />
      <section className="container-site grid gap-10 py-20 lg:grid-cols-2">
        <div className="space-y-4 text-muted-foreground">
          <p>Our practice serves individuals, family-owned businesses, startups and companies. We aim to give clear, practical advice and keep our clients compliant with the Income-tax Act, GST laws and the Companies Act.</p>
          <p>All partners are members of the Institute of Chartered Accountants of India. Membership and firm registration details will be published here once provided.</p>
          <p>Every engagement begins with a defined scope and fee in writing, consistent with professional standards.</p>
        </div>
        <div className="grid gap-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card"><Target className="h-8 w-8 text-gold" /><h2 className="mt-3 text-2xl font-bold text-primary">Mission</h2><p className="mt-2 text-sm text-muted-foreground">To provide reliable, timely and ethical professional services that help clients meet their obligations with confidence.</p></div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card"><Eye className="h-8 w-8 text-gold" /><h2 className="mt-3 text-2xl font-bold text-primary">Vision</h2><p className="mt-2 text-sm text-muted-foreground">To be a trusted long-term advisor to the businesses and families we serve.</p></div>
        </div>
      </section>
      <section className="bg-secondary py-20">
        <div className="container-site">
          <SectionTitle eyebrow="Our team" title="The people behind the practice" text="Team profiles will be updated with actual names and qualifications." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {team.map((t, i) => (
              <div key={i} className="rounded-xl bg-card p-6 text-center shadow-card">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-gold"><UserRound className="h-10 w-10" /></span>
                <p className="mt-4 font-display text-xl font-bold text-primary">{t.name}</p>
                <p className="text-sm font-semibold text-gold">{t.role}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
