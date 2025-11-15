export type AuthPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

export type UserProfile = {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
};
