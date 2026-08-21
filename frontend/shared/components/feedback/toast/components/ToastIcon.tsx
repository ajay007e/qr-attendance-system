"use client";

import { AlertCircle, CheckCircle2, Info, LoaderCircle, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

import { toastIconStyles, toastLoadingIconStyles } from "../toast.styles";
import type { ToastIconProps, ToastVariant } from "../toast.types";

const DEFAULT_ICONS: Record<ToastVariant, ReactNode> = {
  success: <CheckCircle2 />,
  error: <AlertCircle />,
  warning: <TriangleAlert />,
  info: <Info />,
  loading: <LoaderCircle />,
};

export function ToastIcon({ variant, icon }: ToastIconProps) {
  const iconContent = icon ?? DEFAULT_ICONS[variant];

  const isLoading = variant === "loading";

  return (
    <span
      className={[
        "mt-0.5",
        "inline-flex",
        "size-5",
        "shrink-0",
        "items-center",
        "justify-center",
        toastIconStyles[variant],
        isLoading ? toastLoadingIconStyles : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      {iconContent}
    </span>
  );
}
