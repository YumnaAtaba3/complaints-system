/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useLoginMutation } from "../services/mutations";
import { loginSchema, type LoginFormValues } from "../config";
import { userStorage } from "../storage";

export function useLoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleCloseSnackbar = (_event?: any, reason?: string) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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

  const { mutateAsync: login, isLoading: isPending } = useLoginMutation();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      });

      if (!result || !result.token) {
        setSnackbar({
          open: true,
          message: result?.message || t("loginFailed") || "Login failed.",
          severity: "error",
        });
        return;
      }

      userStorage.set(result.token);

      setSnackbar({
        open: true,
        message: result?.message || t("loginSuccess") || "Login successful!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.email?.[0] ||
        error?.response?.data?.errors?.password?.[0] ||
        error?.message ||
        t("loginFailed") ||
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
