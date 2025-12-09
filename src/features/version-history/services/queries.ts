// src/features/complaints/hooks/useComplaintVersionHistory.ts

import { useQuery } from "@tanstack/react-query";
import ComplaintVersionHistoryService from "../services/api";
import type { ComplaintVersionHistoryResponse } from "../types/index";

export const useComplaintVersionHistory = (complaintId: number | string) => {
  return useQuery<ComplaintVersionHistoryResponse, Error>({
    queryKey: ["complaint-version-history", complaintId],
    queryFn: () =>
      ComplaintVersionHistoryService.getComplaintVersionHistory(complaintId),
    enabled: !!complaintId, // avoid fetching if ID is undefined
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
  });
};
