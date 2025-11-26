import { ThemeToggle } from "@/shared/components/theme-toggle";
import { LanguageToggle } from "@/shared/components/language-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { Settings, LogOut, User } from "lucide-react";
import { useAuthStore } from "@/stores/use-auth-store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const DashboardHeader = () => {
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex h-16 items-center gap-4 border-b px-4 justify-end">
      <ThemeToggle />
      <LanguageToggle />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 z-50 bg-white">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Settings className="h-4 w-4 mr-2" /> {t("settings")}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
