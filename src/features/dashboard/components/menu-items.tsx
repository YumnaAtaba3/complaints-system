/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmployee } from "@/features/auth/utlitlies/roles";
import type { LucideIcon } from "lucide-react";

import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Users,
  Settings,
  Building,
  LogIn,
  History,
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

export interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const dashboardSecondaryMenu = (t: any): MenuItem[] =>
  [
    {
      title: t("statistics"),
      url: "/dashboard/statistics",
      icon: BarChart3,
    },

    !isEmployee()
      ? {
          title: t("users"),
          url: "/dashboard/users",
          icon: Users,
        }
      : null,

    {
      title: t("governmentUnits"),
      url: "/dashboard/government-units",
      icon: Building,
    },

    {
      title: t("activityLog"),
      url: "/dashboard/log",
      icon: LogIn,
    },
  ].filter((item): item is MenuItem => item !== null);
