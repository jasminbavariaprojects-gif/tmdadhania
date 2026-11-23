// Client-safe: the lead stages are shared by the admin UI and the server functions,
// and the database CHECK constraint accepts exactly these values.
export const LEAD_STATUSES = ["new", "contacted", "scheduled", "closed"] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
