/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense, type JSX } from "react";
import DashboardLayout from "../components/dashboard-layout";
import ProtectedRoute from "@/shared/components/protected-route";

const DashboardPage = lazy(() => import("../pages/dashboard"));
const UsersPage = lazy(() => import("../pages/users"));
const Complaints = lazy(() => import("../pages/complaints/index"));
const Statistics = lazy(() => import("../pages/statistics"));
const Settings = lazy(() => import("../pages/settings"));

const Load = (c: JSX.Element) => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center h-screen ">
        <div className="  p-8 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-950 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 text-lg">loading...</p>
        </div>
      </div>
    }
  >
    {c}
  </Suspense>
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
