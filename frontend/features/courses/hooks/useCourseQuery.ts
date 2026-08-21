"use client";

import { useCallback, useState } from "react";

import { DEFAULT_COURSE_QUERY } from "../constants";
import type { CourseQuery } from "../types";

export function useCourseQuery() {
  const [query, setQueryState] = useState<CourseQuery>(DEFAULT_COURSE_QUERY);

  const setQuery = useCallback((updates: Partial<CourseQuery>) => {
    setQueryState((current) => ({
      ...current,
      ...updates,
    }));
  }, []);

  const resetQuery = useCallback(() => {
    setQueryState(DEFAULT_COURSE_QUERY);
  }, []);

  return {
    query,
    setQuery,
    resetQuery,
  };
}
