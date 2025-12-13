import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import ComplaintFilters from "../components/ComplaintFilters";
import ComplaintsTable from "../components/ComplaintsTable";
import NoteModal from "../components/NoteModal";
import AssignModal from "../components/AssignModal";
import ExportButtons from "../components/ExportButtons";
import ComplaintsPagination from "../components/ComplaintsPagination";
import Snackbar from "@/features/auth/components/Snackbar";
import { useComplaints } from "../services/queries";
import { useAssignModal } from "../hooks/useAssignModal";
import { type Complaint } from "../types";

const ComplaintsManagement: React.FC = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const showSnackbar = (message: string, severity: "success" | "error") =>
    setSnackbar({ open: true, message, severity });

  const {
    complaints,
    loading,
    fetching,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    updateStatus,
    refetchComplaints,
  } = useComplaints(showSnackbar);

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  );
  const [showNoteModal, setShowNoteModal] = useState(false);

  const [assignTarget, setAssignTarget] = useState<{
    show: boolean;
    complaint: Complaint | null;
  }>({
    show: false,
    complaint: null,
  });

  // ✅ SAFE values for the hook
  const complaintId = assignTarget.complaint?.id ?? 0;
  const governmentUnitId = assignTarget.complaint?.government_unit?.id ?? 0;

  // ✅ CORRECT hook usage
  const {
    selectedEmployeeId,
    setSelectedEmployeeId,
    filter,
    setFilter,
    visibleEmployees,
    isLoadingEmployees,
    isAssigning,
    handleAssign,
    assignError,
  } = useAssignModal(complaintId, governmentUnitId, (message?: string) => {
    refetchComplaints();
    showSnackbar(message ?? "Assigned successfully", "success");
    setAssignTarget({ show: false, complaint: null });
  });

  const handleOpenNoteModal = (c: Complaint) => {
    setSelectedComplaint(c);
    setShowNoteModal(true);
  };

  const handleOpenAssign = (
    e: React.MouseEvent<HTMLButtonElement>,
    complaint: Complaint
  ) => {
    e.stopPropagation();
    setAssignTarget({ show: true, complaint });
  };

  const handleStatusChange = (id: number, status: string) => {
    updateStatus({ id, status });
  };

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="ml-3 text-foreground text-3xl font-bold">
            Complaints
          </h1>
          <p className="ml-3 text-muted-foreground text-sm sm:text-base">
            Manage and track complaints submitted by users.
          </p>
        </div>

        <ExportButtons
          filters={{
            search: filters.search || undefined,
            status: filters.status === "all" ? undefined : filters.status,
            type_id: filters.type === "all" ? undefined : Number(filters.type),
            user_id: filters.user === "all" ? undefined : Number(filters.user),
            unit_id: filters.unit === "all" ? undefined : Number(filters.unit),
          }}
        />
      </div>

      {/* Filters */}
      <ComplaintFilters
        searchQuery={filters.search}
        onSearchChange={(value) =>
          setFilters((prev) => ({ ...prev, search: value }))
        }
        statusFilter={filters.status}
        onStatusChange={(value) =>
          setFilters((prev) => ({ ...prev, status: value }))
        }
        typeFilter={filters.type}
        onTypeChange={(value) =>
          setFilters((prev) => ({ ...prev, type: value }))
        }
        userFilter={filters.user}
        onUserChange={(value) =>
          setFilters((prev) => ({ ...prev, user: value }))
        }
        unitFilter={filters.unit}
        onUnitChange={(value) =>
          setFilters((prev) => ({ ...prev, unit: value }))
        }
      />

      {/* Table */}
      <div className="p-0 overflow-x-auto">
        {(loading || fetching) && (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin h-12 w-12 text-muted-foreground" />
          </div>
        )}

        {!loading && !fetching && (
          <ComplaintsTable
            complaints={complaints}
            onOpenAssign={handleOpenAssign}
            onStatusChange={handleStatusChange}
            onAddNote={handleOpenNoteModal}
          />
        )}
      </div>

      {/* Pagination */}
      <ComplaintsPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />

      {/* Note Modal */}
      {showNoteModal && selectedComplaint && (
        <NoteModal
          complaint={selectedComplaint}
          onClose={() => setShowNoteModal(false)}
          onAddNote={() => refetchComplaints()}
          showSnackbar={showSnackbar}
        />
      )}

      {/* Assign Modal */}
      {assignTarget.show && assignTarget.complaint && (
        <AssignModal
          show
          complaintReference={assignTarget.complaint.reference_number}
          selectedEmployeeId={selectedEmployeeId}
          setSelectedEmployeeId={setSelectedEmployeeId}
          filter={filter}
          setFilter={setFilter}
          visibleEmployees={visibleEmployees}
          isLoadingEmployees={isLoadingEmployees}
          isAssigning={isAssigning}
          assignError={assignError}
          onClose={() => setAssignTarget({ show: false, complaint: null })}
          onAssign={handleAssign}
        />
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default ComplaintsManagement;
