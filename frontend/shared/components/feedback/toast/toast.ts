import type { ReactNode } from "react";

import {
  DEFAULT_TOAST_DISMISSIBLE,
  DEFAULT_TOAST_DURATIONS,
  DEFAULT_TOAST_PAUSE_ON_HOVER,
  DEFAULT_TOAST_POSITION,
  DEFAULT_TOAST_PROGRESS,
} from "./toast.constants";
import { addToast, dismissAll, dismissToast, updateToast } from "./toast.store";
import type {
  CustomToastOptions,
  ToastData,
  ToastId,
  ToastOptions,
  ToastPromiseOptions,
  ToastVariant,
} from "./toast.types";

function generateToastId(): ToastId {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function createToast(variant: ToastVariant, message: ReactNode, options: ToastOptions = {}): ToastId {
  const id = options.id ?? generateToastId();

  const toast: ToastData = {
    id,
    variant,
    message,
    icon: options.icon,
    duration: options.duration ?? DEFAULT_TOAST_DURATIONS[variant],
    position: options.position ?? DEFAULT_TOAST_POSITION,
    dismissible: options.dismissible ?? DEFAULT_TOAST_DISMISSIBLE,
    progress: options.progress ?? DEFAULT_TOAST_PROGRESS,
    action: options.action,
    pauseOnHover: options.pauseOnHover ?? DEFAULT_TOAST_PAUSE_ON_HOVER,
    className: options.className,
    createdAt: Date.now(),
  };

  return addToast(toast);
}

function resolveMessage<T>(message: ReactNode | ((value: T) => ReactNode), value: T): ReactNode {
  return typeof message === "function" ? message(value) : message;
}

export const toast = {
  success(message: ReactNode, options?: ToastOptions): ToastId {
    return createToast("success", message, options);
  },

  error(message: ReactNode, options?: ToastOptions): ToastId {
    return createToast("error", message, options);
  },

  warning(message: ReactNode, options?: ToastOptions): ToastId {
    return createToast("warning", message, options);
  },

  info(message: ReactNode, options?: ToastOptions): ToastId {
    return createToast("info", message, options);
  },

  loading(message: ReactNode, options?: ToastOptions): ToastId {
    return createToast("loading", message, {
      ...options,
      duration: options?.duration ?? 0,
    });
  },

  custom(options: CustomToastOptions): ToastId {
    const id = options.id ?? generateToastId();

    const customToast: ToastData = {
      id,
      variant: "info",
      duration: options.duration ?? DEFAULT_TOAST_DURATIONS.info,
      position: options.position ?? DEFAULT_TOAST_POSITION,
      dismissible: options.dismissible ?? DEFAULT_TOAST_DISMISSIBLE,
      progress: options.progress ?? DEFAULT_TOAST_PROGRESS,
      action: options.action,
      pauseOnHover: options.pauseOnHover ?? DEFAULT_TOAST_PAUSE_ON_HOVER,
      className: options.className,
      createdAt: Date.now(),
      customContent: options.content,
    };

    return addToast(customToast);
  },

  promise<T>(promise: Promise<T>, options: ToastPromiseOptions<T>): Promise<T> {
    const id = createToast("loading", options.loading, {
      ...options.options,
      duration: 0,
    });

    return promise.then(
      (data) => {
        updateToast(id, {
          variant: "success",
          message: resolveMessage(options.success, data),
          duration: options.options?.duration ?? DEFAULT_TOAST_DURATIONS.success,
          icon: options.options?.icon,
          dismissible: options.options?.dismissible ?? DEFAULT_TOAST_DISMISSIBLE,
          progress: options.options?.progress ?? DEFAULT_TOAST_PROGRESS,
          pauseOnHover: options.options?.pauseOnHover ?? DEFAULT_TOAST_PAUSE_ON_HOVER,
          action: options.options?.action,
          className: options.options?.className,
        });

        return data;
      },
      (error: unknown) => {
        updateToast(id, {
          variant: "error",
          message: resolveMessage(options.error, error),
          duration: options.options?.duration ?? DEFAULT_TOAST_DURATIONS.error,
          icon: options.options?.icon,
          dismissible: options.options?.dismissible ?? DEFAULT_TOAST_DISMISSIBLE,
          progress: options.options?.progress ?? DEFAULT_TOAST_PROGRESS,
          pauseOnHover: options.options?.pauseOnHover ?? DEFAULT_TOAST_PAUSE_ON_HOVER,
          action: options.options?.action,
          className: options.options?.className,
        });

        throw error;
      },
    );
  },

  update(id: ToastId, options: Partial<ToastData>): void {
    updateToast(id, options);
  },

  dismiss(id: ToastId): void {
    dismissToast(id);
  },

  dismissAll(): void {
    dismissAll();
  },
};
