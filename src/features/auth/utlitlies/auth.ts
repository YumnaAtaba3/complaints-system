import { appRoutes } from "@/routes";
import { userStorage } from "../storage";

export function logoutHelper() {
  userStorage.remove();

  // Use the correct base for GitHub Pages
  const base = import.meta.env.BASE_URL || "/E-commerce-d/";
  window.location.href = `${base.replace(/\/$/, "")}${appRoutes.auth.login}`;
}
