import { useMutation, useQueryClient } from "@tanstack/react-query";
import GovernmentUnitService from "../services/api";
import type { GovernmentUnit } from "../types";

export const useCreateUnit = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: { name_en: string; name_ar?: string }) => {
      const unit: GovernmentUnit = await GovernmentUnitService.createUnit(data);
      return unit;
    },
    {
      onSuccess: () => {
       
        queryClient.invalidateQueries(["government-units"]);
      },
      onError: (error) => {
        console.error("Failed to create unit:", error);
      },
    }
  );
};
