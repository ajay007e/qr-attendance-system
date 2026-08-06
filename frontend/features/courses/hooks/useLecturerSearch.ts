"use client";

import { useEffect, useState } from "react";

import { useDebounce } from "@/shared";
import { userService } from "@/features/users";

export function useLecturerSearch() {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState<Lecturer[]>([]);

  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    async function search() {
      if (debouncedQuery.trim().length < 2) {
        setResults([]);

        return;
      }

      try {
        setLoading(true);

        const lecturers = await userService.searchLecturers(debouncedQuery);

        setResults(lecturers);
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
  };
}
