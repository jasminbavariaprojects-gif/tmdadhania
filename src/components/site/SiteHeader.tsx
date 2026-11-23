import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { firm } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary font-display text-lg font-bold text-gold">CA</span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold text-primary">{firm.name}</span>
            <span className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{firm.tagline}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="text-sm font-medium text-foreground/80 hover:text-primary" activeProps={{ className: "text-primary font-semibold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={firm.phoneHref} className="flex items-center gap-2 text-sm font-semibold text-primary"><Phone className="h-4 w-4 text-gold" />{firm.phone}</a>
          <Link to="/contact" className="btn-navy">Book Consultation</Link>
        </div>
        <button className="lg:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="container-site flex flex-col py-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2.5 font-medium">{n.label}</Link>
            ))}
            <a href={firm.phoneHref} className="btn-navy mt-2 justify-center"><Phone className="h-4 w-4" />Call {firm.phone}</a>
          </div>
        </nav>
      )}
    </header>
  );
}
