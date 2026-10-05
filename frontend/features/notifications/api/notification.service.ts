import { api } from "@/shared";

import type { GetNotificationsParams, GetNotificationsResponse, MarkNotificationReadResponse } from "../types";

const BASE_PATH = "/notifications";

export async function getNotifications({
  limit,
  cursor,
  isRead,
}: GetNotificationsParams): Promise<GetNotificationsResponse> {
  const { data } = await api.get<GetNotificationsResponse>(BASE_PATH, {
    params: {
      limit,
      cursor: cursor ?? undefined,
      is_read: isRead ?? undefined,
    },
  });

  return data;
}

export async function markNotificationAsRead(id: number): Promise<MarkNotificationReadResponse> {
  const { data } = await api.patch<MarkNotificationReadResponse>(`${BASE_PATH}/${id}/read`);
  return data;
}

export async function deleteNotification(id: number): Promise<void> {
  await api.delete(`${BASE_PATH}/${id}`);
}
