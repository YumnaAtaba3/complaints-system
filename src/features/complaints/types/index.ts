// src/complaints/types.ts

// -----------------------------
// Enums
// -----------------------------
export type ComplaintStatus = "New" | "Open" | "Assigned" | "InProgress" | "Resolved" | "Closed";

// -----------------------------
// Types
// -----------------------------
export type LocalizedString = {
  en: string;
  ar: string;
};

export type UserRole = "Admin" | "Manager" | "Employee" | "Citizen";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  phone?: string | null;
  email?: string | null;
  national_number?: string | null;
  phone_verified_at?: string | null;
  roles?: Array<{ id: number; name: string; label: string }>;
  created_at: string;
  updated_at: string;
};

export type GovernmentUnit = {
  id: number;
  name: string;
  name_translation: LocalizedString;
  is_active: boolean;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
  manager_id?: number;
};

export type ComplaintType = {
  id: number;
  name: LocalizedString;
  created_at: string;
  updated_at: string;
};

export type Media = {
  id: number;
  url: string;
  name?: string;
  type?: string;
};

export type Complaint = {
  id: number;
  title: string;
  description: string;
  address: string;
  reference_number: string;
  status: ComplaintStatus;
  user?: User | null;
  type?: ComplaintType;
  government_unit?: GovernmentUnit | null;
  assign_to?: User | null;
  media?: Media[];
  notes?: string[];
  versionHistory?: string[];
  created_at: string;
  updated_at: string;
};

// For authenticated system user
export type CurrentUser = {
  id: string;
  role: UserRole;
  governmentUnitId?: number;
  name?: string;
};

export type Employee = {
  id: number;
  name: string;
  email?: string;
  role: "Employee" | "Manager" | "Admin";
  isActive: boolean;
  governmentUnitId?: number;
  governmentUnit?: string;
};
