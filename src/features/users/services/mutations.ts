import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserService from "./api";
import type { User } from "../types/index";
import { toast } from "@/shared/components/ui/sonner";

/* ------------------ 🔥 Helper to extract backend error messages ------------------ */
function extractErrorMessage(error: any) {
  const res = error?.response?.data;

  if (!res) return "Something went wrong";

  // 1. If general message exists → return it
  if (typeof res.message === "string") return res.message;

  // 2. If errors object exists → build dynamic readable message
  if (res.errors && typeof res.errors === "object") {
    const formatted = Object.entries(res.errors)
      .map(([field, messages]) => {
        const msgArray = Array.isArray(messages)
          ? messages
          : [String(messages)];

        return `${field}: ${msgArray.join(", ")}`;
      })
      .join("\n");

    return formatted || "Validation error";
  }

  return "Something went wrong";
}

/* ------------------------------ Create User ------------------------------ */
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string; data: User },
    any,
    {
      first_name: string;
      last_name: string;
      phone: string;
      email: string;
      national_number: string;
      government_unit_id: number;
      role: string;
    }
  >({
    mutationFn: (data) => UserService.createUser(data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.setQueryData(["user", response.data.id], response.data);

      toast.success(response.message);
    },

    onError: (error: any) => {
      toast.error(extractErrorMessage(error));
    },
  });
};

/* ------------------------------ Update User ------------------------------ */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string; user: User },
    any,
    {
      userId: number;
      first_name: string;
      last_name: string;
      phone: string;
      email: string;
      national_number: string;
      government_unit_id: number;
      role: string;
    }
  >({
    mutationFn: ({ userId, ...data }) => UserService.updateUser(userId, data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.setQueryData(["user", response.user.id], response.user);

      toast.success(response.message);
    },

    onError: (error: any) => {
      toast.error(extractErrorMessage(error));
    },
  });
};

/* ------------------------------ Soft Delete ------------------------------ */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string },
    any,
    { userId: number }
  >({
    mutationFn: ({ userId }) => UserService.deleteUser(userId),

    onSuccess: (response, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.removeQueries(["user", userId]);

      toast.success(response.message);
    },

    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
};

/* ------------------------------ Permanent Delete ------------------------------ */
export const usePermanentDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string },
    any,
    { userId: number }
  >({
    mutationFn: ({ userId }) => UserService.permanentDeleteUser(userId),

    onSuccess: (response, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.removeQueries(["user", userId]);

      toast.success(response.message);
    },

    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
};

/* ------------------------------ Restore User ------------------------------ */
export const useRestoreUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string },
    Error,
    { userId: number }
  >({
    mutationFn: ({ userId }) => UserService.restoreUser(userId),

    onSuccess: (data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.removeQueries(["user", userId]);
      console.log(data.message);
    },

    onError: (error) => {
      console.error("Error restoring user:", error);
    },
  });
};
