import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { Manager } from "../types";
import { Loader2 } from "lucide-react";



type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  nameEn: string;
  setNameEn: (v: string) => void;
  nameAr: string;
  setNameAr: (v: string) => void;
  managers: Manager[];
  selectedManagerId: number | "none";
  setSelectedManagerId: (v: number | "none") => void;
  onSubmit: () => void;
  loading:boolean
};

export const CreateUnitModal: React.FC<Props> = ({
  open,
  onOpenChange,
  nameEn,
  setNameEn,
  nameAr,
  setNameAr,
  managers,
  selectedManagerId,
  setSelectedManagerId,
  onSubmit,
  loading
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Create Government Unit</DialogTitle>
      </DialogHeader>
      <div className="space-y-6 mt-2">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            English Name
          </label>
          <Input
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            placeholder="Ministry of ..."
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Arabic Name (optional)
          </label>
          <Input
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            placeholder="وزارة ..."
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Assign Manager
          </label>
          <Select
            value={selectedManagerId.toString()}
            onValueChange={(val) =>
              setSelectedManagerId(val === "none" ? "none" : Number(val))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a manager" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {managers.map((m) => (
                <SelectItem key={m.id} value={m.id.toString()}>
                  {m.first_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={() => onOpenChange(false)} variant="ghost">
            Cancel
          </Button>
          <Button onClick={onSubmit}>
           {loading && (
              <Loader2 className="animate-spin h-4 w-4 mr-2 inline" />
            )}
            Create
          </Button>
      
        </div>
      </div>
    </DialogContent>
  </Dialog>
);
