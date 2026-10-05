import { DEFAULT_NOTIFICATIONS_LIMIT, MOCK_SIMULATED_EMPTY_RATE, MOCK_SIMULATED_ERROR_RATE } from "../constants";
import type {
  GetNotificationsParams,
  GetNotificationsResponse,
  MarkNotificationReadResponse,
  Notification,
} from "../types";

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

export async function getNotifications({
  limit = DEFAULT_NOTIFICATIONS_LIMIT,
  cursor,
  isRead,
}: GetNotificationsParams): Promise<GetNotificationsResponse> {
  await delay(500);

  const isFirstPage = !cursor;

  if (isFirstPage && Math.random() < MOCK_SIMULATED_ERROR_RATE) {
    throw new MockNotificationsError("Simulated network failure while fetching notifications.");
  }

  if (isFirstPage && Math.random() < MOCK_SIMULATED_EMPTY_RATE) {
    return {
      success: true,
      data: {
        items: [],
        meta: { limit, nextCursor: null, hasMore: false },
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
    success: true,
    data: {
      items: slice,
      meta: { limit, nextCursor: hasMore ? String(nextIndex) : null, hasMore },
    },
  };
}

export async function markNotificationAsRead(id: number): Promise<MarkNotificationReadResponse> {
  await delay(400);

  mockNotifications = mockNotifications.map((n) =>
    n.id === id && !n.is_read ? { ...n, is_read: true, read_at: new Date().toISOString() } : n,
  );

  const updated = mockNotifications.find((n) => n.id === id);
  if (!updated) throw new MockNotificationsError(`Notification ${id} not found.`);

  return { success: true, data: updated };
}

export async function deleteNotification(id: number): Promise<void> {
  await delay(400);
  mockNotifications = mockNotifications.filter((n) => n.id !== id);
}
