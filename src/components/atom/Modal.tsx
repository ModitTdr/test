import Button from "./Button";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
}
export const Modal = ({
  children,
  className,
}: ModalProps) => {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className={twMerge(clsx("w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl", className))}>
          {children}
        </div>
      </div>
    </>
  );
};

interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}
export const ModalHeader = ({
  children,
  className,
}: ModalHeaderProps) => {
  return (
    <div className={twMerge(clsx("flex items-center justify-between border-b border-white/10 px-6 py-4", className))}>
      {children}
    </div >
  );
};

interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalTitle = ({
  children,
  className,
}: ModalTitleProps) => {
  return (
    <h2 className={twMerge(clsx("text-lg font-semibold", className))}>
      {children}
    </h2>
  );
};

interface ModalCloseProps {
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}
export const ModalClose = ({
  onClose,
  className,
  children,
}: ModalCloseProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClose}
      className={twMerge(clsx("", className))}
    >
      {children}
    </Button>
  );
};

interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}
export const ModalBody = ({
  children,
  className,
}: ModalBodyProps) => {
  return (
    <div className={twMerge(clsx("p-6", className))}>
      {children}
    </div>
  );
};

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}
export const ModalFooter = ({
  children,
  className,
}: ModalFooterProps) => {
  return (
    <div className={twMerge(clsx("flex items-center justify-end gap-2 border-t border-white/10 px-6 py-4", className))}>
      {children}
    </div>
  );
};