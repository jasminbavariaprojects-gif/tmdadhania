import { describe, expect, it } from "vitest";
import { bookingSubmissionSchema, enquirySubmissionSchema } from "@/lib/submission-validation";

const validEnquiry = {
  name: "Asha Shah",
  phone: "+91 98765 43210",
  email: "asha@example.com",
  service: "gst",
  message: "Please help with our GST returns.",
};

describe("submission validation", () => {
  it("accepts a complete enquiry with a real service", () => {
    expect(enquirySubmissionSchema.safeParse(validEnquiry).success).toBe(true);
  });

  it("rejects an invalid email address", () => {
    expect(enquirySubmissionSchema.safeParse({ ...validEnquiry, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects a service that is not offered on the website", () => {
    expect(enquirySubmissionSchema.safeParse({ ...validEnquiry, service: "unknown-service" }).success).toBe(false);
  });

  it("accepts a booking date in the date input format", () => {
    const result = bookingSubmissionSchema.safeParse({ ...validEnquiry, date: "2026-12-15" });
    expect(result.success).toBe(true);
    expect(result.data?.date).toBe("2026-12-15");
  });

  it("treats an empty preferred booking date as optional", () => {
    const result = bookingSubmissionSchema.safeParse({ ...validEnquiry, date: "" });
    expect(result.success).toBe(true);
    expect(result.data?.date).toBeUndefined();
  });
});
