import { ToastContainer } from "react-toastify";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppRouterProvider } from "./routes/provider";
import { InitializeApp } from "./shared/components/initialize-app";
import "./i18n/config";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <InitializeApp>
        <AppRouterProvider />
        <ToastContainer />
      </InitializeApp>
    </QueryClientProvider>
  );
}

export default App;
