"use client";

import { Bell, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button, EmptyState, ErrorFallback, Loader } from "@/shared";

import { useNotificationMutations, useNotifications } from "../hooks";
import type { NotificationReadFilter } from "../types";

import { FILTER_OPTIONS } from "./constants";
import { NotificationItem } from "./NotificationItem";
import type { NotificationPanelProps } from "./types";

const EMPTY_STATE_COPY: Record<NotificationReadFilter, { title: string; message: string }> = {
  all: { title: "You're all caught up", message: "You don't have any notifications yet." },
  unread: { title: "No unread notifications", message: "You've read everything for now." },
  read: { title: "No read notifications", message: "Nothing has been marked as read yet." },
};

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const [filter, setFilter] = useState<NotificationReadFilter>("all");

  const { notifications, loading, loadingMore, error, hasMore, loadMore, refresh } = useNotifications(filter);
  const { markAsRead, remove } = useNotificationMutations(refresh);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    if (!mediaQuery.matches) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const hasResults = notifications.length > 0;
  const emptyCopy = EMPTY_STATE_COPY[filter];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20 sm:hidden" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Notifications"
        className={[
          "fixed inset-0 z-50 flex flex-col bg-white shadow-xl",
          "sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 sm:max-h-[520px] sm:w-[380px] sm:max-w-[90vw]",
          "sm:rounded-2xl sm:border sm:border-gray-200",
          "animate-in fade-in slide-in-from-top-2 duration-150",
        ].join(" ")}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
          <Button type="button" variant="ghost" size="icon" aria-label="Close notifications" onClick={onClose}>
            <X size={18} className="text-gray-700" />
          </Button>
        </div>

        <div className="shrink-0 border-b border-gray-100 px-4 py-3">
          <div className="grid grid-cols-3 gap-1 rounded-lg bg-gray-100 p-1">
            {FILTER_OPTIONS.map((option) => {
              const active = filter === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value)}
                  className={[
                    "rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-150",
                    active ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700",
                  ].join(" ")}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          {loading && !error && <Loader message="Loading notifications..." />}

          {error && (
            <div className="m-4">
              <ErrorFallback
                title="Unable to load notifications"
                message="We couldn't retrieve your notifications right now. Please try again."
                onRetry={refresh}
                retryLabel="Retry Loading"
              />
            </div>
          )}

          {!loading && !error && !hasResults && (
            <div className="m-4">
              <EmptyState icon={<Bell size={28} />} title={emptyCopy.title} message={emptyCopy.message} />
            </div>
          )}

          {!loading && !error && hasResults && (
            <>
              {notifications.map((n) => (
                <NotificationItem key={n.id} notification={n} onMarkAsRead={markAsRead} onDelete={remove} />
              ))}

              {hasMore && (
                <div className="p-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled={loadingMore}
                    onClick={() => void loadMore()}
                  >
                    {loadingMore ? "Loading..." : "Load more"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
