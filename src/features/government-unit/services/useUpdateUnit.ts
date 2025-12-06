import { useMutation, useQueryClient } from "@tanstack/react-query";
import GovernmentUnitService from "../services/api";
import type { GovernmentUnit } from "../types";

export const useUpdateUnit = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      id,
      data,
    }: {
      id: number;
      data: {
        name_translation: { en: string; ar?: string };
        manager_id?: number | null;
      };
    }) => {
      const updatedUnit: GovernmentUnit = await GovernmentUnitService.updateUnit(id, data);
      return updatedUnit;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["government-units"]);
      },
      onError: (error) => {
        console.error("Failed to update unit:", error);
      },
    }
  );
};
