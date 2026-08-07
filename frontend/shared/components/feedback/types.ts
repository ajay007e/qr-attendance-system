export interface ComingSoonProps {
  title?: string;
  message?: string;
  size?: "sm" | "md" | "lg";
}

export interface ErrorFallbackProps {
  title?: string;
  message?: string;
  error?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export interface FieldErrorProps {
  message?: string;
}

export interface FormErrorProps {
  message?: string | null;
  className?: string | null;
}
