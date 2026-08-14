"use client";

import { useCallback, useEffect, useState } from "react";

import { Participant } from "@/features/courses/components/CourseLanding/components/ParticiapantsPanel/types";

import { enrolmentService } from "../api/enrolment.service";
import type { ParticipantQuery } from "./useParticipantQuery";

const PARTICIPANTS_PER_PAGE = 10;

export default function useCourseParticipants(courseId: number, query: ParticipantQuery) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [pagination, setPagination] = useState();

  const fetchParticipants = useCallback(async () => {
    try {
      setError(null);
      setIsFetching(true);

      const response = await enrolmentService.getCourseStudents(courseId, {
        search: query.search,
        page: query.page,
        limit: PARTICIPANTS_PER_PAGE,
      });

      setParticipants(response.data.data);
      setPagination(response.data.pagination);
      setHasLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to load participants"));
      setHasLoaded(true);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [courseId, query.search, query.page]);

  useEffect(() => {
    let cancelled = false;

    const loadParticipants = async () => {
      try {
        setError(null);
        setIsFetching(true);

        const response = await enrolmentService.getCourseStudents(courseId, {
          search: query.search,
          page: query.page,
          limit: PARTICIPANTS_PER_PAGE,
        });

        if (!cancelled) {
          setParticipants(response.data.data);
          setPagination(response.data.pagination);
          setHasLoaded(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Unable to load participants"));
          setHasLoaded(true);
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
  }, [courseId, query.search, query.page]);

  return {
    participants,
    pagination,
    loading,
    isFetching,
    error,
    refresh: fetchParticipants,
    hasLoadedCurrentQuery: hasLoaded,
  };
}
