import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  withCredentials: true,
});

authApi.interceptors.request.use(
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
        await authApi.post("/auth/refresh");
        return authApi.request(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
