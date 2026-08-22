"use client";

import { cn } from "@/shared/lib/utils";

import { loaderMessageVariants, loaderOverlayVariants, loaderSpinnerVariants, loaderVariants } from "./loader.styles";
import type { LoaderProps } from "./loader.types";

export default function Loader({ size = "md", message, className, overlay = false, ...props }: LoaderProps) {
  const loader = (
    <div role="status" aria-live="polite" className={cn(loaderVariants(), className)} {...props}>
      <div
        className={loaderSpinnerVariants({
          size,
        })}
      />

      {message && <p className={loaderMessageVariants()}>{message}</p>}

      <span className="sr-only">{message ?? "Loading"}</span>
    </div>
  );

  if (!overlay) {
    return loader;
  }

  return <div className={loaderOverlayVariants()}>{loader}</div>;
}
