/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Media {
  id: number;
  uuid: string;
  model_type: string;
  model_id: number;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  manipulations: any[];
  custom_properties: any[];
  generated_conversions: any[];
  responsive_images: any[];
  order_column: number;
  original_media_type: string | null;
  original_media_id: number | null;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
}

export interface LocalizedName {
  ar: string;
  en: string;
}

export interface GovernmentUnit {
  id: number;
  name: LocalizedName;
  created_at: string;
  updated_at: string;
  manager_id: number | null;
  deleted_at: string | null;
}

export interface ComplaintType {
  id: number;
  name: LocalizedName;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  // Add other user fields if needed
}

export interface Complaint {
  id: number;
  title: string;
  description: string;
  address: string;
  reference_number: string;
  status: string;
  note: string | null;
  user_id: number;
  type_id: number;
  government_unit_id: number;
  created_at: string;
  updated_at: string;
  assign_to: number | null;
  media: Media[];
  government_unit?: GovernmentUnit;
  type?: ComplaintType;
  user?: User | null;
}
