import { Navigate } from "react-router-dom";
import { getUserRoles } from "@/features/auth/utlitlies/roles";
import type { UserRole } from "@/features/auth/utlitlies/roles";

interface Props {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

const RoleProtectedRoute = ({ allowedRoles, children }: Props) => {
  const userRoles = getUserRoles();

  const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
