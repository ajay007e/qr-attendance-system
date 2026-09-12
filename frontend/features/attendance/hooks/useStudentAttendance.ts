"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { AppError, useError } from "@/shared";

import { AttendanceService } from "../api/attendance.service";
import type { StudentAttendanceRecord, StudentAttendanceQuery } from "../types";

const DEFAULT_LIMIT = 10;

export default function useStudentAttendance(offeringId: number, query: StudentAttendanceQuery) {
  const { handleError } = useError();

  const abortControllerRef = useRef<AbortController | null>(null);

  const [records, setRecords] = useState<StudentAttendanceRecord[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = useCallback(
    async (controller: AbortController, cursor?: string | null, initial = false) => {
      if (controller.signal.aborted) {
        return;
      }

      if (initial) {
        setLoading(true);
        setRecords([]);
        setNextCursor(null);
        setHasMore(false);
        setError(null);
      }

      try {
        const response = await AttendanceService.getStudentAttendance(
          offeringId,
          {
            ...query,
            limit: query.limit ?? DEFAULT_LIMIT,
            cursor: cursor ?? undefined,
          },
          controller.signal,
        );

        if (controller.signal.aborted) {
          return;
        }

        const { items, meta } = response.data;

        if (cursor) {
          setRecords((previous) => [...previous, ...items]);
        } else {
          setRecords(items);
        }

        setNextCursor(meta.nextCursor);
        setHasMore(meta.hasMore);
        setError(null);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        if (err instanceof AppError) {
          if (err.type === "AUTH") {
            handleError(err);
            return;
          }

          setError(err.message);
          return;
        }

        setError("Unable to load attendance.");
      } finally {
        if (controller.signal.aborted) {
          return;
        }

        if (initial) {
          setLoading(false);
        } else {
          setIsFetching(false);
        }
      }
    },
    [offeringId, query, handleError],
  );

  useEffect(() => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();

    abortControllerRef.current = controller;

    /*
     * Defer the request so the effect itself does not synchronously
     * trigger state updates through fetchAttendance().
     */
    const timeoutId = window.setTimeout(() => {
      void fetchAttendance(controller, null, true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [fetchAttendance]);

  const loadMore = useCallback(async () => {
    if (!hasMore || !nextCursor || isFetching) {
      return;
    }

    abortControllerRef.current?.abort();

    const controller = new AbortController();

    abortControllerRef.current = controller;

    setIsFetching(true);

    await fetchAttendance(controller, nextCursor);
  }, [fetchAttendance, hasMore, nextCursor, isFetching]);

  const refresh = useCallback(async () => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();

    abortControllerRef.current = controller;

    setIsFetching(true);

    await fetchAttendance(controller, null);
  }, [fetchAttendance]);

  return {
    records,
    nextCursor,
    hasMore,
    loading,
    isFetching,
    error,
    loadMore,
    refresh,
  };
}
