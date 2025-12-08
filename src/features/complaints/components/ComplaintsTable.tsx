/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Complaint } from "../types";
import { Button } from "@/shared/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { FileText, Edit, UserPen, Loader2 } from "lucide-react";
import ComplaintsService from "../services/api";

interface ComplaintsTableProps {
  complaints: Complaint[];

  loading?: boolean;
  onOpenAssign: (
    e: React.MouseEvent<HTMLButtonElement>,
    complaint: Complaint
  ) => void;
  onStatusChange: (id: number, status: string) => void;
  onAddNote: (complaint: Complaint) => void;
}

// Border & text color for status
const statusColors: Record<string, string> = {
  pending: "border-yellow-600 text-yellow-700",
  open: "border-green-600 text-green-700",
  "in-review": "border-blue-600 text-blue-700",
  resolved: "border-gray-600 text-gray-700",
  rejected: "border-red-600 text-red-700",
};

const ComplaintsTable: React.FC<ComplaintsTableProps> = ({
  complaints,
  loading = false,
  onOpenAssign,
  onStatusChange,
  onAddNote,
}) => {
  const [statusOptions, setStatusOptions] = useState<Record<string, string>>(
    {}
  );
  const [optionsLoading, setOptionsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatusOptions = async () => {
      try {
        setOptionsLoading(true);
        const data = await ComplaintsService.getStatusOptions();

        const englishLabels: Record<string, string> = {
          pending: "Pending",
          open: "Open",
          "in-review": "In Review",
          resolved: "Resolved",
          rejected: "Rejected",
        };

        setStatusOptions(
          Object.keys(data).reduce((acc, key) => {
            acc[key] = englishLabels[key] ?? key;
            return acc;
          }, {} as Record<string, string>)
        );
      } catch (err) {
        console.error("Failed to fetch status options", err);
      } finally {
        setOptionsLoading(false);
      }
    };

    fetchStatusOptions();
  }, []);

  if (loading || optionsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-12 w-12 text-muted-foreground" />
      </div>
    );
  }

  const handleRowClick = (c: Complaint) => {
    navigate(`/dashboard/complaints/${c.id}`);
  };

  if (!complaints || complaints.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <FileText className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No Complaints Found
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          There are currently no complaints to display.
        </p>
       
      </div>
    );
  }

  return (
    <Table className="min-w-full border border-border rounded-lg overflow-hidden shadow-md">
      <TableHeader>
        <TableRow className="bg-muted/40">
          <TableHead className="font-medium text-foreground">
            Reference
          </TableHead>
          <TableHead className="font-medium text-foreground">Title</TableHead>
          <TableHead className="font-medium text-foreground">User</TableHead>

          <TableHead className="font-medium text-foreground">
            Government Unit
          </TableHead>

          <TableHead className="font-medium text-foreground">Type</TableHead>
          <TableHead className="font-medium text-foreground text-center">
            Status
          </TableHead>
          <TableHead className="font-medium text-foreground text-center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {complaints.map((c, idx) => (
          <TableRow
            key={`${c.id}-${idx}`}
            className="hover:bg-muted/20 transition-colors cursor-pointer"
            onClick={() => handleRowClick(c)}
          >
            <TableCell className="text-left font-medium text-foreground">
              {c.reference_number}
            </TableCell>
            <TableCell className="text-left text-muted-foreground">
              {c.title}
            </TableCell>
            <TableCell className="text-left text-muted-foreground">
              {c.user ? `${c.user.first_name} ${c.user.last_name}` : "N/A"}
            </TableCell>

            <TableCell className="text-left text-muted-foreground">
              {c.government_unit?.name ?? "N/A"}
            </TableCell>

            <TableCell className="text-left text-muted-foreground">
              {c.type?.name?.en ?? "N/A"}
            </TableCell>

            <TableCell className="text-center">
              <select
                value={c.status}
                onChange={(e) => onStatusChange(c.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className={`px-3 py-2 rounded-full text-sm font-semibold cursor-pointer border-2 ${
                  statusColors[c.status] ?? "border-gray-400 text-gray-600"
                }`}
                style={{ minWidth: "140px", maxHeight: "40px" }}
              >
                {Object.entries(statusOptions).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </TableCell>

            <TableCell className="flex gap-2 justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRowClick(c);
                }}
                title="View Complaint"
                className="text-primary hover:bg-primary/10"
              >
                <FileText className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddNote(c);
                }}
                title="Add Note"
                className="text-gold hover:bg-gold/10"
              >
                <Edit className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenAssign(e as any, c);
                }}
                className="text-indigo-500 hover:bg-indigo-100"
              >
                <UserPen className="h-5 w-5" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ComplaintsTable;
