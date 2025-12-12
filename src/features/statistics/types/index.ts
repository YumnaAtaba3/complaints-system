import type React from "react";
export interface StatisticsOverview {
  total_complaints: number;
  pending_complaints: number;
  resolved_complaints: number;
  new_complaints: number;
}

export interface MonthlyComplaint {
  month: number;
  month_name: string;
  count: number;
}

export interface GovernmentUnitDistribution {
  government_unit_id: number;
  government_unit_name: string;
  count: number;
  percentage: number;
  [key: string]: string | number; // ← REQUIRED FOR RECHARTS
}

export interface StatisticsData {
  overview: StatisticsOverview;
  line_chart: MonthlyComplaint[];
  pie_chart: GovernmentUnitDistribution[];
}

export interface StatisticsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}
