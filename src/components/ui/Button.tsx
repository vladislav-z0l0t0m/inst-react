import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader } from "./Loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
}

export const Button = ({
  isLoading,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={isLoading || disabled}
      className={`
        relative w-full flex items-center justify-center cursor-pointer 
        bg-blue-600 text-white py-3 rounded-lg font-medium 
        hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 
        disabled:opacity-50 disabled:cursor-not-allowed 
        transition duration-200
        ${className}
      `}
      {...props}
    >
      <span className={`${isLoading ? "opacity-0" : "opacity-100"}`}>
        {children}
      </span>

      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <Loader />
        </div>
      )}
    </button>
  );
};
