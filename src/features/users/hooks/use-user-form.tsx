/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { userSchema, type UserFormValues } from "../components/config";
import { useCreateUser, useUpdateUser } from "../services/mutations";

export function useUserForm(user: any | null, onClose: () => void) {
  const isEdit = Boolean(user?.id);

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: yupResolver(userSchema),
    mode: "onTouched",
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      national_number: "",
      government_unit_id: "",
      role: "",
    },
  });

  // Prefill form in edit mode — runs again when full user profile loads
  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
        email: user.email || "",
        national_number: user.national_number || "",
        government_unit_id: user.government_unit?.id?.toString() || "",
        role: user.role || "",
      });
    } else {
      reset();
    }
  }, [user, reset]);

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      ...data,
      government_unit_id: Number(data.government_unit_id),
    };

    if (isEdit) {
      updateUser.mutate(
        { userId: user.id, ...payload },
        { onSuccess: () => onClose() }
      );
    } else {
      createUser.mutate(payload, { onSuccess: () => onClose() });
    }
  });

  return {
    control,
    errors,
    onSubmit,
    createLoading: createUser.isLoading,
    updateLoading: updateUser.isLoading,
  };
}
