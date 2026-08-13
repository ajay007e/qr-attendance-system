import type { ToastPosition, ToastVariant } from "./toast.types";

export const toastContainerStyles = [
  "pointer-events-none",
  "fixed",
  "inset-x-0",
  "z-[9999]",
  "flex",
  "w-full",
  "flex-col",
  "gap-3",
  "p-3",
  "sm:inset-x-auto",
  "sm:w-auto",
  "sm:max-w-[420px]",
  "sm:p-5",
].join(" ");

export const toastPositionStyles: Record<ToastPosition, string> = {
  "top-left": ["top-0", "sm:top-5", "sm:left-5"].join(" "),

  "top-center": ["top-0", "sm:top-5", "sm:left-1/2", "sm:-translate-x-1/2"].join(" "),

  "top-right": ["top-0", "sm:top-5", "sm:right-5"].join(" "),

  "bottom-left": ["bottom-0", "sm:bottom-5", "sm:left-5"].join(" "),

  "bottom-center": ["bottom-0", "sm:bottom-5", "sm:left-1/2", "sm:-translate-x-1/2"].join(" "),

  "bottom-right": ["bottom-0", "sm:bottom-5", "sm:right-5"].join(" "),
};

export const toastStyles = [
  "pointer-events-auto",
  "relative",
  "w-full",
  "overflow-hidden",
  "rounded-xl",
  "border",
  "border-gray-200",
  "bg-white",
  "text-gray-900",
  "shadow-xl",
  "transition-all",
  "duration-200",
].join(" ");

export const toastVariantStyles: Record<ToastVariant, string> = {
  success: ["border-green-200"].join(" "),

  error: ["border-red-200"].join(" "),

  warning: ["border-amber-200"].join(" "),

  info: ["border-blue-200"].join(" "),

  loading: ["border-gray-200"].join(" "),
};

export const toastContentStyles = ["flex", "items-center", "gap-3", "p-4", "sm:p-4"].join(" ");

export const toastMessageStyles = [
  "min-w-0",
  "flex-1",
  "break-words",
  "text-sm",
  "font-medium",
  "leading-5",
  "text-gray-700",
].join(" ");

export const toastIconStyles: Record<ToastVariant, string> = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-amber-600",
  info: "text-blue-600",
  loading: "text-gray-600",
};

export const toastLoadingIconStyles = ["animate-spin"].join(" ");

export const toastCloseButtonStyles = [
  "inline-flex",
  "size-7",
  "shrink-0",
  "items-center",
  "justify-center",
  "rounded-md",
  "text-gray-400",
  "transition",
  "hover:bg-gray-100",
  "hover:text-gray-700",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-blue-100",
  "focus:ring-offset-1",
].join(" ");

export const toastActionStyles = [
  "mt-2",
  "block",
  "text-sm",
  "font-semibold",
  "text-blue-600",
  "underline",
  "underline-offset-2",
  "transition",
  "hover:text-blue-700",
  "hover:no-underline",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-blue-100",
  "focus:ring-offset-1",
].join(" ");

export const toastProgressContainerStyles = [
  "absolute",
  "right-0",
  "bottom-0",
  "left-0",
  "h-1",
  "overflow-hidden",
  "bg-gray-100",
].join(" ");

export const toastProgressStyles = ["h-full", "transition-[width]", "duration-100", "ease-linear"].join(" ");

export const toastProgressVariantStyles: Record<ToastVariant, string> = {
  success: "bg-green-600",
  error: "bg-red-600",
  warning: "bg-amber-500",
  info: "bg-blue-600",
  loading: "bg-gray-500",
};

export const toastEnterStyles = ["animate-in", "fade-in", "slide-in-from-top-2", "duration-200"].join(" ");
