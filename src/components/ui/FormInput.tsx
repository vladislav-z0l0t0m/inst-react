import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

export const FormInput = ({
  registration,
  error,
  className = "",
  ...props
}: FormInputProps) => {
  return (
    <div className='w-full'>
      <input
        {...props}
        {...registration}
        className={`
          w-full px-4 py-3 border rounded-lg outline-none transition duration-200
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          }
          ${className}
        `}
      />
      {error && (
        <p className='mt-1 text-sm text-red-600' role='alert'>
          {error.message}
        </p>
      )}
    </div>
  );
};
