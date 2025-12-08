import * as yup from "yup";

export const createUnitSchema = yup.object({
  nameEn: yup
    .string()
    .required("English name is required")
    .min(3, "English name must be at least 3 characters"),
  nameAr: yup
    .string()
    .required("Arabic name is required")
    .min(3, "Arabic name must be at least 3 characters"),
  selectedManagerId: yup
    .mixed<number | "none">()
    .required("Manager selection is required"),
});

export const editUnitSchema = yup.object({
  nameEn: yup
    .string()
    .required("English name is required")
    .min(3, "English name must be at least 3 characters"),
  nameAr: yup
    .string()
    .required("Arabic name is required")
    .min(3, "Arabic name must be at least 3 characters"),
  selectedManagerId: yup
    .mixed<number | "none">()
    .required("Manager selection is required"),
});
