import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserService from "./api";
import type { User } from "../types/index";

// Create User
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string; data: User },
    Error,
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

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.setQueryData(["user", data.data.id], data.data);
    },

    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });
};

// Update User
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string; user: User },
    Error,
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

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.setQueryData(["user", data.user.id], data.user);
    },

    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });
};

// Soft Delete User
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string },
    Error,
    { userId: number }
  >({
    mutationFn: ({ userId }) => UserService.deleteUser(userId),

    onSuccess: (data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.removeQueries(["user", userId]);
      console.log(data.message);
    },

    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });
};

// Permanent Delete User
export const usePermanentDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string },
    Error,
    { userId: number }
  >({
    mutationFn: ({ userId }) => UserService.permanentDeleteUser(userId),

    onSuccess: (data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.removeQueries(["user", userId]);
      console.log(data.message);
    },

    onError: (error) => {
      console.error("Error permanently deleting user:", error);
    },
  });
};

// Restore User
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
