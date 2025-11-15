import axios from "axios";
import { userStorage } from "../../features/auth/storage";
import { handleApiError } from "./axios-error-handler";
import { logoutHelper } from "@/features/auth/utlitlies/auth";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

httpClient.interceptors.request.use(
  (config) => {
    const token = userStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // ✅ Automatically logout on unauthorized error
    if (error.response?.status === 401) {
      // logoutHelper();
    }

    // Handle the rest of the errors
    handleApiError(error);
  }
);
