import { ReactNode } from "react";

export type ErrorType = "VALIDATION" | "AUTH" | "FORBIDDEN" | "NOT_FOUND" | "NETWORK" | "SERVER" | "UNKNOWN";

export type ErrorData = {
  type: ErrorType;
  message: string;
};

export type ErrorState = ErrorData | null;

export interface ErrorProviderProps {
  children: ReactNode;
}

export interface ErrorContextType {
  error: ErrorState;
  handleError: (error: unknown) => void;
  clearError: () => void;
}
