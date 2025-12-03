/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Filters } from "../components/Filters";
import { UnitsTable } from "../components/UnitsTable";
import { Header } from "../components/Header";
import { useGovernmentUnits } from "../services/queries";
import { CreateUnitModal } from "../components/CreateUnitModal";
import { EditUnitModal } from "../components/EditUnitModal";
import { AssignManagerModal } from "../components/AssignManagerModal";
import GovernmentUnitService from "../services/api";
const fakeManagers = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
  { id: 4, name: "Diana Prince" },
  { id: 5, name: "Ethan Hunt" },
];

const GovernmentUnitsPage: React.FC = () => {
  const {
    units,
    loading,
    filteredUnits,
    totalPages,
    pageStart,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    managerFilter,
    setManagerFilter,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    refetchUnits,
  } = useGovernmentUnits();

  // Modals & forms state
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAssign, setShowAssign] = useState(false);

  const [editingUnit, setEditingUnit] = useState<any>(null);
  const [formNameEn, setFormNameEn] = useState("");
  const [formNameAr, setFormNameAr] = useState("");
  const [availableManagers, setAvailableManagers] = useState<any[]>([]);
  const [selectedManagerId, setSelectedManagerId] = useState<number | "none">(
    "none"
  );

  // --- Actions ---
  const openEditModal = (unit: any) => {
    setEditingUnit(unit);
    setFormNameEn(unit.name_translation?.en ?? unit.name);
    setFormNameAr(unit.name_translation?.ar ?? "");
    setShowEdit(true);
  };

  const openAssignModal = (unit: any) => {
    setEditingUnit(unit);
    setAvailableManagers([]); // optionally fetch managers here
    setSelectedManagerId(unit.manager ? unit.manager.id : "none");
    setShowAssign(true);
  };

const handleCreate = async () => {
  try {
    await GovernmentUnitService.createUnit({
      name_en: formNameEn,
      name_ar: formNameAr,
      manager_id: selectedManagerId === "none" ? null : selectedManagerId,
    });
    await refetchUnits(); // reload units after creation
    setShowCreate(false);
    setFormNameEn("");
    setFormNameAr("");
  } catch (error: any) {
    console.error(
      "Failed to create unit:",
      error.response?.data?.message || error.message
    );
  }
};


  const handleEditSave = async () => {
    if (!editingUnit) return;
    try {
      await GovernmentUnitService.updateUnit(editingUnit.id, {
        name_translation: { en: formNameEn, ar: formNameAr },
      });
      setShowEdit(false);
      refetchUnits(); // refresh units after edit
    } catch (error) {
      console.error("Failed to edit unit:", error);
    }
  };

  const handleAssign = async () => {
    if (!editingUnit) return;
    try {
      const manager =
        selectedManagerId === "none" ? null : { id: selectedManagerId };
      await GovernmentUnitService.assignManager(editingUnit.id, manager);
      setShowAssign(false);
      refetchUnits(); // refresh units after assigning manager
    } catch (error) {
      console.error("Failed to assign manager:", error);
    }
  };

  const handleToggleActive = async (unit: any) => {
    if (!unit) return;
    try {
      if (unit.is_active) {
        await GovernmentUnitService.deactivate(unit.id);
      } else {
        await GovernmentUnitService.reactivate(unit.id);
      }
      refetchUnits(); // refresh units after toggle
    } catch (error) {
      console.error("Failed to toggle unit:", error);
    }
  };

  return (
    <div className="py-6">
      <Header onAdd={() => setShowCreate(true)} />

      <Filters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        managerFilter={managerFilter}
        onManagerChange={setManagerFilter}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        managers={[]}
      />

      <div className="bg-white rounded-xl shadow overflow-x-auto mt-2">
        <UnitsTable
          units={units}
          loading={loading}
          onEdit={openEditModal}
          onAssign={openAssignModal}
          onToggleActive={handleToggleActive}
        />
      </div>

      <div className="flex items-center justify-between p-4 border-t">
        <div className="text-sm text-gray-600">
          Showing {filteredUnits.length ? pageStart + 1 : 0} to{" "}
          {Math.min(pageStart + itemsPerPage, filteredUnits.length)} of{" "}
          {filteredUnits.length} units
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border"
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
            className="px-3 py-1 rounded border"
          >
            Next
          </button>
        </div>
      </div>

      <CreateUnitModal
        open={showCreate}
        onOpenChange={setShowCreate}
        nameEn={formNameEn}
        setNameEn={setFormNameEn}
        nameAr={formNameAr}
        setNameAr={setFormNameAr}
        managers={fakeManagers}
        selectedManagerId={selectedManagerId}
        setSelectedManagerId={setSelectedManagerId}
        onSubmit={handleCreate}
      />

      <EditUnitModal
        open={showEdit}
        onOpenChange={setShowEdit}
        unit={editingUnit}
        formNameEn={formNameEn}
        setFormNameEn={setFormNameEn}
        formNameAr={formNameAr}
        setFormNameAr={setFormNameAr}
        onSubmit={handleEditSave}
      />

      <AssignManagerModal
        open={showAssign}
        onOpenChange={setShowAssign}
        unit={editingUnit}
        availableManagers={availableManagers}
        selectedManagerId={selectedManagerId}
        setSelectedManagerId={setSelectedManagerId}
        onSubmit={handleAssign}
      />
    </div>
  );
};

export default GovernmentUnitsPage;
