"use client";

import { useCallback, useEffect, useState } from "react";

import { CourseService } from "../api/course.service";
import type { Course } from "../types";

export function useCourse(courseId: number) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await CourseService.get(courseId);

      setCourse(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to load course"));
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return {
    course,
    loading,
    error,
    refresh: fetchCourse,
  };
}
