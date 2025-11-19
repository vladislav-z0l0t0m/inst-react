import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (!error) return "";

  const axiosError = error as AxiosError<{ message: string | string[] }>;

  if (axiosError.response?.data?.message) {
    const message = axiosError.response.data.message;
    return Array.isArray(message) ? message[0] ?? "" : message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
};
