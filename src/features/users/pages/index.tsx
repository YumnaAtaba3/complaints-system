import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Loader2 } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import UsersTable from "../components/users-table";
import UsersFilters from "../components/users-filter";
import UsersPagination from "../components/users-pagination";

import { useUsers } from "@/features/users/services/queries";

// Shared UI
import UserDialog from "../components/user-dialog";
import ConfirmDialog from "@/shared/components/ui/confirm-dialog";

// Delete mutations
import {
  useDeleteUser,
  usePermanentDeleteUser,
} from "@/features/users/services/mutations";

const UsersPage: React.FC = () => {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGovernmentUnit, setSelectedGovernmentUnit] =
    useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Add/Update dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  // Delete dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserForDelete, setSelectedUserForDelete] = useState<
    any | null
  >(null);

  // Delete mutations
  const softDeleteUser = useDeleteUser();
  const permanentDeleteUser = usePermanentDeleteUser();

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

  const handleDelete = () => {
    if (!selectedUserForDelete) return;

    const userId = selectedUserForDelete.id;
    const role = selectedUserForDelete.role;

    if (role === "admin") {
      permanentDeleteUser.mutate(
        { userId },
        {
          onSuccess: () => {
            setOpenDeleteDialog(false);
            setSelectedUserForDelete(null);
          },
        }
      );
    } else {
      softDeleteUser.mutate(
        { userId },
        {
          onSuccess: () => {
            setOpenDeleteDialog(false);
            setSelectedUserForDelete(null);
          },
        }
      );
    }
  };

  return (
    <div className="container py-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-extrabold text-foreground">
          {t("usersManagement")}
        </h1>
        <Button
          onClick={() => {
            setSelectedUser(null);
            setOpenDialog(true);
          }}
          className=" text-white bg-gold hover:bg-gold/90 "
        >
          <Plus className="h-4 w-4" />
          {t("addUser")}
        </Button>
      </div>

      {/* MAIN CARD */}
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
          <UsersTable
            users={users}
            onEdit={(user) => {
              setSelectedUser(user);
              setOpenDialog(true);
            }}
            onDelete={(user) => {
              setSelectedUserForDelete(user);
              setOpenDeleteDialog(true);
            }}
          />
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

      {/* ADD/UPDATE User Dialog */}
      <UserDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        user={selectedUser}
      />

      {/* DELETE Dialog */}
      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title={t("areYouSure")}
        description={
          selectedUserForDelete?.role === "admin"
            ? t("permanentDeleteWarning")
            : t("softDeleteWarning")
        }
        confirmLabel={
          selectedUserForDelete?.role === "admin"
            ? t("deletePermanently")
            : t("delete")
        }
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default UsersPage;
