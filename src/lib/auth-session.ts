import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

// One Supabase subscription (owned by the root route) feeds this snapshot store,
// so header/UI affordances can reflect the session without adding their own listener.
let currentUser: User | null = null;
const listeners = new Set<() => void>();

export function setAuthUser(user: User | null) {
  currentUser = user;
  for (const listener of listeners) listener();
}

export function subscribeAuthUser(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getAuthUserSnapshot() {
  return currentUser;
}

// Server render has no localStorage session, so the server snapshot stays null.
export function getAuthUserServerSnapshot() {
  return null;
}

export async function refreshAuthUser() {
  const { data } = await supabase.auth.getSession();
  setAuthUser(data.session?.user ?? null);
}

export function sanitizeRedirect(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  if (!raw.startsWith("/") || raw.startsWith("//")) return null;
  return raw;
}
