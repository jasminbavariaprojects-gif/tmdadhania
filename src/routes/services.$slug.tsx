import { createFileRoute, notFound } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { services } from "@/lib/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return { slug: s.slug, title: s.title, short: s.short };
  },
  head: ({ loaderData }) => ({ meta: loaderData ? [
    { title: `${loaderData.title} Services in Mumbai | TM Dadhania & Co` },
    { name: "description", content: loaderData.short },
    { property: "og:title", content: `${loaderData.title} | TM Dadhania & Co` },
    { property: "og:description", content: loaderData.short },
  ] : [{ title: "Service not found" }, { name: "robots", content: "noindex" }] }),
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const s = services.find((x) => x.slug === slug)!;
  return (
    <>
      <PageHero eyebrow="Service" title={s.title} text={s.short} />
      <section className="container-site grid gap-10 py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-primary">What's included</h2>
          <ul className="mt-6 space-y-3">{s.points.map((p) => <li key={p} className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />{p}</li>)}</ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8">
          <h2 className="mb-5 text-2xl font-bold text-primary">Enquire about {s.title}</h2>
          <EnquiryForm defaultService={s.slug} />
        </div>
      </section>
    </>
  );
}
