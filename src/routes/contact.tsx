import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { firm, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Us & Book a Consultation | TM Dadhania & Co" },
    { name: "description", content: "Address, phone, email, map and consultation booking for TM Dadhania & Co, Mumbai." },
    { property: "og:title", content: "Contact TM Dadhania & Co" },
    { property: "og:description", content: "Book a consultation or send an enquiry." },
  ] }),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: MapPin, label: firm.address },
    { icon: Phone, label: firm.phone, href: firm.phoneHref },
    { icon: Mail, label: firm.email, href: `mailto:${firm.email}` },
    { icon: MessageCircle, label: "Chat on WhatsApp", href: whatsappLink() },
    { icon: Clock, label: firm.hours },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk" text="Book a consultation or send us your query. We usually respond within one working day." />
      <section className="container-site grid gap-10 py-20 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          {items.map((it) => {
            const inner = <><it.icon className="h-5 w-5 shrink-0 text-gold" /><span>{it.label}</span></>;
            return it.href ? <a key={it.label} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex gap-3 rounded-lg border border-border bg-card p-4 hover:border-gold">{inner}</a> : <div key={it.label} className="flex gap-3 rounded-lg border border-border bg-card p-4">{inner}</div>;
          })}
          <iframe title="Office location map" loading="lazy" className="h-72 w-full rounded-lg border border-border" src={`https://www.google.com/maps?q=${encodeURIComponent(firm.mapQuery)}&output=embed`} />
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8">
          <h2 className="mb-5 text-3xl font-bold text-primary">Book a consultation</h2>
          <EnquiryForm booking />
        </div>
      </section>
    </>
  );
}
