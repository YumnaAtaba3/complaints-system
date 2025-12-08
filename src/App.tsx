import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { AppRouterProvider } from "./routes/provider";
import { InitializeApp } from "./shared/components/initialize-app";
import "./i18n/config";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <InitializeApp>
        <AppRouterProvider />

        {/* Sonner */}
        <Toaster richColors closeButton />
      </InitializeApp>
    </QueryClientProvider>
  );
}

export default App;
