import { ReactNode } from "react";

export interface Option<T extends string> {
  label: string;
  value: T;
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
