import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  FileText,
  Clock,
  RefreshCw,
  CheckCircle,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";
import { NavLink } from "@/shared/components/nav-link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/ui/sidebar";
const DashboardSidebar = () => {
  const { t } = useTranslation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const menuItems = [
    {
      title: t("overview"),
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: t("allComplaints"),
      url: "/dashboard/complaints",
      icon: FileText,
    },
    {
      title: t("pending"),
      url: "/dashboard/pending",
      icon: Clock,
    },
    {
      title: t("inProgress"),
      url: "/dashboard/in-progress",
      icon: RefreshCw,
    },
    {
      title: t("resolved"),
      url: "/dashboard/resolved",
      icon: CheckCircle,
    },
  ];

  const secondaryItems = [
    {
      title: t("statistics"),
      url: "/dashboard/statistics",
      icon: BarChart3,
    },
    {
      title: t("users"),
      url: "/dashboard/users",
      icon: Users,
    },
    {
      title: t("settings"),
      url: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent>
        {/* Logo Section */}
        <div className="px-6 py-8 border-b border-sidebar-border">
          {!collapsed && (
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-sidebar-primary">
                {t("complaints")}
              </h2>
              <p className="text-xs text-sidebar-foreground/70">
                {t("governmentSystem")}
              </p>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-sidebar-foreground/70 px-6">
              {t("dashboard")}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
