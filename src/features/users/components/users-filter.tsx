import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import { Search, Filter, Loader2 } from "lucide-react";
import { useGovernmentUnits } from "@/features/government-unit/services/queries";
import { useTranslation } from "react-i18next";

interface UsersFiltersProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedGovernmentUnit: string;
  setSelectedGovernmentUnit: React.Dispatch<React.SetStateAction<string>>;
}

const UsersFilters: React.FC<UsersFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedGovernmentUnit,
  setSelectedGovernmentUnit,
}) => {
  const { t } = useTranslation();

  // Fetch the government units
  const { units, loading, isError } = useGovernmentUnits();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full py-4">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          aria-label="Search Users"
          placeholder={t("searchUsers")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full bg-background text-foreground"
        />
      </div>

      {/* Government Unit Filter */}
      <div className="w-full sm:w-[220px]">
        <Select
          value={selectedGovernmentUnit}
          onValueChange={setSelectedGovernmentUnit}
          disabled={loading || isError}
        >
          <SelectTrigger className="w-full bg-background text-foreground border-border">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              {loading && (
                <Loader2 className="animate-spin h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <SelectValue placeholder={t("filterByUnit")} />
          </SelectTrigger>

          <SelectContent className="bg-background text-foreground border-border">
            {isError ? (
              <SelectItem value="" disabled>
                {t("noUnitsAvailable")}
              </SelectItem>
            ) : (
              <>
                <SelectItem value="all">{t("allUnits")}</SelectItem>
                {units?.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id.toString()}>
                    {unit.name_translation?.[
                      t("lang") as keyof typeof unit.name_translation
                    ] || unit.name}
                  </SelectItem>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UsersFilters;
