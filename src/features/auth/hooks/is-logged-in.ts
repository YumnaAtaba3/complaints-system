import { useAuth } from "../context/AuthContext";

export function useIsLoggedIn() {
  const { token } = useAuth();

  const isHydrated = token !== undefined;

  return {
    isLoggedIn: Boolean(token),
    isLoading: !isHydrated,
  };
}
