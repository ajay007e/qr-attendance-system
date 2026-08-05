"use client";

import { useState } from "react";

import { useError } from "@/shared";

import { CourseService } from "../api/course.service";

import type { CourseLecturer } from "../types";

export function useCourseLecturers() {
  const { handleError } = useError();

  const [lecturers, setLecturers] = useState<CourseLecturer[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const getLecturers = async (courseId: number) => {
    try {
      setLoading(true);

      setError(null);

      const response = await CourseService.getLecturers(courseId);
      console.log(response);

      setLecturers(response.data ?? []);

      return response.data;
    } catch (error) {
      handleError(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unable to load lecturers.");
      }

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const assignLecturer = async (courseId: number, userId: number) => {
    try {
      setLoading(true);

      await CourseService.assignLecturer(courseId, userId);
    } finally {
      setLoading(false);
    }
  };

  const removeLecturer = async (courseId: number, userId: number) => {
    try {
      setLoading(true);

      await CourseService.removeLecturer(courseId, userId);
    } finally {
      setLoading(false);
    }
  };

  return {
    lecturers,

    loading,

    error,

    getLecturers,

    assignLecturer,

    removeLecturer,
  };
}
