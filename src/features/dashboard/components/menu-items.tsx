import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";

export const dashboardMenu = (t: any) => [
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
];

export const dashboardSecondaryMenu = (t: any) => [
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
