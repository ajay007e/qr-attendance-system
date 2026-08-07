import { InputHTMLAttributes, ReactNode } from "react";

export interface FormInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export interface Option<T extends string> {
  label: string;
  value: T;
}

export interface CustomDropdownProps<T extends string> {
  value?: T;
  options: readonly Option<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
}

export interface DropdownPosition {
  top: number;
  left: number;
  width: number;
  direction: "up" | "down";
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}

export interface PageLoaderProps {
  message?: string;
}

export type BadgeVariant = "blue" | "green" | "red" | "yellow" | "gray";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}
