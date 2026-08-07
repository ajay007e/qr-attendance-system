"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useDebounce, useError } from "@/shared";

import { enrolmentService } from "../api/enrolment.service";
import type { StudentCourse } from "../types";

export default function useAvailableCourses(search: string) {
  const { handleError } = useError();

  const isInitialLoad = useRef(true);

  const debouncedSearch = useDebounce(search);

  const [courses, setCourses] = useState<StudentCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      if (isInitialLoad.current) {
        setLoading(true);
      } else {
        setIsFetching(true);
      }
      setError(null);

      const response = await enrolmentService.getAvailable(debouncedSearch);

      setCourses(response.data);
    } catch (error) {
      setCourses([]);
      handleError(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load available courses.",
      );
    } finally {
      if (isInitialLoad.current) {
        setLoading(false);
        isInitialLoad.current = false;
      } else {
        setIsFetching(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const enrol = async (courseId: number) => {
    await enrolmentService.enrol(courseId);

    await load();
  };

  useEffect(() => {
    load();
  }, [load]);

  return {
    courses,
    loading,
    isFetching,
    error,
    refresh: load,
    enrol,
  };
}
