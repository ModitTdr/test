import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Option {
  value: string;
  label: string;
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  className?: string;
}

const Select = ({ options, className, ...props }: SelectProps) => {
  const baseStyle = "w-fit px-3 py-1 border border-strong/80 rounded-lg bg-background/80 backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
  return (
    <select
      className={
        twMerge(clsx(
          baseStyle,
          className,
        ))
      }
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}

export default Select