"use client";

import { useCallback, useState } from "react";

import type { SummaryQuery } from "../types";

const INITIAL_QUERY: SummaryQuery = { page: 1, limit: 10, search: "" };

export function useSummaryQuery() {
  const [query, setQueryState] = useState<SummaryQuery>(INITIAL_QUERY);

  const setQuery = useCallback((updates: Partial<SummaryQuery>) => {
    setQueryState((current) => ({
      ...current,
      ...updates,
    }));
  }, []);

  const resetQuery = useCallback(() => {
    setQueryState(INITIAL_QUERY);
  }, []);

  return {
    query,
    setQuery,
    resetQuery,
  };
}