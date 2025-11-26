import { lazy, Suspense, type JSX } from "react";
import DashboardLayout from "../components/dashboard-layout";
import ProtectedRoute from "@/shared/components/protected-route";

const DashboardPage = lazy(() => import("../pages/dashboard"));
const UsersPage = lazy(() => import("../pages/users"));
const Complaints = lazy(() => import("../pages/complaints"));
const Statistics = lazy(() => import("../pages/statistics"));
const Settings = lazy(() => import("../pages/settings"));

const Load = (c: JSX.Element) => (
  <Suspense fallback={<div>Loading...</div>}>{c}</Suspense>
);

export const dashboardRoutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: Load(<DashboardPage />) },
      { path: "complaints", element: Load(<Complaints />) },
      { path: "statistics", element: Load(<Statistics />) },
      { path: "users", element: Load(<UsersPage />) },
      { path: "settings", element: Load(<Settings />) },
    ],
  },
];
