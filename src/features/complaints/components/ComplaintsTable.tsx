/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
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
import { FileText, Edit, UserPen } from "lucide-react";

interface ComplaintsTableProps {
  complaints: Complaint[];
  currentUser: {
    id: string;
    role: string;
    governmentUnitId?: string;
    name?: string;
  };
  onView: (complaint: Complaint) => void;
  onOpenAssign: (
    e: React.MouseEvent<HTMLButtonElement>,
    complaint: Complaint
  ) => void;
  onOpenDropdown: (
    e: React.MouseEvent<HTMLDivElement>,
    complaint: Complaint
  ) => void;
  onAddNote: (complaint: Complaint) => void;
}

const statusColors: Record<string, string> = {
  Open: "bg-green-500",
  Assigned: "bg-indigo-500",
  "In Progress": "bg-yellow-500",
  Closed: "bg-gray-500",
};

const ComplaintsTable: React.FC<ComplaintsTableProps> = ({
  complaints,
  currentUser,
  onView,
  onOpenAssign,
  onOpenDropdown,
  onAddNote,
}) => {
  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow className="bg-muted/40">
          <TableHead className="font-medium text-foreground">
            Reference
          </TableHead>
          <TableHead className="font-medium text-foreground">Title</TableHead>
          <TableHead className="font-medium text-foreground">User</TableHead>
          {currentUser.role === "Admin" && (
            <TableHead className="font-medium text-foreground">
              Government Unit
            </TableHead>
          )}
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
        {complaints.map((c) => (
          <TableRow key={c.id} className="hover:bg-muted/20 transition-colors">
            <TableCell className="text-left font-medium text-foreground">
              {c.referenceNumber}
            </TableCell>
            <TableCell className="text-left text-muted-foreground">
              {c.title}
            </TableCell>
            <TableCell className="text-left text-muted-foreground">
              {c.userName}
            </TableCell>
            {currentUser.role === "Admin" && (
              <TableCell className="text-left text-muted-foreground">
                {c.governmentUnit}
              </TableCell>
            )}
            <TableCell className="text-left text-muted-foreground">
              {c.type}
            </TableCell>

            <TableCell className="text-center">
              <div
                className={`px-3 py-1 rounded-full text-white text-sm font-semibold cursor-pointer ${
                  statusColors[c.status]
                }`}
                onClick={(e) => onOpenDropdown(e, c)}
              >
                {c.status}
              </div>
            </TableCell>

            <TableCell className="flex gap-2 justify-center">
              {/* View Complaint */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onView(c)}
                title="View Complaint"
                className="text-primary hover:bg-primary/10"
              >
                <FileText className="h-5 w-5" />
              </Button>

              {/* Add Note */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onAddNote(c)}
                title="Add Note"
                className="text-gold hover:bg-gold/10"
              >
                <Edit className="h-5 w-5" />
              </Button>

              {/* Assign */}
              {(currentUser.role === "Admin" ||
                (currentUser.role === "Manager" &&
                  c.governmentUnitId === currentUser.governmentUnitId)) && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => onOpenAssign(e as any, c)}
                  className="text-indigo-500 hover:bg-indigo-100"
                >
                  <UserPen className="h-5 w-5" />
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ComplaintsTable;
