import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useAuthStore } from "@/stores/use-auth-store";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import { LanguageToggle } from "@/shared/components/language-toggle";
import eagleBg from "@/assets/eagle-bg.jpg";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Eagle Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-r-[3rem] bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${eagleBg})` }}
        >
          <div className="absolute inset-0 bg-[#012523]/40" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-end w-full p-12 pb-24">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-[#BDA575] drop-shadow-2xl">
              {t("complaints")}
            </h1>
            <p className="text-xl text-[#BDA575]/90 drop-shadow-lg">
              {t("governmentSystem")}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Header with Theme & Language toggles */}
          <div className="flex justify-end gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-[#BDA575] mb-2">
              {t("complaints")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("governmentSystem")}
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold text-foreground">
                {t("welcomeBack")}
              </h2>
              <p className="text-muted-foreground">{t("loginSubtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {t("rememberMe")}
                  </Label>
                </div>
                <Button
                  type="button"
                  className="px-0 text-[#BDA575] hover:text-[#BDA575]/80"
                >
                  {t("forgotPassword")}
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-[#012523] hover:bg-[#012523]/90 text-[#BDA575] font-semibold"
              >
                {t("login")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
