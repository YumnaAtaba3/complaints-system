/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Users,
  Settings,
  Building,
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
    title: t("governmentUnits"), 
    url: "/dashboard/government-units",
    icon: Building,
  },
  {
    title: t("settings"),
    url: "/dashboard/settings",
    icon: Settings,
  },
];
