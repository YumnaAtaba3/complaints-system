// src/complaints/mockUser.ts
import { type User } from "./types";

export const currentUser: User = {
  id: "u-001",
  role: "Admin", // change to "Manager" or "Employee" to test
  governmentUnitId: "gov-1",
  name: "System Admin",
};
