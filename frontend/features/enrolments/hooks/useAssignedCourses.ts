"use client";

import { useCallback, useEffect, useState } from "react";

import { type AssignedCourse, enrolmentService } from "@/features/enrolments";
import { useError } from "@/shared";

export function useAssignedCourses() {
  const { handleError } = useError();

  const [courses, setCourses] = useState<AssignedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await enrolmentService.getAssigned();

      setCourses(response.data);
    } catch (error) {
      setCourses([]);
      handleError(error);

      setError(error instanceof Error ? error.message : "Unable to load your assigned courses.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);

    return () => window.clearTimeout(timer);
  }, [load]);

  return {
    courses,
    loading,
    error,
    refresh: load,
  };
}
