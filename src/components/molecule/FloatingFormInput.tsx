import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import Button from "../atom/Button";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import Input from "../atom/Input";

interface FloatingFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  type?: string;
  className?: string;
  error?: string;
}

const FloatingFormInput = ({
  title,
  type = "text",
  className,
  error,
  ...props
}: FloatingFormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="text-end w-full space-y-1">

      <div className="relative">
        <Input
          variant={error ? "error" : "default"}
          type={type === "password" ? showPassword ? "text" : "password" : type}
          placeholder=" "
          className={className}
          id={title}
          {...props}
        />

        <label
          className={twMerge(clsx(
            `
            bg-background text-foreground text-start px-2 ml-3
            absolute left-0 top-0 -translate-y-1/2
            transition-all duration-100 ease-in
            outline-none ring-0

            peer-focus:top-0 peer-focus:px-2 
            peer-focus:w-fit peer-focus:text-foreground

            peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-strong
            peer-disabled:bg-transparent
            `,
            error && "text-red-500"
          ))}
          htmlFor={title}
        >
          {title}
        </label>

        {type === "password" && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-background flex items-center justify-center">
            <Button
              type="button"
              className={error ? "text-red-500" : "text-strong"}
              onClick={() => setShowPassword(prev => !prev)}
              size="icon"
              variant="ghost"
            >
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </Button>
          </span>
        )}
      </div>

      {error && <p className="text-red-500 text-sm text-start">{error}</p>}
    </div>
  )
}

export default FloatingFormInput;