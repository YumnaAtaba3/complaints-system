// src/features/activity-log/hooks/useActivityLogFilters.ts

import { useQuery } from "@tanstack/react-query";
import ActivityLogService from "../services/api";
import type {
  ActivityLogFilters,
  ActivityLogFiltersResponse,
  ActivityLogResponse,
} from "../types/index";

export const useActivityLogFilters = () => {
  return useQuery<ActivityLogFiltersResponse, Error>({
    queryKey: ["activity-log-filters"],
    queryFn: () => ActivityLogService.getActivityLogFilters(),
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
    refetchOnWindowFocus: false,
  });
};

export const useActivityLogs = (filters: ActivityLogFilters) => {
  return useQuery<ActivityLogResponse, Error>({
    queryKey: ["activity-logs", filters],
    queryFn: () => ActivityLogService.getActivityLogs(filters),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
export const useExportActivityLogs = (filters?: ActivityLogFilters) => {
  return useQuery<Blob, Error>({
    queryKey: ["activity-logs-export", filters],
    queryFn: () => ActivityLogService.exportActivityLogs(filters),
    enabled: false, // do NOT auto-fetch, only when manually triggered
    refetchOnWindowFocus: false,
  });
};
