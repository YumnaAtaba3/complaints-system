export type AuthPayload = {
  email: string;
  password: string;
   rememberMe?: boolean; 
};

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      roles: { id: number; name: string; label: string }[];
    };
  };
}

export type UserProfile = {
  id: number;
  email: string;
  name: string;
  role: string;
};
