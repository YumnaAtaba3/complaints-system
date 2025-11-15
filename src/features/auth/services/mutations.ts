import { useMutation } from "@tanstack/react-query";
import type { AuthPayload, AuthResponse } from "../types";
import AuthServices from "../services/api";

export function useLoginMutation() {
  return useMutation<AuthResponse, Error, AuthPayload>({
    mutationFn: async (payload) => {
      return await AuthServices.login(payload);
    },
  });
}
