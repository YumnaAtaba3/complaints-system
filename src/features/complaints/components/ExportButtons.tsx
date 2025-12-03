import React from "react";
import { Button } from "@/shared/components/ui/button";
import { FileDown } from "lucide-react";
import {type Complaint } from "../types";

interface Props {
  allComplaints: Complaint[];
  filteredComplaints: Complaint[];
  isAdmin: boolean;
}

const exportCSV = (data: Complaint[], name: string, isAdmin: boolean) => {
  const rows = [
    [
      "title",
      "referenceNumber",
      "userName",
      "userId",
      isAdmin ? "governmentUnit" : null,
      "type",
      "status",
    ].filter(Boolean),
    ...data.map((c) =>
      [
        c.title,
        c.referenceNumber,
        c.userName,
        c.userId,
        isAdmin ? c.governmentUnit : null,
        c.type,
        c.status,
      ].filter(Boolean)
    ),
  ];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${name}.csv`;
  a.click();
};

const ExportButtons: React.FC<Props> = ({
  allComplaints,
  filteredComplaints,
  isAdmin,
}) => {
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => exportCSV(allComplaints, "all-complaints", isAdmin)}
        className="flex gap-2  px-4 py-2 rounded-xl bg-gradient-to-r from-green-800 to-green-900 text-white font-semibold shadow-md hover:from-green-600 transition  items-center "
      >
        <FileDown className="h-4 w-4 " /> Export All
      </Button>

      <Button
        onClick={() =>
          exportCSV(filteredComplaints, "filtered-complaints", isAdmin)
        }
        className="flex gap-2  px-4 py-2 rounded-xl bg-gradient-to-r from-green-800 to-green-900 text-white font-semibold shadow-md hover:from-green-600 transition  items-center"
      >
        <FileDown className="h-4 w-4" /> Export Filtered
      </Button>
    </div>
  );
};

export default ExportButtons;
