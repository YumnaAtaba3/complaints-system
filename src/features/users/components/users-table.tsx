import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

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
  government_unit: {
    id: number;
    name: string;
  };
}

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void; // 👈 Added
  onDelete: (user: User) => void; // 👈 ADDED
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onDelete }) => {
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary hover:bg-primary/10"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  {/* 👇 EDIT BUTTON triggers dialog */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(u)}
                    className="h-8 w-8 text-gold hover:bg-gold/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => onDelete(u)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
