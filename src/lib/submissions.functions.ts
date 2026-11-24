import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { bookingSubmissionSchema, enquirySubmissionSchema } from "@/lib/submission-validation";

// Uses the publishable key so submissions work on any host (e.g. Vercel) without the service-role key.
function publicClient() {
  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY");
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquirySubmissionSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await publicClient().from("enquiry_submissions").insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      message: data.message || null,
    });
    if (error) {
      console.error("Unable to save enquiry:", error.message);
      throw new Error("We could not save your enquiry. Please try again.");
    }
    return { ok: true };
  });

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSubmissionSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await publicClient().from("booking_requests").insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      preferred_date: data.date || null,
      message: data.message || null,
    });
    if (error) {
      console.error("Unable to save booking:", error.message);
      throw new Error("We could not save your consultation request. Please try again.");
    }
    return { ok: true };
  });
