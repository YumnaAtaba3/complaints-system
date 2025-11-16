import { useMutation } from "@tanstack/react-query";

import AuthServices from "./api";
import type { AuthPayload } from "../types";

export function useLoginMutation() {
  return useMutation({
    mutationFn: (payload: AuthPayload) => AuthServices.login(payload),
  });
}
