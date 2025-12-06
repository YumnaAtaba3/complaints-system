import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Loader2, Users, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useNavigate } from "react-router-dom";

import UsersTable from "../components/users-table";
import UsersFilters from "../components/users-filter";
import UsersPagination from "../components/users-pagination";

import { useUsers } from "@/features/users/services/queries";
import UserDialog from "../components/user-dialog";
import ConfirmDialog from "@/shared/components/ui/confirm-dialog";

import {
  useDeleteUser,
  usePermanentDeleteUser,
} from "@/features/users/services/mutations";
import { cn } from "@/lib/utils";

const UsersPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGovernmentUnit, setSelectedGovernmentUnit] =
    useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserForDelete, setSelectedUserForDelete] = useState<
    any | null
  >(null);
  const [deleteType, setDeleteType] = useState<"soft" | "permanent">("soft");

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

    if (deleteType === "permanent") {
      permanentDeleteUser.mutate({ userId });
    } else {
      softDeleteUser.mutate({ userId });
    }
  };

  React.useEffect(() => {
    if (softDeleteUser.isSuccess || permanentDeleteUser.isSuccess) {
      setOpenDeleteDialog(false);
      setSelectedUserForDelete(null);
    }
  }, [softDeleteUser.isSuccess, permanentDeleteUser.isSuccess]);

  return (
    <div className="container py-6">
      {/* PAGE TABS */}
      {/* PAGE TABS - REPLACE THE WHOLE TABS BLOCK */}
      <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit mb-6">
        <button
          onClick={() => navigate("/dashboard/users")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
            "text-foreground bg-background shadow-sm"
          )}
        >
          <Users className="h-4 w-4" />
          {t("users")}
        </button>

        <button
          onClick={() => navigate("/dashboard/deleted-users")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
            "text-muted-foreground hover:text-foreground hover:bg-background/50"
          )}
        >
          <Trash2 className="h-4 w-4" />
          {t("deletedAccounts")}
        </button>
      </div>

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
          className="text-white bg-gold hover:bg-gold/90"
        >
          <Plus className="h-4 w-4" />
          {t("addUser")}
        </Button>
      </div>

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
            isDeletedPage={false}
            onEdit={(user) => {
              setSelectedUser(user);
              setOpenDialog(true);
            }}
            onDelete={(user) => {
              setSelectedUserForDelete(user);
              setDeleteType("soft");
              setOpenDeleteDialog(true);
            }}
            onPermanentDelete={(user) => {
              setSelectedUserForDelete(user);
              setDeleteType("permanent");
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

      {/* ADD/UPDATE DIALOG */}
      <UserDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        user={selectedUser}
      />

      {/* DELETE / PERMANENT DELETE */}
      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title={t("areYouSure")}
        description={
          deleteType === "permanent"
            ? t("permanentDeleteWarning")
            : t("softDeleteWarning")
        }
        confirmLabel={
          deleteType === "permanent" ? t("deletePermanently") : t("delete")
        }
        onConfirm={handleDelete}
        loading={
          deleteType === "permanent"
            ? permanentDeleteUser.isLoading
            : softDeleteUser.isLoading
        }
      />
    </div>
  );
};

export default UsersPage;
