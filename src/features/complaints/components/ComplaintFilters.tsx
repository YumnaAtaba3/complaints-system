/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import { Search, Loader2 } from "lucide-react";

import ComplaintsService from "../services/api";
import UsersService, { type User } from "../services/UsersService";

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  statusFilter: string;
  onStatusChange: (v: string) => void;
  typeFilter: string;
  onTypeChange: (v: string) => void;
  userFilter: string;
  onUserChange: (v: string) => void;
  unitFilter: string;
  onUnitChange: (v: string) => void;
}

const ComplaintFilters: React.FC<FiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
  userFilter,
  onUserChange,
  unitFilter,
  onUnitChange,
}) => {
  const [statusOptions, setStatusOptions] = useState<Record<string, string>>(
    {}
  );
  const [users, setUsers] = useState<User[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingFormData, setLoadingFormData] = useState(false);

  // Load form-data (types + units)
  useEffect(() => {
    const loadFormData = async () => {
      setLoadingFormData(true);
      try {
        const form = await ComplaintsService.getFormData();
        setUnits(form.governmentUnits || []);
        setTypes(form.types || []);
      } catch (error) {
        console.error("Failed to load form-data:", error);
      } finally {
        setLoadingFormData(false);
      }
    };

    loadFormData();
  }, []);

  // Load status options
  useEffect(() => {
    const loadStatuses = async () => {
      try {
        const statuses = await ComplaintsService.getStatusOptions();
        setStatusOptions(statuses || {});
      } catch (error) {
        console.error("Failed to load statuses:", error);
      }
    };
    loadStatuses();
  }, []);

  // Load users on mount
  useEffect(() => {
    const loadUsers = async () => {
      setLoadingUsers(true);
      try {
        const response = await UsersService.getUsers();
        setUsers(response.users);
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };
    loadUsers();
  }, []);

  return (
    <div className="flex gap-4 flex-wrap items-center mb-6">
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
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {Object.entries(statusOptions).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Type Filter – now loads dynamically */}
      <Select value={typeFilter} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>

          {loadingFormData ? (
            <div className="flex justify-center py-2">
              <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
            </div>
          ) : (
            types.map((t) => (
              <SelectItem key={t.id} value={t.id.toString()}>
                {t.name.en}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      {/* User Filter */}
      <Select
        value={userFilter}
        onValueChange={onUserChange}
        disabled={loadingUsers}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={loadingUsers ? "Loading users..." : "User"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Users</SelectItem>

          {loadingUsers ? (
            <div className="flex justify-center py-2">
              <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
            </div>
          ) : (
            users.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.first_name} {user.last_name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      {/* Unit Filter – also from form-data */}
      <Select
        value={unitFilter}
        onValueChange={onUnitChange}
        disabled={loadingFormData}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={loadingFormData ? "Loading units..." : "Unit"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Units</SelectItem>

          {loadingFormData ? (
            <div className="flex justify-center py-2">
              <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
            </div>
          ) : (
            units.map((unit) => (
              <SelectItem key={unit.id} value={unit.id.toString()}>
                {unit.name_translation.en}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ComplaintFilters;
