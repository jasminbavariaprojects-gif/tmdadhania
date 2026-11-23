import { useState } from "react";
import { z } from "zod";
import { services } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+]?[0-9 ]{10,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  service: z.string().min(1, "Select a service"),
  date: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
});

export function EnquiryForm({ booking = false, defaultService = "" }: { booking?: boolean; defaultService?: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  if (done)
    return <div className="rounded-lg border border-gold bg-gold-soft p-6 text-primary"><p className="font-display text-2xl font-bold">Thank you.</p><p className="mt-1 text-sm">Your {booking ? "consultation request" : "enquiry"} has been received. We will contact you shortly.</p></div>;
  return (
    <form
      noValidate
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const r = schema.safeParse(data);
        if (!r.success) {
          setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
          return;
        }
        setErrors({});
        // TODO(phase 2): submit to server and store in database
        setDone(true);
      }}
    >
      {[["name", "Full name", "text"], ["phone", "Phone", "tel"], ["email", "Email", "email"]].map(([n, l, t]) => (
        <label key={n} className="text-sm font-medium">{l}<input name={n} type={t} className="field mt-1" />{errors[n!] && <span className="text-xs text-destructive">{errors[n!]}</span>}</label>
      ))}
      <label className="text-sm font-medium">Service
        <select name="service" defaultValue={defaultService} className="field mt-1">
          <option value="">Select…</option>
          {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
        </select>
        {errors["service"] && <span className="text-xs text-destructive">{errors["service"]}</span>}
      </label>
      {booking && <label className="text-sm font-medium sm:col-span-2">Preferred date<input name="date" type="date" className="field mt-1" /></label>}
      <label className="text-sm font-medium sm:col-span-2">Message<textarea name="message" rows={4} className="field mt-1" /></label>
      <button className="btn-gold justify-center sm:col-span-2">{booking ? "Request Consultation" : "Send Enquiry"}</button>
    </form>
  );
}
