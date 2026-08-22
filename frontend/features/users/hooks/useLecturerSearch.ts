"use client";

import { useEffect, useState } from "react";

import { userService } from "@/features/users";
import { type Lecturer, useDebounce } from "@/shared";

export default function useLecturerSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Lecturer[]>([]);
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
        const response = await userService.searchLecturers(debouncedQuery);
        setResults(response.data);
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
