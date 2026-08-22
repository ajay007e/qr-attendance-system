"use client";

import { useEffect, useState } from "react";

import { CourseService } from "@/features/courses";
import type { Course } from "@/shared";

export function useCourse(courseId: number) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadCourse = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await CourseService.getCourse(courseId);

        if (!cancelled) {
          setCourse(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Unable to load course"));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCourse();

    return () => {
      cancelled = true;
    };
  }, [courseId]);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await CourseService.getCourse(courseId);
      setCourse(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to load course"));
    } finally {
      setLoading(false);
    }
  };

  return {
    course,
    loading,
    error,
    refresh,
  };
}
