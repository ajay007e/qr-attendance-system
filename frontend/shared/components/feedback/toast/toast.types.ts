import type { ReactNode } from "react";

export type ToastVariant = "success" | "error" | "warning" | "info" | "loading";

export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export type ToastStackOrder = "top" | "bottom";
export type ToastId = string;
export type ToastDuration = number | 0;

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  id?: ToastId;
  icon?: ReactNode;
  duration?: ToastDuration;
  position?: ToastPosition;
  dismissible?: boolean;
  progress?: boolean;
  action?: ToastAction;
  pauseOnHover?: boolean;
  className?: string;
}

export interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
  onUpdate?: (id: string, options: Partial<ToastData>) => void;
}

export interface CustomToastProps {
  id: ToastId;
  dismiss: () => void;
  update: (options: Partial<ToastData>) => void;
}

export type CustomToastComponent = ReactNode | ((props: CustomToastProps) => ReactNode);

export interface CustomToastOptions extends ToastOptions {
  content: CustomToastComponent;
}

export interface ToastData {
  id: ToastId;
  variant: ToastVariant;
  message?: ReactNode;
  icon?: ReactNode;
  duration: ToastDuration;
  position: ToastPosition;
  dismissible: boolean;
  progress: boolean;
  action?: ToastAction;
  pauseOnHover: boolean;
  className?: string;
  createdAt: number;
  customContent?: CustomToastComponent;
}

export interface ToastPromiseOptions<T = unknown> {
  loading: ReactNode;
  success: ReactNode | ((data: T) => ReactNode);
  error: ReactNode | ((error: unknown) => ReactNode);
  options?: ToastOptions;
}

export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  newestOn?: ToastStackOrder;
  maxToasts?: number;
}

export interface ToastContextValue {
  toasts: ToastData[];
  success: (message: ReactNode, options?: ToastOptions) => ToastId;
  error: (message: ReactNode, options?: ToastOptions) => ToastId;
  warning: (message: ReactNode, options?: ToastOptions) => ToastId;
  info: (message: ReactNode, options?: ToastOptions) => ToastId;
  loading: (message: ReactNode, options?: ToastOptions) => ToastId;
  custom: (options: CustomToastOptions) => ToastId;
  promise: <T>(promise: Promise<T>, options: ToastPromiseOptions<T>) => Promise<T>;
  updateToast: (id: ToastId, options: Partial<ToastData>) => void;
  dismissToast: (id: ToastId) => void;
  dismissAll: () => void;
}

export interface ToastIconProps {
  variant: ToastVariant;
  icon?: ReactNode;
}

export interface ToastProgressProps {
  duration: number;
  variant: ToastVariant;
  paused?: boolean;
}

export interface ToastCloseButtonProps {
  onClick: () => void;
  label?: string;
}

export interface ToastContainerProps {
  toasts: ToastData[];
  position: ToastPosition;
  newestOn: ToastStackOrder;
  maxToasts: number;
  onDismiss: (id: ToastId) => void;
  onUpdate: (id: ToastId, options: Partial<ToastData>) => void;
}
