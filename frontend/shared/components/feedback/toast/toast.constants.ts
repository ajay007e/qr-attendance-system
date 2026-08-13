import type { ToastPosition, ToastVariant } from "./toast.types";

export const DEFAULT_TOAST_POSITION: ToastPosition = "top-right";

export const DEFAULT_TOAST_NEWEST_ON = "top" as const;

export const DEFAULT_TOAST_MAX_COUNT = 5;

export const DEFAULT_TOAST_DISMISSIBLE = true;

export const DEFAULT_TOAST_PROGRESS = true;

export const DEFAULT_TOAST_PAUSE_ON_HOVER = true;

export const DEFAULT_TOAST_DURATIONS: Record<ToastVariant, number> = {
  success: 4000,
  error: 6000,
  warning: 5000,
  info: 4000,
  loading: 0,
};

export const TOAST_POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export const TOAST_VARIANTS: ToastVariant[] = ["success", "error", "warning", "info", "loading"];

export const TOAST_ID_PREFIX = "toast";

export const TOAST_MOBILE_OFFSET = 16;

export const TOAST_DESKTOP_OFFSET = 20;

export const TOAST_MAX_WIDTH = 420;

export const DEFAULT_POSITION: ToastPosition = "top-right";

export const DEFAULT_DURATIONS: Record<ToastVariant, number> = {
  success: 4000,
  error: 6000,
  warning: 5000,
  info: 4000,
  loading: 0,
};
