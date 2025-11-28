/* eslint-disable prefer-const */
import { useSyncExternalStore } from "react";
import { userStorage } from "../storage";

let token = userStorage.get() ?? null;
let listeners = new Set<() => void>();

export function setToken(newToken: string | null) {
  token = newToken;

  if (newToken) userStorage.set(newToken);
  else userStorage.remove();

  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  return token;
}


export function useAuthToken() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
