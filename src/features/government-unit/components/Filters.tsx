import React from "react";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Search } from "lucide-react";
import { type Manager } from "../types";

type Props = {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  statusFilter: "all" | "active" | "disabled";
  onStatusChange: (v: "all" | "active" | "disabled") => void;
  managerFilter: number | "all";
  onManagerChange: (v: number | "all") => void;
  itemsPerPage: number;
  onItemsPerPageChange: (v: number) => void;
  managers: Manager[];
};

export const Filters: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  managerFilter,
  onManagerChange,
  itemsPerPage,
  onItemsPerPageChange,
  managers,
}) => (
  <div className="flex gap-4 flex-wrap items-center">
    {/* Search */}
    <div className="relative w-[300px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>

    {/* Status */}
    <Select value={statusFilter} onValueChange={onStatusChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent className="bg-white [&>div>div]:hover:bg-gray-100">
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="disabled">Disabled</SelectItem>
      </SelectContent>
    </Select>

    {/* Manager */}
    <Select
      value={String(managerFilter)}
      onValueChange={(v) => onManagerChange(v === "all" ? "all" : Number(v))}
    >
      <SelectTrigger className="w-[200px] bg-white">
        <SelectValue placeholder="Managers" />
      </SelectTrigger>
      <SelectContent className="bg-white [&>div>div]:hover:bg-gray-100">
        <SelectItem value="all">All Managers</SelectItem>
        {managers.map((m) => (
          <SelectItem key={m.id} value={String(m.id)}>
            {m.first_name} {m.last_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {/* Items per page */}
    <Select
      value={String(itemsPerPage)}
      onValueChange={(v) => onItemsPerPageChange(Number(v))}
    >
      <SelectTrigger className="w-[160px] bg-white">
        <SelectValue placeholder="Items per page" />
      </SelectTrigger>
      <SelectContent className="bg-white [&>div>div]:hover:bg-gray-100">
        {[5, 10, 20, 50].map((n) => (
          <SelectItem key={n} value={String(n)}>
            {n} / page
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
