/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { InputField } from "./InputField";
import Snackbar from "./Snackbar";
import { useDebounce } from "@/shared/hooks/debounce";
import { useLoginForm } from "../hooks/useLoginForm";

export const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    snackbar,
    handleCloseSnackbar,
    isPending,
  } = useLoginForm();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
        <p className="text-muted-foreground">Please login to continue</p>
      </div>

      {/* FORM */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* EMAIL */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => {
            const [emailValue, setEmailValue] = useState(field.value);
            const debouncedEmail = useDebounce(emailValue, 500);

            useEffect(() => {
              field.onChange(debouncedEmail);
            }, [debouncedEmail, field]);

            return (
              <InputField
                id="email"
                label="Email"
                type="email"
                placeholder="admin@example.com"
                value={emailValue}
                onChange={(v) => setEmailValue(v.replace(/\s/g, ""))}
                error={errors.email?.message}
                required
              />
            );
          }}
        />

        {/* PASSWORD */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            const [passwordValue, setPasswordValue] = useState(field.value);
            const debouncedPassword = useDebounce(passwordValue, 500);

            useEffect(() => {
              field.onChange(debouncedPassword);
            }, [debouncedPassword, field]);

            return (
              <InputField
                id="password"
                label="Password"
                type="password"
                passwordToggle
                value={passwordValue}
                onChange={(v) => setPasswordValue(v.replace(/\s/g, ""))}
                error={errors.password?.message}
                required
              />
            );
          }}
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
            <Label className="text-sm cursor-pointer">Remember Me</Label>
          </div>

          <Button type="button" className="px-0 text-[#BDA575]">
            Forgot Password
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
            "Login"
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

// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/shared/components/ui/button";
// import { Checkbox } from "@/shared/components/ui/checkbox";
// import { Label } from "@/shared/components/ui/label";
// import { useTranslation } from "react-i18next";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

// import { useLoginMutation } from "../services/mutations";
// import { InputField } from "./InputField";
// import { userStorage } from "../storage";
// import { loginSchema, type LoginFormValues } from "../config";
// import Snackbar from "./Snackbar";
// import { useDebounce } from "@/shared/hooks/debounce";

// export const LoginForm = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const [snackbar, setSnackbar] = useState<{
//     open: boolean;
//     message: string;
//     severity: "success" | "error";
//   }>({ open: false, message: "", severity: "success" });

//   const handleCloseSnackbar = (
//     _event?: React.SyntheticEvent | Event,
//     reason?: string
//   ) => {
//     if (reason === "clickaway") return;
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormValues>({
//     resolver: yupResolver(loginSchema),
//     mode: "onTouched",
//     defaultValues: {
//       email: "",
//       password: "",
//       rememberMe: false,
//     },
//   });

//   const { mutateAsync: login, isLoading: isPending } = useLoginMutation();

//  const onSubmit = async (data: LoginFormValues) => {
//    try {
//      const result = await login({
//        email: data.email,
//        password: data.password,
//      });

//      // Check API success
//      if (!result || !result.token) {
//        setSnackbar({
//          open: true,
//          message: result?.message || "Login failed.",
//          severity: "error",
//        });
//        return;
//      }

//      userStorage.set(result.token);

//      setSnackbar({
//        open: true,
//        message: result?.message || "Login successful! Redirecting...",
//        severity: "success",
//      });

//      setTimeout(() => {
//        navigate("/dashboard");
//      }, 1500);
//    } catch (error: any) {
//      // Axios error
//      const msg =
//        error?.response?.data?.message ||
//        error?.response?.data?.errors?.email?.[0] ||
//        error?.response?.data?.errors?.password?.[0] ||
//        error?.message ||
//        t("loginFailed") ||
//        "Login failed. Please check your credentials.";

//      setSnackbar({
//        open: true,
//        message: msg,
//        severity: "error",
//      });
//    }
//  };

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="space-y-2 text-center">
//         <h2 className="text-3xl font-bold text-foreground">
//           {t("welcomeBack")}
//         </h2>
//         <p className="text-muted-foreground">{t("loginSubtitle")}</p>
//       </div>

//       {/* FORM */}
//       <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
//         {/* EMAIL */}
//         <Controller
//           name="email"
//           control={control}
//           render={({ field }) => {
//             const [emailValue, setEmailValue] = useState(field.value);
//             const debouncedEmail = useDebounce(emailValue, 500);

//             useEffect(() => {
//               field.onChange(debouncedEmail);
//             }, [debouncedEmail, field]);

//             return (
//               <InputField
//                 id="email"
//                 label={t("email")}
//                 type="email"
//                 placeholder="admin@example.com"
//                 value={emailValue}
//                 onChange={(v) => setEmailValue(v.replace(/\s/g, ""))}
//                 error={errors.email?.message}
//                 required
//               />
//             );
//           }}
//         />

//         {/* PASSWORD */}
//         <Controller
//           name="password"
//           control={control}
//           render={({ field }) => {
//             const [passwordValue, setPasswordValue] = useState(field.value);
//             const debouncedPassword = useDebounce(passwordValue, 500);

//             useEffect(() => {
//               field.onChange(debouncedPassword);
//             }, [debouncedPassword, field]);

//             return (
//               <InputField
//                 id="password"
//                 label={t("password")}
//                 type="password"
//                 passwordToggle
//                 value={passwordValue}
//                 onChange={(v) => setPasswordValue(v.replace(/\s/g, ""))}
//                 error={errors.password?.message}
//                 required
//               />
//             );
//           }}
//         />

//         {/* REMEMBER ME */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2 rtl:space-x-reverse">
//             <Controller
//               name="rememberMe"
//               control={control}
//               render={({ field }) => (
//                 <Checkbox
//                   checked={field.value}
//                   onCheckedChange={(v) => field.onChange(v as boolean)}
//                 />
//               )}
//             />
//             <Label className="text-sm cursor-pointer">{t("rememberMe")}</Label>
//           </div>

//           <Button type="button" className="px-0 text-[#BDA575]">
//             {t("forgotPassword")}
//           </Button>
//         </div>

//         {/* SUBMIT */}
//         <Button
//           type="submit"
//           className="w-full h-11 bg-[#012523] text-[#BDA575]"
//           disabled={isPending}
//         >
//           {isPending ? (
//             <div className="inline-block h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin" />
//           ) : (
//             t("login")
//           )}
//         </Button>
//       </form>

//       {/* SNACKBAR */}
//       <Snackbar
//         open={snackbar.open}
//         message={snackbar.message}
//         severity={snackbar.severity}
//         onClose={handleCloseSnackbar}
//       />
//     </div>
//   );
// };
