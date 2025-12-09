export interface VersionMetaData {
  version_id: number;
  event: string;
  changed_by: {
    id: number;
    first_name: string;
    last_name: string;
  };
  version_created_at: string;
  changed_fields: string[];
  ip_address: string;
  description: string;
}

export interface ComplaintVersion {
  id: number;
  title: string;
  description: string;
  address: string;
  reference_number: string;
  status: string;
  note: string | null;
  user: any; // optional to type later
  type: any;
  government_unit: any;
  assign_to: any;
  version_metadata: VersionMetaData; // <— THIS is the correct name
  created_at: string;
  updated_at: string;
}

export interface ComplaintVersionHistoryResponse {
  data: ComplaintVersion[];
  message?: string;
}
