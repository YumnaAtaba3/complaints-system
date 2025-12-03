/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import GovernmentUnitService from "../services/api";
import type { GovernmentUnit } from "../types";
import { useMemo, useState } from "react";

export function useGovernmentUnits() {
  const query = useQuery<GovernmentUnit[], Error>({
    queryKey: ["governmentUnits"],
    queryFn: () => GovernmentUnitService.getGovernmentUnits(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const units = query.data ?? [];
  const loading = query.isLoading;

  // Filters & pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "disabled">("all");
  const [managerFilter, setManagerFilter] = useState<number | "all">("all");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUnits = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return units.filter((u) => {
      const matchesSearch =
        !q ||
        (u.name_translation?.en ?? u.name).toLowerCase().includes(q) ||
        String(u.id).includes(q);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && u.is_active) ||
        (statusFilter === "disabled" && !u.is_active);

      const matchesManager =
        managerFilter === "all" || (u.manager && u.manager.id === managerFilter);

      return matchesSearch && matchesStatus && matchesManager;
    });
  }, [units, searchQuery, statusFilter, managerFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUnits.length / itemsPerPage));
  const pageStart = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUnits.slice(pageStart, pageStart + itemsPerPage);

  return {
    units: currentItems,
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
    refetchUnits: query.refetch, 
  };
}
