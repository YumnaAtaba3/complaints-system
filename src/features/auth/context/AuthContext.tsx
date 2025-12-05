/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";
import { getToken, setToken, clearToken } from "../hooks/auth-state";

interface AuthState {
  token: string | null;
  isLoading: boolean;
}

type AuthAction =
  | { type: "SET_TOKEN"; payload: string | null }
  | { type: "STOP_LOADING" };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "STOP_LOADING":
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    token: null,
    isLoading: true,
  });

  // Load token on first render
  useEffect(() => {
    const token = getToken();
    dispatch({ type: "SET_TOKEN", payload: token });
    dispatch({ type: "STOP_LOADING" });
  }, []);

  const login = (token: string, remember: boolean) => {
    setToken(token, remember);
    dispatch({ type: "SET_TOKEN", payload: token });
  };

  const logout = () => {
    clearToken();
    dispatch({ type: "SET_TOKEN", payload: null });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isLoading: state.isLoading,
        login,
        logout,
        isLoggedIn: Boolean(state.token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
