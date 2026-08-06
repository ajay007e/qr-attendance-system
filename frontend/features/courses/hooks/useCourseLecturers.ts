"use client";

import { useCallback, useEffect, useState } from "react";

import { useError } from "@/shared";

import { CourseService } from "../api/course.service";

import type { AssignLecturerRequest, CourseLecturer } from "../types";

export function useCourseLecturers(courseId: number) {
  const { handleError } = useError();

  const [lecturers, setLecturers] = useState<CourseLecturer[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const loadLecturers = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const lecturers = await CourseService.getLecturers(courseId);

      setLecturers(lecturers);
    } catch (error) {
      handleError(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unable to load lecturers.");
      }
    } finally {
      setLoading(false);
    }
  }, [courseId, handleError]);

  const assignLecturer = async (data: AssignLecturerRequest) => {
    await CourseService.assignLecturer(courseId, data);

    await loadLecturers();
  };

  const removeLecturer = async (userId: number) => {
    await CourseService.removeLecturer(courseId, userId);

    await loadLecturers();
  };

  useEffect(() => {
    if (!courseId) return;

    loadLecturers();
  }, [courseId, loadLecturers]);

  return {
    lecturers,

    loading,

    error,

    refresh: loadLecturers,

    assignLecturer,

    removeLecturer,
  };
}
