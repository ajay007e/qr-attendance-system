"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { userService, type UserQuery } from "@/features/users";
import { AppError, DEFAULT_PAGINATION_META, useError } from "@/shared";
import type { PaginationMeta, User } from "@/shared";

export default function useUsers(query: UserQuery) {
  const { handleError } = useError();

  const abortControllerRef = useRef<AbortController | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION_META);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(
    async (controller: AbortController, initial = false) => {
      try {
        const response = await userService.getUsers(query, controller.signal);

        if (controller.signal.aborted) {
          return;
        }

        setUsers(response.data.items);
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

        setError("Unable to load users.");
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
    [query, handleError],
  );

  useEffect(() => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const timeoutId = setTimeout(() => {
      void fetchUsers(controller, true);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [fetchUsers]);

  const refresh = useCallback(async () => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsFetching(true);

    await fetchUsers(controller);
  }, [fetchUsers]);

  return {
    users,
    pagination,
    loading,
    isFetching,
    error,
    refresh,
  };
}
