import axios from "axios";
import AuthForm, { type AuthFormValues } from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { RegisterResponse } from "../types/auth.types";

const registerRequest = async (
  values: AuthFormValues
): Promise<RegisterResponse> => {
  const { email, password, username } = values;
  const response = await axios.post(
    `${import.meta.env.VITE_AUTH_API_URL}/register`,
    { email, password, username }
  );
  return response.data;
};

function RegisterPage() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleRegisterSubmit = (values: AuthFormValues) => {
    mutation.mutate(values);
  };

  return (
    <AuthForm
      title='Register'
      buttonText='Register'
      onSubmit={handleRegisterSubmit}
      showUsername={true}
      footerText='Есть аккаунт?'
      footerLinkText='Вход'
      footerLinkTo='/login'
    />
  );
}

export default RegisterPage;
