"use client";

import { useEffect, useState } from "react";

import { CourseOffering } from "@/shared";

import { OfferingService } from "../api/offering.service";

export function useOffering(courseId: number) {
  const [course, setCourse] = useState<CourseOffering | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadCourse = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await OfferingService.getOffering(courseId);

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

      const response = await OfferingService.getOffering(courseId);
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
