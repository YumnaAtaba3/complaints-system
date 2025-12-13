/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
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

  // 🔍 user search inside dropdown
  const [userSearch, setUserSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      `${u.first_name} ${u.last_name}`
        .toLowerCase()
        .includes(userSearch.toLowerCase())
    );
  }, [users, userSearch]);

  // Load form data (types + units)
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

  // Load statuses
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

  // Load users
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

      {/* Status */}
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

      {/* Type */}
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

      {/* ✅ User Filter (Search + Dropdown) */}
      <Select
        value={userFilter}
        onValueChange={(value) => {
          onUserChange(value);
          setUserSearch("");
        }}
        disabled={loadingUsers}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue
            placeholder={loadingUsers ? "Loading users..." : "User"}
          />
        </SelectTrigger>

        <SelectContent>
          <div className="p-2 sticky top-0 bg-background z-10">
            <Input
              placeholder="Search user..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="h-8"
            />
          </div>

          <SelectItem value="all">All Users</SelectItem>

          {loadingUsers ? (
            <div className="flex justify-center py-2">
              <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
            </div>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.first_name} {user.last_name}
              </SelectItem>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              No users found
            </div>
          )}
        </SelectContent>
      </Select>

      {/* Unit */}
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
