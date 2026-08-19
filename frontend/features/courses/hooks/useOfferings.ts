"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { DEFAULT_PAGINATION_META, useError } from "@/shared";

import type { PaginationMeta } from "@/shared";
import type { CourseOfferingListItem } from "../types";

import { OfferingService } from "../api/offering.service";
import type { CourseOfferingQuery } from "../types";

function getQueryKey(query: CourseOfferingQuery) {
  return JSON.stringify({
    search: query.search,
    session: query.session,
    status: query.status,
    page: query.page,
    limit: query.limit,
  });
}

export function useOfferings(query: CourseOfferingQuery) {
  const isInitialLoad = useRef(true);
  const { handleError } = useError();

  const [offerings, setOfferings] = useState<CourseOfferingListItem[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION_META);

  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loadedQueryKey, setLoadedQueryKey] = useState<string | null>(null);

  const loadOfferings = useCallback(async () => {
    const queryKey = getQueryKey(query);

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

      setLoadedQueryKey(queryKey);
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

  const currentQueryKey = getQueryKey(query);

  const hasLoadedCurrentQuery = loadedQueryKey === currentQueryKey;

  return {
    offerings,
    pagination,

    loading,
    isFetching,

    error,

    hasLoadedCurrentQuery,

    refresh: loadOfferings,
  };
}
