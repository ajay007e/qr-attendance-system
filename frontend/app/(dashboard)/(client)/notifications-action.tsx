"use client";

import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { NotificationPanel } from "@/features/notifications";
import { Button } from "@/shared";

export function NotificationsAction() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="View notifications"
        className="hover:text-blue-600"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Bell size={21} />
      </Button>

      {open && <NotificationPanel onClose={() => setOpen(false)} />}
    </div>
  );
}
