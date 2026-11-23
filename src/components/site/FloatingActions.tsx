import { MessageCircle, Phone } from "lucide-react";
import { firm, whatsappLink } from "@/lib/site";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a href={firm.phoneHref} aria-label="Call us" className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-card md:hidden"><Phone className="h-5 w-5" /></a>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="grid h-14 w-14 place-items-center rounded-full bg-success text-primary-foreground shadow-card transition hover:scale-105"><MessageCircle className="h-6 w-6" /></a>
    </div>
  );
}
