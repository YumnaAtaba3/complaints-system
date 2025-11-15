import {
  createBrowserRouter,
  createHashRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom"; // <-- note: react-router-dom, not react-router
import { lazy, Suspense } from "react";
import { LayoutContainer } from "@/shared/layouts/layout-container";
import { authRoutes } from "../features/auth/routes";
import { dashboardRoutes } from "../features/dashboard/routes";

const NotFoundPage = lazy(() => import("../shared/pages/not-found"));

const routes = [
  {
    path: "/",
    element: <LayoutContainer />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      ...authRoutes,
      ...dashboardRoutes,
      {
        path: "*",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
