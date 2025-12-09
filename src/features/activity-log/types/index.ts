// src/features/activity-log/types/activity-log-filters.ts

export interface ActivityEventType {
  name: string;
  value: string;
}

export interface ActivitySubjectType {
  name: string;
  value: string;
  model_name: string;
}

export interface ActivityLogFiltersData {
  event_types: ActivityEventType[];
  subject_types: ActivitySubjectType[];
  log_names: string[];
}

export interface ActivityLogFiltersResponse {
  success: boolean;
  data: ActivityLogFiltersData;
}

export interface ActivityCauserRole {
  id: number;
  name: string;
  label: string;
}

export interface ActivityCauser {
  id: number;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string;
  national_number: string | null;
  phone_verified_at: string | null;
  roles: ActivityCauserRole[];
  created_at: string;
  updated_at: string;
}

export interface ActivitySubject {
  id: number;
  type: string; // Example: "Complaints", "GovernmentUnit"
}

export interface ActivityProperties {
  old_data: any | null;
  new_data: any | null;
  changed_fields: string[];
  event_type: string;
  ip_address: string | null;
  user_agent: string | null;
  reference_number: string | null;
  old_status: string | null;
  new_status: string | null;
  old_assignee_id: number | null;
  new_assignee_id: number | null;
  new_assignee_name: string | null;
  note: string | null;
  attachments: any | null;
  attachment_count: number | null;
}

export interface ActivityLogItem {
  id: number;
  log_name: string;
  event: string;
  event_type: string;
  description: string;
  subject_type: string;
  subject_id: number;
  subject: ActivitySubject | null;
  causer_type: string;
  causer_id: number | null;
  causer: ActivityCauser | null;
  properties: ActivityProperties;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
}

export interface ActivityPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface ActivityLogResponse {
  success: boolean;
  data: ActivityLogItem[];
  pagination: ActivityPagination;
}

export interface ActivityLogFilters {
  event_type?: string;
  subject_type?: string;
  log_name?: string;
  causer_id?: number;
  subject_id?: number;
  date_from?: string;
  date_to?: string;
  per_page?: number;
  page?: number;
}
