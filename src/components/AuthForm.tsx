import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export interface AuthFormValues {
  email: string;
  password: string;
  username?: string;
}

interface AuthFormProps {
  onSubmit: (values: AuthFormValues) => void;
  title: string;
  buttonText: string;
  showUsername?: boolean;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
}

function AuthForm({
  onSubmit,
  title,
  buttonText,
  showUsername = false,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({ mode: "onBlur" });

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-md'>
        <h2 className='text-blue-600 text-3xl font-bold text-center mb-6'>
          {title}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {showUsername && (
            <div>
              <input
                type='text'
                placeholder='Username'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200'
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 30,
                    message: "Username must be at most 30 characters long",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      "Username must contain only letters, numbers and underscores",
                  },
                })}
              />
              {errors.username && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.username.message}
                </p>
              )}
            </div>
          )}
          <div>
            <input
              type='text'
              placeholder='Email'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200'
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type='password'
              placeholder='Password'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200'
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200'
          >
            {isSubmitting ? "Loading..." : buttonText}
          </button>
        </form>
        <div className='mt-6 text-center'>
          <p className='text-gray-600'>
            {footerText}{" "}
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
