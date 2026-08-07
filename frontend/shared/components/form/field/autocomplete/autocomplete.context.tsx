"use client";

import React from "react";

import type { AutocompleteContextValue } from "./autocomplete.types";

export const AutocompleteContext = React.createContext<AutocompleteContextValue<any> | null>(null);

export function useAutocompleteContext<T>() {
  const context = React.useContext(AutocompleteContext) as AutocompleteContextValue<T> | null;

  if (!context) {
    throw new Error("useAutocompleteContext must be used inside Field.Autocomplete");
  }

  return context;
}
