import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: "default" | "error";
}

const Input = ({ variant = 'default', className, ...props }: InputFieldProps) => {
  const baseStyle = "h-14 px-4 w-full border rounded-sm peer outline-none ring-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-black/5"

  const variantStyle = {
    default: "border-subtle focus:border-strong",
    error: "border-red-500 focus:border-red-500 text-red-500",
  }

  return (
    <input
      className={twMerge(clsx(
        baseStyle,
        variantStyle[variant],
        className
      ))}
      {...props}
    />
  )
}

export default Input