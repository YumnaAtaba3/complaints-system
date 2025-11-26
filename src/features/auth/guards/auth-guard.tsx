
import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/is-logged-in";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useIsLoggedIn();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 text-lg">Checking authentication...</p>
        </div>
      </div>
    );

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

// import { Navigate } from "react-router";
// import React, { type ReactNode } from "react";
// import { useIsLoggedIn } from "../hooks/is-logged-in";

// interface AuthGuardProps {
//   children: ReactNode;
// }

// export function AuthPageGuard({ children }: AuthGuardProps) {
//   const { isLoggedIn } = useIsLoggedIn();

//   if (isLoggedIn) {
//     return <>{children}</>;
//   }

//   return <Navigate to="/login" replace />;
// }

// export function AuthComponentGuard({ children }: AuthGuardProps) {
//   const { isLoggedIn } = useIsLoggedIn();

//   if (isLoggedIn) {
//     return <>{children}</>;
//   }

//   return null;
// }
