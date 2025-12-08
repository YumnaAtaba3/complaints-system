import React, { useState } from "react";
import { Loader2, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import UsersTable from "../components/users-table";
import UsersPagination from "../components/users-pagination";

import { useDeletedUsers } from "@/features/users/services/queries";
import {
  useRestoreUser,
  usePermanentDeleteUser,
} from "@/features/users/services/mutations";

import ConfirmDialog from "@/shared/components/ui/confirm-dialog";
import { t } from "i18next";
import { cn } from "@/lib/utils";

const DeletedUsersPage: React.FC = () => {
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, isError } = useDeletedUsers({
    page: currentPage,
    perPage: itemsPerPage,
  });

  const deletedUsers = data?.users || [];

  const totalItems = data?.pagination?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + deletedUsers.length, totalItems);

  // Restore & permanent delete logic
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [deleteType, setDeleteType] = useState<"restore" | "permanent">(
    "restore"
  );

  const restoreUser = useRestoreUser();
  const permanentDeleteUser = usePermanentDeleteUser();

  const handleConfirmAction = () => {
    if (!selectedUser) return;
    const userId = selectedUser.id;

    if (deleteType === "restore") {
      restoreUser.mutate({ userId });
    } else {
      permanentDeleteUser.mutate({ userId });
    }
  };

  React.useEffect(() => {
    if (restoreUser.isSuccess || permanentDeleteUser.isSuccess) {
      setOpenDeleteDialog(false);
      setSelectedUser(null);
    }
  }, [restoreUser.isSuccess, permanentDeleteUser.isSuccess]);

  return (
    <div className="container py-6">
      {/* PAGE TABS */}
      <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit mb-6">
        <button
          onClick={() => navigate("/dashboard/users")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
            "text-muted-foreground hover:text-foreground hover:bg-background/50"
          )}
        >
          <Users className="h-4 w-4" />
          {t("users")}
        </button>

        <button
          onClick={() => navigate("/dashboard/deleted-users")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
            "bg-background text-foreground shadow-sm"
          )}
        >
          <Trash2 className="h-4 w-4" />
          {t("deletedAccounts")}
        </button>
      </div>

      {/* HEADER */}
      <h1 className="text-3xl font-extrabold mb-4 text-foreground">
        {t("deletedAccounts")}
      </h1>

      <div className="card">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500">
            Error fetching deleted users
          </div>
        ) : (
          <UsersTable
            users={deletedUsers}
            hideEdit={true}
            isDeletedPage={true}
            onDelete={(user) => {
              setSelectedUser(user);
              setDeleteType("restore");
              setOpenDeleteDialog(true);
            }}
            onPermanentDelete={(user) => {
              setSelectedUser(user);
              setDeleteType("permanent");
              setOpenDeleteDialog(true);
            }}
          />
        )}

        {/* PAGINATION */}
        <UsersPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          filteredUsersLength={totalItems}
        />
      </div>

      {/* CONFIRM DIALOG */}
      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title={
          deleteType === "restore" ? t("restoreUser") : t("deletePermanently")
        }
        description={
          deleteType === "restore"
            ? t("restoreUserWarning")
            : t("permanentDeleteWarning")
        }
        confirmLabel={
          deleteType === "restore" ? t("restore") : t("deletePermanently")
        }
        onConfirm={handleConfirmAction}
        loading={
          deleteType === "restore"
            ? restoreUser.isLoading
            : permanentDeleteUser.isLoading
        }
      />
    </div>
  );
};

export default DeletedUsersPage;
