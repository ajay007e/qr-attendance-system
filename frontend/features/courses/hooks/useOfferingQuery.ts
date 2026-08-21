"use client";

import { useCallback, useState } from "react";

import { type CourseOfferingQuery, DEFAULT_OFFERING_QUERY } from "@/features/courses";

export function useOfferingQuery() {
  const [query, setQueryState] = useState<CourseOfferingQuery>(DEFAULT_OFFERING_QUERY);

  const setQuery = useCallback((updates: Partial<CourseOfferingQuery>) => {
    setQueryState((current) => ({
      ...current,
      ...updates,
    }));
  }, []);

  const resetQuery = useCallback(() => {
    setQueryState(DEFAULT_OFFERING_QUERY);
  }, []);

  return {
    query,
    setQuery,
    resetQuery,
  };
}
