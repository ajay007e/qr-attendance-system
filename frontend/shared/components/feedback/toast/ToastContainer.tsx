"use client";

import { Toast } from "./Toast";
import { toastContainerStyles, toastPositionStyles } from "./toast.styles";
import { ToastContainerProps } from "./toast.types";

export function ToastContainer({ toasts, position, newestOn, maxToasts, onDismiss, onUpdate }: ToastContainerProps) {
  const visibleToasts = toasts.filter((toast) => toast.position === position).slice(-maxToasts);

  const orderedToasts = newestOn === "top" ? [...visibleToasts].reverse() : visibleToasts;

  if (orderedToasts.length === 0) {
    return null;
  }

  return (
    <div
      className={[toastContainerStyles, toastPositionStyles[position]].join(" ")}
      aria-live="polite"
      aria-atomic="false"
    >
      {orderedToasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
