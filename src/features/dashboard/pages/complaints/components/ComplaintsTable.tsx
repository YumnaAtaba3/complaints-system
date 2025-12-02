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
import { FileText, Edit, UserPen } from "lucide-react"; // changed icons

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

const ComplaintsTable: React.FC<ComplaintsTableProps> = ({
  complaints,
  currentUser,
  onView,
  onOpenAssign,
  onOpenDropdown,
  onAddNote,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>User</TableHead>
          {currentUser.role === "Admin" && (
            <TableHead>Government Unit</TableHead>
          )}
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {complaints.map((c) => (
          <TableRow key={c.id} className="hover:bg-gray-50">
            <TableCell className="text-left">{c.referenceNumber}</TableCell>
            <TableCell className="text-left">{c.title}</TableCell>
            <TableCell className="text-left">{c.userName}</TableCell>
            {currentUser.role === "Admin" && (
              <TableCell className="text-left">{c.governmentUnit}</TableCell>
            )}
            <TableCell className="text-left">{c.type}</TableCell>

            <TableCell className="text-center relative">
              <div
                className={`px-3 py-1 rounded-full text-white text-sm font-semibold cursor-pointer
                  ${c.status === "Open" ? "bg-green-500" : ""}
                  ${c.status === "Assigned" ? "bg-indigo-500" : ""}
                  ${c.status === "In Progress" ? "bg-yellow-500" : ""}
                  ${c.status === "Closed" ? "bg-gray-500" : ""}`}
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
              >
                <FileText className="h-6 w-6" />
              </Button>

              {/* Add Note */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onAddNote(c)}
                title="Add Note"
              >
                <Edit className="h-6 w-6" />
              </Button>

              {/* Assign */}
              {(currentUser.role === "Admin" ||
                (currentUser.role === "Manager" &&
                  c.governmentUnitId === currentUser.governmentUnitId)) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => onOpenAssign(e as any, c)}
                >
                  <UserPen />
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
