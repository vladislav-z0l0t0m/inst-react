import axios, { AxiosError } from "axios";
import { config } from "../config";
import { authApi } from "./authApi";
import { CustomAxiosRequestConfig } from "./api.types";

export const baseApi = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

baseApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await authApi.post("/refresh");
        return baseApi.request(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
