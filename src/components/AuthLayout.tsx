import { Link } from "react-router-dom";
import { FormError } from "./FormError";

interface AuthLayoutProps {
  title: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  errorMessage?: string;
  children: React.ReactNode;
}

export const AuthLayout = ({
  title,
  footerText,
  footerLinkText,
  footerLinkTo,
  errorMessage,
  children,
}: AuthLayoutProps) => {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-md'>
        <h2 className='text-blue-600 text-3xl font-bold text-center mb-6'>
          {title}
        </h2>

        <FormError message={errorMessage} />

        {children}

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
};
