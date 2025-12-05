const LOCAL_KEY = "auth_token_local";
const SESSION_KEY = "auth_token_session";

export function setToken(token: string, remember: boolean) {
  if (remember) {
    localStorage.setItem(LOCAL_KEY, token);
    sessionStorage.removeItem(SESSION_KEY);
  } else {
    sessionStorage.setItem(SESSION_KEY, token);
    localStorage.removeItem(LOCAL_KEY);
  }
}

export function getToken(): string | null {
  return (
    localStorage.getItem(LOCAL_KEY) ||
    sessionStorage.getItem(SESSION_KEY) ||
    null
  );
}

export function clearToken() {
  localStorage.removeItem(LOCAL_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}
