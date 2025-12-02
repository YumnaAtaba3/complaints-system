/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { handleApiError } from "./axios-error-handler";
import { getToken } from "@/features/auth/hooks/auth-state";



export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// ----------------------
// REQUEST INTERCEPTOR
// ----------------------
httpClient.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add Accept-Language header
    config.headers["Accept-Language"] = navigator.language || "en";

    console.log("%c[API REQUEST]", "color: blue; font-weight: bold;", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });

    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------------
// RESPONSE INTERCEPTOR
// ----------------------
httpClient.interceptors.response.use(
  (response) => {
   
    console.log("%c[API RESPONSE]", "color: green; font-weight: bold;", {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data,
    });

    return response;
  },

  (error) => {
    
    console.error("%c[API ERROR]", "color: red; font-weight: bold;", {
      url: error?.config?.url,
      method: error?.config?.method,
      status: error?.response?.status,
      response: error?.response?.data,
    });

    // Auto logout on 401
    if (error.response?.status === 401) {
      // logoutHelper();
    }

    // Handle other errors
    handleApiError(error);

    return Promise.reject(error);
  }
);
