// import { useTranslation } from "react-i18next";
// import { useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   FileText,
//   Clock,
//   RefreshCw,
//   CheckCircle,
//   BarChart3,
//   Users,
//   Settings,
// } from "lucide-react";
// import { NavLink } from "@/shared/components/nav-link";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/shared/components/ui/sidebar";

// const DashboardSidebar = () => {
//   const { t } = useTranslation();
//   const location = useLocation();
//   const { state } = useSidebar();
//   const collapsed = state === "collapsed";

//   const menuItems = [
//     {
//       title: t("overview"),
//       url: "/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       title: t("allComplaints"),
//       url: "/dashboard/complaints",
//       icon: FileText,
//     },
//     // {
//     //   title: t("pending"),
//     //   url: "/dashboard/pending",
//     //   icon: Clock,
//     // },
//     // {
//     //   title: t("inProgress"),
//     //   url: "/dashboard/in-progress",
//     //   icon: RefreshCw,
//     // },
//     // {
//     //   title: t("resolved"),
//     //   url: "/dashboard/resolved",
//     //   icon: CheckCircle,
//     // },
//   ];

//   const secondaryItems = [
//     {
//       title: t("statistics"),
//       url: "/dashboard/statistics",
//       icon: BarChart3,
//     },
//     {
//       title: t("users"),
//       url: "/dashboard/users",
//       icon: Users,
//     },
//     {
//       title: t("settings"),
//       url: "/dashboard/settings",
//       icon: Settings,
//     },
//   ];

//   return (
//     <Sidebar collapsible="icon" variant="sidebar">
//       <SidebarHeader>
//         {!collapsed ? (
//           <div className="space-y-1 px-2 py-2">
//             <h2 className="text-xl font-bold text-sidebar-primary">
//               {t("complaints")}
//             </h2>
//             <p className="text-xs text-sidebar-foreground/70">
//               {t("governmentSystem")}
//             </p>
//           </div>
//         ) : (
//           <div className="flex items-center justify-center px-2 py-2">
//             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
//               <FileText className="h-4 w-4" />
//             </div>
//           </div>
//         )}
//       </SidebarHeader>
//       <SidebarContent>
//         {/* Main Navigation */}
//         <SidebarGroup>
//           {!collapsed && (
//             <SidebarGroupLabel>{t("dashboard")}</SidebarGroupLabel>
//           )}
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {menuItems.map((item) => {
//                 const isActive =
//                   item.url === "/dashboard"
//                     ? location.pathname === "/dashboard"
//                     : location.pathname.startsWith(item.url);
//                 return (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton
//                       asChild
//                       tooltip={item.title}
//                       isActive={isActive}
//                     >
//                       <NavLink
//                         to={item.url}
//                         end={item.url === "/dashboard"}
//                         className="hover:bg-sidebar-accent"
//                         activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
//                       >
//                         <item.icon className="h-5 w-5" />
//                         <span>{item.title}</span>
//                       </NavLink>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 );
//               })}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         {/* Secondary Navigation */}
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {secondaryItems.map((item) => {
//                 const isActive = location.pathname.startsWith(item.url);
//                 return (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton
//                       asChild
//                       tooltip={item.title}
//                       isActive={isActive}
//                     >
//                       <NavLink
//                         to={item.url}
//                         className="hover:bg-sidebar-accent"
//                         activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
//                       >
//                         <item.icon className="h-5 w-5" />
//                         <span>{item.title}</span>
//                       </NavLink>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 );
//               })}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// };

// export default DashboardSidebar;
