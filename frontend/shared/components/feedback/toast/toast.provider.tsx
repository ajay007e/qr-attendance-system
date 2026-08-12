"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

import { ToastContext } from "./toast.context";
import { ToastContainer } from "./ToastContainer";
import {
  DEFAULT_TOAST_DISMISSIBLE,
  DEFAULT_TOAST_DURATIONS,
  DEFAULT_TOAST_MAX_COUNT,
  DEFAULT_TOAST_NEWEST_ON,
  DEFAULT_TOAST_PAUSE_ON_HOVER,
  DEFAULT_TOAST_POSITION,
  DEFAULT_TOAST_PROGRESS,
  TOAST_POSITIONS,
} from "./toast.constants";
import {
  addToast as storeAddToast,
  dismissAll as storeDismissAll,
  dismissToast as storeDismissToast,
  getToasts,
  subscribe,
  updateToast as storeUpdateToast,
} from "./toast.store";
import type {
  CustomToastOptions,
  ToastContextValue,
  ToastData,
  ToastOptions,
  ToastPosition,
  ToastPromiseOptions,
  ToastProviderProps,
  ToastVariant,
} from "./toast.types";

const EMPTY_TOASTS: ToastData[] = [];

function getServerSnapshot(): ToastData[] {
  return EMPTY_TOASTS;
}

function generateToastId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function resolveMessage<T>(message: ReactNode | ((value: T) => ReactNode), value: T): ReactNode {
  return typeof message === "function" ? message(value) : message;
}

export function ToastProvider({
  children,
  position = DEFAULT_TOAST_POSITION,
  newestOn = DEFAULT_TOAST_NEWEST_ON,
  maxToasts = DEFAULT_TOAST_MAX_COUNT,
}: ToastProviderProps) {
  const toasts = useSyncExternalStore(subscribe, getToasts, getServerSnapshot);

  const addToast = useCallback(
    (variant: ToastVariant, message: ReactNode, options?: ToastOptions): string => {
      const id = options?.id ?? generateToastId();

      const toast: ToastData = {
        id,
        variant,
        message,
        icon: options?.icon,
        duration: options?.duration ?? DEFAULT_TOAST_DURATIONS[variant],
        position: options?.position ?? position,
        dismissible: options?.dismissible ?? DEFAULT_TOAST_DISMISSIBLE,
        progress: options?.progress ?? DEFAULT_TOAST_PROGRESS,
        action: options?.action,
        pauseOnHover: options?.pauseOnHover ?? DEFAULT_TOAST_PAUSE_ON_HOVER,
        className: options?.className,
        createdAt: Date.now(),
      };

      return storeAddToast(toast);
    },
    [position],
  );

  const success = useCallback(
    (message: ReactNode, options?: ToastOptions) => addToast("success", message, options),
    [addToast],
  );

  const error = useCallback(
    (message: ReactNode, options?: ToastOptions) => addToast("error", message, options),
    [addToast],
  );

  const warning = useCallback(
    (message: ReactNode, options?: ToastOptions) => addToast("warning", message, options),
    [addToast],
  );

  const info = useCallback(
    (message: ReactNode, options?: ToastOptions) => addToast("info", message, options),
    [addToast],
  );

  const loading = useCallback(
    (message: ReactNode, options?: ToastOptions) =>
      addToast("loading", message, {
        ...options,
        duration: options?.duration ?? 0,
      }),
    [addToast],
  );

  const custom = useCallback(
    (options: CustomToastOptions) => {
      const id = options.id ?? generateToastId();

      const customToast: ToastData = {
        id,
        variant: "info",
        duration: options.duration ?? DEFAULT_TOAST_DURATIONS.info,
        position: options.position ?? position,
        dismissible: options.dismissible ?? DEFAULT_TOAST_DISMISSIBLE,
        progress: options.progress ?? DEFAULT_TOAST_PROGRESS,
        action: options.action,
        pauseOnHover: options.pauseOnHover ?? DEFAULT_TOAST_PAUSE_ON_HOVER,
        className: options.className,
        createdAt: Date.now(),
        customContent: options.content,
      };

      return storeAddToast(customToast);
    },
    [position],
  );

  const promise = useCallback(
    async <T,>(promiseValue: Promise<T>, options: ToastPromiseOptions<T>): Promise<T> => {
      const id = loading(options.loading, {
        ...options.options,
        duration: 0,
      });

      try {
        const data = await promiseValue;

        storeUpdateToast(id, {
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
      } catch (promiseError) {
        storeUpdateToast(id, {
          variant: "error",
          message: resolveMessage(options.error, promiseError),
          duration: options.options?.duration ?? DEFAULT_TOAST_DURATIONS.error,
          icon: options.options?.icon,
          dismissible: options.options?.dismissible ?? DEFAULT_TOAST_DISMISSIBLE,
          progress: options.options?.progress ?? DEFAULT_TOAST_PROGRESS,
          pauseOnHover: options.options?.pauseOnHover ?? DEFAULT_TOAST_PAUSE_ON_HOVER,
          action: options.options?.action,
          className: options.options?.className,
        });

        throw promiseError;
      }
    },
    [loading],
  );

  const updateToast = useCallback((id: string, options: Partial<ToastData>) => {
    storeUpdateToast(id, options);
  }, []);

  const dismissToast = useCallback((id: string) => {
    storeDismissToast(id);
  }, []);

  const dismissAll = useCallback(() => {
    storeDismissAll();
  }, []);

  const contextValue = useMemo<ToastContextValue>(
    () => ({
      toasts,
      success,
      error,
      warning,
      info,
      loading,
      custom,
      promise,
      updateToast,
      dismissToast,
      dismissAll,
    }),
    [toasts, success, error, warning, info, loading, custom, promise, updateToast, dismissToast, dismissAll],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {TOAST_POSITIONS.map((toastPosition: ToastPosition) => (
        <ToastContainer
          key={toastPosition}
          toasts={toasts}
          position={toastPosition}
          newestOn={newestOn}
          maxToasts={maxToasts}
          onDismiss={dismissToast}
          onUpdate={updateToast}
        />
      ))}
    </ToastContext.Provider>
  );
}
