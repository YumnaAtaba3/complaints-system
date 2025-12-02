import React from "react";
import { Input } from "@/shared/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

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
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full py-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          aria-label="Search Users"
          placeholder="Search Users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full bg-background text-foreground"
        />
      </div>

      <div className="w-full sm:w-[220px]">
        <Select
          value={selectedGovernmentUnit}
          onValueChange={setSelectedGovernmentUnit}
        >
          <SelectTrigger className="w-full bg-background text-foreground border-border">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Filter By Unit" />
          </SelectTrigger>
          <SelectContent className="bg-background text-foreground border-border">
            <SelectItem value="all">All Units</SelectItem>
            <SelectItem value="1">Unit 1</SelectItem>
            <SelectItem value="2">Unit 2</SelectItem>
            <SelectItem value="3">Unit 3</SelectItem>
            <SelectItem value="4">Unit 4</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UsersFilters;
