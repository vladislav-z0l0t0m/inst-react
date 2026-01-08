import { JSX } from "react";
import { useRegister } from "../hooks/useRegister";
import { useForm } from "react-hook-form";
import { FormInput } from "./ui/FormInput";
import { formRules } from "../utils/validation";
import { Button } from "./ui/Button";
import { AuthLayout } from "./AuthLayout";
import { getErrorMessage } from "../utils/error";
import { useTranslation } from "react-i18next";
import { AppRoutes } from "../constants/appRoutes";
import { TestIds } from "../constants";

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
      footerLinkTo={AppRoutes.LOGIN}
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
          data-testid={TestIds.REGISTER_USERNAME_INPUT}
        />

        <FormInput
          registration={register("email", formRules.email)}
          error={errors.email}
          type='email'
          placeholder={t("common.email")}
          data-testid={TestIds.REGISTER_EMAIL_INPUT}
        />

        <FormInput
          registration={register("password", formRules.password)}
          error={errors.password}
          type='password'
          placeholder={t("common.password")}
          data-testid={TestIds.REGISTER_PASSWORD_INPUT}
        />

        <Button
          type='submit'
          isLoading={isPending}
          disabled={!isValid}
          data-testid={TestIds.REGISTER_SUBMIT_BUTTON}
        >
          {t("register.button")}
        </Button>
      </form>
    </AuthLayout>
  );
};
