import React, { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Search } from "lucide-react";
import ManagersService from "../services/ManagersService";
import type { Manager } from "../types";

type Props = {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  statusFilter: "all" | "active" | "disabled";
  onStatusChange: (v: "all" | "active" | "disabled") => void;
  managerFilter: number | "all";
  onManagerChange: (v: number | "all") => void;
  includeTrashed: boolean;
  onIncludeTrashedChange: (v: boolean) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (v: number) => void;
};

export const Filters: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  managerFilter,
  onManagerChange,
  includeTrashed,
  onIncludeTrashedChange,

}) => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loadingManagers, setLoadingManagers] = useState(false);

  const handleManagerDropdownOpen = async () => {
    if (managers.length === 0) {
      setLoadingManagers(true);
      try {
        const data = await ManagersService.getManagers();
        setManagers(data);
      } catch (error) {
        console.error("Failed to load managers:", error);
      } finally {
        setLoadingManagers(false);
      }
    }
  };

  return (
    <div className="flex gap-4 mb-6 flex-wrap items-center">
      {/* Search input */}
      <div className="relative w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background border-muted-foreground text-foreground"
        />
      </div>

      {/* Manager Filter */}
      <Select
        value={managerFilter.toString()}
        onValueChange={(v) => onManagerChange(v === "all" ? "all" : Number(v))}
        onOpenChange={(open) => open && handleManagerDropdownOpen()}
      >
        <SelectTrigger className="w-[180px] bg-background border border-muted-foreground text-foreground">
          <SelectValue placeholder="Assigned Manager" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Managers</SelectItem>
          {loadingManagers && <SelectItem disabled>Loading...</SelectItem>}
          {managers.map((m) => (
            <SelectItem key={m.id} value={m.id.toString()}>
              {m.first_name && m.last_name
                ? `${m.first_name} ${m.last_name}`
                : "Unknown Manager"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Include trashed */}
      <Select
        value={includeTrashed ? "true" : "false"}
        onValueChange={(v) => onIncludeTrashedChange(v === "true")}
      >
        <SelectTrigger className="w-[180px] bg-background border border-muted-foreground text-foreground">
          <SelectValue placeholder="Include Trashed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="false">Active Only</SelectItem>
          <SelectItem value="true">Include Trashed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
