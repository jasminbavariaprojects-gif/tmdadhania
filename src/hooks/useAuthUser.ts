import { useSyncExternalStore } from "react";
import {
  getAuthUserServerSnapshot,
  getAuthUserSnapshot,
  subscribeAuthUser,
} from "@/lib/auth-session";

export function useAuthUser() {
  return useSyncExternalStore(subscribeAuthUser, getAuthUserSnapshot, getAuthUserServerSnapshot);
}
