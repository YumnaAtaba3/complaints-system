import React from "react";
import { Navigate } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/is-logged-in";

export const AuthRedirect: React.FC = () => {
  const { isLoggedIn, isLoading } = useIsLoggedIn();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="p-8 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 text-lg">Checking authentication...</p>
        </div>
      </div>
    );

  return <Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />;
};
