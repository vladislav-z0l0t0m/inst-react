import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthFormValues } from "../components/AuthForm";
import { AuthResponse } from "../types/auth.types";
import axios from "axios";

const loginRequest = async (values: AuthFormValues): Promise<AuthResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_AUTH_API_URL}/login`,
    {
      identifier: values.email,
      identifierType: "email",
      password: values.password,
    }
  );
  return response.data;
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
