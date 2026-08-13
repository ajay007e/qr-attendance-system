"use client";

import { useCallback, useMemo, useState } from "react";
import { AppError } from "../errors/AppError";
import { ErrorContext } from "../context/error.context";
import { ErrorProviderProps, ErrorState } from "../types";

export function ErrorProvider({ children }: ErrorProviderProps) {
  const [error, setError] = useState<ErrorState>(null);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof AppError) {
      setError({
        type: error.type,
        message: error.message,
      });
      return;
    }

    setError({
      type: "UNKNOWN",
      message: "Something went wrong.",
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      error,
      handleError,
      clearError,
    }),
    [error, handleError, clearError],
  );
  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>;
}
