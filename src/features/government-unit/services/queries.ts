import { useQuery } from "@tanstack/react-query";
import GovernmentUnitService from "../services/api";

export function useGovernmentUnits(
  page: number,
  perPage: number,
  includeTrashed: boolean
) {
  const query = useQuery(
    ["governmentUnits", page, perPage, includeTrashed],
    () =>
      GovernmentUnitService.getGovernmentUnits({
        page,
        perPage,
        includeTrashed,
      }),
    {
      keepPreviousData: true, 
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    }
  );

  const units = query.data?.data ?? [];
  const totalUnits = query.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalUnits / perPage));

  return {
    units,
    loading: query.isLoading,
    isError: query.isError,
    totalPages,
    totalUnits,
    refetchUnits: query.refetch,
  };
}
