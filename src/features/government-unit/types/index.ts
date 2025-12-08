// src/features/users/types.ts

export interface GovernmentUnit {
  id: number;
  name: string;
  name_translation: {
    ar: string;
    en: string;
  };
   manager: Manager | null;
  deleted_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}


export interface Manager {
  id: number;
  first_name: string;
  last_name: string;
  email?: string | null;
}


