"use client";

import { useCallback } from "react";

import {
  userService,
  type ChangePasswordRequest,
  type ChangeUserStatusRequest,
  type CreateUserRequest,
  type UpdateUserRequest,
} from "@/features/users";

export default function useUserMutations(refresh: () => Promise<void>) {
  const createUser = useCallback(
    async (data: CreateUserRequest) => {
      await userService.createUser(data);
      await refresh();
    },
    [refresh],
  );

  const updateUser = useCallback(
    async (id: number, data: UpdateUserRequest) => {
      await userService.updateUser(id, data);
      await refresh();
    },
    [refresh],
  );

  const changeStatus = useCallback(
    async (id: number, data: ChangeUserStatusRequest) => {
      await userService.changeStatus(id, data);
      await refresh();
    },
    [refresh],
  );

  const changePassword = useCallback(async (id: number, data: ChangePasswordRequest) => {
    await userService.changePassword(id, data);
  }, []);

  return {
    createUser,
    updateUser,
    changeStatus,
    changePassword,
  };
}
