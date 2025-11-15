import { useQuery } from "@tanstack/react-query";
import authServices from "../services/api";
export const useUserProfile = () =>
  useQuery({
    queryKey: ["auth", "profile"],
    queryFn: () => authServices.getMe(),
  });
