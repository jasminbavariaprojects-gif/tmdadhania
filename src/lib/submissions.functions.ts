import { createServerFn } from "@tanstack/react-start";
import { bookingSubmissionSchema, enquirySubmissionSchema } from "@/lib/submission-validation";

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquirySubmissionSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: submission, error } = await supabaseAdmin
      .from("enquiry_submissions")
      .insert({
        name: data.name,
        phone: data.phone,
        email: data.email,
        service: data.service,
        message: data.message || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Unable to save enquiry:", error.message);
      throw new Error("We could not save your enquiry. Please try again.");
    }

    return { id: submission.id };
  });

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSubmissionSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: submission, error } = await supabaseAdmin
      .from("booking_requests")
      .insert({
        name: data.name,
        phone: data.phone,
        email: data.email,
        service: data.service,
        preferred_date: data.date || null,
        message: data.message || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Unable to save booking:", error.message);
      throw new Error("We could not save your consultation request. Please try again.");
    }

    return { id: submission.id };
  });
