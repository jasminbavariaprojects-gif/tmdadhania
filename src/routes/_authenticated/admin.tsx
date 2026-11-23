import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Phone, Mail, CalendarClock, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listLeads, updateLead, type Lead } from "@/lib/admin.functions";
import { LEAD_STATUSES } from "@/lib/lead-status";
import { firm, services } from "@/lib/site";

const leadsQueryOptions = {
  queryKey: ["admin", "leads"],
  queryFn: () => listLeads(),
};

export const Route = createFileRoute("/_authenticated/admin")({
  loader: ({ context }) => context.queryClient.ensureQueryData(leadsQueryOptions),
  head: () => ({
    meta: [
      { title: `Leads | ${firm.name}` },
      { name: "description", content: "Enquiries and consultation requests received through the website." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: `Leads | ${firm.name}` },
      { property: "og:description", content: "Private area for the firm's team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  scheduled: "Scheduled",
  closed: "Closed",
};

function serviceTitle(slug: string) {
  return services.find((service) => service.slug === slug)?.title ?? slug;
}

function when(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function LeadCard({ lead, kind }: { lead: Lead; kind: "enquiry" | "booking" }) {
  const queryClient = useQueryClient();
  const save = useServerFn(updateLead);
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.admin_notes ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const dirty = status !== lead.status || notes !== (lead.admin_notes ?? "");

  async function handleSave() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await save({
        data: { kind, id: lead.id, status: status as (typeof LEAD_STATUSES)[number], notes: notes.trim() || null },
      });
      setSaved(true);
      await queryClient.invalidateQueries({ queryKey: ["admin", "leads"] });
    } catch {
      setError("We could not save that change. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="rounded-lg border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold text-primary">{lead.name}</h3>
          <p className="text-sm text-muted-foreground">{serviceTitle(lead.service)} · received {when(lead.created_at)}</p>
        </div>
        <span className="rounded-full border border-gold bg-gold-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          {statusLabels[lead.status] ?? lead.status}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-1.5 font-medium text-primary">
          <Phone className="h-4 w-4 text-gold" />{lead.phone}
        </a>
        <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 font-medium text-primary">
          <Mail className="h-4 w-4 text-gold" />{lead.email}
        </a>
        {lead.preferred_date && (
          <span className="flex items-center gap-1.5 font-medium text-primary">
            <CalendarClock className="h-4 w-4 text-gold" />Wants {lead.preferred_date}
          </span>
        )}
      </div>

      {lead.message && <p className="mt-3 rounded-md bg-muted p-3 text-sm whitespace-pre-wrap">{lead.message}</p>}

      <div className="mt-4 grid gap-3 sm:grid-cols-[10rem_1fr]">
        <label className="text-sm font-medium">
          Status
          <select value={status} onChange={(e) => { setStatus(e.target.value); setSaved(false); }} className="field mt-1">
            {LEAD_STATUSES.map((value) => (
              <option key={value} value={value}>{statusLabels[value]}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Internal note
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
            placeholder="Who called, what was agreed…"
            className="field mt-1"
          />
        </label>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button type="button" onClick={handleSave} disabled={busy || !dirty} className="btn-navy disabled:cursor-not-allowed disabled:opacity-50">
          {busy ? "Saving…" : "Save"}
        </button>
        {dirty && !busy && <span className="text-xs text-muted-foreground">Unsaved changes</span>}
        {saved && !dirty && <span className="text-xs text-success">Saved</span>}
        {error && <span role="alert" className="text-sm text-destructive">{error}</span>}
      </div>
    </article>
  );
}

function LeadList({ leads, kind }: { leads: Lead[]; kind: "enquiry" | "booking" }) {
  if (leads.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Nothing here yet. Submissions from the website appear automatically.
      </p>
    );
  }
  return (
    <div className="grid gap-4">
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} kind={kind} />
      ))}
    </div>
  );
}

function AdminPage() {
  const { data } = useSuspenseQuery(leadsQueryOptions);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <section className="container-site py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Private area</p>
          <h1 className="mt-1 font-display text-4xl font-bold text-primary">Leads</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {data.enquiries.length} enquiries · {data.bookings.length} consultation requests
          </p>
        </div>
        <button type="button" onClick={handleSignOut} className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-primary hover:bg-muted">
          <LogOut className="h-4 w-4" />Sign out
        </button>
      </div>

      <Tabs defaultValue="enquiries" className="mt-8">
        <TabsList>
          <TabsTrigger value="enquiries">Enquiries ({data.enquiries.length})</TabsTrigger>
          <TabsTrigger value="bookings">Consultation requests ({data.bookings.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="enquiries" className="mt-5">
          <LeadList leads={data.enquiries} kind="enquiry" />
        </TabsContent>
        <TabsContent value="bookings" className="mt-5">
          <LeadList leads={data.bookings} kind="booking" />
        </TabsContent>
      </Tabs>
    </section>
  );
}
