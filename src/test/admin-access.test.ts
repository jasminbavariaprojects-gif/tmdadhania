import { describe, expect, it } from "vitest";

import { sanitizeRedirect } from "@/lib/auth-session";
import { LEAD_STATUSES } from "@/lib/lead-status";

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
