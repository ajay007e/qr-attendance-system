"use client";

import { createContext, useContext } from "react";

import { FieldContextValue } from "./field.types";

export const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext() {
  return useContext(FieldContext);
}
