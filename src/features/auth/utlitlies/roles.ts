export type UserRole = "citizen" | "manager" | "employee" | "admin";

const ROLES_KEY = "roles";

interface BackendRole {
  id: number;
  name: string; // "Admin"
  label: string;
}

export const getUserRoles = (): UserRole[] => {
  try {
    const stored = localStorage.getItem(ROLES_KEY);
    if (!stored) return [];

    const roles = JSON.parse(stored) as BackendRole[];

    // ✅ Normalize backend roles → frontend roles
    return roles
      .map((r) => r.name.toLowerCase())
      .filter(
        (r): r is UserRole =>
          r === "admin" ||
          r === "manager" ||
          r === "employee" ||
          r === "citizen"
      );
  } catch {
    return [];
  }
};

export const hasRole = (role: UserRole) => getUserRoles().includes(role);

export const isEmployee = () => getUserRoles().includes("employee");
