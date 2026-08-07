import type { ReactNode } from "react";

export interface NoResultsProps {
  title?: string;
  message?: string;
  action?: ReactNode;
  className?: string;
}
