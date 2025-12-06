import React from "react";
import ComplaintsService from "../services/api";
import type { Complaint } from "../types";
import { FileDown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface Props {
  allComplaints: Complaint[];
  filteredComplaints: Complaint[];

}

const ExportButtons: React.FC<Props> = ({ allComplaints, filteredComplaints }) => {
  const handleExport = async (data: Complaint[], name: string) => {
    if (!data.length) {
      alert("No complaints to export.");
      return;
    }

    try {
      const blob = await ComplaintsService.exportComplaints();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export complaints.");
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleExport(allComplaints, "all-complaints")}
        className="flex gap-2 px-4 py-2 rounded-xl font-semibold shadow-md bg-gold text-white hover:bg-gold/90 transition items-center"
        disabled={allComplaints.length === 0}
      >
        <FileDown className="h-4 w-4" /> Export All
      </Button>

      <Button
        onClick={() => handleExport(filteredComplaints, "filtered-complaints")}
        className="flex gap-2 px-4 py-2 rounded-xl font-semibold shadow-md bg-gold text-white hover:bg-gold/90 transition items-center"
        disabled={filteredComplaints.length === 0}
      >
        <FileDown className="h-4 w-4" /> Export Filtered
      </Button>
    </div>
  );
};

export default ExportButtons;
