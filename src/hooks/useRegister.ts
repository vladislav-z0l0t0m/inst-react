import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthResponse } from "../types/auth.types";
import { RegisterFormValues } from "../components/RegisterForm";
import axios from "axios";

const registerRequest = async (
  values: RegisterFormValues
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
