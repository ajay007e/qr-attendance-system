"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { AppError, useError } from "@/shared";

import { AttendanceService } from "../api/attendance.service";
import type { AttendanceClassTypeFilter, StudentAttendanceSummary } from "../types";

export default function useStudentAttendanceSummary(offeringId: number, classType: AttendanceClassTypeFilter) {
  const { handleError } = useError();

  const abortControllerRef = useRef<AbortController | null>(null);

  const [summary, setSummary] = useState<StudentAttendanceSummary | null>(null);

  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(
    async (controller: AbortController, initial = false) => {
      if (controller.signal.aborted) {
        return;
      }

      if (initial) {
        setLoading(true);
        setSummary(null);
        setError(null);
      }

      try {
        const response = await AttendanceService.getStudentAttendanceSummary(
          offeringId,
          {
            classType: classType === "all" ? undefined : classType,
          },
          controller.signal,
        );

        if (controller.signal.aborted) {
          return;
        }

        setSummary(response.data);
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

        setError("Unable to load attendance summary.");
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
    [offeringId, classType, handleError],
  );

  useEffect(() => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();

    abortControllerRef.current = controller;

    /*
     * Defer the request so the effect itself does not synchronously
     * trigger state updates through fetchSummary().
     */
    const timeoutId = window.setTimeout(() => {
      void fetchSummary(controller, true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [fetchSummary]);

  const refresh = useCallback(async () => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();

    abortControllerRef.current = controller;

    setIsFetching(true);

    await fetchSummary(controller);
  }, [fetchSummary]);

  return {
    summary,
    loading,
    isFetching,
    error,
    refresh,
  };
}
