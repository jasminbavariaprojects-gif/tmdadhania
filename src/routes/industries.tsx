import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { industries } from "@/lib/site";

export const Route = createFileRoute("/industries")({
  head: () => ({ meta: [
    { title: "Industries We Serve | TM Dadhania & Co" },
    { name: "description", content: "CA services for startups, SMEs, manufacturing, retail and corporate clients." },
    { property: "og:title", content: "Industries We Serve" },
    { property: "og:description", content: "Startups, SMEs, manufacturing, retail and corporate." },
  ] }),
  component: () => (
    <>
      <PageHero eyebrow="Industries" title="Sector-specific support" text="Each industry has its own compliance rhythm. We adapt our approach to yours." />
      <section className="container-site grid gap-6 py-20 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((i) => (
          <div key={i.slug} id={i.slug} className="rounded-xl border-l-4 border-gold bg-card p-6 shadow-card">
            <i.icon className="h-9 w-9 text-primary" />
            <h2 className="mt-4 text-2xl font-bold text-primary">{i.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{i.text}</p>
          </div>
        ))}
      </section>
    </>
  ),
});
