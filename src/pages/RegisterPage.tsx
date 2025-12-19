import AuthForm from "../components/AuthForm";
import type { JSX } from "react";
import { useRegister } from "../hooks/useRegister";

function RegisterPage(): JSX.Element {
  const { mutate: registerMutation, isPending } = useRegister();

  return (
    <AuthForm
      title='Register'
      buttonText='Register'
      onSubmit={registerMutation}
      showUsername={true}
      footerText='Есть аккаунт?'
      footerLinkText='Вход'
      footerLinkTo='/login'
      isLoading={isPending}
    />
  );
}

export default RegisterPage;
