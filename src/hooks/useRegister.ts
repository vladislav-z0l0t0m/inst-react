import { useMutation } from "@tanstack/react-query";
import { AuthFormValues } from "../components/AuthForm";
import { AuthResponse } from "../types/auth.types";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/axiosInstance";

const registerRequest = async (
  values: AuthFormValues
): Promise<AuthResponse> => {
  const response = await authApi.post("/register", {
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
      navigate("/");
    },
    onError: (error) => {
      console.error("Register failed:", error);
    },
  });
};
