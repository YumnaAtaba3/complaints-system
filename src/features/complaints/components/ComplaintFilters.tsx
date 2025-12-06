// src/complaints/ComplaintFilters.tsx
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import { Search } from "lucide-react";
import ComplaintsService from "../services/api"; // API service

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  statusFilter: string;
  onStatusChange: (v: string) => void;
  typeFilter: string;
  onTypeChange: (v: string) => void;
  unitFilter?: string;
  onUnitChange?: (v: string) => void;
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
  
}) => {
  const [statusOptions, setStatusOptions] = useState<Record<string, string>>(
    {}
  );
  const [typeOptions, setTypeOptions] = useState<Record<string, string>>({});
  const [unitOptions, setUnitOptions] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoading(true);

        // Status options from API
        const statusData = await ComplaintsService.getStatusOptions();
        const englishStatus: Record<string, string> = {
          pending: "Pending",
          open: "Open",
          "in-review": "In Review",
          resolved: "Resolved",
          rejected: "Rejected",
        };
        setStatusOptions(
          Object.keys(statusData).reduce((acc, key) => {
            acc[key] = englishStatus[key] ?? key;
            return acc;
          }, {} as Record<string, string>)
        );

        // Type options (hardcoded or fetched from API)
        setTypeOptions({
          service: "Service",
          product: "Product",
          logistics: "Logistics",
        });

        // Unit options (hardcoded or fetched from API)
        setUnitOptions({
          "gov-1": "Unit A",
          "gov-2": "Unit B",
        });
      } catch (err) {
        console.error("Failed to fetch filter options", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  return (
    <div className="flex gap-4 mb-6 flex-wrap items-center">
      {/* Search */}
      <div className="relative w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search complaints..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Status Filter */}
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px] bg-background">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-background [&>div>div]:hover:bg-muted/10">
          <SelectItem value="all">All Statuses</SelectItem>
          {!loading &&
            Object.entries(statusOptions).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* Type Filter */}
      <Select value={typeFilter} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[180px] bg-background">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-background [&>div>div]:hover:bg-muted/10">
          <SelectItem value="all">All Types</SelectItem>
          {Object.entries(typeOptions).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Government Unit Filter */}
     { unitFilter !== undefined && onUnitChange && (
        <Select value={unitFilter} onValueChange={onUnitChange}>
          <SelectTrigger className="w-[200px] bg-background">
            <SelectValue placeholder="Government Unit" />
          </SelectTrigger>
          <SelectContent className="bg-background [&>div>div]:hover:bg-muted/10">
            <SelectItem value="all">All Units</SelectItem>
            {Object.entries(unitOptions).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default ComplaintFilters;
