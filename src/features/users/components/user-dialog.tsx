"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";

import { useGovernmentUnits } from "@/features/government-unit/services/queries";
import { useController } from "react-hook-form";
import { useUserForm } from "@/features/users/hooks/use-user-form";
import { useUserProfile } from "@/features/users/services/queries";
import type { UserFormValues } from "@/features/users/components/config";

const ROLES = ["Citizen", "Manager", "Admin", "Employee"];

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: any | null; // lightweight user object from table row
}

const UserDialog: React.FC<UserDialogProps> = ({
  open,
  onOpenChange,
  user,
}) => {
  const userId = user?.id ?? null;

  // 🔥 Fetch full detailed user profile (only when editing)
  const {
    data: fullUser,
    isLoading: profileLoading,
    isFetching: profileFetching,
  } = useUserProfile(userId as number, {
    enabled: Boolean(userId),
  });

  // Prefer full fetched profile → fallback to passed user (for create)
  const userData = fullUser ?? user ?? null;

  const { units, loading: unitsLoading, isError } = useGovernmentUnits();

  const { control, errors, onSubmit, createLoading, updateLoading } =
    useUserForm(userData, () => onOpenChange(false));

  const isEdit = Boolean(userId);

  // 🔄 Show loader while fetching profile for editing
  if (isEdit && (profileLoading || profileFetching)) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md flex items-center justify-center p-10">
          <Loader2 className="h-6 w-6 animate-spin" />
        </DialogContent>
      </Dialog>
    );
  }

  // Typed RHF Input
  const RHFInput = <T extends keyof UserFormValues>({
    name,
    placeholder,
    type = "text",
  }: {
    name: T;
    placeholder: string;
    type?: string;
  }) => {
    const { field } = useController<UserFormValues>({ name, control });

    return (
      <div>
        <Input
          {...field}
          placeholder={placeholder}
          type={type}
          className={errors[name] ? "border-red-500" : ""}
        />
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">
            {errors[name]?.message?.toString()}
          </p>
        )}
      </div>
    );
  };

  // Typed RHF Select
  const RHFSelect = <T extends keyof UserFormValues>({
    name,
    placeholder,
    children,
    disabled,
  }: {
    name: T;
    placeholder: string;
    children: React.ReactNode;
    disabled?: boolean;
  }) => {
    const { field } = useController<UserFormValues>({ name, control });

    return (
      <div>
        <Select
          value={field.value}
          onValueChange={field.onChange}
          disabled={disabled}
        >
          <SelectTrigger className={errors[name] ? "border-red-500" : ""}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>{children}</SelectContent>
        </Select>

        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">
            {errors[name]?.message?.toString()}
          </p>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Update User" : "Add New User"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <RHFInput name="first_name" placeholder="First Name" />
          <RHFInput name="last_name" placeholder="Last Name" />
          <RHFInput name="phone" placeholder="Phone" />
          <RHFInput name="email" placeholder="Email" type="email" />
          <RHFInput name="national_number" placeholder="National Number" />

          {/* Government Unit Select */}
          <RHFSelect
            name="government_unit_id"
            placeholder="Select Government Unit"
            disabled={unitsLoading || isError}
          >
            {units?.map((unit) => (
              <SelectItem key={unit.id} value={unit.id.toString()}>
                {unit.name_translation?.en || unit.name}
              </SelectItem>
            ))}
          </RHFSelect>

          {/* Role Select */}
          <RHFSelect name="role" placeholder="Select Role">
            {ROLES.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </RHFSelect>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            onClick={onSubmit}
            disabled={createLoading || updateLoading}
            className="bg-primary text-white hover:bg-primary/90"
          >
            {createLoading || updateLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isEdit ? (
              "Update User"
            ) : (
              "Add User"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
