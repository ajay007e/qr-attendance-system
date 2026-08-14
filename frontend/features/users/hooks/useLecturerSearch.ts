"use client";

import { useEffect, useState } from "react";

import { useDebounce } from "@/shared";

import { userService } from "../api/user.service";
import { CourseLecturer } from "@/features/courses";

export default function useLecturerSearch() {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState<CourseLecturer[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    async function search() {
      if (debouncedQuery.trim().length < 2) {
        setResults([]);

        return;
      }

      try {
        setLoading(true);

        setError(null);

        const lecturers = await userService.searchLecturers(debouncedQuery);

        setResults(lecturers);
      } catch (error) {
        setResults([]);

        setError(error instanceof Error ? error.message : "Unable to search lecturers.");
      } finally {
        setLoading(false);
      }
    }

    search();
  }, [debouncedQuery]);

  return {
    query,

    setQuery,

    results,

    loading,

    error,
  };
}
