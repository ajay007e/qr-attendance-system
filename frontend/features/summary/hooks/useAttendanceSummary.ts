"use client";

import { useCallback, useEffect, useState } from "react";

import { AttendanceSummaryService } from "@/features/summary";
import type { StudentAttendanceSummary } from "@/features/summary";

export function useAttendanceSummary(offeringId: number) {
  const [summary, setSummary] = useState<StudentAttendanceSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await AttendanceSummaryService.getSummary(offeringId);
      setSummary(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to load attendance summary"));
    } finally {
      setLoading(false);
    }
  }, [offeringId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    summary,
    loading,
    error,
    refresh,
  };
}