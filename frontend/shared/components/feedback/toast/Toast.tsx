"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Button from "../../ui/button";

import { ToastCloseButton } from "./components/ToastCloseButton";
import { ToastIcon } from "./components/ToastIcon";
import { ToastProgress } from "./components/ToastProgress";
import {
  toastContentStyles,
  toastEnterStyles,
  toastMessageStyles,
  toastStyles,
  toastVariantStyles,
} from "./toast.styles";
import type { CustomToastProps, ToastData, ToastProps } from "./toast.types";

export function Toast({ toast, onDismiss, onUpdate }: ToastProps) {
  const {
    id,
    variant,
    message,
    icon,
    duration,
    dismissible,
    progress,
    action,
    pauseOnHover,
    className,
    customContent,
  } = toast;

  const [paused, setPaused] = useState(false);

  const remainingDurationRef = useRef(duration);

  const timerStartedAtRef = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    onDismiss(id);
  }, [id, onDismiss]);

  const update = useCallback(
    (options: Partial<ToastData>) => {
      onUpdate?.(id, options);
    },
    [id, onUpdate],
  );

  /*
   * Reset the internal timer whenever the
   * toast duration changes.
   *
   * This is especially important for:
   *
   * toast.promise(...)
   *
   * because the loading toast starts with
   * duration 0 and later becomes success/error.
   */
  useEffect(() => {
    remainingDurationRef.current = duration;
    timerStartedAtRef.current = null;
  }, [duration]);

  /*
   * Auto-dismiss timer.
   *
   * The timer pauses when:
   * - pauseOnHover is enabled
   * - the user hovers/focuses the toast
   *
   * When resumed, it continues from the
   * remaining duration instead of restarting.
   */
  useEffect(() => {
    if (duration <= 0 || paused) {
      return;
    }

    const startTime = performance.now();

    timerStartedAtRef.current = startTime;

    const remaining = remainingDurationRef.current;

    const timer = window.setTimeout(() => {
      dismiss();
    }, remaining);

    return () => {
      window.clearTimeout(timer);

      const elapsed = performance.now() - startTime;

      remainingDurationRef.current = Math.max(0, remaining - elapsed);

      timerStartedAtRef.current = null;
    };
  }, [duration, paused, dismiss]);

  const handleMouseEnter = () => {
    if (pauseOnHover && duration > 0) {
      setPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && duration > 0) {
      setPaused(false);
    }
  };

  const handleFocus = () => {
    if (pauseOnHover && duration > 0) {
      setPaused(true);
    }
  };

  const handleBlur = () => {
    if (pauseOnHover && duration > 0) {
      setPaused(false);
    }
  };

  /*
   * Custom toast
   *
   * Supports both:
   *
   * content: <MyToast />
   *
   * and:
   *
   * content: ({ id, dismiss, update }) => (
   *   <MyToast />
   * )
   */
  if (customContent) {
    const customToastProps: CustomToastProps = {
      id,
      dismiss,
      update,
    };

    const content = typeof customContent === "function" ? customContent(customToastProps) : customContent;

    return (
      <div
        className={[toastEnterStyles, "pointer-events-auto", className ?? ""].filter(Boolean).join(" ")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className={[toastStyles, toastVariantStyles[variant], toastEnterStyles, className ?? ""]
        .filter(Boolean)
        .join(" ")}
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      aria-atomic="true"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className={toastContentStyles}>
        <ToastIcon variant={variant} icon={icon} />

        <div className={toastMessageStyles}>
          {message}

          {action && (
            <Button type="button" variant="link" size="sm" onClick={action.onClick} className="mt-2">
              {action.label}
            </Button>
          )}
        </div>

        {dismissible && <ToastCloseButton onClick={dismiss} />}
      </div>

      {progress && duration > 0 && <ToastProgress duration={duration} variant={variant} paused={paused} />}
    </div>
  );
}
