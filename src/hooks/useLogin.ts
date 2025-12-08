import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthResponse } from "../types/auth.types";
import { LoginFormValues } from "../components/loginForm";
import { authApi } from "../api/axiosInstance";

const loginRequest = async (values: LoginFormValues): Promise<AuthResponse> => {
  const response = await authApi.post("/login", {
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
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
