"use client";

import { useCallback, useEffect, useState } from "react";

import type { PaginationMeta } from "@/shared";
import { DEFAULT_PAGINATION_META } from "@/shared";

import { AttendanceSummaryService } from "../api/attendanceSummary.service";
import type { AttendanceSummaryRecord, SummaryQuery } from "../types";


export function useAttendanceSummary(offeringId: number, query: SummaryQuery) {
  const [students, setStudents] = useState<AttendanceSummaryRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION_META);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      setIsFetching(true);

      const response = await AttendanceSummaryService.getSummary(offeringId, {
        search: query.search,
        page: query.page,
        limit: query.limit,
      });

      setStudents(response.data.items);
      setPagination(response.data.meta);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to load attendance summary"));
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [offeringId, query.search, query.page, query.limit]);

  useEffect(() => {
    let cancelled = false;

    const loadSummary = async () => {
      try {
        setError(null);
        setIsFetching(true);

        const response = await AttendanceSummaryService.getSummary(offeringId, {
          search: query.search,
          page: query.page,
          limit: query.limit,
        });

        if (!cancelled) {
          setStudents(response.data.items);
          setPagination(response.data.meta);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Unable to load attendance summary"));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setIsFetching(false);
        }
      }
    };

    loadSummary();

    return () => {
      cancelled = true;
    };
  }, [offeringId, query.search, query.page, query.limit]);

  return {
    students,
    pagination,
    loading,
    isFetching,
    error,
    refresh,
  };
}