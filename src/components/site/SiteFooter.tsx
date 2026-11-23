import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { firm, services } from "@/lib/site";
import { useAuthUser } from "@/hooks/useAuthUser";
import { NewsletterForm } from "./NewsletterForm";

export function SiteFooter() {
  const user = useAuthUser();
  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold">{firm.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">{firm.tagline}</p>
          <p className="mt-4 text-sm text-primary-foreground/70">Providing tax, audit, accounting and compliance services from {firm.city}.</p>
        </div>
        <div>
          <p className="eyebrow">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-gold">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold" />{firm.address}</li>
            <li><a href={firm.phoneHref} className="flex gap-2 hover:text-gold"><Phone className="h-4 w-4 text-gold" />{firm.phone}</a></li>
            <li><a href={`mailto:${firm.email}`} className="flex gap-2 hover:text-gold"><Mail className="h-4 w-4 text-gold" />{firm.email}</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Newsletter</p>
          <p className="mt-4 text-sm text-primary-foreground/75">Tax and compliance updates, once a month.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-primary-foreground/60 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {firm.name}. All rights reserved.</p>
          <p>Information on this website is for general guidance only and does not constitute professional advice or solicitation.</p>
          <Link to={user ? "/admin" : "/auth"} className="hover:text-gold">{user ? "Leads" : "Team sign in"}</Link>
        </div>
      </div>
    </footer>
  );
}
