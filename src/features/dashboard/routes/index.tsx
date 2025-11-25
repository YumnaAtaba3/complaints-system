/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import DashboardLayout from "@/shared/components/dashboard-layout";
import ProtectedRoute from "@/shared/components/protected-route";

const DashboardPage = lazy(() => import("../pages/dashboard"));
const UsersPage = lazy(() => import("../pages/users"));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

export const dashboardRoutes = [
  {
    path: "/dashboard", // ← make absolute
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <DashboardPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "complaints",
        element: (
          <SuspenseWrapper>
            <DashboardPage />
          </SuspenseWrapper>
        ),
      },

      {
        path: "statistics",
        element: (
          <SuspenseWrapper>
            <DashboardPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "users",
        element: (
          <SuspenseWrapper>
            <UsersPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "settings",
        element: (
          <SuspenseWrapper>
            <DashboardPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
];
