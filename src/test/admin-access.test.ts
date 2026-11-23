import { describe, expect, it } from "vitest";

import { sanitizeRedirect } from "@/lib/auth-session";
import { LEAD_STATUSES } from "@/lib/lead-status";
import { isApprovedAdminEmail } from "@/lib/admin-access";

describe("Administrator email restriction", () => {
  it("allows only jasmin.bavaria.projects@gmail.com", () => {
    expect(isApprovedAdminEmail("jasmin.bavaria.projects@gmail.com")).toBe(true);
    expect(isApprovedAdminEmail("JASMIN.BAVARIA.PROJECTS@gmail.com")).toBe(true);
  });

  it("rejects the previous address, every other email and missing email claims", () => {
    expect(isApprovedAdminEmail("jasmin.bavria.projects@gmail.com")).toBe(false);
    expect(isApprovedAdminEmail("blocked.admin@example.com")).toBe(false);
    expect(isApprovedAdminEmail(undefined)).toBe(false);
  });
});

describe("Lead stages", () => {
  it("offers exactly the four stages the database accepts", () => {
    expect(LEAD_STATUSES).toEqual(["new", "contacted", "scheduled", "closed"]);
  });
});

describe("Post-sign-in redirect", () => {
  it("keeps a same-origin path", () => {
    expect(sanitizeRedirect("/admin")).toBe("/admin");
  });

  it("rejects off-site and protocol-relative targets", () => {
    expect(sanitizeRedirect("//evil.example/admin")).toBeNull();
    expect(sanitizeRedirect("https://evil.example/admin")).toBeNull();
    expect(sanitizeRedirect(undefined)).toBeNull();
  });
});
