"use client";

import { cn } from "@/shared/lib/utils";

import { loaderHintVariants, loaderMessageVariants, loaderSpinnerVariants } from "./loader.styles";
import type { PageLoaderProps } from "./loader.types";

export default function PageLoader({ message = "Loading...", className, ...props }: PageLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(`flex w-full min-h-screen items-center justify-center px-6`, className)}
      {...props}
    >
      <div className="flex flex-col items-center">
        <div
          className={loaderSpinnerVariants({
            size: "lg",
          })}
        />

        <div className="mt-5 text-center">
          <p className={loaderMessageVariants()}>{message}</p>
          <p className={loaderHintVariants()}>Please wait a moment</p>
        </div>
      </div>
    </div>
  );
}
