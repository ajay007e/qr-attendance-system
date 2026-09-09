"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { AttendanceService } from "../api/attendance.service";
import type { SessionAttendance, SessionAttendanceQuery } from "../types";

import { AppError, DEFAULT_PAGINATION_META, useError, type PaginationMeta } from "@/shared";

export default function useSessionAttendance(sessionId: number, query: SessionAttendanceQuery) {
  const { handleError } = useError();

  const abortControllerRef = useRef<AbortController | null>(null);

  const [records, setRecords] = useState<SessionAttendance[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION_META);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = useCallback(
    async (controller: AbortController, initial = false) => {
      try {
        const response = await AttendanceService.getSessionAttendance(sessionId, query, controller.signal);

        if (controller.signal.aborted) {
          return;
        }

        setRecords(response.data.items);
        setPagination(response.data.meta);
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
    [sessionId, query, handleError],
  );

  useEffect(() => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const timeoutId = setTimeout(() => {
      void fetchAttendance(controller, true);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [fetchAttendance]);

  const refresh = useCallback(async () => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsFetching(true);

    await fetchAttendance(controller);
  }, [fetchAttendance]);

  return {
    records,
    pagination,
    loading,
    isFetching,
    error,
    refresh,
  };
}
