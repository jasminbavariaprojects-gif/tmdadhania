export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="bg-hero text-primary-foreground">
      <div className="container-site py-16 md:py-20 animate-rise">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-primary-foreground/75">{text}</p>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold text-primary md:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-muted-foreground">{text}</p>}
    </div>
  );
}
