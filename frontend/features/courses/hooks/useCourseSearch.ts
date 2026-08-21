"use client";

import { useEffect, useState } from "react";

import { useDebounce, type Course } from "@/shared";

import { CourseService } from "../api/course.service";

export default function useCourseSearch() {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState<Course[]>([]);

  const [loading, setLoading] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    async function search() {
      if (debouncedQuery.trim().length < 2) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        const response = await CourseService.getCourses({
          search: debouncedQuery,
          status: "ALL",
          page: 1,
          limit: 10,
        });

        setResults(response.data.items ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    void search();
  }, [debouncedQuery]);

  return {
    query,
    results,
    loading,
    selectedCourse,

    setQuery,

    setSelectedCourse,

    onClear() {
      setQuery("");
      setSelectedCourse(null);
      setResults([]);
    },
  };
}
