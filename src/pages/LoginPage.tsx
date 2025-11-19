import AuthForm from "../components/AuthForm";
import type { JSX } from "react";
import { useLogin } from "../hooks/useLogin";
import { getErrorMessage } from "../utils/error";

function LoginPage(): JSX.Element {
  const { mutate: loginMutation, isPending, error } = useLogin();

  return (
    <AuthForm
      title='Login'
      buttonText='Login'
      onSubmit={loginMutation}
      isLoading={isPending}
      errorMessage={getErrorMessage(error)}
      footerText='Нет аккаунта?'
      footerLinkText='Регистрация'
      footerLinkTo='/register'
    />
  );
}

export default LoginPage;
