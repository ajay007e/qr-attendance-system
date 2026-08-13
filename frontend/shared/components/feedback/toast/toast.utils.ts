import type { ReactNode } from "react";

import {
  DEFAULT_TOAST_DISMISSIBLE,
  DEFAULT_TOAST_DURATIONS,
  DEFAULT_TOAST_PAUSE_ON_HOVER,
  DEFAULT_TOAST_POSITION,
  DEFAULT_TOAST_PROGRESS,
} from "./toast.constants";
import type { ToastData, ToastId, ToastOptions, ToastPosition, ToastVariant } from "./toast.types";

export function generateToastId(): ToastId {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createToastData(
  variant: ToastVariant,
  message: ReactNode,
  options: ToastOptions = {},
  defaultPosition: ToastPosition = DEFAULT_TOAST_POSITION,
): ToastData {
  const id = options.id ?? generateToastId();

  return {
    id,
    variant,
    message,
    icon: options.icon,
    duration: options.duration ?? DEFAULT_TOAST_DURATIONS[variant],
    position: options.position ?? defaultPosition,
    dismissible: options.dismissible ?? DEFAULT_TOAST_DISMISSIBLE,
    progress: options.progress ?? DEFAULT_TOAST_PROGRESS,
    action: options.action,
    pauseOnHover: options.pauseOnHover ?? DEFAULT_TOAST_PAUSE_ON_HOVER,
    className: options.className,
    createdAt: Date.now(),
  };
}

export function createCustomToastData(
  options: ToastOptions & {
    content: ToastData["customContent"];
  },
  defaultPosition: ToastPosition = DEFAULT_TOAST_POSITION,
): ToastData {
  const id = options.id ?? generateToastId();

  return {
    id,
    variant: "info",
    duration: options.duration ?? DEFAULT_TOAST_DURATIONS.info,
    position: options.position ?? defaultPosition,
    dismissible: options.dismissible ?? DEFAULT_TOAST_DISMISSIBLE,
    progress: options.progress ?? DEFAULT_TOAST_PROGRESS,
    action: options.action,
    pauseOnHover: options.pauseOnHover ?? DEFAULT_TOAST_PAUSE_ON_HOVER,
    className: options.className,
    createdAt: Date.now(),
    customContent: options.content,
  };
}

export function resolveToastMessage<T>(message: ReactNode | ((value: T) => ReactNode), value: T): ReactNode {
  return typeof message === "function" ? message(value) : message;
}
