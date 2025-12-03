import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import DashboardSidebar from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset>
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div className="flex-1" />
          <DashboardHeader />
        </div>

        <main className="flex-1 flex flex-col gap-4 p-4">
          <div className="rounded-xl p-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
