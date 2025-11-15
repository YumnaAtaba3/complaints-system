/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "../services/mutations";
import { loginSchema } from "../config";
import { InputField } from "./InputField";

export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync: login, isLoading: isPending } = useLoginMutation();

  const [data, setData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const debounceTimer = useRef<number | null>(null);

  // debounce email validation to avoid frequent calls
  useEffect(() => {
    if (debounceTimer.current) {
      window.clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = window.setTimeout(() => {
      validateField("email", data.email);
    }, 300);

    return () => {
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.email]);

  const validateField = async (field: string, value: any) => {
    try {
      // replace current field and validate only that path
      await loginSchema.validateAt(field, { ...data, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, [field]: err.message }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await loginSchema.validate(data, { abortEarly: false });

      // call login mutation
      await login({
        email: data.email,
        password: data.password,
      });

      // redirect after success
      navigate("/dashboard");
    } catch (err: any) {
      // validation errors from Yup
      if (err.inner) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
    //    else {
    //     // non-validation error (e.g., network / API)
    //     // show generic message (you can replace with toast)
    //     setErrors((prev) => ({
    //       ...prev,
    //       _global: err?.message || "Something went wrong",
    //     }));
    //   }
    }
  };

  // computed disabled state: empty fields or any existing error
  const isDisabled = useMemo(() => {
    const hasEmpty = !data.email || !data.password;
    const hasErrors = Object.values(errors).some((v) => v && v.length > 0);
    return hasEmpty || hasErrors || isPending;
  }, [data.email, data.password, errors, isPending]);

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
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* EMAIL */}
        <InputField
          id="email"
          label={t("email")}
          type="email"
          placeholder="admin@example.com"
          value={data.email}
          onChange={async (v) => {
            // prevent spaces in email
            const sanitized = v.replace(/\s/g, "");
            setData((prev) => ({ ...prev, email: sanitized }));
            // we validate via debounce effect; optionally validate immediately:
            // await validateField("email", sanitized);
          }}
          error={errors.email}
          required
        />

        {/* PASSWORD */}
        <InputField
          id="password"
          label={t("password")}
          type="password"
          passwordToggle
          value={data.password}
          onChange={async (v) => {
            // prevent spaces in password
            const sanitized = v.replace(/\s/g, "");
            setData((prev) => ({ ...prev, password: sanitized }));
            await validateField("password", sanitized);
          }}
          error={errors.password}
          required
        />

        {/* REMEMBER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Checkbox
              checked={data.rememberMe}
              onCheckedChange={async (v) => {
                setData((prev) => ({ ...prev, rememberMe: v as boolean }));
                await validateField("rememberMe", v);
              }}
            />
            <Label className="text-sm cursor-pointer">{t("rememberMe")}</Label>
          </div>

          <Button type="button" className="px-0 text-[#BDA575]">
            {t("forgotPassword")}
          </Button>
        </div>

        {/* GLOBAL ERROR */}
        {errors._global && (
          <p className="text-sm text-red-500">{errors._global}</p>
        )}

        {/* SUBMIT */}
        <Button
          type="submit"
          className={`w-full h-11 bg-[#012523] text-[#BDA575] ${
            isDisabled ? "opacity-60 pointer-events-none" : ""
          }`}
          disabled={isDisabled}
        >
          {isPending ? (
            <div
              className="inline-block h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin"
              aria-hidden
            />
          ) : (
            t("login")
          )}
        </Button>
      </form>
    </div>
  );
};
