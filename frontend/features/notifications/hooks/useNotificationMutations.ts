"use client";

import { useCallback } from "react";

import { deleteNotification, markNotificationAsRead } from "../api";

export function useNotificationMutations(onSettled: () => void | Promise<void>) {
  const markAsRead = useCallback(
    async (id: number) => {
      await markNotificationAsRead(id);
      await onSettled();
    },
    [onSettled],
  );

  const remove = useCallback(
    async (id: number) => {
      await deleteNotification(id);
      await onSettled();
    },
    [onSettled],
  );

  return { markAsRead, remove };
}
