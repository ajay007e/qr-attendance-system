"use client";

import { useCallback, useState } from "react";

import { INITIAL_QUERY } from "../constants";
import { ParticipantQuery } from "../types";

export default function useParticipantQuery() {
  const [query, setQueryState] = useState<ParticipantQuery>(INITIAL_QUERY);

  const setQuery = useCallback((updates: Partial<ParticipantQuery>) => {
    setQueryState((current) => ({
      ...current,
      ...updates,
    }));
  }, []);

  const resetQuery = useCallback(() => {
    setQueryState(INITIAL_QUERY);
  }, []);

  return {
    query,
    setQuery,
    resetQuery,
  };
}
