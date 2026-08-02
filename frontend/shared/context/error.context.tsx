"use client";

import { createContext } from "react";

export const ErrorContext = createContext<
  | {
      error: {
        type: string;
        message: string;
      } | null;
      handleError: (error: unknown) => void;
      clearError: () => void;
    }
  | undefined
>(undefined);
