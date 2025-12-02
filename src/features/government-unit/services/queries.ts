// src/features/users/hooks/useGovernmentUnits.ts
import { useQuery } from "@tanstack/react-query";
import GovernmentUnitService from "../services/api";
import type { GovernmentUnit } from "../types/index";

// Custom hook for fetching government units
export function useGovernmentUnits() {
  return useQuery<GovernmentUnit[], Error>({
    queryKey: ["governmentUnits"], // Unique key for the query
    queryFn: () => GovernmentUnitService.getGovernmentUnits(), // The function to fetch the data
    staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
    refetchOnWindowFocus: false, // Do not refetch data on window focus
  });
}
