import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthResponse } from "../types/auth.types";
import { LoginFormValues } from "../components/LoginForm";
import { authApi } from "../api/authApi";
import { AppRoutes, ApiRoutes } from "../constants";
import { queryClient } from "../api/queryClient";

const loginRequest = async (values: LoginFormValues): Promise<AuthResponse> => {
  const response = await authApi.post(ApiRoutes.LOGIN, {
    identifier: values.email,
    identifierType: "email",
    password: values.password,
  });
  return response.data;
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      queryClient.resetQueries();
      navigate(AppRoutes.HOME);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
