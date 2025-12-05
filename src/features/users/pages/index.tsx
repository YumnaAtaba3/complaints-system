import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Loader2 } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import UsersTable from "../components/users-table";
import UsersFilters from "../components/users-filter";
import UsersPagination from "../components/users-pagination";

import { useUsers } from "@/features/users/services/queries";

// 👇 Add the dialog import
import AddUserDialog from "../components/add-user-modal";

const UsersPage: React.FC = () => {
  const { t } = useTranslation();

  // States for filters and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGovernmentUnit, setSelectedGovernmentUnit] =
    useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 👇 Add User Dialog State
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Fetch users with the useUsers hook
  const { data, isLoading, isError } = useUsers({
    search: searchQuery,
    governmentUnitId:
      selectedGovernmentUnit === "all" ? "" : selectedGovernmentUnit,
    page: currentPage,
    perPage: itemsPerPage,
  });

  const users = data?.users || [];
  const totalItems = data?.pagination?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(users.length, startIndex + itemsPerPage);

  return (
    <div className="container py-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl font-extrabold text-gold">
          {t("usersManagement")}
        </h1>

        {/* 👇 This button now opens the Add User Dialog */}
        <Button
          onClick={() => setOpenAddDialog(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          <span>{t("addUser")}</span>
        </Button>
      </div>

      {/* Main Card */}
      <div className="card">
        <UsersFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGovernmentUnit={selectedGovernmentUnit}
          setSelectedGovernmentUnit={setSelectedGovernmentUnit}
        />

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin h-12 w-12 text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500">Error fetching users</div>
        ) : (
          <UsersTable users={users} />
        )}

        <UsersPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          filteredUsersLength={users.length}
        />
      </div>

      {/* 👇 Add User Dialog Component */}
      <AddUserDialog open={openAddDialog} onOpenChange={setOpenAddDialog} />
    </div>
  );
};

export default UsersPage;
