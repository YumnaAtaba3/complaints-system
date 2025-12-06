// src/complaints/mockUser.ts
import { type User } from "../types";

export const currentUser: User = {
  id: 1,
  role: "Admin", // change to "Manager" or "Employee" to test
  governmentUnitId: 1,
  name: "System Admin",
};
