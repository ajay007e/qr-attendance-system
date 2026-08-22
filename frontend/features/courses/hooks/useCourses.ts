"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { type CourseQuery, CourseService } from "@/features/courses";
import { DEFAULT_PAGINATION_META, useError } from "@/shared";
import type { PaginationMeta, Course } from "@/shared";

export function useCourses(query: CourseQuery) {
  const isInitialLoad = useRef(true);
  const { handleError } = useError();
  const [courses, setCourses] = useState<Course[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION_META);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    try {
      if (isInitialLoad.current) {
        setLoading(true);
      } else {
        setIsFetching(true);
      }
      setError(null);
      const response = await CourseService.getCourses(query);
      setCourses(response.data.items ?? []);
      setPagination(response.data.meta ?? DEFAULT_PAGINATION_META);
    } catch (err) {
      setCourses([]);
      setPagination(DEFAULT_PAGINATION_META);
      handleError(err);
      setError(err instanceof Error ? err.message : "Unable to load courses.");
    } finally {
      if (isInitialLoad.current) {
        setLoading(false);
        isInitialLoad.current = false;
      } else {
        setIsFetching(false);
      }
    }
  }, [query, handleError]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void loadCourses();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadCourses]);

  return {
    courses,
    pagination,

    loading,
    isFetching,

    error,

    refresh: loadCourses,
  };
}
