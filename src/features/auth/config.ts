

import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
      .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[!@#$%^&*(),.?/":{}|<>]/, "Password must contain at least one special character")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/^\S*$/, "Password cannot contain spaces")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: Yup.boolean().required(),
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;
