export const APPROVED_ADMIN_EMAIL = "jasmin.bavaria.projects@gmail.com";

export function isApprovedAdminEmail(email: unknown): boolean {
  return typeof email === "string" && email.trim().toLowerCase() === APPROVED_ADMIN_EMAIL;
}
