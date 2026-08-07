export interface ErrorFallbackProps {
  title?: string;

  message?: string;

  error?: string;

  onRetry?: () => void;

  retryLabel?: string;

  className?: string;
}

export interface FormErrorProps {
  message?: string;

  className?: string;
}
