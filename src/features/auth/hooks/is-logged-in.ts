import { useAuthToken } from "../hooks/auth-state";

export function useIsLoggedIn() {
  const token = useAuthToken();

  return {
    isLoggedIn: Boolean(token),
    isLoading: false,
  };
}
