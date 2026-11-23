import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/lead-status";

export { LEAD_STATUSES };
export type { LeadStatus };

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  status: string;
  message: string | null;
  admin_notes: string | null;
  created_at: string;
  preferred_date: string | null;
};

const updateSchema = z.object({
  kind: z.enum(["enquiry", "booking"]),
  id: z.string().uuid(),
  status: z.enum(LEAD_STATUSES),
  notes: z.string().trim().max(2000).nullable(),
});

async function assertAdmin(supabase: SupabaseClient<Database>, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error || data !== true) {
    throw new Error("This account is not allowed to view leads.");
  }
}

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);

    const { data: enquiries, error: enquiryError } = await context.supabase
      .from("enquiry_submissions")
      .select("id, name, phone, email, service, status, message, admin_notes, created_at")
      .order("created_at", { ascending: false });

    const { data: bookings, error: bookingError } = await context.supabase
      .from("booking_requests")
      .select("id, name, phone, email, service, status, message, admin_notes, created_at, preferred_date")
      .order("created_at", { ascending: false });

    if (enquiryError || bookingError) {
      throw new Error("We could not load your leads. Please try again.");
    }

    return {
      enquiries: (enquiries ?? []).map((row) => ({ ...row, preferred_date: null })) as Lead[],
      bookings: (bookings ?? []) as Lead[],
    };
  });

export const updateLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => updateSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);

    const patch = { status: data.status, admin_notes: data.notes };

    const result =
      data.kind === "booking"
        ? await context.supabase.from("booking_requests").update(patch).eq("id", data.id)
        : await context.supabase.from("enquiry_submissions").update(patch).eq("id", data.id);

    if (result.error) {
      throw new Error("We could not save that change. Please try again.");
    }

    return { ok: true };
  });
