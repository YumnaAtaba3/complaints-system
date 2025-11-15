// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { Button } from "@/shared/components/ui/button";
// import { Input } from "@/shared/components/ui/input";
// import { Label } from "@/shared/components/ui/label";
// import { Checkbox } from "@/shared/components/ui/checkbox";
// import { useAuthStore } from "@/stores/use-auth-store";
// import { ThemeToggle } from "@/shared/components/theme-toggle";
// import { LanguageToggle } from "@/shared/components/language-toggle";
// import eagleBg from "@/assets/eagle-bg.jpg";
// import { Eye, EyeOff } from "lucide-react";

// import { loginSchema } from "@/features/auth/config";

// const Login = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const login = useAuthStore((state) => state.login);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});

//   // -------------------------------
//   // REAL-TIME VALIDATION FUNCTION
//   // -------------------------------
//   const validateField = async (field: string, value: any) => {
//     try {
//       await loginSchema.validateAt(field, {
//         email,
//         password,
//         rememberMe,
//         [field]: value,
//       });

//       setFormErrors((prev) => ({ ...prev, [field]: "" }));
//     } catch (err: any) {
//       setFormErrors((prev) => ({ ...prev, [field]: err.message }));
//     }
//   };

//   // -------------------------------
//   // ON SUBMIT VALIDATION
//   // -------------------------------
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormErrors({});

//     try {
//       await loginSchema.validate(
//         { email, password, rememberMe },
//         { abortEarly: false }
//       );

//       await login(email, password);
//       navigate("/dashboard");
//     } catch (err: any) {
//       if (err.inner) {
//         const errors: Record<string, string> = {};
//         err.inner.forEach((e: any) => {
//           errors[e.path] = e.message;
//         });
//         setFormErrors(errors);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex">
//       {/* Left Side - Eagle Background */}
//       <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-r-[3rem] bg-primary">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: `url(${eagleBg})` }}
//         >
//           <div className="absolute inset-0 bg-[#012523]/40" />
//         </div>
//         <div className="relative z-10 flex flex-col items-center justify-end w-full p-12 pb-24">
//           <div className="text-center space-y-4">
//             <h1 className="text-5xl font-bold text-[#BDA575] drop-shadow-2xl">
//               {t("complaints")}
//             </h1>
//             <p className="text-xl text-[#BDA575]/90 drop-shadow-lg">
//               {t("governmentSystem")}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="flex-1 flex items-center justify-center p-8 bg-background">
//         <div className="w-full max-w-md space-y-8">
//           {/* Header with Theme & Language toggles */}
//           <div className="flex justify-end gap-2">
//             <ThemeToggle />
//             <LanguageToggle />
//           </div>

//           {/* Mobile Logo */}
//           <div className="lg:hidden text-center mb-8">
//             <h1 className="text-3xl font-bold text-[#BDA575] mb-2">
//               {t("complaints")}
//             </h1>
//             <p className="text-sm text-muted-foreground">
//               {t("governmentSystem")}
//             </p>
//           </div>

//           {/* Login Form */}
//           <div className="space-y-6">
//             <div className="space-y-2 text-center">
//               <h2 className="text-3xl font-bold text-foreground">
//                 {t("welcomeBack")}
//               </h2>
//               <p className="text-muted-foreground">{t("loginSubtitle")}</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email">{t("email")}</Label>

//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="admin@example.com"
//                   value={email}
//                   onChange={async (e) => {
//                     const val = e.target.value;
//                     setEmail(val);
//                     await validateField("email", val);
//                   }}
//                   required
//                   className="h-11"
//                 />

//                 {formErrors.email && (
//                   <p className="text-red-500 text-sm">{formErrors.email}</p>
//                 )}
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <Label htmlFor="password">{t("password")}</Label>

//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={async (e) => {
//                       const val = e.target.value;
//                       setPassword(val);
//                       await validateField("password", val);
//                     }}
//                     required
//                     className="h-11 pr-12"
//                   />

//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5 text-muted-foreground" />
//                     ) : (
//                       <Eye className="h-5 w-5 text-muted-foreground" />
//                     )}
//                   </Button>
//                 </div>

//                 {formErrors.password && (
//                   <p className="text-red-500 text-sm">{formErrors.password}</p>
//                 )}
//               </div>

//               {/* Remember + Forgot */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2 rtl:space-x-reverse">
//                   <Checkbox
//                     id="remember"
//                     checked={rememberMe}
//                     onCheckedChange={async (checked) => {
//                       const val = checked as boolean;
//                       setRememberMe(val);
//                       await validateField("rememberMe", val);
//                     }}
//                   />
//                   <Label
//                     htmlFor="remember"
//                     className="text-sm font-normal cursor-pointer"
//                   >
//                     {t("rememberMe")}
//                   </Label>
//                 </div>

//                 <Button
//                   type="button"
//                   className="px-0 text-[#BDA575] hover:text-[#BDA575]/80"
//                 >
//                   {t("forgotPassword")}
//                 </Button>
//               </div>

//               {/* Submit */}
//               <Button
//                 type="submit"
//                 className="w-full h-11 bg-[#012523] hover:bg-[#012523]/90 text-[#BDA575] font-semibold"
//               >
//                 {t("login")}
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
