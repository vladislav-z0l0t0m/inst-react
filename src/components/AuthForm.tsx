import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormInput } from "./ui/FormInput";
import { Button } from "./ui/Button";
import { formRules } from "../utils/validation";
import { FormError } from "./FormError";

export interface AuthFormValues {
  email: string;
  password: string;
  username?: string;
}

interface AuthFormProps {
  onSubmit: (values: AuthFormValues) => void;
  title: string;
  buttonText: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  showUsername?: boolean;
  isLoading?: boolean;
  errorMessage?: string;
}

function AuthForm({
  onSubmit,
  title,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkTo,
  showUsername = false,
  isLoading = false,
  errorMessage,
}: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AuthFormValues>({ mode: "onChange" });
  const showLoader = isLoading || isSubmitting;

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-md'>
        <h2 className='text-blue-600 text-3xl font-bold text-center mb-6'>
          {title}
        </h2>

        <FormError message={errorMessage} />

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {showUsername && (
            <FormInput
              registration={register("username", formRules.username)}
              error={errors.username}
              type='text'
              placeholder='Username'
            />
          )}
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

          <Button type='submit' isLoading={showLoader} disabled={!isValid}>
            {buttonText}
          </Button>
        </form>
        <div className='mt-6 text-center'>
          <p className='text-gray-600'>
            {footerText}
            <Link
              to={footerLinkTo}
              className='text-blue-600 hover:text-blue-700 font-medium hover:underline'
            >
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
