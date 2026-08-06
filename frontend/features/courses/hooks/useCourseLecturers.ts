"use client";

import { useCallback, useEffect, useState } from "react";

import { useError } from "@/shared";

import { CourseService } from "../api/course.service";

import type { AssignLecturerRequest, CourseLecturer } from "../types";

export function useCourseLecturers(courseId: number) {
  const { handleError } = useError();

  const [lecturers, setLecturers] = useState<CourseLecturer[]>([]);

  const [loading, setLoading] = useState(true);

  const [assigning, setAssigning] = useState(false);

  const [removing, setRemoving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const loadLecturers = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const data = await CourseService.getLecturers(courseId);

      setLecturers(data);
    } catch (error) {
      handleError(error);

      setError(
        error instanceof Error ? error.message : "Unable to load lecturers.",
      );
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

    loadLecturers();
  }, [courseId, loadLecturers]);

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
