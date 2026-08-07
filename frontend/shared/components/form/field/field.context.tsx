"use client";

import { createContext, useContext } from "react";
import { FieldContextValue } from "./field.types";

export const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext() {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error("Field components must be used inside <Field />");
  }

  return context;
}
