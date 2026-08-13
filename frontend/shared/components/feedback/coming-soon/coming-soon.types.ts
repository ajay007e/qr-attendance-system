import type { ReactNode } from "react";

export type ComingSoonSize = "sm" | "md" | "lg";

export interface ComingSoonProps {
  icon?: ReactNode;
  title?: string;
  message?: string;
  status?: string;
  size?: ComingSoonSize;
  className?: string;
}
