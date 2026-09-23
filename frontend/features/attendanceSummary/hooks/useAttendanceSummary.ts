"use client";

import { useCallback, useEffect, useState } from "react";

import { AttendanceSummaryService } from "../api/attendanceSummary.service";
import type { StudentAttendanceSummary, SummaryQuery } from "../types";

import type { PaginationMeta } from "@/shared";
import { DEFAULT_PAGINATION_META } from "@/shared";

export function useAttendanceSummary(offeringId: number, query: SummaryQuery) {
  const [students, setStudents] = useState<StudentAttendanceSummary[]>([]);
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
    refresh();
  }, [refresh]);

  return {
    students,
    pagination,
    loading,
    isFetching,
    error,
    refresh,
  };
}