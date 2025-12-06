/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { UnitsTable } from "../components/UnitsTable";
import { Filters } from "../components/Filters";
import { useGovernmentUnits } from "../services/queries";
import { CreateUnitModal } from "../components/CreateUnitModal";
import { EditUnitModal } from "../components/EditUnitModal";
import GovernmentUnitService from "../services/api";
import { Header } from "../components/Header";
import type { GovernmentUnit as Unit } from "../types";
import { useUpdateUnit } from "../services/useUpdateUnit";

const fakeManagers = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
  { id: 4, name: "Diana Prince" },
  { id: 5, name: "Ethan Hunt" },
];

const GovernmentUnitsPage: React.FC = () => {
  const { t } = useTranslation();
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

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [formNameEn, setFormNameEn] = useState("");
  const [formNameAr, setFormNameAr] = useState("");

  const [selectedManagerId, setSelectedManagerId] = useState<number | "none">(
    "none"
  );

  const { mutate: updateUnit, isLoading: updating } = useUpdateUnit();

  const openEditModal = (unit: Unit) => {
    setEditingUnit(unit);
    setFormNameEn(unit.name_translation?.en ?? unit.name);
    setFormNameAr(unit.name_translation?.ar ?? "");
    setShowEdit(true);
  };


  const handleCreate = async () => {
    try {
      await GovernmentUnitService.createUnit({
        name_en: formNameEn,
        name_ar: formNameAr,
        manager_id: selectedManagerId === "none" ? null : selectedManagerId,
      });
      await refetchUnits();
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


const handleEditSave = () => {
  if (!editingUnit) return;

  updateUnit(
    {
      id: editingUnit.id,
      data: {
        name_translation: {
          en: formNameEn,
          ar: formNameAr,
        },
        manager_id: selectedManagerId === "none" ? null : selectedManagerId,
      },
    },
    {
      onSuccess: () => {
        setShowEdit(false);
        setEditingUnit(null);
      },
    }
  );
};



  const handleToggleActive = async (unit: Unit) => {
    if (!unit) return;
    try {
      if (unit.is_active) {
        await GovernmentUnitService.deactivate(unit.id);
      } else {
        await GovernmentUnitService.reactivate(unit.id);
      }
      refetchUnits();
    } catch (error) {
      console.error("Failed to toggle unit:", error);
    }
  };

  return (
    <div className="container py-6">
      <Header onAdd={() => setShowCreate(true)} />

      <div className="card ">
        <Filters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          managerFilter={managerFilter}
          onManagerChange={setManagerFilter}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          managers={fakeManagers}
        />

        {loading ? (
          <div className="flex items-center justify-center h-64 ">
            <Loader2 className="animate-spin h-12 w-12 text-muted-foreground" />
          </div>
        ) : (
          <UnitsTable
            units={units}
            onEdit={openEditModal}
            onToggleActive={handleToggleActive}
          />
        )}

        {/* Pagination */}
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
                  currentPage === p ? "bg-gold text-white" : "border"
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
        managers={fakeManagers}
        selectedManagerId={selectedManagerId}
        setSelectedManagerId={setSelectedManagerId}
        onSubmit={handleEditSave}
      />
    </div>
  );
};

export default GovernmentUnitsPage;
