import type { ReactNode } from "react";

export interface EmptyStateAction {
  label: string;

  onClick: () => void;

  icon?: ReactNode;
}

export interface EmptyStateProps {
  icon?: ReactNode;

  title: string;

  message: string;

  action?: EmptyStateAction;

  className?: string;

  size?: "sm" | "md" | "lg";
}
