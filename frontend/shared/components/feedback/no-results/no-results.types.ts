import type { ReactNode } from "react";

interface Action {
  label: string;

  onClick: () => void;

  icon?: ReactNode;
}
export interface NoResultsProps {
  title?: string;
  message?: string;
  action?: Action;
  className?: string;
}
