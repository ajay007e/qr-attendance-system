"use client";

import { useState } from "react";
import { useError } from "@/shared";
import { CourseService } from "../api/course.service";

import type {
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
} from "../types";

export function useCourseMutation(refresh: () => Promise<void>) {
  const { handleError } = useError();
  const [loading, setLoading] = useState(false);

  async function execute<T>(callback: () => Promise<T>): Promise<T> {
    try {
      setLoading(true);

      const result = await callback();

      await refresh();

      return result;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function createCourse(data: CreateCourseRequest) {
    return execute(() => CourseService.create(data));
  }

  async function updateCourse(id: number, data: UpdateCourseRequest) {
    return execute(() => CourseService.update(id, data));
  }

  async function updateStatus(course: Course) {
    return execute(() =>
      CourseService.updateStatus(course.id, course.is_active),
    );
  }

  return {
    loading,

    createCourse,

    updateCourse,

    updateStatus,
  };
}
