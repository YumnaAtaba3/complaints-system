export interface GovernmentUnit {
  id: number;
  name: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  national_number: string | null;
  phone_verified_at: string | null;
  government_unit: GovernmentUnit;
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  first_page_url: string;
  last_page_url: string;
  prev_page_url: string | null;
  next_page_url: string | null;
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

export interface UsersResponse {
  users: User[];
  pagination: Pagination;
}
