import { useMutation } from "@tanstack/react-query";
import { AuthResponse } from "../types/auth.types";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { RegisterFormValues } from "../components/RegisterForm";
import { AppRoutes, ApiRoutes } from "../constants";
import { queryClient } from "../api/queryClient";

const registerRequest = async (
  values: RegisterFormValues
): Promise<AuthResponse> => {
  const response = await authApi.post(ApiRoutes.REGISTER, {
    username: values.username,
    email: values.email,
    password: values.password,
  });

  return response.data;
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      queryClient.resetQueries();
      navigate(AppRoutes.PROFILE);
    },
    onError: (error) => {
      console.error("Register failed:", error);
    },
  });
};
