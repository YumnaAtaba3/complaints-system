import { userStorage } from "@/features/auth/storage";
import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedRoute({
  children,
}: {
  children?: React.ReactNode;
}) {
  const token = userStorage.get();

  if (!token) {
    // redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // render children if provided, else render nested routes
  return children ? <>{children}</> : <Outlet />;
}
