import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Edit, Trash, Ban, RotateCcw } from "lucide-react";
import { rolesStorage } from "@/features/auth/storage";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  national_number: string | null;
  government_unit?: {
    id: number;
    name: string;
  };
}

interface UsersTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  onPermanentDelete?: (user: User) => void;
  hideEdit?: boolean;
  hideSoftDelete?: boolean;
  isDeletedPage?: boolean; // NEW
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onEdit,
  onDelete,
  onPermanentDelete,
  hideEdit = false,
  hideSoftDelete = false,
  isDeletedPage,
}) => {
  // Get roles safely
  let roles: any[] = [];

  try {
    const raw = rolesStorage.get();
    roles = typeof raw === "string" ? JSON.parse(raw) : raw || [];
  } catch {
    roles = [];
  }

  const isAdmin = roles.some((r: any) => r?.name?.toLowerCase() === "admin");

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/40">
          <TableHead className="font-medium text-foreground">
            User Name
          </TableHead>
          <TableHead className="font-medium text-foreground">Email</TableHead>
          <TableHead className="font-medium text-foreground">Phone</TableHead>
          <TableHead className="font-medium text-foreground">
            National Number
          </TableHead>
          <TableHead className="text-center font-medium text-foreground">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.length > 0 ? (
          users.map((u) => (
            <TableRow key={u.id} className="hover:bg-muted/20 transition">
              <TableCell className="font-medium">
                {u.first_name} {u.last_name}
              </TableCell>
              <TableCell className="text-muted-foreground">{u.email}</TableCell>
              <TableCell className="text-muted-foreground">{u.phone}</TableCell>
              <TableCell className="text-muted-foreground">
                {u.national_number}
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  {/* ----------- EDIT BUTTON ----------- */}
                  {!hideEdit && onEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(u)}
                      className="h-8 w-8 text-gold hover:bg-gold/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}

                  {/* --- SOFT DELETE / RESTORE BUTTON --- */}
                  {!hideSoftDelete && onDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className={
                        isDeletedPage
                          ? "text-green-600 hover:bg-green-600/10"
                          : "text-destructive"
                      }
                      onClick={() => onDelete(u)}
                    >
                      {isDeletedPage ? (
                        <RotateCcw className="h-4 w-4" /> // RESTORE ICON
                      ) : (
                        <Ban className="h-4 w-4" /> // SOFT DELETE ICON
                      )}
                    </Button>
                  )}

                  {/* ----------- PERMANENT DELETE (ADMIN ONLY) ----------- */}
                  {isAdmin && onPermanentDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-700 hover:bg-red-700/10"
                      onClick={() => onPermanentDelete(u)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={5}
              className="py-8 text-center text-muted-foreground"
            >
              No users found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
