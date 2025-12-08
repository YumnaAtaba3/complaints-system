/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Manager } from "../types";
import GovernmentUnitService from "../services/api";
import { createUnitSchema } from "../validation/unitValidation";

export type FormValues = {
  nameEn: string;
  nameAr: string;
  selectedManagerId: number | "none";
};

export const useCreateUnitForm = (
  managers: Manager[],
  onClose: () => void,
  showSnackbar: (message: string, severity?: "success" | "error") => void
) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(createUnitSchema),
    defaultValues: { nameEn: "", nameAr: "", selectedManagerId: "none" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const { message } = await GovernmentUnitService.createUnit({
        name_en: values.nameEn,
        name_ar: values.nameAr,
        manager_id: values.selectedManagerId === "none" ? null : values.selectedManagerId,
      });
      showSnackbar(message || "Unit created successfully", "success");
      reset();
      onClose();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to create unit";
      showSnackbar(msg, "error");
    }
  };

  return { register, control, errors, handleSubmit, onSubmit, isSubmitting };
};
