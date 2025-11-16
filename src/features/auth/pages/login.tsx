import { ThemeToggle } from "@/shared/components/theme-toggle";
import { LanguageToggle } from "@/shared/components/language-toggle";
import eagleBg from "@/assets/eagle-bg.jpg";
import { LoginForm } from "../components/LoginForm";
import { useTranslation } from "react-i18next";
import clsx from "clsx"; // optional, for cleaner classNames

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <div className="min-h-screen w-full flex">
      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-end gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          <LoginForm />
        </div>
      </div>

      {/* LEFT SIDE */}
      <div
        className={clsx(
          "hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary",
          {
            "rounded-l-[3rem]": !isRTL, // left rounded for LTR
            "rounded-r-[3rem]": isRTL, // right rounded for RTL
          }
        )}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${eagleBg})` }}
        >
          <div className="absolute inset-0 bg-[#012523]/40" />
        </div>

        {/* TEXT CONTENT */}
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
    </div>
  );
};

export default LoginPage;
