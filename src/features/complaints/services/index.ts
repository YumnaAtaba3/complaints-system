/* eslint-disable @typescript-eslint/no-explicit-any */
// src/complaints/services/complaintsService.ts
import { type Complaint,type
     Employee } from "../types";

/**
 * Mock complaints dataset
 */
export const mockComplaints: Complaint[] = [
  {
    id: "1",
    title: "Late delivery",
    referenceNumber: "REF-112233",
    userName: "Ahmed Ali",
    userId: "U111",
    governmentUnit: "Unit A",
    governmentUnitId: "gov-1",
    type: "Service",
    description: "Delivery delayed 3 days",
    status: "Open",
    assignedTo: undefined,
    notes: [],
    versionHistory: [],
  },
  {
    id: "2",
    title: "Damaged item",
    referenceNumber: "REF-556677",
    userName: "Sara Mohamed",
    userId: "U222",
    governmentUnit: "Unit B",
    governmentUnitId: "gov-2",
    type: "Product",
    description: "Item arrived broken",
    status: "In Progress",
    assignedTo: "e-103",
    notes: [],
    versionHistory: [],
  },
];

export type ActivityLogEntry = {
  actionType: "Complaint Assigned" | "Status Changed" | "Note Added" | string;
  complaintId: string;
  complaintReference?: string;
  assignedEmployeeId?: string | null;
  performedById: string;
  performedByRole?: string;
  timestamp: string;
  meta?: Record<string, any>;
};

export const activityLog: ActivityLogEntry[] = [];

export type Notification = {
  id: string;
  toUserId: string;
  title: string;
  body: string;
  timestamp: string;
  meta?: Record<string, any>;
};

export const notifications: Notification[] = [];

/**
 * Mock update helper
 */
export const updateComplaint = async (complaintId: string, updates: Partial<Complaint>): Promise<Complaint> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = mockComplaints.findIndex((c) => c.id === complaintId);
      if (idx === -1) return reject(new Error("Complaint not found"));
      const updated = { ...mockComplaints[idx], ...updates };
      mockComplaints[idx] = updated;
      resolve({ ...updated });
    }, 150);
  });
};

/**
 * Assign complaint to employee with validation and logging.
 */
export const assignComplaint = async (
  complaintId: string,
  employee: Employee,
  performedBy: { id: string; role: string; name?: string }
): Promise<Complaint> => {
  const now = new Date().toISOString();
  const complaint = mockComplaints.find((c) => c.id === complaintId);
  if (!complaint) throw new Error("Complaint not found");

  // validation: cannot assign inactive employee
  if (!employee.isActive) throw new Error("Cannot assign to an inactive employee");

  // validation: managers only assign inside their unit
  if (performedBy.role === "Manager" && employee.governmentUnitId !== complaint.governmentUnitId) {
    throw new Error("Managers can only assign employees from their own government unit");
  }

  // compute status: if Open -> Assigned, otherwise keep current if it's In Progress/Closed
  const newStatus: Complaint["status"] = complaint.status === "Open" ? "Assigned" : complaint.status === "Assigned" ? "Assigned" : complaint.status;

  // version history entry (string for simplicity)
  const vh = [...(complaint.versionHistory || [])];
  vh.push(`Assigned to ${employee.id} by ${performedBy.role} (${performedBy.id}) at ${now}`);

  // persist
  const updated = await updateComplaint(complaintId, {
    assignedTo: employee.id,
    status: newStatus,
    versionHistory: vh,
  });

  // activity log
  activityLog.push({
    actionType: "Complaint Assigned",
    complaintId: complaint.id,
    complaintReference: complaint.referenceNumber,
    assignedEmployeeId: employee.id,
    performedById: performedBy.id,
    performedByRole: performedBy.role,
    timestamp: now,
    meta: { assignedToName: employee.name },
  });

  // notification
  notifications.push({
    id: `n-${Date.now()}`,
    toUserId: employee.id,
    title: `Complaint assigned: ${complaint.title}`,
    body: `You have been assigned complaint ${complaint.referenceNumber} by ${performedBy.name || performedBy.role} at ${now}`,
    timestamp: now,
    meta: { complaintId: complaint.id, complaintReference: complaint.referenceNumber, assigner: performedBy },
  });

  return updated;
};

export const getComplaints = async (): Promise<Complaint[]> => {
  return new Promise((res) => setTimeout(() => res([...mockComplaints]), 120));
};
