import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Pencil, UserPlus, Ban, CheckCircle } from "lucide-react";
import type { GovernmentUnit as Unit } from "../types";

type Props = {
  unit: Unit;
  onEdit: (u: Unit) => void;
  onAssign: (u: Unit) => void;
  onToggleActive: (u: Unit) => void;
};

export const UnitActions: React.FC<Props> = ({
  unit,
  onEdit,
  onAssign,
  onToggleActive,
}) => (
  <div className="flex items-center justify-center gap-2">
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onEdit(unit)}
      title="Edit Unit"
    >
      <Pencil className="h-5 w-5 text-green-900" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onAssign(unit)}
      title="Assign Manager"
    >
      <UserPlus className="h-5 w-5 text-green-900" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onToggleActive(unit)}
      title={unit.is_active ? "Disable Unit" : "Enable Unit"}
    >
      {unit.is_active ? (
        <Ban className="h-5 w-5 text-red-600" />
      ) : (
        <CheckCircle className="h-5 w-5 text-green-700" />
      )}
    </Button>
  </div>
);
