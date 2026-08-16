"use client";

import { useCallback, useEffect, useState } from "react";

import { type Lecturer, useError } from "@/shared";

import { CourseService } from "../api/course.service";

import type { AssignLecturerRequest } from "../types";

export function useCourseLecturers(courseId: number) {
  const { handleError } = useError();

  const [lecturers, setLecturers] = useState<Lecturer[]>([]);

  const [loading, setLoading] = useState(true);

  const [assigning, setAssigning] = useState(false);

  const [removing, setRemoving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const loadLecturers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await CourseService.getLecturers(courseId);
      setLecturers(response.data);
    } catch (error) {
      handleError(error);

      setError(error instanceof Error ? error.message : "Unable to load lecturers.");
    } finally {
      setLoading(false);
    }
  }, [courseId, handleError]);

  const assignLecturer = async (data: AssignLecturerRequest) => {
    try {
      setAssigning(true);

      setError(null);

      await CourseService.assignLecturer(courseId, data);

      await loadLecturers();
    } catch (error) {
      console.log(error);
      handleError(error);

      throw error;
    } finally {
      setAssigning(false);
    }
  };

  const removeLecturer = async (userId: number) => {
    try {
      setRemoving(true);

      setError(null);

      await CourseService.removeLecturer(courseId, userId);

      await loadLecturers();
    } catch (error) {
      handleError(error);

      throw error;
    } finally {
      setRemoving(false);
    }
  };

  useEffect(() => {
    if (!courseId) return;

    let cancelled = false;

    async function fetchLecturers() {
      try {
        setLoading(true);
        setError(null);

        const response = await CourseService.getLecturers(courseId);

        if (!cancelled) {
          setLecturers(response.data);
        }
      } catch (error) {
        if (!cancelled) {
          handleError(error);

          setError(error instanceof Error ? error.message : "Unable to load lecturers.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchLecturers();

    return () => {
      cancelled = true;
    };
  }, [courseId, handleError]);

  return {
    lecturers,

    loading,

    assigning,

    removing,

    error,

    refresh: loadLecturers,

    assignLecturer,

    removeLecturer,
  };
}
