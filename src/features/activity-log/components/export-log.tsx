/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

import ActivityLogService from "../services/api";
import type { ActivityLogFilters } from "../types";
import { useTranslation } from "react-i18next";

interface Props {
  filters: ActivityLogFilters;
}

const ExportActivityLogButtons: React.FC<Props> = ({ filters }) => {
  const handleExport = async (exportAll: boolean) => {
    try {
      const exportFilters = exportAll
        ? {}
        : Object.fromEntries(
            Object.entries(filters).filter(
              ([, value]) =>
                value !== undefined &&
                value !== null &&
                value !== "all" &&
                value !== ""
            )
          );

      const blob = await ActivityLogService.exportActivityLogs(exportFilters);

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;

      a.download = exportAll
        ? `all-activity-logs.csv`
        : `filtered-activity-logs.csv`;

      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Activity logs export failed:", err);
    }
  };
  const { t } = useTranslation();

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleExport(true)}
        className="flex gap-2 px-4 py-2 rounded-xl font-semibold shadow-md bg-gold text-white hover:bg-gold/90 transition items-center"
      >
        <FileDown className="h-4 w-4" />
        {t("exportAll")}
      </Button>

      <Button
        onClick={() => handleExport(false)}
        className="flex gap-2 px-4 py-2 rounded-xl font-semibold shadow-md bg-gold text-white hover:bg-gold/90 transition items-center"
      >
        <FileDown className="h-4 w-4" /> {t("exportFiltered")}
      </Button>
    </div>
  );
};

export default ExportActivityLogButtons;
