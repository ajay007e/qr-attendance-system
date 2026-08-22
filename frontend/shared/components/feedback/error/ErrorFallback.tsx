"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/shared";
import { cn } from "@/shared/lib/utils";

import {
  errorFallbackDetailsVariants,
  errorFallbackIconVariants,
  errorFallbackMessageVariants,
  errorFallbackTitleVariants,
  errorFallbackVariants,
} from "./error.styles";
import type { ErrorFallbackProps } from "./error.types";

export default function ErrorFallback({
  title = "Unable to load information",
  message = "Something went wrong while loading this content. Please try again.",
  error,
  onRetry,
  retryLabel = "Try Again",
  className,
}: ErrorFallbackProps) {
  return (
    <div role="alert" className={cn(errorFallbackVariants(), className)}>
      <div className={errorFallbackIconVariants()}>
        <AlertTriangle size={26} />
      </div>

      <h2 className={errorFallbackTitleVariants()}>{title}</h2>

      <p className={errorFallbackMessageVariants()}>{message}</p>

      {error && <div className={errorFallbackDetailsVariants()}>{error}</div>}

      {onRetry && (
        <Button variant="danger" size="md" className="mt-6" leftIcon={<RefreshCw size={16} />} onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
