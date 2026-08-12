"use client";

import { X } from "lucide-react";

import { toastCloseButtonStyles } from "../toast.styles";
import { ToastCloseButtonProps } from "../toast.types";

export function ToastCloseButton({ onClick, label = "Close notification" }: ToastCloseButtonProps) {
  return (
    <button type="button" className={toastCloseButtonStyles} onClick={onClick} aria-label={label}>
      <X className="size-4" aria-hidden="true" />
    </button>
  );
}
