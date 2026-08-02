"use client";

import { ReactNode, useState } from "react";
import { AppError } from "../errors/AppError";
import { ErrorContext } from "../context/error.context";

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<{
    type: string;
    message: string;
  } | null>(null);

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
