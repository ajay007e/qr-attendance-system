"use client";

import { useCallback, useEffect, useState } from "react";

import { enrolmentService, type StudentCourse } from "@/features/enrolments";
import { useError } from "@/shared";

export function useEnrolledCourses() {
  const { handleError } = useError();

  const [courses, setCourses] = useState<StudentCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await enrolmentService.getEnrolled();

      setCourses(response.data);
    } catch (error) {
      setCourses([]);
      handleError(error);

      setError(error instanceof Error ? error.message : "Unable to load your courses.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const withdraw = async (courseId: number) => {
    await enrolmentService.withdraw(courseId);

    await load();
  };

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);

    return () => window.clearTimeout(timer);
  }, [load]);

  return {
    courses,
    loading,
    error,
    refresh: load,
    withdraw,
  };
}
