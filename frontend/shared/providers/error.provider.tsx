"use client";

import { useState } from "react";
import { AppError } from "../errors/AppError";
import { ErrorContext } from "../context/error.context";
import { ErrorProviderProps, ErrorState } from "../types";

export function ErrorProvider({ children }: ErrorProviderProps) {
  const [error, setError] = useState<ErrorState>(null);

  function handleError(error: unknown) {
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
  }

  function clearError() {
    setError(null);
  }

  return (
    <ErrorContext.Provider
      value={{
        error,
        handleError,
        clearError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}
