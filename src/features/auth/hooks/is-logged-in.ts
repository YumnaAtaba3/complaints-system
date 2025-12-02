import { useAuthToken } from "./auth-state";

export function useIsLoggedIn() {
  const token = useAuthToken();

  
  const isHydrated = token !== undefined;
  return {
    isLoggedIn: Boolean(token),
    isLoading: !isHydrated,
  };
}
