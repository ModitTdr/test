import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "success" | "danger" | "info" | "default";
}

const Badge = ({ children, className, variant = "default" }: BadgeProps) => {
  const baseStyle = `px-2 py-0.5 rounded-xl text-xs font-semibold`
  const variantStyles = {
    danger: "bg-warning/10 text-warning",
    success: "bg-success/10 text-success",
    info: "bg-info/10 text-info",
    default: "bg-background/10 text-foreground",
  }
  return (
    <span className={
      twMerge(clsx(
        baseStyle,
        variantStyles[variant],
        className,
      ))
    }>
      {children}
    </span>
  )
}

export default Badge