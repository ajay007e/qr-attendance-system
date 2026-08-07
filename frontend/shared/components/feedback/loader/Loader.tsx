"use client";

import { cn } from "@/shared/lib/utils";

import { loaderMessageVariants, loaderSpinnerVariants } from "./loader.styles";

import type { LoaderProps } from "./loader.types";

export default function Loader({ size = "md", message, className, ...props }: LoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        `
        flex
        flex-col
        items-center
        justify-center
        gap-3
        `,
        className,
      )}
      {...props}
    >
      <div
        className={loaderSpinnerVariants({
          size,
        })}
      />

      {message && <p className={loaderMessageVariants()}>{message}</p>}

      <span className="sr-only">{message ?? "Loading"}</span>
    </div>
  );
}
