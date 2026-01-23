import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { AppRoutes, ApiRoutes } from "../constants";
import { queryClient } from "../api/queryClient";

const logoutRequest = async (): Promise<void> => {
  await authApi.post(ApiRoutes.LOGOUT);
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.clear();
      navigate(AppRoutes.LOGIN);
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};
