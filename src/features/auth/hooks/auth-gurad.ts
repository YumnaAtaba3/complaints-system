import { useIsLoggedIn } from "./is-logged-in";

export function useAuthGuard() {
  const { isLoggedIn } = useIsLoggedIn();

  return function () {
    return isLoggedIn;
  };
}
