"use client";

import { useCallback, useEffect, useState } from "react";

import { enrolmentService, type ParticipantQuery } from "@/features/enrolments";
import type { Participant, PaginationMeta } from "@/shared";
import { DEFAULT_PAGINATION_META } from "@/shared";

export function useCourseParticipants(offeringId: number, query: ParticipantQuery) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION_META);

  const fetchParticipants = useCallback(async () => {
    try {
      setError(null);
      setIsFetching(true);

      const response = await enrolmentService.getCourseStudents(offeringId, {
        search: query.search,
        page: query.page,
        limit: DEFAULT_PAGINATION_META.limit,
      });

      setParticipants(response.data.items);
      setPagination(response.data.meta);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to load participants"));
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [offeringId, query.search, query.page]);

  useEffect(() => {
    let cancelled = false;

    const loadParticipants = async () => {
      try {
        setError(null);
        setIsFetching(true);

        const response = await enrolmentService.getCourseStudents(offeringId, {
          search: query.search,
          page: query.page,
          limit: DEFAULT_PAGINATION_META.limit,
        });

        if (!cancelled) {
          setParticipants(response.data.items);
          setPagination(response.data.meta);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Unable to load participants"));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setIsFetching(false);
        }
      }
    };

    loadParticipants();

    return () => {
      cancelled = true;
    };
  }, [offeringId, query.search, query.page]);

  return {
    participants,
    pagination,
    loading,
    isFetching,
    error,
    refresh: fetchParticipants,
  };
}
