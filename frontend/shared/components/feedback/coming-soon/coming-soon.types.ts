export type ComingSoonSize = "sm" | "md" | "lg";

export interface ComingSoonProps {
  title?: string;

  message?: string;

  status?: string;

  size?: ComingSoonSize;

  className?: string;
}
