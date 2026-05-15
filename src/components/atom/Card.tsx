import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export const Card = ({ children, className }: CardProps) => {
  const baseStyle = "group relative rounded-2xl border border-strong/70 bg-subtle/40 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-primary/50"
  return (
    <div
      className={
        twMerge(clsx(
          baseStyle,
          className
        ))
      }
    >
      {children}
    </div>
  )
};