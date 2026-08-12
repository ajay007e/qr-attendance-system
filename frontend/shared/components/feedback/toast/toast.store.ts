import type { ToastData, ToastId } from "./toast.types";

type ToastListener = (toasts: ToastData[]) => void;

let toasts: ToastData[] = [];

const listeners = new Set<ToastListener>();

function emit(): void {
  listeners.forEach((listener) => {
    listener(toasts);
  });
}

export function getToasts(): ToastData[] {
  return toasts;
}

export function subscribe(listener: ToastListener): () => void {
  listeners.add(listener);

  listener(toasts);

  return () => {
    listeners.delete(listener);
  };
}

export function addToast(toast: ToastData): ToastId {
  toasts = [...toasts, toast];

  emit();

  return toast.id;
}

export function updateToast(id: ToastId, updates: Partial<ToastData>): void {
  toasts = toasts.map((toast) =>
    toast.id === id
      ? {
          ...toast,
          ...updates,
        }
      : toast,
  );

  emit();
}

export function dismissToast(id: ToastId): void {
  const nextToasts = toasts.filter((toast) => toast.id !== id);

  if (nextToasts.length === toasts.length) {
    return;
  }

  toasts = nextToasts;

  emit();
}

export function dismissAll(): void {
  if (toasts.length === 0) {
    return;
  }

  toasts = [];

  emit();
}
