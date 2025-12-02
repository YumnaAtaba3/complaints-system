// src/complaints/ComplaintFilters.tsx
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import { Search } from "lucide-react";

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  statusFilter: string;
  onStatusChange: (v: string) => void;
  typeFilter: string;
  onTypeChange: (v: string) => void;
  unitFilter: string;
  onUnitChange: (v: string) => void;
  showUnitFilter: boolean;
}

const ComplaintFilters: React.FC<FiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
  unitFilter,
  onUnitChange,
  showUnitFilter,
}) => {
  return (
    <div className="flex gap-4 mb-4 flex-wrap items-center">
      <div className="relative w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search complaints..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="Open">Open</SelectItem>
          <SelectItem value="Assigned">Assigned</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Closed">Closed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={typeFilter} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Service">Service</SelectItem>
          <SelectItem value="Product">Product</SelectItem>
          <SelectItem value="Logistics">Logistics</SelectItem>
        </SelectContent>
      </Select>

      {showUnitFilter && (
        <Select value={unitFilter} onValueChange={onUnitChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Government Unit" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Units</SelectItem>
            <SelectItem value="gov-1">Unit A</SelectItem>
            <SelectItem value="gov-2">Unit B</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default ComplaintFilters;
