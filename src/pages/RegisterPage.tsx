import AuthForm from "../components/AuthForm";
import type { JSX } from "react";
import { useRegister } from "../hooks/useRegister";
import { getErrorMessage } from "../utils/error";

function RegisterPage(): JSX.Element {
  const { mutate: registerMutation, isPending, error } = useRegister();

  return (
    <AuthForm
      title='Register'
      buttonText='Register'
      onSubmit={registerMutation}
      showUsername={true}
      isLoading={isPending}
      errorMessage={getErrorMessage(error)}
      footerText='Есть аккаунт?'
      footerLinkText='Вход'
      footerLinkTo='/login'
    />
  );
}

export default RegisterPage;
