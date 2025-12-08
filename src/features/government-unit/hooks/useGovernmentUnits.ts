/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import type { GovernmentUnit as Unit, Manager } from "../types";
import { useGovernmentUnits } from "../services/queries";
import GovernmentUnitService from "../services/api";
import ManagersService from "../services/ManagersService";

export const useGovernmentUnitsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [includeTrashed, setIncludeTrashed] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [managerFilter, setManagerFilter] = useState<number | "all">("all");

  const { units, loading, totalPages, totalUnits, refetchUnits } =
    useGovernmentUnits(currentPage, itemsPerPage, includeTrashed);

  const [filteredUnits, setFilteredUnits] = useState<Unit[]>([]);
  const [filtering, setFiltering] = useState(false);

  const [managers, setManagers] = useState<Manager[]>([]);
  const [loadingManagers, setLoadingManagers] = useState(false);

  // --- Create Modal State ---
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({
    nameEn: "",
    nameAr: "",
    selectedManagerId: "none" as number | "none",
  });
  const [createLoading, setCreateLoading] = useState(false);

  // --- Edit Modal State ---
  const [showEdit, setShowEdit] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [editForm, setEditForm] = useState({
    nameEn: "",
    nameAr: "",
    selectedManagerId: "none" as number | "none",
  });
  const [editLoading, setEditLoading] = useState(false);

  // Load managers once
  useEffect(() => {
    const fetchManagers = async () => {
      setLoadingManagers(true);
      try {
        const data = await ManagersService.getManagers();
        setManagers(data);
      } catch (err) {
        console.error("Failed to load managers", err);
      } finally {
        setLoadingManagers(false);
      }
    };
    fetchManagers();
  }, []);

  // Filter units
  useEffect(() => {
    setFiltering(true);
    const timer = setTimeout(() => {
      const q = searchQuery.trim().toLowerCase();
      const filtered = units.filter((u) => {
        const matchesSearch =
          !q ||
          (u.name_translation?.en ?? u.name).toLowerCase().includes(q) ||
          String(u.id).includes(q);
        const matchesManager =
          managerFilter === "all" || u.manager?.id === managerFilter;
        return matchesSearch && matchesManager;
      });
      setFilteredUnits(filtered);
      setFiltering(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [units, searchQuery, managerFilter]);

  // --- Open Edit Modal ---
  const openEditModal = (unit: Unit) => {
    setEditingUnit(unit);
    setEditForm({
      nameEn: unit.name_translation?.en ?? unit.name,
      nameAr: unit.name_translation?.ar ?? "",
      selectedManagerId: unit.manager?.id ?? "none",
    });
    setShowEdit(true);
  };

  // --- Open Create Modal ---
  const openCreateModal = () => {
    setCreateForm({
      nameEn: "",
      nameAr: "",
      selectedManagerId: "none",
    });
    setShowCreate(true);
  };

  // --- Handlers ---
  const handleEditSave = async () => {
    if (!editingUnit) return;
    try {
      setEditLoading(true);
      const updated = await GovernmentUnitService.updateUnit(editingUnit.id, {
        name_en: editForm.nameEn.trim(),
        name_ar: editForm.nameAr.trim(),
        manager_id:
          editForm.selectedManagerId === "none" ? null : editForm.selectedManagerId,
      });
      setFilteredUnits((prev) =>
        prev.map((u) => (u.id === updated.id ? updated : u))
      );
      setShowEdit(false);
      await refetchUnits();
    } catch (err) {
      console.error("Failed to update unit:", err);
    } finally {
      setEditLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      setCreateLoading(true);
      await GovernmentUnitService.createUnit({
        name_en: createForm.nameEn.trim(),
        name_ar: createForm.nameAr.trim(),
        manager_id:
          createForm.selectedManagerId === "none" ? null : createForm.selectedManagerId,
      });
      await refetchUnits();
      setShowCreate(false);
    } catch (error: any) {
      console.error(
        "Failed to create unit:",
        error.response?.data?.message || error.message
      );
    } finally {
      setCreateLoading(false);
    }
  };

  const handleToggleActive = async (unit: Unit) => {
    try {
      if (unit.is_active) await GovernmentUnitService.deactivate(unit.id);
      else await GovernmentUnitService.reactivate(unit.id);
      await refetchUnits();
    } catch (error) {
      console.error("Failed to toggle unit:", error);
    }
  };

  return {
    state: {
      currentPage,
      itemsPerPage,
      includeTrashed,
      searchQuery,
      managerFilter,
      filteredUnits,
      filtering,
      managers,
      loadingManagers,
      showCreate,
      showEdit,
      editingUnit,
      createForm,
      editForm,
      createLoading,
      editLoading,
      totalPages,
      totalUnits,
      loadingUnits: loading,
    },
    actions: {
      setCurrentPage,
      setItemsPerPage,
      setIncludeTrashed,
      setSearchQuery,
      setManagerFilter,
      setShowCreate,
      setShowEdit,
      setEditingUnit,
      setCreateForm,
      setEditForm,
      openEditModal,
      openCreateModal,
      handleEditSave,
      handleCreate,
      handleToggleActive,
      refetchUnits,
    },
  };
};
