"use client";

import { useStatistics } from "../services/query";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Clock,
  CheckCircle,
  FileWarning,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { StatisticsCard } from "../components/kpi-cards";
import { ComplaintsLineChart } from "../components/line-chart";
import { ComplaintsPieChart } from "../components/pie-chart";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";

export const StatisticsPage = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useStatistics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground">{t("loadingStatistics")}</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("error")}</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : t("failedToLoadStatistics")}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gold mb-2">{t("statistics")}</h1>
        <p className="text-muted-foreground">{t("statisticsDescription")}</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard
          title={t("totalComplaints")}
          value={data.overview.total_complaints}
          icon={<FileText className="w-5 h-5" />}
        />
        <StatisticsCard
          title={t("pendingComplaints")}
          value={data.overview.pending_complaints}
          icon={<Clock className="w-5 h-5" />}
        />
        <StatisticsCard
          title={t("resolvedComplaints")}
          value={data.overview.resolved_complaints}
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <StatisticsCard
          title={t("newComplaints")}
          value={data.overview.new_complaints}
          icon={<FileWarning className="w-5 h-5" />}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ComplaintsLineChart data={data.line_chart} />
        <ComplaintsPieChart data={data.pie_chart} />
      </div>
    </div>
  );
};
