import { z } from "zod";
import { services } from "@/lib/site";

const contactFields = {
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+]?[0-9 ]{10,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  service: z
    .string()
    .trim()
    .min(1, "Select a service")
    .max(100)
    .refine((value) => services.some((service) => service.slug === value), "Select a valid service"),
  message: z.string().trim().max(1000).optional(),
};

export const enquirySubmissionSchema = z.object(contactFields);

export const bookingSubmissionSchema = enquirySubmissionSchema.extend({
  date: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid preferred date").optional(),
  ),
});
