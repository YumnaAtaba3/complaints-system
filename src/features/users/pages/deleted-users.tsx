import React, { useState } from "react";
import { Loader2, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useDeletedUsers } from "@/features/users/services/queries";
import {
  useRestoreUser,
  usePermanentDeleteUser,
} from "@/features/users/services/mutations";

import UsersTable from "../components/users-table";
import ConfirmDialog from "@/shared/components/ui/confirm-dialog";
import { t } from "i18next";
import { cn } from "@/lib/utils";

const DeletedUsersPage: React.FC = () => {
  const navigate = useNavigate();

  const { data: deletedUsers, isLoading, isError } = useDeletedUsers();

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
      {/* PAGE TABS - REPLACE THE WHOLE TABS BLOCK */}
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
            "bg-background text-foreground shadow-sm rounded-md"
          )}
        >
          <Trash2 className="h-4 w-4" />
          {t("deletedAccounts")}
        </button>
      </div>

      {/* HEADER */}
      <h1 className="text-3xl font-extrabold mb-4 text-foreground">
        Deleted Accounts
      </h1>

      <div className="card">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500">Error fetching users</div>
        ) : (
          <UsersTable
            users={deletedUsers || []}
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
      </div>

      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title={
          deleteType === "restore"
            ? "Restore this user?"
            : "Delete permanently?"
        }
        description={
          deleteType === "restore"
            ? "This will restore the user account."
            : "This action is irreversible. This user will be permanently deleted."
        }
        confirmLabel={
          deleteType === "restore" ? "Restore" : "Delete Permanently"
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
