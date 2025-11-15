import { useUserProfile } from "../services/queries";

export function useIsLoggedIn() {
  const { data: user, isLoading } = useUserProfile();
  console.log(Boolean(user));
  return { isLoggedIn: Boolean(user), isLoading };
}
