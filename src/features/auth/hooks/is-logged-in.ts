import { userStorage } from "../storage";

export function useIsLoggedIn() {
  const token = userStorage.get(); 
  const isLoggedIn = Boolean(token);

  return { isLoggedIn, isLoading: false }; 
}
