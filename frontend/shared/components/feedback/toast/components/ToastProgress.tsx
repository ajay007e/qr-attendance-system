"use client";

import { useEffect, useRef, useState } from "react";

import { toastProgressContainerStyles, toastProgressStyles, toastProgressVariantStyles } from "../toast.styles";
import type { ToastProgressProps } from "../toast.types";

export function ToastProgress({ duration, variant, paused = false }: ToastProgressProps) {
  const [progress, setProgress] = useState(100);

  const remainingRef = useRef(duration);
  const lastTimestampRef = useRef<number | null>(null);

  useEffect(() => {
    if (duration <= 0) {
      return;
    }

    remainingRef.current = duration;
    lastTimestampRef.current = null;

    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      if (!paused) {
        const elapsed = timestamp - lastTimestampRef.current;

        remainingRef.current = Math.max(0, remainingRef.current - elapsed);

        const nextProgress = (remainingRef.current / duration) * 100;

        setProgress(nextProgress);
      }

      lastTimestampRef.current = timestamp;

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      lastTimestampRef.current = null;
    };
  }, [duration, paused]);

  if (duration <= 0) {
    return null;
  }

  return (
    <div className={toastProgressContainerStyles} aria-hidden="true">
      <div
        className={[toastProgressStyles, toastProgressVariantStyles[variant]].join(" ")}
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
