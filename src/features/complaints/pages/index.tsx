import React, { useEffect, useMemo, useState } from "react";
import ComplaintFilters from "../components/ComplaintFilters";
import ComplaintsTable from "../components/ComplaintsTable";
import NoteModal from "../components/NoteModal";
import StatusDropdown from "../components/StatusDropdown";
import AssignModal from "../components/AssignModal";
import ExportButtons from "../components/ExportButtons";

import { type Complaint, type Employee } from "../types";
import { currentUser } from "../services/mockUser";
import { getComplaints, assignComplaint, activityLog } from "../services";

const ComplaintsManagement: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [unitFilter, setUnitFilter] = useState("all");

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  );
  const [showNoteModal, setShowNoteModal] = useState(false);

  const [assignTarget, setAssignTarget] = useState<{
    show: boolean;
    complaint: Complaint | null;
  }>({ show: false, complaint: null });

  const [dropdownComplaint, setDropdownComplaint] = useState<Complaint | null>(
    null
  );
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const list = await getComplaints();
      setComplaints(list);
    })();
  }, []);

  const visibleComplaints = useMemo(() => {
    return complaints.filter((c) => {
      if (currentUser.role === "Admin") return true;
      if (currentUser.role === "Manager")
        return c.governmentUnitId === currentUser.governmentUnitId;
      if (currentUser.role === "Employee")
        return c.assignedTo === currentUser.id;
      return false;
    });
  }, [complaints]);

  const filteredComplaints = useMemo(() => {
    return visibleComplaints.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      const matchesType = typeFilter === "all" || c.type === typeFilter;
      const matchesUnit =
        currentUser.role !== "Admin" ||
        unitFilter === "all" ||
        c.governmentUnitId === unitFilter;

      return matchesSearch && matchesStatus && matchesType && matchesUnit;
    });
  }, [visibleComplaints, searchQuery, statusFilter, typeFilter, unitFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredComplaints.length / itemsPerPage)
  );
  const pageStart = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredComplaints.slice(
    pageStart,
    pageStart + itemsPerPage
  );

  // ------------------ Handlers ------------------

  const handleView = (c: Complaint) => setSelectedComplaint(c);

  const handleOpenNoteModal = (c: Complaint) => {
    setSelectedComplaint(c);
    setShowNoteModal(true);
  };

  const handleAddNote = (note: string) => {
    if (!selectedComplaint) return;

    const updated: Complaint = {
      ...selectedComplaint,
      notes: [
        ...(selectedComplaint.notes || []),
        `${currentUser.role}: ${note}`,
      ],
      versionHistory: [
        ...(selectedComplaint.versionHistory || []),
        `Note added by ${
          currentUser.role
        }: ${note} at ${new Date().toISOString()}`,
      ],
    };

    setComplaints((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );

    activityLog.push({
      actionType: "Note Added",
      complaintId: updated.id,
      complaintReference: updated.referenceNumber,
      performedById: currentUser.id,
      performedByRole: currentUser.role,
      timestamp: new Date().toISOString(),
      meta: { note },
    });

    setShowNoteModal(false);
  };

  const handleOpenAssign = (
    e: React.MouseEvent<HTMLButtonElement>,
    complaint: Complaint
  ) => {
    e.stopPropagation();

    if (
      !(
        currentUser.role === "Admin" ||
        (currentUser.role === "Manager" &&
          complaint.governmentUnitId === currentUser.governmentUnitId)
      )
    ) {
      alert("You don't have permission to assign this complaint.");
      return;
    }

    setAssignTarget({ show: true, complaint });
  };

  const handleConfirmAssign = async (employee: Employee) => {
    if (!assignTarget.complaint) return;

    try {
      const updated = await assignComplaint(
        assignTarget.complaint.id,
        employee,
        { id: currentUser.id, role: currentUser.role, name: currentUser.name }
      );

      setComplaints((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );

      setAssignTarget({ show: false, complaint: null });
      alert(`Assigned to ${employee.name}. Notification queued.`);
    } catch (err) {
      alert("Failed to assign complaint: " + (err as Error).message);
    }
  };

  const handleOpenDropdown = (
    e: React.MouseEvent<HTMLDivElement>,
    complaint: Complaint
  ) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const dropdownWidth = 160;
    const gap = 4;

    let left = rect.left + rect.width / 2 - dropdownWidth / 2;
    left = 800;

    setDropdownPosition({ top: rect.bottom + gap, left });
    setDropdownComplaint(complaint);
  };

  const handleStatusChange = (status: Complaint["status"]) => {
    if (!dropdownComplaint) return;

    const now = new Date().toISOString();

    const updated: Complaint = {
      ...dropdownComplaint,
      status,
      versionHistory: [
        ...(dropdownComplaint.versionHistory || []),
        `Status changed to ${status} by ${currentUser.role} at ${now}`,
      ],
    };

    setComplaints((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );

    activityLog.push({
      actionType: "Status Changed",
      complaintId: updated.id,
      complaintReference: updated.referenceNumber,
      performedById: currentUser.id,
      performedByRole: currentUser.role,
      timestamp: now,
      meta: { status },
    });

    setDropdownComplaint(null);
    setDropdownPosition(null);
  };

  return (
    <div className="container py-6">
      <div className="flex flex-wrap items-center justify-between mb-10 gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="ml-3 text-3xl font-bold text-gray-900">Complaints</h1>
          <p className="ml-3 text-gray-600 text-sm sm:text-base">
            Manage and track all complaints submitted by users.
          </p>
        </div>

        <ExportButtons
          allComplaints={complaints}
          filteredComplaints={filteredComplaints}
          isAdmin={currentUser.role === "Admin"}
        />
      </div>

      <ComplaintFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        unitFilter={unitFilter}
        onUnitChange={setUnitFilter}
        showUnitFilter={currentUser.role === "Admin"}
      />

      <div className="p-0 overflow-x-auto h-90">
        <ComplaintsTable
          complaints={currentItems}
          currentUser={currentUser}
          onView={handleView}
          onOpenAssign={handleOpenAssign}
          onOpenDropdown={handleOpenDropdown}
          onAddNote={handleOpenNoteModal}
        />
      </div>
      {/* Government Units Styled Pagination */}
      <div className="flex items-end justify-between p-4 border-t">
        <div className="text-sm text-gray-600">
          Showing {filteredComplaints.length ? pageStart + 1 : 0} to{" "}
          {Math.min(pageStart + itemsPerPage, filteredComplaints.length)} of{" "}
          {filteredComplaints.length} complaints
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`px-3 py-1 rounded ${
                currentPage === p ? "bg-green-900 text-white" : "border"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {showNoteModal && selectedComplaint && (
        <NoteModal
          complaint={selectedComplaint}
          onClose={() => setShowNoteModal(false)}
          onAddNote={handleAddNote}
        />
      )}

      {assignTarget.show && assignTarget.complaint && (
        <AssignModal
          show={assignTarget.show}
          complaintId={assignTarget.complaint.id}
          complaintReference={assignTarget.complaint.referenceNumber}
          currentUser={currentUser}
          onClose={() => setAssignTarget({ show: false, complaint: null })}
          onConfirm={handleConfirmAssign}
        />
      )}

      {dropdownComplaint && dropdownPosition && (
        <StatusDropdown
          position={dropdownPosition}
          complaint={dropdownComplaint}
          onStatusChange={handleStatusChange}
          onClose={() => setDropdownComplaint(null)}
        />
      )}
    </div>
  );
};

export default ComplaintsManagement;
