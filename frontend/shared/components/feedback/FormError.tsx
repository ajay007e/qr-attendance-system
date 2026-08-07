"use client";

import { FormErrorProps } from "./types";

export default function FormError({ message, className }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className={`
        rounded-xl
        border
        border-red-200
        bg-red-50
        px-4
        py-3
        text-sm
        text-red-700
        ${className ?? ""}
      `}
    >
      {message}
    </div>
  );
}
