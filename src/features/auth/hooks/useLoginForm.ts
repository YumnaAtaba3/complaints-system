/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useLoginMutation } from "../services/mutations";
import { loginSchema, type LoginFormValues } from "../config";
import { useAuth } from "../context/AuthContext";

export function useLoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // From AuthContext
  const { login: authLogin } = useAuth();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleCloseSnackbar = (_event?: any, reason?: string) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Form validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { mutateAsync: loginRequest, isLoading: isPending } = useLoginMutation();

  // 🔥 FIXED + CLEAN LOGIN FUNCTION
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await loginRequest({
        email: data.email,
        password: data.password,
      });

      if (!result?.token) {
        setSnackbar({
          open: true,
          message: result?.message || "Login failed.",
          severity: "error",
        });
        return;
      }

      // Set token by AuthContext
      authLogin(result.token, data.rememberMe);

      // Redirect user
      navigate("/dashboard", { replace: true });

    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";

      setSnackbar({
        open: true,
        message: msg,
        severity: "error",
      });
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    snackbar,
    handleCloseSnackbar,
    isPending,
  };
}
