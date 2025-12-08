import { rolesStorage, userStorage } from "@/features/auth/storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const mockUser: User = {
          id: "1",
          email,
          name: "Admin User",
          role: "admin",
        };
        set({ user: mockUser, isAuthenticated: true });
      },

      logout: () => {
        userStorage.remove(); // 🔐 CLEAR TOKEN
        rolesStorage.remove(); // remove roles
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
