/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ComplaintsService from "../services/api";
import type { ComplaintFilters } from "../types";
import { FileDown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface Props {
  filters: ComplaintFilters;
}

const ExportButtons: React.FC<Props> = ({ filters }) => {
const handleExport = async (exportAll: boolean) => {
  try {
    const exportFilters = exportAll
      ? {}
      : Object.fromEntries(
          Object.entries(filters).filter(
            ([, value]) =>
              value !== undefined && value !== null && value !== "all"
          )
        );

    const blob = await ComplaintsService.exportComplaints(exportFilters);

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = exportAll ? `all-complaints.csv` : `filtered-complaints.csv`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Export failed:", err);
  }
};


  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleExport(true)}
        className="flex gap-2 px-4 py-2 rounded-xl font-semibold shadow-md bg-gold text-white hover:bg-gold/90 transition items-center"
      >
        <FileDown className="h-4 w-4" /> Export All
      </Button>

      <Button
        onClick={() => handleExport(false)}
        className="flex gap-2 px-4 py-2 rounded-xl font-semibold shadow-md bg-gold text-white hover:bg-gold/90 transition items-center"
      >
        <FileDown className="h-4 w-4" /> Export Filtered
      </Button>
    </div>
  );
};

export default ExportButtons;
