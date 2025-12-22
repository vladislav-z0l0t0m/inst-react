import { AxiosError } from "axios";
import { TFunction } from "i18next";

export const getErrorMessage = (
  error: unknown,
  t: TFunction
): string | null => {
  if (!error) return null;

  if (error instanceof AxiosError) {
    if (error.code === "ERR_NETWORK" || !error.response) {
      return t("common:error.network");
    }

    const message = error.response?.data?.message;
    return Array.isArray(message) ? message[0] ?? null : message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return t("common:error.unknown");
};
