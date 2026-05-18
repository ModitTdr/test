import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "primary" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
}

const Button = ({ children, className, variant = 'default', size = "md", loading = false, ...props }: ButtonProps) => {
  const baseStyle = `w-full py-3 px-4 rounded-sm relative overflow-hidden flex items-center justify-center 
  transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed disabled:pointer-events-none hover:opacity-90 hover:-translate-y-0.5`
  const variantStyle = {
    default: "bg-foreground text-background ",
    outline: "bg-transparent text-foreground border border-subtle",
    ghost: "bg-transparent text-foreground border-0",
    primary: "bg-primary/90 text-white border-0",
    danger: "bg-warning text-foreground border-0",
  };
  const sizeStyle = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "w-6 h-6 p-0 flex items-center justify-center",
  };

  return (
    <button
      {...props}
      className={
        twMerge(
          clsx(
            baseStyle,
            variantStyle[variant],
            sizeStyle[size],
            className,
          )
        )
      }
    >
      {
        loading ? (
          <div className="flex items-center justify-center gap-1">
            <LoaderCircle className="animate-spin" size={20} />
            {children}
          </div>
        ) : children
      }
    </button>
  )
}

export default Button