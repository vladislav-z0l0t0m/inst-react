import { useMutation } from "@tanstack/react-query";
import { AuthFormValues } from "../components/AuthForm";
import { AuthResponse } from "../types/auth.types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const registerRequest = async (
  values: AuthFormValues
): Promise<AuthResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_AUTH_API_URL}/register`,
    {
      username: values.username,
      email: values.email,
      password: values.password,
    }
  );

  return response.data;
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/");
    },
    onError: (error) => {
      console.error("Register failed:", error);
    },
  });
};
