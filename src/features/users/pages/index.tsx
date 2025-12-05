import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import UsersTable from "../components/users-table";
import UsersFilters from "../components/users-filter";
import UsersPagination from "../components/users-pagination";
import { useUsers } from "@/features/users/services/queries"; // Import the useUsers hook
import { Loader2 } from "lucide-react"; // Loading spinner icon

const UsersPage: React.FC = () => {
  const { t } = useTranslation();

  // States for filters and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGovernmentUnit, setSelectedGovernmentUnit] =
    useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch users with the useUsers hook
  const { data, isLoading, isError } = useUsers({
    search: searchQuery,
    governmentUnitId:
      selectedGovernmentUnit === "all" ? "" : selectedGovernmentUnit,
    page: currentPage,
    perPage: itemsPerPage,
  });

  // If data is undefined, fallback to empty array and 0 pagination total
  const users = data?.users || [];
  const totalItems = data?.pagination?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle pagination data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(users.length, startIndex + itemsPerPage);

  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl font-extrabold text-gold">
          {t("usersManagement")}
        </h1>
        <Button
          onClick={() => console.log("add user")}
          className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          <span>{t("addUser")}</span>
        </Button>
      </div>

      <div className="card">
        {/* Filters Component */}
        <UsersFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGovernmentUnit={selectedGovernmentUnit}
          setSelectedGovernmentUnit={setSelectedGovernmentUnit}
        />

        {/* Display Loading Spinner or Error Message */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin h-12 w-12 text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500">Error fetching users</div>
        ) : (
          // Display Users Table
          <UsersTable users={users} />
        )}

        {/* Pagination Component */}
        <UsersPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          filteredUsersLength={users.length}
        />
      </div>
    </div>
  );
};

export default UsersPage;
