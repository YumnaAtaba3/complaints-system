import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import ComplaintFilters from "../components/ComplaintFilters";
import ComplaintsTable from "../components/ComplaintsTable";
import NoteModal from "../components/NoteModal";
import AssignModal from "../components/AssignModal";
import ExportButtons from "../components/ExportButtons";
import ComplaintsPagination from "../components/ComplaintsPagination";

import { type Complaint } from "../types";
import { useComplaints } from "../services/queries";
import { useAssignModal } from "../hooks/useAssignModal";

const ComplaintsManagement: React.FC = () => {
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
  } = useComplaints();

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  );
  const [showNoteModal, setShowNoteModal] = useState(false);

  const [assignTarget, setAssignTarget] = useState<{
    show: boolean;
    complaint: Complaint | null;
  }>({ show: false, complaint: null });

  // Provide a safe complaint ID for hook initialization
  const complaintId = assignTarget.complaint?.id ?? null;

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
  } = useAssignModal(complaintId, () => refetchComplaints());

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

      <div className="p-0 overflow-x-auto">
        {loading || fetching ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin h-12 w-12 text-muted-foreground" />
          </div>
        ) : (
          <ComplaintsTable
            complaints={complaints}
            onOpenAssign={handleOpenAssign}
            onStatusChange={handleStatusChange}
            onAddNote={handleOpenNoteModal}
          />
        )}
      </div>

      <ComplaintsPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />

      {showNoteModal && selectedComplaint && (
        <NoteModal
          complaint={selectedComplaint}
          onClose={() => setShowNoteModal(false)}
          onAddNote={() => refetchComplaints()}
        />
      )}

      {assignTarget.show && assignTarget.complaint && (
        <AssignModal
          show={assignTarget.show}
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
    </div>
  );
};

export default ComplaintsManagement;
