import { useQuery } from "@tanstack/react-query";
import UserService from "../services/api"; // Import the UserService
import type { UsersResponse } from "../types/index"; // Import the response types

interface UseUsersProps {
  search: string;
  governmentUnitId: number | string;
  page: number;
  perPage: number;
}

export const useUsers = ({
  search,
  governmentUnitId,
  page,
  perPage,
}: UseUsersProps) => {
  return useQuery<UsersResponse, Error>({
    queryKey: ["users", search, governmentUnitId, page, perPage], // Cache the query based on all dependencies
    queryFn: () =>
      UserService.getUsers(search, governmentUnitId, page, perPage), // Fetch users
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};
