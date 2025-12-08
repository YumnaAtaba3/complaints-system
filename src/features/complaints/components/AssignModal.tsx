/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Loader2, AlertCircle } from "lucide-react";
import { type User } from "../services/UsersService";

interface AssignModalProps {
  show: boolean;
  complaintReference: string;
  selectedEmployeeId: number | null;
  setSelectedEmployeeId: (id: number) => void;
  filter: string;
  setFilter: (value: string) => void;
  visibleEmployees: User[];
  isLoadingEmployees: boolean;
  isAssigning: boolean;
  assignError?: any;
  onClose: () => void;
  onAssign: () => void;
}

const AssignModal: React.FC<AssignModalProps> = ({
  show,
  complaintReference,
  selectedEmployeeId,
  setSelectedEmployeeId,
  filter,
  setFilter,
  visibleEmployees = [],
  isLoadingEmployees,
  isAssigning,
  assignError,
  onClose,
  onAssign,
}) => {
  if (!show) return null;

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="p-5 flex-1 overflow-auto flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Assign Complaint</h3>
          <p className="text-sm text-gray-600 mb-4">
            Complaint: <strong>{complaintReference}</strong>
          </p>

          <Input
            placeholder="Filter employees..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            disabled={isLoadingEmployees || isAssigning}
            className="mb-3 bg-white"
          />

          <div className="flex-1  overflow-auto  p-2 mb-3">
            {isLoadingEmployees ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Loader2 className="animate-spin w-8 h-8 mb-2" />
                <span>Loading employees...</span>
              </div>
            ) : visibleEmployees.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <AlertCircle className="w-6 h-6 mb-1" />
                <span>No available employees.</span>
              </div>
            ) : (
              visibleEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className={`p-2 rounded cursor-pointer flex items-center justify-between border mb-1 transition-colors ${
                    selectedEmployeeId === emp.id
                      ? "bg-sky-50 border-sky-300"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedEmployeeId(emp.id)}
                >
                  <div>
                    <div className="font-medium">
                      {emp.first_name} {emp.last_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Unit: {emp.government_unit?.name ?? "N/A"}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {assignError && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 p-2 rounded mb-3  overflow-clip text-sm break-words">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>
                {(assignError as any)?.message ?? "Failed to assign employee."}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 p-5 border-t">
          <Button
            onClick={onClose}
            className="bg-gray-200"
            disabled={isAssigning}
          >
            Cancel
          </Button>
          <Button
          className="text-white bg-foreground"
            onClick={onAssign}
            disabled={isAssigning || isLoadingEmployees || !selectedEmployeeId}
          >
            {isAssigning ? "Assigning..." : "Assign"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
