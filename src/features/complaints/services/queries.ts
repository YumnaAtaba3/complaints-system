import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ComplaintsService from "./api"; 
import type { Complaint } from "../types";
import { useMemo, useState } from "react";

export function useComplaints() {
  const queryClient = useQueryClient();

  const query = useQuery<Complaint[], Error>({
    queryKey: ["complaints"],
    queryFn: () => ComplaintsService.getComplaints(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const complaints = query.data ?? [];
  const loading = query.isLoading;
  const isError = query.isError;

  // ---------------- Filters & Pagination ----------------
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | string>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | string>("all");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredComplaints = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return complaints.filter((c) => {
      const matchesSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        String(c.id).includes(q);

      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      const matchesType = typeFilter === "all" || String(c.type.id) === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [complaints, searchQuery, statusFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredComplaints.length / itemsPerPage));
  const pageStart = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredComplaints.slice(pageStart, pageStart + itemsPerPage);

  // ---------------- Mutation for updating status ----------------
  const updateStatusMutation = useMutation(
    ({ id, status }: { id: number; status: string }) => ComplaintsService.updateStatus(id, status),
    {
      onSuccess: (updatedComplaint) => {
        // Update the cache manually to reflect the new status
        queryClient.setQueryData<Complaint[]>(["complaints"], (old) =>
          old?.map((c) => (c.id === updatedComplaint.id ? updatedComplaint : c))
        );
      },
    }
  );

  return {
    complaints: currentItems,
    loading,
    isError,
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
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    refetchComplaints: query.refetch,
    updateStatus: updateStatusMutation.mutate, 
    updatingStatus: updateStatusMutation.isLoading,
  };
}
