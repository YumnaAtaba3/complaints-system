import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import type { GovernmentUnit as Unit, Manager } from "../types";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  unit: Unit | null;
  formNameEn: string;
  setFormNameEn: (v: string) => void;
  formNameAr: string;
  setFormNameAr: (v: string) => void;
  managers: Manager[];
  selectedManagerId: number | "none";
  setSelectedManagerId: (v: number | "none") => void;
  onSubmit: () => void;
};

export const EditUnitModal: React.FC<Props> = ({
  open,
  onOpenChange,
  formNameEn,
  setFormNameEn,
  formNameAr,
  setFormNameAr,
  managers,
  selectedManagerId,
  setSelectedManagerId,
  onSubmit,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Edit Government Unit</DialogTitle>
      </DialogHeader>

      <div className="space-y-6 mt-2">
        {/* English */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            English Name
          </label>
          <Input
            value={formNameEn}
            onChange={(e) => setFormNameEn(e.target.value)}
          />
        </div>

        {/* Arabic */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Arabic Name
          </label>
          <Input
            value={formNameAr}
            onChange={(e) => setFormNameAr(e.target.value)}
          />
        </div>

        {/* Manager Dropdown */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Manager</label>
          <select
            className="w-full border rounded-md px-3 py-2"
            value={selectedManagerId}
            onChange={(e) =>
              setSelectedManagerId(
                e.target.value === "none" ? "none" : Number(e.target.value)
              )
            }
          >
            <option value="none">No Manager</option>
            {managers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={() => onOpenChange(false)} variant="ghost">
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={!formNameEn.trim()}>
            Save
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);
