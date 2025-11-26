// import { Outlet, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { LogOut, User, Settings } from "lucide-react";
// import {
//   SidebarProvider,
//   SidebarTrigger,
//   SidebarInset,
// } from "@/shared/components/ui/sidebar";
// import { Button } from "@/shared/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/shared/components/ui/dropdown-menu";
// import DashboardSidebar from "@/shared/components/dashboard-sidebar";
// import { ThemeToggle } from "@/shared/components/theme-toggle";
// import { LanguageToggle } from "@/shared/components/language-toggle";
// import { useAuthStore } from "@/stores/use-auth-store";

// const DashboardLayout = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { user, logout } = useAuthStore();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <SidebarProvider>
//       <DashboardSidebar />
//       <SidebarInset>
//         {/* Header */}
//         <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
//           <div className="flex items-center gap-2">
//             <SidebarTrigger />
//           </div>
//           <div className="flex flex-1 items-center justify-end gap-2">
//             <ThemeToggle />
//             <LanguageToggle />

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="h-9 w-9 ">
//                   <User className="h-5 w-5" />
//                 </Button>
//               </DropdownMenuTrigger>

//               {/* ➜ Add z-50 here */}
//               <DropdownMenuContent align="end" className="w-56 z-50 bg-white">
//                 <DropdownMenuLabel>
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium">{user?.name}</p>
//                     <p className="text-xs text-muted-foreground">
//                       {user?.email}
//                     </p>
//                   </div>
//                 </DropdownMenuLabel>

//                 <DropdownMenuSeparator />

//                 <DropdownMenuItem>
//                   <User className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
//                   {t("profile")}
//                 </DropdownMenuItem>

//                 <DropdownMenuItem>
//                   <Settings className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
//                   {t("settings")}
//                 </DropdownMenuItem>

//                 <DropdownMenuSeparator />

//                 <DropdownMenuItem
//                   onClick={handleLogout}
//                   className="text-destructive"
//                 >
//                   <LogOut className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
//                   {t("logout")}
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </header>

//         {/* Main Content */}
//         <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//           <div className="flex-1 rounded-xl bg-muted/50 p-4">
//             <Outlet />
//           </div>
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// };

// export default DashboardLayout;
