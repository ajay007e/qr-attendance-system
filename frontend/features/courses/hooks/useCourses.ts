"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PaginationMeta, DEFAULT_PAGINATION, useError } from "@/shared";
import { CourseService } from "../api/course.service";
import type { Course, CourseQuery } from "../types";

function getQueryKey(query: CourseQuery) {
  return JSON.stringify({
    search: query.search,
    session: query.session,
    status: query.status,
    page: query.page,
    limit: query.limit,
  });
}

export function useCourses(query: CourseQuery) {
  const isInitialLoad = useRef(true);
  const { handleError } = useError();
  const [courses, setCourses] = useState<Course[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loadedQueryKey, setLoadedQueryKey] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    const queryKey = getQueryKey(query);
    try {
      if (isInitialLoad.current) {
        setLoading(true);
      } else {
        setIsFetching(true);
      }
      setError(null);
      const response = await CourseService.list(query);
      setCourses(response.data ?? []);
      setPagination(response.pagination ?? DEFAULT_PAGINATION);
      setLoadedQueryKey(queryKey);
    } catch (err) {
      setCourses([]);
      setPagination(DEFAULT_PAGINATION);
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

  const currentQueryKey = getQueryKey(query);

  const hasLoadedCurrentQuery = loadedQueryKey === currentQueryKey;

  return {
    courses,
    pagination,

    loading,
    isFetching,

    error,

    hasLoadedCurrentQuery,
    refresh: loadCourses,
  };
}
