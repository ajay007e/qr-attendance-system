import { Bell, CreditCard, Megaphone } from "lucide-react";

import type { NotificationReadFilter } from "../types";

export const FILTER_OPTIONS: { value: NotificationReadFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "read", label: "Read" },
];

export const TYPE_ICONS: Record<string, React.ElementType> = {
  payment: CreditCard,
  academic: Bell,
  announcement: Megaphone,
};

export const SWIPE_COMPLETE_THRESHOLD = 96;
export const SWIPE_MAX_DRAG = 160;
export const SWIPE_DRAG_ACTIVATION_DISTANCE = 6;
