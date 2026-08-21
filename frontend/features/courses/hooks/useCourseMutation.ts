"use client";

import { useState } from "react";

import { Course, useError } from "@/shared";

import { CourseService } from "../api/course.service";
import type { CreateCourseRequest, UpdateCourseRequest } from "../types";

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
    return execute(() => CourseService.createCourse(data));
  }

  async function updateCourse(id: number, data: UpdateCourseRequest) {
    return execute(() => CourseService.updateCourse(id, data));
  }

  async function updateStatus(course: Course) {
    return execute(() => CourseService.changeStatus(course.id, course.isActive));
  }

  return {
    loading,

    createCourse,

    updateCourse,

    updateStatus,
  };
}
