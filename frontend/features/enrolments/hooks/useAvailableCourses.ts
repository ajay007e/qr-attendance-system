"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { type StudentCourse, COURSE_SEARCH_MIN_LENGTH, enrolmentService } from "@/features/enrolments";
import { useDebounce, useError } from "@/shared";

export function useAvailableCourses(search: string) {
  const { handleError } = useError();

  const requestId = useRef(0);

  const debouncedSearch = useDebounce(search);

  const [courses, setCourses] = useState<StudentCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const query = debouncedSearch.trim();

    if (query.length < COURSE_SEARCH_MIN_LENGTH) {
      requestId.current += 1;
      setCourses([]);
      setLoading(false);
      setError(null);
      return;
    }

    const currentRequest = ++requestId.current;

    try {
      setLoading(true);
      setError(null);

      const response = await enrolmentService.getAvailable(query);

      if (currentRequest === requestId.current) {
        setCourses(response.data.items);
      }
    } catch (error) {
      if (currentRequest !== requestId.current) {
        return;
      }

      setCourses([]);
      handleError(error);
      setError(error instanceof Error ? error.message : "Unable to load available courses.");
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const enrol = async (courseId: number) => {
    await enrolmentService.enrol(courseId);

    await load();
  };

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);

    return () => window.clearTimeout(timer);
  }, [load]);

  const isWaitingForDebounce =
    search.trim().length >= COURSE_SEARCH_MIN_LENGTH && search.trim() !== debouncedSearch.trim();

  return {
    courses,
    loading: loading || isWaitingForDebounce,
    error,
    refresh: load,
    enrol,
  };
}
