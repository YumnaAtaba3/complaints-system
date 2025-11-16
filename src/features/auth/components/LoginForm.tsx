/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";

import { Label } from "@/shared/components/ui/label";
import { useTranslation } from "react-i18next";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useLoginMutation } from "../services/mutations";
import { InputField } from "./InputField";
import { userStorage } from "../storage";
import { loginSchema, type LoginFormValues } from "../config";
import Snackbar from "./Snackbar";


export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
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

      console.log("Login result:", result);

      // store token
      userStorage.set(result.token);

      // show success snackbar
      setSnackbar({
        open: true,
        message: t("loginSuccess") || "Login successful! Redirecting...",
        severity: "success",
      });

      // redirect after 1.5s
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message:
          error?.response?.data?.message ||
          error?.message ||
          t("loginFailed") ||
          "Login failed. Please check your credentials.",
        severity: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold text-foreground">
          {t("welcomeBack")}
        </h2>
        <p className="text-muted-foreground">{t("loginSubtitle")}</p>
      </div>

      {/* FORM */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* EMAIL */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              id="email"
              label={t("email")}
              type="email"
              placeholder="admin@example.com"
              value={field.value}
              onChange={(v) => field.onChange(v.replace(/\s/g, ""))}
              error={errors.email?.message}
              required
            />
          )}
        />

        {/* PASSWORD */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              id="password"
              label={t("password")}
              type="password"
              passwordToggle
              value={field.value}
              onChange={(v) => field.onChange(v.replace(/\s/g, ""))}
              error={errors.password?.message}
              required
            />
          )}
        />

        {/* REMEMBER ME */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(v) => field.onChange(v as boolean)}
                />
              )}
            />
            <Label className="text-sm cursor-pointer">{t("rememberMe")}</Label>
          </div>

          <Button type="button" className="px-0 text-[#BDA575]">
            {t("forgotPassword")}
          </Button>
        </div>

        {/* SUBMIT */}
        <Button
          type="submit"
          className="w-full h-11 bg-[#012523] text-[#BDA575]"
          disabled={isPending}
        >
          {isPending ? (
            <div className="inline-block h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin" />
          ) : (
            t("login")
          )}
        </Button>
      </form>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};
