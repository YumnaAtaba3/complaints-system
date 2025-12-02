export const userStorageKey = "token";
export const sessionUserStorageKey = "session_token";

let internalToken: string | null = null;
const listeners = new Set<() => void>();

export function setToken(token: string | null, rememberMe?: boolean) {
  if (typeof window === "undefined") return;

  if (token) {
    if (rememberMe) {
      localStorage.setItem(userStorageKey, token);
      sessionStorage.removeItem(sessionUserStorageKey);
    } else {
      sessionStorage.setItem(sessionUserStorageKey, token);
      localStorage.removeItem(userStorageKey);
    }
  } else {
    localStorage.removeItem(userStorageKey);
    sessionStorage.removeItem(sessionUserStorageKey);
  }

  internalToken = token;
  listeners.forEach((l) => l());
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return internalToken ?? localStorage.getItem(userStorageKey) ?? sessionStorage.getItem(sessionUserStorageKey);
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

import { useSyncExternalStore } from "react";
export function useAuthToken() {
  return useSyncExternalStore(subscribe, () => getToken());
}
