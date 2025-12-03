import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import type { GovernmentUnit as Unit } from "../types";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  unit: Unit | null;
  formNameEn: string;
  setFormNameEn: (v: string) => void;
  formNameAr: string;
  setFormNameAr: (v: string) => void;
  onSubmit: () => void;
};

export const EditUnitModal: React.FC<Props> = ({
  open,
  onOpenChange,
  formNameEn,
  setFormNameEn,
  formNameAr,
  setFormNameAr,
  onSubmit,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Edit Government Unit</DialogTitle>
      </DialogHeader>
      <div className="space-y-6 mt-2">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            English Name
          </label>
          <Input
            value={formNameEn}
            onChange={(e) => setFormNameEn(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Arabic Name
          </label>
          <Input
            value={formNameAr}
            onChange={(e) => setFormNameAr(e.target.value)}
          />
        </div>
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
