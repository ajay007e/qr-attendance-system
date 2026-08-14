"use client";

import { useCallback, useEffect, useState } from "react";

import { enrolmentService } from "../api/enrolment.service";
import type { ParticipantQuery } from "./useParticipantQuery";
import { Participant } from "@/features/courses/components/CourseLanding/components/ParticiapantsPanel/types";

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
      console.log(response.data);

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
    fetchParticipants();
  }, [fetchParticipants]);

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
