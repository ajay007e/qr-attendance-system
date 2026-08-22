"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { type CourseOfferingQuery, OfferingService } from "@/features/courses";
import { DEFAULT_PAGINATION_META, useError } from "@/shared";
import type { CourseOffering, PaginationMeta } from "@/shared";

export function useOfferings(query: CourseOfferingQuery) {
  const isInitialLoad = useRef(true);
  const { handleError } = useError();

  const [offerings, setOfferings] = useState<CourseOffering[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION_META);

  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOfferings = useCallback(async () => {
    try {
      if (isInitialLoad.current) {
        setLoading(true);
      } else {
        setIsFetching(true);
      }

      setError(null);

      const response = await OfferingService.getOfferings(query);

      setOfferings(response.data.items ?? []);
      setPagination(response.data.meta ?? DEFAULT_PAGINATION_META);
    } catch (err) {
      setOfferings([]);
      setPagination(DEFAULT_PAGINATION_META);

      handleError(err);

      setError(err instanceof Error ? err.message : "Unable to load course offerings.");
    } finally {
      if (isInitialLoad.current) {
        setLoading(false);
        isInitialLoad.current = false;
      } else {
        setIsFetching(false);
      }
    }
  }, [query, handleError]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void loadOfferings();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadOfferings]);

  return {
    offerings,
    pagination,

    loading,
    isFetching,

    error,

    refresh: loadOfferings,
  };
}
