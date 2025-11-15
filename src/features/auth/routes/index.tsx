import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("../pages/login"));

export const authRoutes = [
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    ),
  },
];
