/* eslint-disable no-unsafe-finally */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/complaints/AssignModal.tsx
import React, { useEffect, useState } from "react";
import { type Employee } from "../types";
import { getAvailableEmployees } from "../services/employeesService";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

interface AssignModalProps {
  show: boolean;
  complaintId: string;
  complaintReference: string;
  currentUser: {
    id: string;
    role: string;
    governmentUnitId?: string;
    name?: string;
  };
  onClose: () => void;
  onConfirm: (employee: Employee) => void;
}

const AssignModal: React.FC<AssignModalProps> = ({
  show,
  complaintReference,
  currentUser,
  onClose,
  onConfirm,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let mounted = true;
    if (!show) {
      setEmployees([]);
      setSelectedEmployeeId(null);
      setError(null);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const list = await getAvailableEmployees(currentUser);
        if (!mounted) return;
        setEmployees(list);
      } catch (err) {
        if (!mounted) return;
        setEmployees([]);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [show, currentUser]);

  const visibleEmployees = employees.filter((e) =>
    e.name.toLowerCase().includes(filter.trim().toLowerCase())
  );

  const handleConfirm = () => {
    setError(null);
    if (!selectedEmployeeId) {
      setError("Please select an employee to assign.");
      return;
    }
    const chosen = employees.find((e) => e.id === selectedEmployeeId);
    if (!chosen) {
      setError("Selected employee not available.");
      return;
    }
    onConfirm(chosen);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-[520px] p-5">
        <h3 className="text-lg font-semibold mb-2">Assign Complaint</h3>
        <p className="text-sm text-gray-600 mb-4">
          Complaint: <strong>{complaintReference}</strong>
        </p>

        <div className="mb-3">
          <Input
            placeholder="Filter employees..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className="max-h-56 h-56 overflow-auto border rounded p-2 mb-3">
          {loading ? (
            <div>Loading employees...</div>
          ) : visibleEmployees.length === 0 ? (
            <div className="text-sm text-gray-500">No available employees.</div>
          ) : (
            visibleEmployees.map((emp) => (
              <div
                key={emp.id}
                className={`p-2 rounded cursor-pointer flex items-center justify-between ${
                  selectedEmployeeId === emp.id ? "bg-sky-50 border" : ""
                }`}
                onClick={() => setSelectedEmployeeId(emp.id)}
              >
                <div>
                  <div className="font-medium">{emp.name}</div>
                  <div className="text-xs text-gray-500">
                    Unit: {emp.governmentUnitId}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {emp.isActive ? "Active" : "Inactive"}
                </div>
              </div>
            ))
          )}
        </div>

        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

        <div className="flex justify-end gap-2">
          <Button className="bg-gray-200" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading || employees.length === 0}
          >
            Assign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
