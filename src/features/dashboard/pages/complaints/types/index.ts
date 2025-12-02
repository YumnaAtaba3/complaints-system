/* eslint-disable @typescript-eslint/no-explicit-any */
// src/complaints/types.ts
export type ComplaintStatus = "Open" | "Assigned" | "In Progress" | "Closed";

export type Complaint = {
  id: string;
  title: string;
  referenceNumber: string;
  userName: string;
  userId: string;
  governmentUnit: string;
  governmentUnitId: string;
  type: string;
  description: string;
  status: ComplaintStatus;
  assignedTo?: string | null;
  notes?: string[];
  versionHistory?: Array<string | Record<string, any>>;
};

export type User = {
  id: string;
  role: "Admin" | "Manager" | "Employee" | "Citizen";
  governmentUnitId?: string;
  name?: string;
};

export type Employee = {
  id: string;
  name: string;
  email?: string;
  role: "Employee" | "Manager" | "Admin";
  isActive: boolean;
  governmentUnitId?: string;
  governmentUnit?: string;
};
