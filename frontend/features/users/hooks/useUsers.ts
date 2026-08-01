"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { userService } from "../api/user.service";
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  ChangePasswordRequest,
  ChangeUserStatusRequest,
  UserQuery,
} from "../types";

export interface Pagination {
  page: number;
  limit: number;
  count: number;
  total: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

const DEFAULT_PAGINATION: Pagination = {
  page: 1,
  limit: 10,
  count: 0,
  total: 0,
  totalPages: 0,
  hasPrevious: false,
  hasNext: false,
};

export function useUsers(query: UserQuery) {
  const isInitialLoad = useRef(true);

  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION);

  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      if (isInitialLoad.current) {
        setLoading(true);
      } else {
        setIsFetching(true);
      }

      setError(null);

      const response = await userService.getUsers(query);

      setUsers(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error(error);

      setUsers([]);
      setPagination(DEFAULT_PAGINATION);

      setError("Unable to load users.");
    } finally {
      if (isInitialLoad.current) {
        setLoading(false);
        isInitialLoad.current = false;
      } else {
        setIsFetching(false);
      }
    }
  }, [query]);

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
    loadUsers();
  }, [loadUsers]);

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
  };
}
