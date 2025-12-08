import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Pencil, Ban, CheckCircle, Loader2 } from "lucide-react";
import type { GovernmentUnit as Unit } from "../types";

type Props = {
  unit: Unit;
  onEdit: (u: Unit) => void;
  onToggleActive: (u: Unit) => void;
  loading?: boolean; 
};

export const UnitActions: React.FC<Props> = ({
  unit,
  onEdit,
  onToggleActive,
  loading = false,
}) => (
  <div className="flex items-center justify-center gap-1">
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onEdit(unit)}
      title="Edit Unit"
      disabled={loading}
    >
        <Pencil className="h-5 w-5 text-green-900" />
    </Button>

    <Button
      variant="ghost"
      size="icon"
      onClick={() => onToggleActive(unit)}
      title={unit.is_active ? "Disable Unit" : "Enable Unit"}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
      ) : unit.is_active ? (
        <Ban className="h-5 w-5 text-red-600" />
      ) : (
        <CheckCircle className="h-5 w-5 text-green-700" />
      )}
    </Button>
  </div>
);
