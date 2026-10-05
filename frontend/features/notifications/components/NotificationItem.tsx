"use client";

import { formatDistanceToNowStrict } from "date-fns";
import { Bell, Check, Loader2, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

import { SWIPE_COMPLETE_THRESHOLD, SWIPE_DRAG_ACTIVATION_DISTANCE, SWIPE_MAX_DRAG, TYPE_ICONS } from "./constants";
import type { NotificationItemProps } from "./types";

type ProcessingState = "idle" | "marking" | "deleting";

export function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
  const [translateX, setTranslateX] = useState(0);
  const [processing, setProcessing] = useState<ProcessingState>("idle");

  const startX = useRef<number | null>(null);
  const dragging = useRef(false);
  const pointerId = useRef<number | null>(null);

  const isBusy = processing !== "idle";
  const canMarkAsRead = !notification.is_read;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isBusy) return;
    startX.current = e.clientX;
    dragging.current = true;
    pointerId.current = e.pointerId;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || startX.current === null) return;

    const delta = e.clientX - startX.current;
    if (Math.abs(delta) < SWIPE_DRAG_ACTIVATION_DISTANCE) return;

    const maxDrag = canMarkAsRead ? SWIPE_MAX_DRAG : 0;
    setTranslateX(Math.min(maxDrag, Math.max(-SWIPE_MAX_DRAG, delta)));
  };

  const endDrag = async (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;

    if (pointerId.current !== null) {
      (e.currentTarget as HTMLElement).releasePointerCapture(pointerId.current);
    }

    if (canMarkAsRead && translateX >= SWIPE_COMPLETE_THRESHOLD) {
      setTranslateX(SWIPE_MAX_DRAG);
      setProcessing("marking");
      try {
        await onMarkAsRead(notification.id);
      } finally {
        setProcessing("idle");
        setTranslateX(0);
      }
      return;
    }

    if (translateX <= -SWIPE_COMPLETE_THRESHOLD) {
      setTranslateX(-SWIPE_MAX_DRAG);
      setProcessing("deleting");
      try {
        await onDelete(notification.id);
      } catch {
        setProcessing("idle");
        setTranslateX(0);
      }
      return;
    }

    setTranslateX(0);
  };

  const Icon = TYPE_ICONS[notification.type] ?? Bell;
  const showReadBg = canMarkAsRead && (translateX > 0 || processing === "marking");
  const showDeleteBg = translateX < 0 || processing === "deleting";

  return (
    <div className="relative overflow-hidden border-b border-gray-100 last:border-b-0">
      <div className="absolute inset-0 flex items-center justify-between">
        {canMarkAsRead && (
          <div
            className="flex h-full items-center gap-2 bg-blue-600 px-4 text-white transition-opacity sm:px-5"
            style={{ opacity: showReadBg ? 1 : 0 }}
          >
            {processing === "marking" ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
            <span className="hidden text-sm font-medium sm:inline">Mark as read</span>
          </div>
        )}

        <div
          className="ml-auto flex h-full items-center gap-2 bg-red-600 px-4 text-white transition-opacity sm:px-5"
          style={{ opacity: showDeleteBg ? 1 : 0 }}
        >
          <span className="hidden text-sm font-medium sm:inline">Delete</span>
          {processing === "deleting" ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
        </div>
      </div>

      <div
        className={`relative flex gap-3 bg-white p-3.5 sm:p-4 ${
          processing === "idle" ? "transition-transform" : "transition-transform duration-300"
        } ${notification.is_read ? "" : "bg-blue-50"}`}
        style={{
          transform: `translateX(${translateX}px)`,
          touchAction: "pan-y",
          cursor: isBusy ? "default" : "grab",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9 ${
            notification.is_read ? "bg-gray-100 text-gray-500" : "bg-blue-100 text-blue-600"
          }`}
        >
          <Icon size={15} strokeWidth={2} className="sm:hidden" />
          <Icon size={16} strokeWidth={2} className="hidden sm:block" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate text-sm font-semibold text-gray-900">{notification.title}</p>
            {!notification.is_read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />}
          </div>

          <p className="mt-0.5 line-clamp-2 text-sm text-gray-700">{notification.message}</p>

          <span className="mt-1.5 block text-xs font-medium text-gray-500">
            {formatDistanceToNowStrict(new Date(notification.created_at), { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
}
