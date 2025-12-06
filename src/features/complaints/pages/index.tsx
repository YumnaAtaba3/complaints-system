/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ComplaintFilters from "../components/ComplaintFilters";
import ComplaintsTable from "../components/ComplaintsTable";
import NoteModal from "../components/NoteModal";
import AssignModal from "../components/AssignModal";
import ExportButtons from "../components/ExportButtons";
import ComplaintsPagination from "../components/ComplaintsPagination";

import { Loader2 } from "lucide-react"; 
import { type Complaint, type Employee } from "../types";
import { currentUser } from "../services/mockUser";
import { assignComplaint, activityLog } from "../services";
import { useComplaints } from "../services/queries";

const ComplaintsManagement: React.FC = () => {
  const {
    complaints,
    filteredComplaints,
    totalPages,
    pageStart,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    refetchComplaints,
    loading,
    updateStatus,
  } = useComplaints();

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  );
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [assignTarget, setAssignTarget] = useState<{
    show: boolean;
    complaint: Complaint | null;
  }>({ show: false, complaint: null });

  // ------------------ Handlers ------------------
  const handleView = (c: Complaint) => setSelectedComplaint(c);

  const handleOpenNoteModal = (c: Complaint) => {
    setSelectedComplaint(c);
    setShowNoteModal(true);
  };

  const handleAddNote = (note: string) => {
    if (!selectedComplaint) return;

    const updated = {
      ...selectedComplaint,
      notes: [
        ...((selectedComplaint as any).notes || []),
        `${currentUser.role}: ${note}`,
      ],
      versionHistory: [
        ...((selectedComplaint as any).versionHistory || []),
        `Note added by ${
          currentUser.role
        }: ${note} at ${new Date().toISOString()}`,
      ],
    } as any;

    refetchComplaints();
    setShowNoteModal(false);

    activityLog.push({
      actionType: "Note Added",
      complaintId: updated.id,
      complaintReference: updated.referenceNumber,
      performedById: currentUser.id,
      performedByRole: currentUser.role,
      timestamp: new Date().toISOString(),
      meta: { note },
    });
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
      await assignComplaint(assignTarget.complaint.id, employee, {
        id: currentUser.id,
        role: currentUser.role,
        name: currentUser.name,
      });
      setAssignTarget({ show: false, complaint: null });
      refetchComplaints();
      alert(`Assigned to ${employee.name}. Notification queued.`);
    } catch (err) {
      alert("Failed to assign complaint: " + (err as Error).message);
    }
  };

  // ------------------ Status Update ------------------
  const handleStatusChange = (id: number, status: string) => {
    updateStatus(
      { id, status },
      {
        onSuccess: (updatedComplaint) => {
          activityLog.push({
            actionType: "Status Changed",
            complaintId: updatedComplaint.id,
            complaintReference: updatedComplaint.referenceNumber,
            performedById: currentUser.id,
            performedByRole: currentUser.role,
            timestamp: new Date().toISOString(),
            meta: { status },
          });
          refetchComplaints();
        },
        onError: (err: any) => {
          alert("Failed to update status: " + err.message);
        },
      }
    );
  };

  return (
    <div className="container py-6">
      <div className="flex flex-wrap items-center justify-between mb-10 gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="ml-3 text-foreground text-3xl font-bold">
            Complaints
          </h1>
          <p className="ml-3 text-muted-foreground text-sm sm:text-base">
            Manage and track all complaints submitted by users.
          </p>
        </div>

        <ExportButtons
          allComplaints={complaints}
          filteredComplaints={filteredComplaints} // already filtered
         
        />
      </div>

      <ComplaintFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
       
      />

      <div className="p-0 overflow-x-auto h-110">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin h-12 w-12 text-muted-foreground" />
          </div>
        ) : (
          <ComplaintsTable
            complaints={filteredComplaints.slice(
              pageStart,
              pageStart + itemsPerPage
            )}
            currentUser={currentUser}
            onView={handleView}
            onOpenAssign={handleOpenAssign}
            onStatusChange={handleStatusChange} // updated
            onAddNote={handleOpenNoteModal}
          />
        )}
      </div>

      <ComplaintsPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={pageStart}
        endIndex={Math.min(pageStart + itemsPerPage, filteredComplaints.length)}
        filteredComplaintsLength={filteredComplaints.length}
      />

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
    </div>
  );
};

export default ComplaintsManagement;
