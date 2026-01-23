import { config } from "../config";
import axios, { AxiosError } from "axios";
import { CustomAxiosRequestConfig } from "./api.types";
import { queryClient } from "./queryClient";
import { AppRoutes } from "../constants";

export const authApi = axios.create({
  baseURL: config.authUrl,
  withCredentials: true,
});

authApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    const isRefreshEndpoint = originalRequest?.url?.includes("/auth/refresh");

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry &&
      !isRefreshEndpoint
    ) {
      originalRequest._isRetry = true;

      try {
        await authApi.post("/refresh");
        return authApi.request(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 401 && isRefreshEndpoint) {
      queryClient.clear();
      window.location.href = AppRoutes.LOGIN;
    }

    return Promise.reject(error);
  }
);
