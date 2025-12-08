/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ComplaintsService from "./api";
import { useDebounce } from "@/shared/hooks/debounce";
import type { Complaint } from "../types";

export function useComplaints() {
  const queryClient = useQueryClient();

  // Filters
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    type: "all",
    user: "all",
    unit: "all",
  });

  const debouncedFilters = useDebounce(filters, 500);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch complaints
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["complaints", debouncedFilters, currentPage],
    queryFn: () =>
      ComplaintsService.getComplaints({
        search: debouncedFilters.search || undefined,
        status: debouncedFilters.status === "all" ? undefined : debouncedFilters.status,
        type_id: debouncedFilters.type === "all" ? undefined : Number(debouncedFilters.type),
        user_id: debouncedFilters.user === "all" ? undefined : Number(debouncedFilters.user),
        government_unit_id: debouncedFilters.unit === "all" ? undefined : Number(debouncedFilters.unit),
        page: currentPage,
      }),
    keepPreviousData: true,
  });

  const complaints = data?.data || [];
  const totalItems = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.last_page ?? 1;
  const itemsPerPage = data?.meta?.per_page ?? 10;

  // Status update mutation
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      ComplaintsService.updateStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries(["complaints", debouncedFilters, currentPage]);
      const previous = queryClient.getQueryData(["complaints", debouncedFilters, currentPage]);
      queryClient.setQueryData(["complaints", debouncedFilters, currentPage], (old: any) => ({
        ...old,
        data: old.data.map((c: Complaint) => (c.id === id ? { ...c, status } : c)),
      }));
      return { previous };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(["complaints", debouncedFilters, currentPage], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["complaints", debouncedFilters, currentPage]);
    },
  });

  const updateStatus = (args: { id: number; status: string }, options?: any) =>
    mutation.mutate(args, options);

  return {
    complaints,
    loading: isLoading,
    fetching: isFetching,
    refetchComplaints: refetch,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    updateStatus,
  };
}
