import { JSX } from "react";
import { useRegister } from "../hooks/useRegister";
import { useForm } from "react-hook-form";
import { FormInput } from "./ui/FormInput";
import { formRules } from "../utils/validation";
import { Button } from "./ui/Button";
import { AuthLayout } from "./AuthLayout";
import { getErrorMessage } from "../utils/error";

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export const RegisterForm = (): JSX.Element => {
  const { mutate: registerMutation, isPending, error } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({ mode: "onChange" });
  return (
    <AuthLayout
      title='Register'
      footerText='Есть аккаунт?'
      footerLinkText='Вход'
      footerLinkTo='/login'
      errorMessage={getErrorMessage(error)}
    >
      <form
        onSubmit={handleSubmit((data) => registerMutation(data))}
        className='space-y-6'
      >
        <FormInput
          registration={register("username", formRules.username)}
          error={errors.username}
          type='text'
          placeholder='Username'
        />

        <FormInput
          registration={register("email", formRules.email)}
          error={errors.email}
          type='email'
          placeholder='Email'
        />

        <FormInput
          registration={register("password", formRules.password)}
          error={errors.password}
          type='password'
          placeholder='Password'
        />

        <Button type='submit' isLoading={isPending} disabled={!isValid}>
          Register
        </Button>
      </form>
    </AuthLayout>
  );
};
