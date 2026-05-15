import * as React from "react"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}
export const Table = ({
  children,
  className,
  ...props
}: TableProps) => {
  const baseStyle = "w-full border-collapse"
  return (
    <table
      className={twMerge(
        clsx(
          baseStyle,
          className
        )
      )}
      {...props}
    >
      {children}
    </table>
  )
}

interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}
export const TableHeader = ({
  children,
  className,
  ...props
}: TableHeaderProps) => {
  const baseStyle = "border-b border-strong opacity-70"
  return (
    <thead
      className={twMerge(
        clsx(
          baseStyle,
          className
        )
      )}
      {...props}
    >
      {children}
    </thead>
  )
}

interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}
export const TableBody = ({
  children,
  className,
  ...props
}: TableBodyProps) => {
  const baseStyle = "divide-y divide-subtle/50"
  return (
    <tbody
      className={twMerge(
        clsx(
          baseStyle,
          className
        )
      )}
      {...props}
    >
      {children}
    </tbody>
  )
}

interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}
export const TableRow = ({
  children,
  className,
  ...props
}: TableRowProps) => {
  const baseStyle = "group transition-all duration-300 hover:bg-subtle/60"
  return (
    <tr
      className={twMerge(
        clsx(
          baseStyle,
          className
        )
      )}
      {...props}
    >
      {children}
    </tr>
  )
}

interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}
export const TableHead = ({
  children,
  className,
  ...props
}: TableHeadProps) => {
  const baseStyle = "text-start font-bold py-4 px-4"
  return (
    <th
      className={twMerge(
        clsx(
          baseStyle,
          className
        )
      )}
      {...props}
    >
      {children}
    </th>
  )
}

interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}
export const TableCell = ({
  children,
  className,
  ...props
}: TableCellProps) => {
  const baseStyle = "px-4 py-3 align-middle"
  return (
    <td
      className={twMerge(
        clsx(
          baseStyle,
          className
        )
      )}
      {...props}
    >
      {children}
    </td>
  )
}

interface TableEmptyStateProps {
  isLoading?: boolean
  colSpan?: number
}
export const TableEmptyState = ({
  isLoading,
  colSpan = 1,
}: TableEmptyStateProps) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="py-12 text-center text-xs uppercase tracking-[3px] opacity-60"
      >
        {isLoading
          ? "Loading Data..."
          : "No Data Found"}
      </td>
    </tr>
  )
}