// -----------------------------
// Localized String
// -----------------------------
export interface LocalizedString {
  en: string;
  ar: string;
}

// -----------------------------
// Media / Attachment
// -----------------------------
export interface Attachment {
  id: number;
  url: string;
}

// -----------------------------
// User and Roles
// -----------------------------
export interface UserRole {
  id: number;
  name: string;
  label: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone?: string | null;
  email?: string | null;
  national_number?: string | null;
  phone_verified_at?: string | null;
  roles: UserRole[];
  created_at: string;
  updated_at: string;
}

// -----------------------------
// Government Unit
// -----------------------------
export interface GovernmentUnit {
  id: number;
  name: string;
  name_translation: LocalizedString;
  is_active: boolean;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

// -----------------------------
// Complaint Type
// -----------------------------
export interface ComplaintType {
  id: number;
  name: LocalizedString;
}

// -----------------------------
// Complaint
// -----------------------------
export interface Complaint {
  id: number;
  title: string;
  description: string;
  address: string;
  reference_number: string;
  status: string;
  user: User;
  type: ComplaintType;
  government_unit: GovernmentUnit;
  assign_to?: User | null;
  attachments: Attachment[];
  created_at: string;
  updated_at: string;
}

// -----------------------------
// Filters for API requests
// -----------------------------
export interface ComplaintFilters {
  search?: string;
  status?: string;
  type_id?: number;
  government_unit_id?: number;
  manager_id?: number;
  page?: number;
}

// -----------------------------
// Manager
// -----------------------------
// types.ts
export interface Manager {
  id: number;
  first_name: string;
  last_name: string;
  email?: string | null;
}

// -----------------------------
// Paginated Response
// -----------------------------
export interface PaginatedResponse<T> {
  data: T[];
  links: Record<string, string | null>;
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
}
