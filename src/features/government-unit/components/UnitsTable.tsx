import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Edit,  Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { type GovernmentUnit as Unit } from "../types";

interface UnitsTableProps {
  units: Unit[];
  onEdit: (unit: Unit) => void;
  onToggleActive: (unit: Unit) => void;
}

export const UnitsTable: React.FC<UnitsTableProps> = ({
  units,
  onEdit,
  onToggleActive,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/40 dark:bg-muted/20">
          <TableHead className="font-medium text-foreground">
            Unit Name
          </TableHead>
          <TableHead className="font-medium text-foreground">Created</TableHead>
          <TableHead className="font-medium text-foreground">Status</TableHead>
          <TableHead className="font-medium text-foreground">Manager</TableHead>
          <TableHead className="text-center font-medium text-foreground">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {units.length > 0 ? (
          units.map((unit) => (
            <TableRow
              key={unit.id}
              className="hover:bg-muted/20 dark:hover:bg-muted/30 transition"
            >
              <TableCell className="font-medium">
                {unit.name_translation?.en ?? unit.name}
                {unit.name_translation?.ar && (
                  <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                    {unit.name_translation.ar}
                  </div>
                )}
              </TableCell>

              <TableCell className="text-muted-foreground dark:text-muted-foreground">
                {new Date(unit.created_at).toLocaleString()}
              </TableCell>

              <TableCell>
                {unit.is_active ? (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300 rounded-full">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300 rounded-full">
                    Disabled
                  </span>
                )}
              </TableCell>

              <TableCell className="text-muted-foreground dark:text-muted-foreground">
                {unit.manager
                  ? `${unit.manager.first_name} ${unit.manager.last_name}`
                  : "— No Manager"}
              </TableCell>

              <TableCell className="flex justify-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gold hover:bg-gold/10"
                  onClick={() => onEdit(unit)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:bg-destructive/10"
                  onClick={() => onToggleActive(unit)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={5}
              className="py-8 text-center text-muted-foreground dark:text-muted-foreground"
            >
              No units found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UnitsTable;
