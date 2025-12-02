// src/features/users/types.ts

export interface GovernmentUnit {
  id: number;
  name: string;
  name_translation: {
    ar: string;
    en: string;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
