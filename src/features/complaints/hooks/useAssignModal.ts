import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import UsersService, { type User } from "../services/UsersService";
import ComplaintsService from "../services/api";

export const useAssignModal = (complaintId: number, onConfirmParent: () => void) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [filter, setFilter] = useState("");

  // Fetch all users (cached)
  const { data: employees = [], isLoading: isLoadingEmployees } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => UsersService.getAllUsers(),
    staleTime: Infinity,
  });

  const visibleEmployees = employees.filter((e) =>
    `${e.first_name} ${e.last_name}`.toLowerCase().includes(filter.trim().toLowerCase())
  );

  // Mutation for assigning
  const { mutate: assign, isLoading: isAssigning, error: assignError } = useMutation({
    mutationFn: (employeeId: number) => ComplaintsService.assignTo(complaintId, employeeId),
    onSuccess: () => {
      onConfirmParent();
      setSelectedEmployeeId(null);
      setFilter("");
    },
  });

  const handleAssign = () => {
    if (!selectedEmployeeId) return;
    assign(selectedEmployeeId);
  };

  return {
    selectedEmployeeId,
    setSelectedEmployeeId,
    filter,
    setFilter,
    visibleEmployees,
    isLoadingEmployees,
    isAssigning,
    handleAssign,
    assignError,
  };
};
