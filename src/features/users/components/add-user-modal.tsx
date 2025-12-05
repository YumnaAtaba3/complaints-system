"use client";

import React, { useState } from "react";
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
import { useGovernmentUnits } from "@/features/government-unit/services/queries";
import { useCreateUser } from "@/features/users/services/mutations";
import { Loader2 } from "lucide-react";

const ROLES = ["Citizen", "Manager", "Admin", "Employee"];

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { units, loading: unitsLoading, isError } = useGovernmentUnits();
  const addUserMutation = useCreateUser();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    national_number: "",
    government_unit_id: "",
    role: "",
  });

  const handleChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (
      !form.first_name ||
      !form.last_name ||
      !form.email ||
      !form.phone ||
      !form.national_number ||
      !form.government_unit_id ||
      !form.role
    ) {
      alert("Please fill in all fields.");
      return;
    }

    addUserMutation.mutate(
      {
        ...form,
        government_unit_id: Number(form.government_unit_id),
      },
      {
        onSuccess: () => {
          onOpenChange(false); // close dialog on success
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-center text-foreground">
            Add New User
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Input
            placeholder="First Name"
            value={form.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
          />
          <Input
            placeholder="Last Name"
            value={form.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            placeholder="National Number"
            value={form.national_number}
            onChange={(e) => handleChange("national_number", e.target.value)}
          />

          {/* Government Unit */}
          <Select
            value={form.government_unit_id}
            onValueChange={(value) => handleChange("government_unit_id", value)}
            disabled={unitsLoading || isError}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Government Unit" />
            </SelectTrigger>
            <SelectContent>
              {units?.map((unit) => (
                <SelectItem key={unit.id} value={unit.id.toString()}>
                  {unit.name_translation?.en || unit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Role */}
          <Select
            value={form.role}
            onValueChange={(value) => handleChange("role", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            onClick={handleSubmit}
            disabled={addUserMutation.isLoading}
            className="bg-primary text-white hover:bg-primary/90"
          >
            {addUserMutation.isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Add User"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
