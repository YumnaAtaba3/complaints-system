/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import ComplaintsService from "../services/api";
import UsersService from "../services/UsersService";
import type { GovernmentUnit } from "@/features/government-unit/types";

export function useComplaintFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [unitFilter, setUnitFilter] = useState("all");

  const [statusOptions, setStatusOptions] = useState<Record<string, string>>({});
  const [users, setUsers] = useState<any[]>([]);
  const [units, setUnits] = useState<GovernmentUnit[]>([]);
  type ComplaintType = { id: number; name: { ar: string; en: string } };
  const [types, setTypes] = useState<ComplaintType[]>([]);  

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(false);

  // Load form-data (types + units)
  useEffect(() => {
    const loadFormData = async () => {
      setLoadingTypes(true);
      try {
        const { types, governmentUnits } = await ComplaintsService.getFormData();
        setTypes(types);
        setUnits(governmentUnits);
      } catch (error) {
        console.error("Failed to load form data:", error);
      } finally {
        setLoadingTypes(false);
      }
    };

    loadFormData();
  }, []);

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

  return {
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    typeFilter, setTypeFilter,
    userFilter, setUserFilter,
    unitFilter, setUnitFilter,

    statusOptions,
    users,
    units,
    types,            
    loadingUsers,
    loadingUnits,
    loadingTypes     
  };
}
