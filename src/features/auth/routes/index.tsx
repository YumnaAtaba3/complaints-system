import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("../pages/login"));

export const authRoutes = [
  {
    path: "/login",
    element: (
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
        <LoginPage />
      </Suspense>
    ),
  },
];
