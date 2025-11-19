import axios from "axios";
import AuthForm, { type AuthFormValues } from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { LoginResponse } from "../types/auth.types";
import type { JSX } from "react";

const loginRequest = async (values: AuthFormValues): Promise<LoginResponse> => {
  const { email, password } = values;
  const response = await axios.post(
    `${import.meta.env.VITE_AUTH_API_URL}/login`,
    { identifier: email, identifierType: "email", password }
  );
  return response.data;
};

function LoginPage(): JSX.Element {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLoginSubmit = (values: AuthFormValues) => {
    mutation.mutate(values);
  };

  return (
    <AuthForm
      title='Login'
      buttonText='Login'
      onSubmit={handleLoginSubmit}
      footerText='Нет аккаунта?'
      footerLinkText='Регистрация'
      footerLinkTo='/register'
    />
  );
}

export default LoginPage;
