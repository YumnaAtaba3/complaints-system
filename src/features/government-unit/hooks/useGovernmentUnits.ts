// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/immutability */
// import { useEffect, useMemo, useState } from "react";
// import type { GovernmentUnit as Unit, Manager } from "../types";
// import { api } from "../services/api";

// export function useGovernmentUnits() {
//   const [units, setUnits] = useState<Unit[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"all" | "active" | "disabled">("all");
//   const [managerFilter, setManagerFilter] = useState<number | "all">("all");
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [showCreate, setShowCreate] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);
//   const [showAssign, setShowAssign] = useState(false);

//   const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
//   const [formNameEn, setFormNameEn] = useState("");
//   const [formNameAr, setFormNameAr] = useState("");

//   const [availableManagers, setAvailableManagers] = useState<Manager[]>([]);
//   const [selectedManagerId, setSelectedManagerId] = useState<number | "none">("none");

//   useEffect(() => {
//     reloadUnits();
//   }, []);

//   const reloadUnits = async () => {
//     setLoading(true);
//     const list = await api.listUnits();
//     setUnits(list);
//     setLoading(false);
//   };

//   const visibleUnits = useMemo(() => units, [units]);

//   const filteredUnits = useMemo(() => {
//     const q = searchQuery.trim().toLowerCase();
//     return visibleUnits.filter((u) => {
//       const matchesSearch =
//         !q ||
//         (u.name_translation?.en ?? u.name).toLowerCase().includes(q) ||
//         String(u.id).includes(q);
//       const matchesStatus =
//         statusFilter === "all" ||
//         (statusFilter === "active" && u.is_active) ||
//         (statusFilter === "disabled" && !u.is_active);
//       const matchesManager =
//         managerFilter === "all" || (u.manager && u.manager.id === managerFilter);
//       return matchesSearch && matchesStatus && matchesManager;
//     });
//   }, [visibleUnits, searchQuery, statusFilter, managerFilter]);

//   const totalPages = Math.max(1, Math.ceil(filteredUnits.length / itemsPerPage));
//   const pageStart = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredUnits.slice(pageStart, pageStart + itemsPerPage);

//   const managersForFilter = useMemo(() => {
//     const map = new Map<number, Manager>();
//     units.forEach((u) => u.manager && !map.has(u.manager.id) && map.set(u.manager.id, u.manager));
//     availableManagers.forEach((m) => !map.has(m.id) && map.set(m.id, m));
//     return Array.from(map.values());
//   }, [units, availableManagers]);

//   useEffect(() => setCurrentPage(1), [searchQuery, statusFilter, managerFilter, itemsPerPage]);

//   // ------------------ Actions ------------------
//   const handleCreate = async () => {
//     await api.createUnit({ name_en: formNameEn.trim(), name_ar: formNameAr.trim() || undefined });
//     setShowCreate(false);
//     setCurrentPage(1);
//     await reloadUnits();
//   };

//   const handleEditSave = async () => {
//     if (!editingUnit) return;
//     await api.updateUnit(editingUnit.id, {
//       name_translation: { ...editingUnit.name_translation, en: formNameEn, ar: formNameAr },
//     } as any);
//     setShowEdit(false);
//     setEditingUnit(null);
//     await reloadUnits();
//   };

//   const handleAssign = async () => {
//     if (!editingUnit) return;
//     if (selectedManagerId === "none") await api.assignManager(editingUnit.id, null);
//     else {
//       const mgr = availableManagers.find((m) => m.id === Number(selectedManagerId));
//       await api.assignManager(editingUnit.id, mgr ?? null);
//     }
//     setShowAssign(false);
//     setEditingUnit(null);
//     setSelectedManagerId("none");
//     await reloadUnits();
//   };

//   const handleToggleActive = async (u: Unit) => {
//     await api.toggleActive(u.id);
//     await reloadUnits();
//   };

//   const openEditModal = (u: Unit) => {
//     setEditingUnit(u);
//     setFormNameEn(u.name_translation?.en ?? u.name);
//     setFormNameAr(u.name_translation?.ar ?? "");
//     setShowEdit(true);
//   };

//   const openAssignModal = async (u: Unit) => {
//     setEditingUnit(u);
//     const mgrs = await api.listManagers();
//     setAvailableManagers(mgrs);
//     setSelectedManagerId(u.manager ? u.manager.id : "none");
//     setShowAssign(true);
//   };

//   return {
//     units: currentItems,
//     loading,
//     searchQuery,
//     setSearchQuery,
//     statusFilter,
//     setStatusFilter,
//     managerFilter,
//     setManagerFilter,
//     itemsPerPage,
//     setItemsPerPage,
//     currentPage,
//     setCurrentPage,
//     totalPages,
//     pageStart,
//     filteredUnits,
//     managersForFilter,
//     showCreate,
//     setShowCreate,
//     showEdit,
//     setShowEdit,
//     showAssign,
//     setShowAssign,
//     editingUnit,
//     formNameEn,
//     setFormNameEn,
//     formNameAr,
//     setFormNameAr,
//     availableManagers,
//     selectedManagerId,
//     setSelectedManagerId,
//     handleCreate,
//     handleEditSave,
//     handleAssign,
//     handleToggleActive,
//     openEditModal,
//     openAssignModal,
//   };
// }
