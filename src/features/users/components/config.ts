import * as Yup from "yup";

export const userSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),

  last_name: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  national_number: Yup.string()
    .required("National number is required")
    .matches(/^\d{12}$/, "National number must be exactly 12 digits"),

  government_unit_id: Yup.string().required("Government unit is required"),

  role: Yup.string()
    .required("Role is required")
    .oneOf(["Citizen", "Manager", "Admin", "Employee"], "Invalid role"),
});

export type UserFormValues = Yup.InferType<typeof userSchema>;
