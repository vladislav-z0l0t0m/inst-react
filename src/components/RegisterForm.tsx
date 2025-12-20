import { JSX } from "react";
import { useRegister } from "../hooks/useRegister";
import { useForm } from "react-hook-form";
import { FormInput } from "./ui/FormInput";
import { formRules } from "../utils/validation";
import { Button } from "./ui/Button";
import { AuthLayout } from "./AuthLayout";
import { getErrorMessage } from "../utils/error";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["auth", "common"]);

  return (
    <AuthLayout
      title={t("register.title")}
      footerText={t("register.haveAccount")}
      footerLinkText={t("register.login")}
      footerLinkTo='/login'
      errorMessage={getErrorMessage(error, t)}
    >
      <form
        onSubmit={handleSubmit((data) => registerMutation(data))}
        className='space-y-6'
      >
        <FormInput
          registration={register("username", formRules.username)}
          error={errors.username}
          type='text'
          placeholder={t("common.username")}
        />

        <FormInput
          registration={register("email", formRules.email)}
          error={errors.email}
          type='email'
          placeholder={t("common.email")}
        />

        <FormInput
          registration={register("password", formRules.password)}
          error={errors.password}
          type='password'
          placeholder={t("common.password")}
        />

        <Button type='submit' isLoading={isPending} disabled={!isValid}>
          {t("register.button")}
        </Button>
      </form>
    </AuthLayout>
  );
};
