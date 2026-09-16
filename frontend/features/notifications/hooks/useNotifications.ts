"use client";

import { useCallback, useEffect, useState } from "react";

import { getNotifications } from "../api";
import { DEFAULT_NOTIFICATIONS_LIMIT } from "../constants";
import type { Notification, NotificationReadFilter } from "../types";

function toIsRead(filter: NotificationReadFilter): boolean | null {
  if (filter === "unread") return false;
  if (filter === "read") return true;
  return null;
}

export function useNotifications(filter: NotificationReadFilter) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (nextCursor: string | null = null) => {
      try {
        setError(null);

        const res = await getNotifications({
          limit: DEFAULT_NOTIFICATIONS_LIMIT,
          cursor: nextCursor,
          isRead: toIsRead(filter),
        });

        const { items, meta } = res.data;

        setNotifications((prev) => (nextCursor ? [...prev, ...items] : items));
        setCursor(meta.nextCursor);
        setHasMore(meta.hasMore);
      } catch {
        setError("Something went wrong while loading your notifications.");

        if (!nextCursor) {
          setNotifications([]);
        }
      }
    },
    [filter],
  );

  useEffect(() => {
    let cancelled = false;

    const loadInitial = async () => {
      setLoading(true);

      try {
        await load();
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadInitial();

    return () => {
      cancelled = true;
    };
  }, [load]);

  const loadMore = useCallback(async () => {
    if (!cursor || loadingMore) return;

    setLoadingMore(true);

    try {
      await load(cursor);
    } finally {
      setLoadingMore(false);
    }
  }, [cursor, loadingMore, load]);

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      await load();
    } finally {
      setLoading(false);
    }
  }, [load]);

  return {
    notifications,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}
