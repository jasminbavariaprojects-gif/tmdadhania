import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { posts } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const p = posts.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({ meta: loaderData ? [
    { title: `${loaderData.title} | TM Dadhania & Co` },
    { name: "description", content: loaderData.excerpt },
    { property: "og:title", content: loaderData.title },
    { property: "og:description", content: loaderData.excerpt },
    { property: "og:type", content: "article" },
  ] : [{ title: "Article not found" }, { name: "robots", content: "noindex" }] }),
  component: Post,
});

function Post() {
  const p = Route.useLoaderData();
  return (
    <article className="container-site max-w-3xl py-16">
      <Link to="/blog" className="text-sm font-semibold text-gold">← All articles</Link>
      <p className="eyebrow mt-6">{p.category}</p>
      <h1 className="mt-2 text-4xl font-bold text-primary md:text-5xl">{p.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{new Date(p.date).toLocaleDateString("en-IN", { dateStyle: "long" })}</p>
      <div className="mt-8 space-y-5 text-lg leading-relaxed">{p.body.map((b, i) => <p key={i}>{b}</p>)}</div>
      <p className="mt-10 rounded-lg bg-secondary p-4 text-sm text-muted-foreground">Disclaimer: This article is for general information only and should not be treated as professional advice.</p>
    </article>
  );
}
