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

type Props = {
  units: Unit[];
  onEdit: (u: Unit) => void;
  onAssign: (u: Unit) => void;
  onToggleActive: (u: Unit) => void;
  loading?: boolean;
  containerHeight?: string;
};

export const UnitsTable: React.FC<Props> = ({
  units,
  onEdit,
  onAssign,
  onToggleActive,
  loading = false,
  containerHeight = "h-96",
}) => (
  <div className={`relative ${containerHeight} overflow-auto`}>
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>English Name</TableHead>
          <TableHead className="text-left">Created</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Manager</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {units.map((u) => (
          <TableRow key={u.id} className="hover:bg-gray-50">
            <TableCell className="text-left">
              <div className="font-medium">
                {u.name_translation?.en ?? u.name}
              </div>
              <div className="text-xs text-gray-500">
                {u.name_translation?.ar}
              </div>
            </TableCell>
            <TableCell className="text-left text-sm text-gray-600">
              {new Date(u.created_at).toLocaleString()}
            </TableCell>
            <TableCell>
              {u.is_active ? (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  Active
                </span>
              ) : (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                  Disabled
                </span>
              )}
            </TableCell>
            <TableCell>
              {u.manager
                ? `${u.manager.first_name} ${u.manager.last_name}`
                : "— No Manager"}
            </TableCell>
            <TableCell className="text-center">
              <UnitActions
                unit={u}
                onEdit={onEdit}
                onAssign={onAssign}
                onToggleActive={onToggleActive}
              />
            </TableCell>
          </TableRow>
        ))}

        {!loading && units.length === 0 && (
          <TableRow>
            <TableCell colSpan={5}>
              <div
                className={`flex items-center justify-center ${containerHeight}`}
              >
                <div className="text-center text-gray-500">
                  <div className="text-lg font-medium">No units found</div>
                  <div className="text-sm text-gray-400">
                    Try adjusting your filters or search.
                  </div>
                </div>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>

    {loading && (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    )}

    <style>{`
      .loader {
        border-top-color: #16a34a;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);
