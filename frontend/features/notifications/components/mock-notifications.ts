import { Notification } from "../types";

// Tweak these to test UI states on demand, or set both to 0 to disable.
const SIMULATED_ERROR_RATE = 0.2; // 20% chance a fetch call throws
const SIMULATED_EMPTY_RATE = 0.15; // 15% chance a fetch call returns zero results
// -------------------------------------------------------------------------

let mockNotifications: Notification[] = Array.from({ length: 14 }).map((_, i) => ({
  id: 1000 + i,
  title: i % 3 === 0 ? "Payment successful" : i % 3 === 1 ? "Assignment graded" : "New announcement",
  message:
    i % 3 === 0
      ? "Your payment of $49.99 was successful."
      : i % 3 === 1
        ? "Your submission for Module 3 has been graded."
        : "A new announcement was posted in your class.",
  type: i % 3 === 0 ? "payment" : i % 3 === 1 ? "academic" : "announcement",
  priority: i % 5 === 0 ? "high" : "medium",
  redirect_url: null,
  reference_type: null,
  reference_id: null,
  is_read: i % 4 === 0,
  read_at: i % 4 === 0 ? new Date(Date.now() - i * 3_600_000).toISOString() : null,
  created_at: new Date(Date.now() - i * 3_600_000).toISOString(),
}));

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class MockNotificationsError extends Error {}

export async function fetchNotificationsMock({
  limit = 20,
  cursor,
  isRead,
}: {
  limit?: number;
  cursor?: string | null;
  isRead?: boolean | null;
}) {
  await delay(500);

  // Only simulate failure/empty on the first page — pagination "Load more"
  // calls stay reliable so infinite scroll doesn't break mid-list.
  const isFirstPage = !cursor;

  if (isFirstPage && Math.random() < SIMULATED_ERROR_RATE) {
    throw new MockNotificationsError("Simulated network failure while fetching notifications.");
  }

  if (isFirstPage && Math.random() < SIMULATED_EMPTY_RATE) {
    return {
      data: [],
      pagination: {
        limit,
        next_cursor: null,
        has_more: false,
      },
    };
  }

  const filtered =
    isRead === null || isRead === undefined ? mockNotifications : mockNotifications.filter((n) => n.is_read === isRead);

  const startIndex = cursor ? Number(cursor) : 0;
  const slice = filtered.slice(startIndex, startIndex + limit);
  const nextIndex = startIndex + limit;
  const hasMore = nextIndex < filtered.length;

  return {
    data: slice,
    pagination: {
      limit,
      next_cursor: hasMore ? String(nextIndex) : null,
      has_more: hasMore,
    },
  };
}

export async function markNotificationReadMock(id: number) {
  await delay(400);
  mockNotifications = mockNotifications.map((n) =>
    n.id === id && !n.is_read ? { ...n, is_read: true, read_at: new Date().toISOString() } : n,
  );
}

export async function deleteNotificationMock(id: number) {
  await delay(400);
  mockNotifications = mockNotifications.filter((n) => n.id !== id);
}
