import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { type GovernmentUnit as Unit } from "../types";
import { UnitActions } from "./UnitActions";
import { Building } from "lucide-react";

interface UnitsTableProps {
  units: Unit[];
  onEdit: (unit: Unit) => void;
  onToggleActive: (unit: Unit) => void;
  unitActionLoading: { [id: number]: boolean }; 
}

export const UnitsTable: React.FC<UnitsTableProps> = ({
  units,
  onEdit,
  onToggleActive,
  unitActionLoading
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
                <UnitActions
                  unit={unit}
                  onEdit={onEdit}
                  onToggleActive={onToggleActive}
                loading={unitActionLoading[unit.id]}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="py-16 text-center">
              <div className="flex flex-col items-center justify-center gap-4">
                <Building className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  No Units Found
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  There are currently no government units to display.
                </p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UnitsTable;
