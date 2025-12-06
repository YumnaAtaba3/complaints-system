
import {type  Employee } from "../types";

/**
 * Mock employee dataset
 */
export const mockEmployees: Employee[] = [
  { id: "e-101", name: "John Worker", email: "john@example.com", role: "Employee", isActive: true, governmentUnitId: "gov-1" },
  { id: "e-102", name: "Sara Worker", email: "sara@example.com", role: "Employee", isActive: true, governmentUnitId: "gov-1" },
  { id: "e-103", name: "Khaled Omar", email: "khaled@example.com", role: "Employee", isActive: true, governmentUnitId: "gov-2" },
  { id: "e-104", name: "Inactive Employee", email: "inactive@example.com", role: "Employee", isActive: false, governmentUnitId: "gov-1" },
  { id: "m-201", name: "Manager B", email: "managerb@example.com", role: "Manager", isActive: true, governmentUnitId: "gov-2" },
  { id: "a-001", name: "System Admin", email: "admin@example.com", role: "Admin", isActive: true },
];

/**
 * Returns available employees based on current user role.
 *
 * Admin → all active employees
 * Manager → only active employees in same unit
 * Employee/Citizen → returns empty array (they shouldn't assign)
 */
export const getAvailableEmployees = async (currentUser: { id: string; role: string; governmentUnitId?: string }): Promise<Employee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let employees = mockEmployees.filter((u) => u.role === "Employee" && u.isActive);

      if (currentUser.role === "Manager") {
        employees = employees.filter((e) => e.governmentUnitId === currentUser.governmentUnitId);
      }

      // Admin sees all active employees
      resolve([...employees]);
    }, 150);
  });
};
