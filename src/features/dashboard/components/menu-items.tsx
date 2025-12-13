import { isEmployee } from "@/features/auth/utlitlies/roles";
import {
  BarChart3,
  Building,
  LogIn,
  Users,
  type LucideIcon,
} from "lucide-react";

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
