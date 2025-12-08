import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/axiosInstance";

const logoutRequest = async (): Promise<void> => {
  await authApi.post("/logout");
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};
