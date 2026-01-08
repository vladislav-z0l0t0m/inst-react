import { useLogin } from "../hooks/useLogin";
import { getErrorMessage } from "../utils/error";
import { JSX } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "./ui/FormInput";
import { formRules } from "../utils/validation";
import { Button } from "./ui/Button";
import { AuthLayout } from "./AuthLayout";
import { useTranslation } from "react-i18next";
import { AppRoutes } from "../constants/appRoutes";
import { TestIds } from "../constants";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm = (): JSX.Element => {
  const { mutate: loginMutation, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({ mode: "onChange" });
  const { t } = useTranslation(["auth", "common"]);

  return (
    <AuthLayout
      title={t("login.title")}
      footerText={t("login.noAccount")}
      footerLinkText={t("login.registration")}
      footerLinkTo={AppRoutes.REGISTER}
      errorMessage={getErrorMessage(error, t)}
    >
      <form
        onSubmit={handleSubmit((data) => loginMutation(data))}
        className='space-y-6'
      >
        <FormInput
          registration={register("email", formRules.email)}
          error={errors.email}
          type='email'
          placeholder={t("common.email")}
          data-testid={TestIds.LOGIN_EMAIL_INPUT}
        />

        <FormInput
          registration={register("password", formRules.password)}
          error={errors.password}
          type='password'
          placeholder={t("common.password")}
          data-testid={TestIds.LOGIN_PASSWORD_INPUT}
        />

        <Button
          type='submit'
          isLoading={isPending}
          disabled={!isValid}
          data-testid={TestIds.LOGIN_SUBMIT_BUTTON}
        >
          {t("login.button")}
        </Button>
      </form>
    </AuthLayout>
  );
};
