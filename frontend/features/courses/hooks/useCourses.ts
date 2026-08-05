"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Pagination, DEFAULT_PAGINATION, useError } from "@/shared";

import { CourseService } from "../api/course.service";

import type {
  Course,
  CourseQuery,
  CreateCourseRequest,
  UpdateCourseRequest,
} from "../types";

export function useCourses(query: CourseQuery) {
  const isInitialLoad = useRef(true);

  const { handleError } = useError();

  const [courses, setCourses] = useState<Course[]>([]);

  const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION);

  const [loading, setLoading] = useState(true);

  const [isFetching, setIsFetching] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    try {
      if (isInitialLoad.current) {
        setLoading(true);
      } else {
        setIsFetching(true);
      }

      setError(null);

      const response = await CourseService.list(query);

      setCourses(response.data ?? []);

      setPagination(response.pagination ?? DEFAULT_PAGINATION);
    } catch (error) {
      setCourses([]);

      setPagination(DEFAULT_PAGINATION);

      handleError(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unable to load courses.");
      }
    } finally {
      if (isInitialLoad.current) {
        setLoading(false);

        isInitialLoad.current = false;
      } else {
        setIsFetching(false);
      }
    }
  }, [query]);

  const createCourse = async (data: CreateCourseRequest) => {
    await CourseService.create(data);

    await loadCourses();
  };

  const updateCourse = async (id: number, data: UpdateCourseRequest) => {
    await CourseService.update(id, data);

    await loadCourses();
  };

  const updateStatus = async (course: Course) => {
    await CourseService.updateStatus(course.id, !course.is_active);

    await loadCourses();
  };

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return {
    courses,

    pagination,

    loading,

    isFetching,

    error,

    refresh: loadCourses,

    createCourse,

    updateCourse,

    updateStatus,
  };
}
