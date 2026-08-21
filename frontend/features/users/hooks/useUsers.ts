"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { userService } from "@/features/users";
import type {
  CreateUserRequest,
  UpdateUserRequest,
  ChangePasswordRequest,
  ChangeUserStatusRequest,
  UserQuery,
} from "@/features/users";
import { DEFAULT_PAGINATION_META, useError } from "@/shared";
import type { PaginationMeta, User } from "@/shared";

function getQueryKey(query: UserQuery) {
  return JSON.stringify({
    search: query.search,
    role: query.role,
    status: query.status,
    page: query.page,
    limit: query.limit,
  });
}

export default function useUsers(query: UserQuery) {
  const isInitialLoad = useRef(true);
  const { handleError } = useError();

  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION_META);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loadedQueryKey, setLoadedQueryKey] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    const queryKey = getQueryKey(query);
    try {
      if (isInitialLoad.current) {
        setLoading(true);
      } else {
        setIsFetching(true);
      }
      setError(null);
      const response = await userService.getUsers(query);
      setUsers(response.data.items);
      setPagination(response.data.meta);
      setLoadedQueryKey(queryKey);
    } catch (error) {
      setUsers([]);
      setPagination(DEFAULT_PAGINATION_META);
      handleError(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unable to load users.");
      }
    } finally {
      if (isInitialLoad.current) {
        setLoading(false);

        isInitialLoad.current = false;
      } else {
        setIsFetching(false);
      }
    }
  }, [query, handleError]);

  const createUser = async (data: CreateUserRequest) => {
    await userService.createUser(data);

    await loadUsers();
  };

  const updateUser = async (id: number, data: UpdateUserRequest) => {
    await userService.updateUser(id, data);

    await loadUsers();
  };

  const changeStatus = async (id: number, data: ChangeUserStatusRequest) => {
    await userService.changeStatus(id, data);

    await loadUsers();
  };

  const changePassword = async (id: number, data: ChangePasswordRequest) => {
    await userService.changePassword(id, data);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void loadUsers();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadUsers]);

  const currentQueryKey = getQueryKey(query);

  const hasLoadedCurrentQuery = loadedQueryKey === currentQueryKey;

  return {
    users,
    pagination,
    loading,
    isFetching,
    error,
    refresh: loadUsers,
    createUser,
    updateUser,
    changeStatus,
    changePassword,

    hasLoadedCurrentQuery,
  };
}
