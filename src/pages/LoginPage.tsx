import AuthForm from "../components/AuthForm";
import type { JSX } from "react";
import { useLogin } from "../hooks/useLogin";

function LoginPage(): JSX.Element {
  const { mutate: loginMutation, isPending } = useLogin();

  return (
    <AuthForm
      title='Login'
      buttonText='Login'
      onSubmit={loginMutation}
      footerText='Нет аккаунта?'
      footerLinkText='Регистрация'
      footerLinkTo='/register'
      isLoading={isPending}
    />
  );
}

export default LoginPage;
