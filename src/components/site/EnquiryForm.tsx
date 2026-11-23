import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { services } from "@/lib/site";
import { submitBooking, submitEnquiry } from "@/lib/submissions.functions";
import { bookingSubmissionSchema } from "@/lib/submission-validation";

export function EnquiryForm({ booking = false, defaultService = "" }: { booking?: boolean; defaultService?: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const saveEnquiry = useServerFn(submitEnquiry);
  const saveBooking = useServerFn(submitBooking);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = bookingSubmissionSchema.safeParse(data);
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }

    setErrors({});
    setSubmitError(null);
    setSubmitting(true);
    const payload = {
      name: result.data.name,
      phone: result.data.phone,
      email: result.data.email,
      service: result.data.service,
      ...(result.data.message ? { message: result.data.message } : {}),
    };

    try {
      if (booking) {
        await saveBooking({ data: { ...payload, ...(result.data.date ? { date: result.data.date } : {}) } });
      } else {
        await saveEnquiry({ data: payload });
      }
      setDone(true);
    } catch {
      setSubmitError("We couldn't save your submission. Please try again, or contact us by phone or WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done)
    return <div className="rounded-lg border border-gold bg-gold-soft p-6 text-primary"><p className="font-display text-2xl font-bold">Thank you.</p><p className="mt-1 text-sm">Your {booking ? "consultation request" : "enquiry"} has been received. We will contact you shortly.</p></div>;
  return (
    <form noValidate className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit} aria-busy={submitting}>
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
      {booking && <label className="text-sm font-medium sm:col-span-2">Preferred date<input name="date" type="date" className="field mt-1" />{errors["date"] && <span className="text-xs text-destructive">{errors["date"]}</span>}</label>}
      <label className="text-sm font-medium sm:col-span-2">Message<textarea name="message" rows={4} className="field mt-1" /></label>
      {submitError && <p role="alert" className="text-sm text-destructive sm:col-span-2">{submitError}</p>}
      <button disabled={submitting} className="btn-gold justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2">
        {submitting ? "Saving…" : booking ? "Request Consultation" : "Send Enquiry"}
      </button>
    </form>
  );
}
