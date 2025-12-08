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
import { Loader2 } from "lucide-react";
import type { Manager } from "../types";
import { useCreateUnitForm } from "../hooks/useCreateUnitForm";
import { Controller } from "react-hook-form";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  managers: Manager[];
  showSnackbar: (message: string, severity?: "success" | "error") => void;
};

export const CreateUnitModal: React.FC<Props> = ({
  open,
  onOpenChange,
  managers,
  showSnackbar,
}) => {
  const { register, control, errors, handleSubmit, onSubmit, isSubmitting } =
    useCreateUnitForm(managers, () => onOpenChange(false), showSnackbar);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Government Unit</DialogTitle>
        </DialogHeader>

        <form className="space-y-6 mt-2" onSubmit={handleSubmit(onSubmit)}>
          {/* English Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              English Name
            </label>
            <Input {...register("nameEn")} placeholder="Ministry of ..." />
            {errors.nameEn && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nameEn.message}
              </p>
            )}
          </div>

          {/* Arabic Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Arabic Name
            </label>
            <Input {...register("nameAr")} placeholder="وزارة ..." />
            {errors.nameAr && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nameAr.message}
              </p>
            )}
          </div>

          {/* Manager Select */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Assign Manager
            </label>
            <Controller
              name="selectedManagerId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value.toString()}
                  onValueChange={(val) =>
                    field.onChange(val === "none" ? "none" : Number(val))
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
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-2">
            <Button onClick={() => onOpenChange(false)} variant="ghost">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="animate-spin h-4 w-4 mr-2 inline" />
              )}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
