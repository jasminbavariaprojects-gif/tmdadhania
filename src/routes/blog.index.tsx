import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { posts } from "@/lib/site";

export const Route = createFileRoute("/blog/")({
  head: () => ({ meta: [
    { title: "Tax Updates, GST News & Articles | TM Dadhania & Co Blog" },
    { name: "description", content: "Income tax updates, GST news and practical financial articles." },
    { property: "og:title", content: "Blog | TM Dadhania & Co" },
    { property: "og:description", content: "Tax updates, GST news and financial articles." },
  ] }),
  component: () => (
    <>
      <PageHero eyebrow="Insights" title="Tax updates & articles" text="General information to help you stay informed. Not a substitute for professional advice." />
      <section className="container-site grid gap-6 py-20 md:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="rounded-xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-card">
            <p className="eyebrow">{p.category}</p>
            <h2 className="mt-3 text-2xl font-bold text-primary">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            <p className="mt-4 text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
          </Link>
        ))}
      </section>
    </>
  ),
});
