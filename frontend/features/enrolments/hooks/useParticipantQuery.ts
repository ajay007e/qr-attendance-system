import { useCallback, useState } from "react";

export interface ParticipantQuery {
  search: string;
  page: number;
}

const INITIAL_QUERY: ParticipantQuery = {
  search: "",
  page: 1,
};

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
