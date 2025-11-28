import { appRoutes } from "@/routes";
import { setToken } from "../hooks/auth-state";

export function logoutHelper() {
  setToken(null);
  window.location.href = appRoutes.auth.login; // إذا أردت redirect
}
