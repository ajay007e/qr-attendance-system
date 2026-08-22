"use client";

import { X } from "lucide-react";

import { Button } from "@/shared";

import { ToastCloseButtonProps } from "../toast.types";

export function ToastCloseButton({ onClick, label = "Close notification" }: ToastCloseButtonProps) {
  return (
    <Button type="button" variant="ghost" size="icon" onClick={onClick} aria-label={label}>
      <X className="size-4" aria-hidden="true" />
    </Button>
  );
}
