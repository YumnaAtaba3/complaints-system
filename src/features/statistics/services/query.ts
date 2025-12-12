import { useQuery } from "@tanstack/react-query";
import StatisticsService from "../services/api";
import type { StatisticsData } from "../types";

export const useStatistics = () => {
  return useQuery<StatisticsData, Error>({
    queryKey: ["statistics-overview"],
    queryFn: () => StatisticsService.getStatistics(),
    staleTime: 1000 * 60 * 5, // 5 min
    refetchOnWindowFocus: false,
  });
};
